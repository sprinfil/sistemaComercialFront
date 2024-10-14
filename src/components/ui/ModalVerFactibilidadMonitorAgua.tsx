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
import ZustandMonitorFactibilidad from '../../contexts/ZustandMonitorFactibilidad';

const ModalVerFactibilidadMonitorAgua = ({ selected_fact, open, set_open }) => {
  const { user } = useStateContext();
  const { toast } = useToast();
  const [mapCenter, setMapCenter] = useState({ lat: 24.115858323185, lng: -110.34761062742 });
  const [mapLoaded, setMapLoaded] = useState(false);
  const [factibilidadAgua, setFactibilidadAgua] = useState(selected_fact?.agua_estado_factible || '');
  const [factibilidadSaneamiento, setFactibilidadSaneamiento] = useState(selected_fact?.saneamiento_estado_factible || '');
  const [factibilidadAlcantarillado, setFactibilidadAlcantarillado] = useState(selected_fact?.alcantarillado_estado_factible || '');
  const [derechosConexion, setDerechosConexion] = useState(selected_fact?.derechos_conexion || '');
  const [archivos, setArchivos] = useState([]);
  const [comentarios, setComentarios] = useState(selected_fact?.comentarios || '');
  const [documentos, setDocumentos] = useState([]); // Estado para el archivo seleccionado
  const [fileStatus, setFileStatus] = useState(null);
  const [errorMessages, setErrorMessages] = useState({}); // Estado para mensajes de error
  const containerStyle = {
    width: '100%',
    height: '45vh',
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyARlsiPBIt9Cv5EiSNKTZVENYMZwJo-KJ0', // Reemplaza con tu API Key
  });

  const [map, setMap] = useState(null);

  const { set_factibilidades } = ZustandMonitorFactibilidad();

  const fileInputRef = useRef(null); // Referencia al input de archivo

  // Función para abrir el explorador de archivos
  const triggerFileInput = () => {
    fileInputRef.current.click(); // Simula un clic en el input de archivo
  };

  // Función para manejar la selección de archivo
  useEffect(() => {
  
  }, [])

  useEffect(() => {
    console.log(selected_fact?.ubicacion?.coordinates);
    if (selected_fact?.ubicacion?.coordinates) {
      const [lng, lat] = selected_fact?.ubicacion?.coordinates;
      console.log(lng, lat);
      setMapCenter({ lat, lng });
    }
  }, [selected_fact]);

  useEffect(() => {
    if (selected_fact?.archivos) {
      setArchivos(selected_fact.archivos);
    }

    setFactibilidadAgua(conversor_estados_factibles(selected_fact?.agua_estado_factible));
    setFactibilidadAlcantarillado(conversor_estados_factibles(selected_fact?.alcantarillado_estado_factible));
    setComentarios(selected_fact?.comentario)
    console.log(selected_fact)
  }, [selected_fact]);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const conversor_estados_factibles = (estado) => {
    if (estado == "FACTIBLE")
      return "factible";
    if (estado == "NO FACTIBLE")
      return "no factible";
    if (estado == "PENDIENTE")
      return "pendiente";
  }

  const removeFile = (fileName) => {
    setDocumentos(prevFiles => prevFiles.filter(file => file.name !== fileName));
    if (documentos?.length <= 1) {
      setFileStatus(null); // Si no hay archivos, restablece el estado
    }
  };

  const truncateFileName = (fileName, maxLength = 30) => {
    if (fileName?.length > maxLength) {
      return fileName.slice(0, maxLength) + '...';
    }
    return fileName;
  };
  console.log(selected_fact.archivos)


  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const validFiles = selectedFiles;
    if (validFiles?.length > 0) {
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
      formData.append('id_revisor', user.id);
      formData.append('estado', newEstado);
      formData.append('servicio', 'agua');
      formData.append('estado_servicio', factibilidadAlcantarillado);

      // Si derechosConexion es null o undefined, lo enviamos como cadena vacía o un valor por defecto
      formData.append('derechos_conexion', derechosConexion !== null && derechosConexion !== undefined ? derechosConexion : '');
      formData.append('comentario', comentarios !== null && comentarios !== undefined ? comentarios : '');
      console.log(comentarios)
      documentos.forEach(file => {
        formData.append('documentos[]', file);
      });

      console.log([...formData]);// Imprime el contenido de FormData para depuración

      const response = await axiosClient.post(`/factibilidad/update/${selected_fact.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response); // Imprime la respuesta completa del error

      toast({
        title: "Éxito",
        description: "Factibilidad actualizada correctamente.",
        variant: "success",
      });

      setArchivos(response.data.archivos);
      setDocumentos([]);
      set_factibilidades((prev: any) => {
        return prev.map((factibilidad: any) => {
          if (factibilidad.id == selected_fact.id) {
            let nueva_factibilidad = factibilidad;
            nueva_factibilidad.id_revisor = response.data.id_revisor;
            nueva_factibilidad.estatus = response.data.estatus;
            nueva_factibilidad.agua_estado_factible = response.data.agua_estado_factible;
            nueva_factibilidad.alcantarillado_estado_factible = response.data.alcantarillado_estado_factible;
            nueva_factibilidad.derechos_conexion = response.data.derechos_conexion || "";
            nueva_factibilidad.comentario = response.data.comentario || "";
            nueva_factibilidad.archivos = response.data.archivos || null;
            return nueva_factibilidad;
          } else {
            return factibilidad
          }
        })
      })

    } catch (response) {
      console.log(response); // Imprime la respuesta completa del error
      toast({
        title: "Error",
        description: "Llenar los campos y subir los archivos para aceptar una factibilidad.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = async () => {
    try {
      const response = await axiosClient.get(`/factibilidad/constancia/${selected_fact.id}`, {
        responseType: 'blob', // Importante para recibir el archivo como blob
      });

      // Crear un enlace temporal para la descarga del archivo
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'constancia_factibilidad.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.error('Error al descargar la constancia:', error);
      toast({
        title: "Error",
        description: "No se pudo descargar la constancia de factibilidad.",
        variant: "destructive",
      });
    }
  };
  const handleDownloadUrl = async (fileUrl) => {
    try {
      const response = await axiosClient.get(`/archivo/download/${fileUrl}`, {
        responseType: 'blob', // Importante para recibir el archivo como blob
      });

      // Crear un enlace temporal para la descarga del archivo
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileUrl.split('/').pop()); // Usar el nombre del archivo para la descarga
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.error('Error al descargar el archivo:', error);
      toast({
        title: "Error",
        description: "No se pudo descargar el archivo.",
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

  const rechazada = selected_fact?.estatus?.toLowerCase().trim() === 'rechazada';
  const pendienteDePago = selected_fact?.estatus?.toLowerCase().trim() === 'pendiente de pago';
  const deshabilitado = rechazada || pendienteDePago;


  return (
    <div className='overflow-auto'>
      <AlertDialog open={open}>
        <AlertDialogContent className="max-w-[90vw] overflow-auto h-[95vh]">


          <div className="flex justify-between items-center max-w-[85vw]">
            <div>
              <AlertDialogTitle>{selected_fact?.toma.codigo_toma}</AlertDialogTitle>
              <AlertDialogDescription>Detalles de la factibilidad.</AlertDialogDescription>
            </div>
            <Button className="ml-auto" onClick={handleDownload}>Constancia de factibilidad</Button>
          </div>

          <div className='h-[80vh] max-w-[85vw]'>
            <div className='flex gap-3 shadow-md p-2 align-top rounded-md overflow-auto h-[70px] items-center'>
              {/* <p className='whitespace-nowrap p-1'><strong>Folio:</strong> {selected_fact?.contrato.folio_solicitud}</p> */}
              <p className='flex space-x-2 whitespace-nowrap '>
                <strong>Servicio:</strong>
                <p>AGUA</p>
              </p>

              <p className='whitespace-nowrap'>
                <strong>Factibilidad servicio:</strong>
                <select
                  defaultValue={factibilidadAlcantarillado}
                  value={factibilidadAlcantarillado}
                  onChange={(e) => handleFactibilidadChange(e, setFactibilidadAlcantarillado)}
                  className={`ml-2 border rounded p-1 ${errorMessages.factibilidadAlcantarillado ? 'border-red-500' : ''}`}
                  disabled={deshabilitado}
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="no factible">No Factible</option>
                  <option value="factible">Factible</option>
                </select>
                {errorMessages.factibilidadAlcantarillado && (
                  <p className="text-red-500 text-sm">{errorMessages.factibilidadAlcantarillado}</p>
                )}

              </p>
              <p className='whitespace-nowrap'>
                <strong>Derechos de conexión:</strong>
                <input
                  type="number"
                  value={derechosConexion}
                  onChange={(e) => setDerechosConexion(e.target.value)}
                  className={`ml-2 border rounded p-1 ${errorMessages.derechosConexion ? 'border-red-500' : ''}`}
                  disabled={deshabilitado}
                />
                {errorMessages.derechosConexion && (
                  <p className="text-red-500 text-sm">{errorMessages.derechosConexion}</p>
                )}
              </p>



            </div>

            <div className='rounded-md mt-4 '>
              {/* Botón para seleccionar archivo */}
              <div className='flex w-full pr-2'>
                {/* Input oculto para subir archivos */}
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }} // Mantenerlo oculto
                  onChange={handleFileChange} // Manejar la subida de archivos
                  accept=".pdf" // Aceptar solo PDFs
                  disabled={deshabilitado}
                />

                {/* Botón personalizado para abrir el explorador de archivos */}
                <div className='flex gap-2'>
                  <div
                    className={`mb-3 underline text-blue-500 w-[260px] h-[4vh] gap-2 flex items-center py-2 rounded-md cursor-pointer ease-in duration-100 ${fileStatus === 'success' ? 'bg-green-100 hover:bg-green-200' : fileStatus === 'error' ? 'bg-red-100 hover:bg-red-200' : 'hover:text-[17px]'}`}
                    onClick={triggerFileInput} // Abrir el explorador de archivos al hacer clic
                  >
                    <p>{documentos?.length > 0 ? `${documentos?.length} archivo(s) seleccionado(s)` : 'Seleccionar archivo(s)'}</p>
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


                </div>

              </div>
              <div className="bg-green-100 p-4 rounded-lg shadow-md w-full min-w-[300px] mb-5">
                <h2 className="text-sm font-semibold mb-4">Archivos:</h2> {/* Ajusta el tamaño del texto según sea necesario */}
                {archivos?.length > 0 ? (
                  <ul className="list-disc list-inside space-y-2">
                    {archivos.map((file) => (
                      <li key={file.id} className="flex items-center justify-between">
                        <button
                          onClick={() => handleDownloadUrl(file.url)}
                          className="text-blue-600 hover:underline"
                        >
                          {truncateFileName(file.url.split('/').pop())} {/* Mostrar el nombre del archivo truncado */}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600 text-sm">No hay archivos disponibles.</p>
                )}
              </div>


              <div className='max-w-[85vw] mb-[20px]' >
                <p className='whitespace-nowrap'>
                  <strong>Comentario:</strong>
                </p>
                <input
                  type="text"
                  defaultValue={comentarios}
                  value={comentarios}
                  onChange={(e) => setComentarios(e.target.value)}
                  className=' w-full h-[50px] border rounded p-1'
                  disabled={deshabilitado}
                  placeholder='Agregue un comentario'
                />
              </div>
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
            <div className='flex justify-end gap-1 my-5 pb-5'>
              <Button disabled={deshabilitado} className='bg-green-500 hover:bg-green-600 ' variant={"default"} onClick={() => handleUpdate("pendiente de pago")}>Aceptar</Button>
              <Button disabled={deshabilitado} className='bg-red-500 hover:bg-red-600' variant={"default"} onClick={() => handleUpdate("rechazada")}>Rechazar</Button>
              <AlertDialogCancel onClick={handleCancel}>Cancelar</AlertDialogCancel>
            </div>

          </div>


          <AlertDialogFooter>

          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ModalVerFactibilidadMonitorAgua;
