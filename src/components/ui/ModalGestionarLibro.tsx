import React, { useEffect, useRef, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiMicrosoftexcel } from "react-icons/si";
// Cherrypick default plugins
import Sortable, { AutoScroll } from 'sortablejs/modular/sortable.core.esm.js';
import { useSortable, useSortable2, click, useGetCenterMap, useFormatCoords } from '../../lib/Services/ModalGestionarLibroService';
import { RiFileDownloadFill } from "react-icons/ri";
import { FaFileImport } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MdMoreHoriz } from "react-icons/md";
import { GoogleMap, LoadScript, Polygon } from "@react-google-maps/api";

interface ModalProps {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
  onConfirm: () => void;
}


const ModalGestionarLibro: React.FC<ModalProps> = ({ trigger, title, description, children, onConfirm, libro }) => {
  const [changeTab, setChangeTab] = useState(false)//SIRVE PARA REFRESCAR EL COMPONENTE
  const [triggerClick, setTriggerClick] = useState(false);
  const tomasSecuenciaRef = useRef<HTMLUListElement>(null);//REF DE SEUCUENCIA 
  const tomasSinSecuenciaRef = useRef<HTMLUListElement>(null);//REF DE TOMAS SIN SECUENCIA
  const [secuencia, setSecuencia] = useState([]);

  useEffect(() => {
    setSecuencia(libro?.secuencias[0]?.ordenes_secuencia);
  }, [triggerClick])

  useSortable(tomasSecuenciaRef, (evt) => {
    console.log(secuencia);
    console.log('Orden actualizado:', evt.oldIndex + 1, evt.newIndex + 1); // Mostrar los índices como si empezaran en 1

    // Actualizar el estado sin mutar el arreglo original
    setSecuencia(prev => {
      // Crear una copia del arreglo anterior
      const nuevaSecuencia = [...prev];

      // Convertir los índices de 0-based a 1-based
      const oldIndex = evt.oldIndex + 1;
      const newIndex = evt.newIndex + 1;

      // Encontrar el elemento que se movió
      const elementoMovido = nuevaSecuencia.find(orden => orden.numero_secuencia === oldIndex);

      if (elementoMovido) {
        // Actualizar el numero_secuencia del elemento movido
        nuevaSecuencia.forEach(orden => {
          if (orden.numero_secuencia === oldIndex) {
            orden.numero_secuencia = newIndex;
          } else if (
            oldIndex < newIndex &&
            orden.numero_secuencia > oldIndex &&
            orden.numero_secuencia <= newIndex
          ) {
            // Ajustar las secuencias intermedias si el elemento se movió hacia adelante
            orden.numero_secuencia -= 1;
          } else if (
            oldIndex > newIndex &&
            orden.numero_secuencia < oldIndex &&
            orden.numero_secuencia >= newIndex
          ) {
            // Ajustar las secuencias intermedias si el elemento se movió hacia atrás
            orden.numero_secuencia += 1;
          }
        });
      }

      return nuevaSecuencia;
    });
  });

  useEffect(() => {
    console.log(secuencia)
  }, [secuencia])


  useSortable2(tomasSinSecuenciaRef, (evt) => {
    console.log('Orden actualizado:', evt.oldIndex, evt.newIndex); //SORTABLE SIN SECUENICA
  });

  const mapContainerStyles = { width: '100%', height: '100%' };//ESTILOS DEL MAPA

  const { center } = useGetCenterMap(libro?.polygon?.coordinates) //CENTRO DEL MAPA

  const zoom = 16; //ZOOM DEL MAPA

  const { newCoords } = useFormatCoords(libro?.polygon?.coordinates)//COORDENADAS DEL LIBRO


  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger onClick={() => { setTriggerClick(!triggerClick) }} >{trigger}</AlertDialogTrigger>
        <AlertDialogContent className="min-w-[98vw] min-h-[98vh] max-h-[98vh] flex">
          <div className='flex-grow relative'>
            <p className='font-medium text-[25px]'>{title}</p>
            <div className='flex gap-3'>
              <div className='w-[50%] min-h-[73vh]'>
                <Tabs defaultValue="general" className="w-full" onClick={() => { setChangeTab(!changeTab) }}>
                  <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="secuencia">Secuencia</TabsTrigger>
                  </TabsList>
                  <TabsContent value="general">
                    <div className=''>
                      General
                    </div>
                    <div className='absolute right-2 bottom-2 flex gap-2'>
                      <AlertDialogCancel >Cancelar</AlertDialogCancel>
                      <AlertDialogAction>Aceptar</AlertDialogAction>
                    </div>
                  </TabsContent>
                  <TabsContent value="secuencia">
                    <div className='max-h-[70vh] overflow-auto flex gap-4'>
                      <div className='w-[50%] max-h-[70vh] overflow-auto'>
                        <div className='flex justify-between items-center'>
                          <div className='h-10 flex items-center justify-between w-full px-3'>
                            <p>Secuencia</p>
                            <DropdownMenu>
                              <DropdownMenuTrigger><MdMoreHoriz className='h-7 w-7 hover:bg-muted rounded-md' /></DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem><RiFileDownloadFill className='mr-4' /> Descargar Layout </DropdownMenuItem>
                                <DropdownMenuItem><FaFileImport className='mr-4' /> Importar</DropdownMenuItem>
                                <DropdownMenuItem><SiMicrosoftexcel className='mr-4' />Exportar</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                        <div className='max-h-[60vh] overflow-auto w-full px-3 no-scrollbar'>
                          <ul ref={tomasSecuenciaRef} id='secuencia'>
                            {
                              <>
                                {libro?.secuencias[0]?.ordenes_secuencia?.map(orden => (
                                  <li className='shadow-md gap-4 select-none my-3 border py-4 rounded-md flex items-center px-3 cursor-pointer relative'>
                                    <p className='bg-orange-500 text-white rounded-full px-3 py-1'>{orden?.numero_secuencia}</p>
                                    <p>{orden?.toma?.codigo_toma}</p>
                                    <input defaultValue={orden?.numero_secuencia} type="number" className='bg-background border rounded-md w-[20%] outline-none p-2 absolute right-2' placeholder='Posicion' />
                                  </li>
                                ))}
                              </>
                            }
                          </ul>
                        </div>
                      </div>

                      <div className='w-[50%] max-h-[70vh] overflow-auto'>
                        <div className='flex justify-between items-center'>
                          <div className='h-10 flex items-center px-3'>
                            <p>Tomas sin secuencia</p>
                          </div>
                        </div>
                        <div className='max-h-[60vh] overflow-auto w-full px-3  no-scrollbar'>
                          <ul ref={tomasSinSecuenciaRef} id='sinSecuencia'>
                            {
                              <>
                                {secuencia.map(orden => (
                                  <li className='select-none my-3 border py-4 rounded-md flex items-center px-3 cursor-pointer'>
                                    {orden?.toma?.codigo_toma}
                                  </li>
                                ))}
                              </>
                            }
                          </ul>
                        </div>
                      </div>

                    </div>
                    <div className='absolute right-2 bottom-2 flex gap-2'>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction>Aceptar</AlertDialogAction>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              <div className='w-[50%]'>
                <GoogleMap
                  mapContainerStyle={mapContainerStyles}
                  center={center}
                  zoom={zoom}
                >

                  <Polygon
                    paths={newCoords}
                    options={{
                      fillColor: "lightblue",
                      fillOpacity: 1,
                      strokeColor: "blue",
                      strokeOpacity: 1,
                      strokeWeight: 2
                    }}
                  />

                </GoogleMap>
              </div>
            </div>

          </div>
          <AlertDialogFooter>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ModalGestionarLibro;
