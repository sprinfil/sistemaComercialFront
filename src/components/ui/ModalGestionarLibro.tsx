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
  const tomasSecuenciaRef = useRef<HTMLUListElement>(null);
  const tomasSinSecuenciaRef = useRef<HTMLUListElement>(null);
  const [changeTab, setChangeTab] = useState(false);
  const mapContainerStyles = { width: '100%', height: '100%' };
  const { libroCoords } = useFormatCoords(libro?.polygon?.coordinates)
  useSortable(tomasSecuenciaRef, (evt) => {
    console.log('Orden actualizado:', evt.oldIndex, evt.newIndex);
  });

  useSortable2(tomasSinSecuenciaRef, (evt) => {
    console.log('Orden actualizado:', evt.oldIndex, evt.newIndex);
  });

  const { center } = useGetCenterMap(libro?.polygon?.coordinates)

  const zoom = 16;
  const polygonPath = [
    { lat: 19.433, lng: -99.135 },
    { lat: 19.435, lng: -99.132 },
    { lat: 19.431, lng: -99.128 },
    { lat: 19.429, lng: -99.133 }
  ];

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
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
                                {libro?.tomas?.map(toma => (
                                  <li className='select-none my-3 border py-4 rounded-md flex items-center px-3 cursor-pointer'>
                                    {toma?.codigo_toma}
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
                                {libro?.tomas?.map(toma => (
                                  <li className='select-none my-3 border py-4 rounded-md flex items-center px-3 cursor-pointer'>
                                    {toma?.codigo_toma}
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
            <p>fdsf</p>
                    <Polygon
                      paths={libroCoords}
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
