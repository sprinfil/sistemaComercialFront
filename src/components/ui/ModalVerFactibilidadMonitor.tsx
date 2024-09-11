import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogCancel
} from "@/components/ui/alert-dialog";
import { Button } from "../../components/ui/button";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useToast } from "@/components/ui/use-toast"; // IMPORTACIONES TOAST
import { ReaderIcon } from '@radix-ui/react-icons';
import axiosClient from '../../axios-client';
import { File } from 'buffer';
import { ContextProvider, useStateContext } from '../../contexts/ContextProvider';
import { XCircleIcon } from 'lucide-react';

const ModalVerFactibilidadMonitor = ({ selected_fact, open, set_open  }) => {
    const {user} = useStateContext();
    const { toast } = useToast();
    const [mapCenter, setMapCenter] = useState({ lat: 24.115858323185, lng: -110.34761062742 });
    const [mapLoaded, setMapLoaded] = useState(false);
    const [factibilidadAgua, setFactibilidadAgua] = useState(selected_fact?.agua_estado_factible || 'pendiente');
    const [factibilidadSaneamiento, setFactibilidadSaneamiento] = useState(selected_fact?.saneamiento_estado_factible || 'pendiente');
    const [factibilidadAlcantarillado, setFactibilidadAlcantarillado] = useState(selected_fact?.alcantarillado_estado_factible || 'pendiente');
    const [derechosConexion, setDerechosConexion] = useState(selected_fact?.derechos_conexion || '');
    const [documentos, setDocumentos] = useState([]); // Estado para el archivo seleccionado
    const [fileStatus, setFileStatus] = useState(null);
    const containerStyle = {
        width: '100%',
        height: '500px',
    };

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyARlsiPBIt9Cv5EiSNKTZVENYMZwJo-KJ0', // Reemplaza con tu API Key
    });

    const [map, setMap] = useState(null);

    const fileInputRef = useRef(null); // Referencia al input de archivo

    // Función para abrir el explorador de archivos
    const triggerFileInput = () => {
        fileInputRef.current.click(); // Simula un clic en el input de archivo
    };

    // Función para manejar la selección de archivo
    

    useEffect(() => {
        if (selected_fact?.contrato?.toma?.posicion?.coordinates) {
            const [lng, lat] = selected_fact.contrato.toma.posicion.coordinates;
            setMapCenter({ lat, lng });
        }
    }, [selected_fact]);

    const onLoad = useCallback(function callback(map) {
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);

    const removeFile = (fileName) => {
        setDocumentos(prevFiles => prevFiles.filter(file => file.name !== fileName));
        if (documentos.length <= 1) {
            setFileStatus(null); // Si no hay archivos, restablece el estado
        }
    };

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        const validFiles = selectedFiles.filter(file => file.type === 'application/pdf');
        if (validFiles.length > 0) {
            setDocumentos(prevFiles => [...prevFiles, ...validFiles]);
            setFileStatus('success');
        } else {
            setFileStatus('error');
            toast({
                title: "Error",
                description: "Solo se aceptan archivos PDF.",
                variant: "destructive",
            });
        }
    };

    const handleUpdate = async (newEstado) => {
        try {
            const formData = new FormData();
            formData.append('id_revisor', user.id); // Agrega el ID del revisor al formData
            formData.append('estado', newEstado);
            formData.append('agua_estado_factible', factibilidadAgua);
            formData.append('san_estado_factible', factibilidadSaneamiento); // Ajustado
            formData.append('alc_estado_factible', factibilidadAlcantarillado); // Ajustado
    
            // Si derechosConexion es null o undefined, lo enviamos como cadena vacía o un valor por defecto
            formData.append('derechos_conexion', derechosConexion !== null && derechosConexion !== undefined ? derechosConexion : '');
    
            documentos.forEach(file => {
                if (file.type === 'application/pdf') {
                    formData.append('documentos[]', file);
                }
            });
    
            console.log([...formData]); // Imprime el contenido de FormData para depuración
    
            const response = await axiosClient.post(`/factibilidad/update/${selected_fact.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            toast({
                title: "Éxito",
                description: "Factibilidad actualizada correctamente.",
                variant: "success",
            });
            set_open(false);
             // Llama a refreshData para actualizar la tabla
    
        } catch (error) {
            console.error(error.response); // Imprime la respuesta completa del error
            toast({
                title: "Error",
                description: "No se pudo actualizar la factibilidad.",
                variant: "destructive",
            });
        }
    };    
    
    if (!isLoaded) {
        return <div>Cargando mapa...</div>;
    }

    // Función para manejar los cambios en los campos de factibilidad
    const handleFactibilidadChange = (event, setter) => {
        setter(event.target.value);
    };

    const handleCancel = () => {
        set_open(false);
        setDocumentos([]); // Reinicia el estado del archivo
        setFileStatus(null); // Reinicia el estado del archivo
    };

    const rechazada = selected_fact?.estado === 'rechazada';
    const prendienteDePago = selected_fact?.estado === 'pendiente de pago';
    const isDisabled = rechazada || prendienteDePago;

    return (
        <div>
            <AlertDialog open={open}>
                <AlertDialogContent className="max-w-[100rem] h-[98vh]">
                    <AlertDialogHeader>
                        <AlertDialogTitle>{selected_fact?.contrato.nombre_contrato}</AlertDialogTitle>
                        <AlertDialogDescription>Detalles del factibilidad.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className='h-[70vh]'>
                        <div className='flex gap-3 shadow-md p-2 align-top border rounded-md'>
                            <p className='whitespace-nowrap p-1'><strong>Folio:</strong> {selected_fact?.contrato.folio_solicitud}</p>
                            <p className='whitespace-nowrap '>
                                <strong>Fact de agua:</strong>
                                <select
                                    value={factibilidadAgua}
                                    onChange={(e) => handleFactibilidadChange(e, setFactibilidadAgua)}
                                    className='ml-2 border rounded  p-1'
                                    disabled={isDisabled}
                                >
                                    <option value="pendiente">Pendiente</option>
                                    <option value="no_factible">No Factible</option>
                                    <option value="factible">Factible</option>
                                </select>
                            </p>
                            
                            <p className='whitespace-nowrap'>
                                <strong>Fact de alc:</strong>
                                <select
                                    value={factibilidadAlcantarillado}
                                    onChange={(e) => handleFactibilidadChange(e, setFactibilidadAlcantarillado)}
                                    className='ml-2 border rounded p-1'
                                    disabled={isDisabled}
                                >
                                    <option value="pendiente">Pendiente</option>
                                    <option value="no_factible">No Factible</option>
                                    <option value="factible">Factible</option>
                                </select>
                            </p>
                            <p className='whitespace-nowrap'>
                                <strong>Derechos de conexión:</strong>
                                <input
                                    type="text"
                                    value={derechosConexion}
                                    onChange={(e) => setDerechosConexion(e.target.value)}
                                    className='ml-2 w-[100px] border rounded p-1'
                                    disabled={isDisabled}
                                />
                            </p>

                            {/* Botón para seleccionar archivo */}
                            <div className='flex justify-end w-full pr-2'>
                                {/* Input oculto para subir archivos */}
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }} // Mantenerlo oculto
                                    onChange={handleFileChange} // Manejar la subida de archivos
                                    accept=".pdf" // Aceptar solo PDFs
                                    disabled={isDisabled}
                                />

                                {/* Botón personalizado para abrir el explorador de archivos */}
                                <div className='flex gap-2'>
                                <div
                                    className={`w-[260px] h-4vh] pl-4 gap-2 flex justify-center px-2 py-2 rounded-md cursor-pointer ease-in duration-100 ${fileStatus === 'success' ? 'bg-green-100 hover:bg-green-200' : fileStatus === 'error' ? 'bg-red-100 hover:bg-red-200' : 'hover:bg-blue-100'}`}
                                    onClick={triggerFileInput} // Abrir el explorador de archivos al hacer clic
                                >
                                     <p>{documentos.length > 0 ? `${documentos.length} archivo(s) seleccionado(s)` : 'Seleccionar archivo(s)'}</p>
                                    </div>
                                    <ul className='list-disc pl-5'>
                                        {documentos.map((doc, index) => (
                                            <li
                                                key={index}
                                                className='flex items-center gap-2 cursor-pointer'
                                                onClick={() => removeFile(doc.name)}
                                            >
                                                {doc.name}
                                                <XCircleIcon className='w-[16px] h-[16px] text-red-500' />
                                            </li>
                                        ))}
                                    </ul>
                                
                                    <Button  disabled={isDisabled} className='bg-green-500 hover:bg-green-600 ' variant={"default"} onClick={ () =>handleUpdate("pendiente de pago")}>Aceptar</Button>
                                    <Button  disabled={isDisabled} className='bg-red-500 hover:bg-red-600' variant={"default"} onClick={() =>handleUpdate("rechazada")}>Rechazar</Button>
                                </div>
                            </div>
                        </div>
                        <div className='h-[50vh] border rounded-md mt-4'>
                            <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={mapCenter} // Usar la ubicación actual del usuario
                                zoom={15}
                                onLoad={onLoad}
                                onUnmount={onUnmount}
                            >
                                {/* Agregar un marcador en la ubicación actual */}
                                <Marker position={mapCenter} label="" map={map} />
                            </GoogleMap>
                        </div>
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={handleCancel}>Cancelar</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default ModalVerFactibilidadMonitor;
