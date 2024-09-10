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

const ModalVerFactibilidadMonitor = ({ selected_fact, open, set_open }) => {
    const { toast } = useToast();
    const [mapCenter, setMapCenter] = useState({ lat: 24.115858323185, lng: -110.34761062742 });
    const [mapLoaded, setMapLoaded] = useState(false);
    const [factibilidadAgua, setFactibilidadAgua] = useState(selected_fact?.agua_estado_factible || 'pendiente');
    const [factibilidadSaneamiento, setFactibilidadSaneamiento] = useState(selected_fact?.saneamiento_estado_factible || 'pendiente');
    const [factibilidadAlcantarillado, setFactibilidadAlcantarillado] = useState(selected_fact?.alcantarillado_estado_factible || 'pendiente');
    const [derechosConexion, setDerechosConexion] = useState(selected_fact?.derechos_conexion || '');
    const [documento, setDocumento] = useState(null); // Estado para el archivo seleccionado
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
    const handleFileChange = (event) => {
        setDocumento(event.target.files[0]); // Establece el archivo seleccionado
    };

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

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('agua_estado_factible', factibilidadAgua);
            formData.append('san_estado_factible', factibilidadSaneamiento); // Ajustado
            formData.append('alc_estado_factible', factibilidadAlcantarillado); // Ajustado
            formData.append('derechos_conexion', derechosConexion);
    
            if (documento) {
                formData.append('documento', documento);
            }
    
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
                                >
                                    <option value="pendiente">Pendiente</option>
                                    <option value="no_factible">No Factible</option>
                                    <option value="factible">Factible</option>
                                </select>
                            </p>
                            <p className='whitespace-nowrap'>
                                <strong>Fact de san:</strong>
                                <select
                                    value={factibilidadSaneamiento}
                                    onChange={(e) => handleFactibilidadChange(e, setFactibilidadSaneamiento)}
                                    className='ml-2 border rounded  p-1'
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
                                    className='ml-2 border rounded p-1'
                                />
                            </p>

                            {/* Botón para seleccionar archivo */}
                            <div className='flex justify-end w-full'>
                                {/* Input oculto para subir archivos */}
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }} // Mantenerlo oculto
                                    onChange={handleFileChange} // Manejar la subida de archivos
                                    accept=".pdf" // Aceptar solo PDFs
                                />

                                {/* Botón personalizado para abrir el explorador de archivos */}
                                <div
                                    className='w-[70px] h-[5vh] gap-2 flex justify-center px-2 py-2 rounded-md dark:hover:bg-blue-900 hover:bg-blue-100 cursor-pointer ease-in duration-100'
                                    onClick={triggerFileInput} // Abrir el explorador de archivos al hacer clic
                                >
                                    <ReaderIcon className='w-[20px] h-[20px] text-blue-500' />
                                    <p></p>
                                </div>

                                <Button className='bg-green-500 hover:bg-green-600' variant={"default"} onClick={handleUpdate}>Aceptar</Button>
                                <Button className='bg-red-500 hover:bg-red-600' variant={"default"} onClick={() => set_open(false)}>Rechazar</Button>
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
                        <AlertDialogCancel onClick={() => set_open(false)}>Cancelar</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default ModalVerFactibilidadMonitor;
