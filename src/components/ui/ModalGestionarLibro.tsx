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
import { useSortable, useSortable2, click, useGetCenterMap, useFormatCoords, updateSecuencia, moverPosicionLibro, initMapa } from '../../lib/Services/ModalGestionarLibroService';
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
import { GoogleMap, LoadScript, Polygon, Marker } from "@react-google-maps/api";
import { CheckCircledIcon, Cross2Icon, Pencil1Icon, Pencil2Icon } from '@radix-ui/react-icons';
import IconButton from './IconButton';
import { Check } from 'lucide-react';
import Loader from './Loader';
import { Skeleton } from './skeleton';
import { useToast } from './use-toast';
import { Toast, ToastAction } from '@radix-ui/react-toast';
interface ModalProps {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
  onConfirm: () => void;
}

const ModalGestionarLibro: React.FC<ModalProps> = ({ trigger, title, description, children, onConfirm, libro, setRutas, rutas }) => {
  const { toast } = useToast();
  const [changeTab, setChangeTab] = useState(false)//SIRVE PARA REFRESCAR EL COMPONENTE
  const [triggerClick, setTriggerClick] = useState(false);
  const tomasSecuenciaRef = useRef<HTMLUListElement>(null);//REF DE SEUCUENCIA 
  const tomasSinSecuenciaRef = useRef<HTMLUListElement>(null);//REF DE TOMAS SIN SECUENCIA
  const [secuencia, setSecuencia] = useState([]);
  const [secuenciaCero, setSecuenciaCero] = useState([]);
  const [secuenciaReal, setSecuenciaReal] = useState([]);
  const [secuenciaPrincipal, setSecuenciaPrincipal] = useState([]);
  const [libroCoords, setLibroCoords] = useState([]);
  const [editandoSecuencia, setEditandoSecuencia] = useState(false);
  const [loadingUpdateSecuencia, setLoadingUpdateSecuencia] = useState(false);
  const mapRef = useRef(null);
  const { center } = useGetCenterMap(libro?.polygon?.coordinates) //CENTRO DEL MAPA

  const [secuenciaTemp, setSecuenciaTemp] = useState([]);
  const [secuenciaCeroTemp, setSecuenciaCeroTemp] = useState([]);
  useEffect(() => {
    if (libro?.secuencias[0] != null) {
      setSecuencia(libro?.secuencias[0]?.ordenes_secuencia);
      setSecuenciaCero(libro?.secuencias[0]?.ordenes_secuencia_cero)
      setSecuenciaTemp(libro?.secuencias[0]?.ordenes_secuencia);
      setSecuenciaCeroTemp(libro?.secuencias[0]?.ordenes_secuencia_cero);
      const { newCoords } = useFormatCoords(libro?.polygon?.coordinates)//COORDENADAS DEL LIBRO
      setLibroCoords(newCoords);
    }
  }, [triggerClick])

  useEffect(() => {
    if (mapRef.current) {
      initMapa(libroCoords, center, libro?.secuencias[0]?.ordenes_secuencia);
    }
  }, [mapRef.current])

  useEffect(() => {
    if (mapRef.current) {
      initMapa(libroCoords, center, libro?.secuencias[0]?.ordenes_secuencia);
    }

  }, [libro?.secuencias[0]?.ordenes_secuencia])

  useEffect(() => {
    //localStorage.setItem("secuenciaTemp", JSON.stringify(libro?.secuencias[0]?.ordenes_secuencia));
    setSecuenciaPrincipal(libro?.secuencias[0])
  }, [changeTab])

  useSortable(tomasSecuenciaRef, (evt) => {
    console.log(evt)
    setSecuenciaReal(prev => {
      const nuevaSecuencia = [...prev];

      const oldIndex = evt.oldIndex + 1;
      const newIndex = evt.newIndex + 1;

      console.log(oldIndex)
      console.log(newIndex)

      const elementoMovido = nuevaSecuencia.find(orden => orden.numero_secuencia === oldIndex);

      if (elementoMovido) {
        nuevaSecuencia.forEach(orden => {
          if (orden.numero_secuencia === oldIndex) {
            orden.numero_secuencia = newIndex;
          } else if (
            oldIndex < newIndex &&
            orden.numero_secuencia > oldIndex &&
            orden.numero_secuencia <= newIndex
          ) {
            orden.numero_secuencia -= 1;
          } else if (
            oldIndex > newIndex &&
            orden.numero_secuencia < oldIndex &&
            orden.numero_secuencia >= newIndex
          ) {
            orden.numero_secuencia += 1;
          }
        });
      }

      //const secuenciaOrdenada = nuevaSecuencia.sort((a, b) => a.numero_secuencia - b.numero_secuencia);
      return nuevaSecuencia;
    });

  });

  useSortable2(tomasSinSecuenciaRef, (evt) => {
    console.log('Orden actualizado:', evt.oldIndex + 1, evt.newIndex + 1);

    const nuevaOrdenId = evt.item.id;
    const newIndex = evt.newIndex + 1;
    if (evt.to.id == "secuencia") {
      let nuevaTomaSecuencia = secuenciaCero.find(secuencia => secuencia?.id == nuevaOrdenId);
      nuevaTomaSecuencia = { ...nuevaTomaSecuencia, numero_secuencia: newIndex };
      setSecuenciaReal(prev => {
        let nuevaSecuencia = [...prev];

        nuevaSecuencia.map(secuenciaTemp => {
          if (newIndex <= secuenciaTemp.numero_secuencia) {
            let secuencia = parseFloat(secuenciaTemp.numero_secuencia) + 1;
            secuenciaTemp.numero_secuencia = secuencia;
          }
        })
        nuevaSecuencia.push(nuevaTomaSecuencia);
        return nuevaSecuencia;
      })
    }
  });

  useEffect(() => {
    setSecuenciaReal(secuencia);
  }, [secuencia])

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger onClick={() => { setTriggerClick(!triggerClick) }} >{trigger}</AlertDialogTrigger>
        <AlertDialogContent className="min-w-[98vw] min-h-[98vh] max-h-[98vh] flex">
          <div className='flex-grow relative'>
            <p className='font-medium text-[25px]'>{title}</p>
            <div className='gap-3'>
              <div className='min-h-[73vh]'>
                <Tabs defaultValue="general" className="w-full" onClick={() => { setChangeTab(!changeTab); }}>
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
                            <div className='flex gap-2 items-center ml-7'>
                              <p>Secuencia</p>
                              <div>
                                {
                                  editandoSecuencia ?
                                    <>
                                      <div className='flex gap-3 '>
                                        <div onClick={async () => {
                                          try {
                                            await updateSecuencia(secuenciaPrincipal, secuenciaReal, setLoadingUpdateSecuencia, setEditandoSecuencia, setRutas, setSecuencia);
                                          } catch (e) {
                                            console.log(e)
                                            toast({
                                              title: "Algo salió mal",
                                              description: "Hubo un error al actualiza la secuencia",
                                              action: <ToastAction altText='Aceptar'></ToastAction>
                                            })
                                          }
                                          //initMapa(libroCoords, center, libro?.secuencias[0]?.ordenes_secuencia);
                                        }}>
                                          <IconButton>
                                            <div className={`text-green-500 select-none flex gap-2 items-center underline ${loadingUpdateSecuencia == true ? "pointer-events-none" : ""}`}>
                                              {
                                                loadingUpdateSecuencia &&
                                                <div className='h-6 w-6 flex '>
                                                  <div class="loader"></div>
                                                </div>
                                              }
                                              <p>Aplicar</p>
                                              <CheckCircledIcon className='text-green-500' />
                                            </div>
                                          </IconButton>
                                        </div>


                                        {/* <IconButton>
                                          <div
                                            className='flex gap-2 items-center underline text-red-500'
                                            onClick={async () => {
                                              setLoadingUpdateSecuencia(true);
                                              await new Promise(resolve => setTimeout(resolve, 5));
                                              setSecuencia(JSON.parse(localStorage.getItem("secuenciaTemp")));
                                              setSecuenciaReal(JSON.parse(localStorage.getItem("secuenciaTemp")));
                                              setSecuenciaCero(libro?.secuencias[0]?.ordenes_secuencia_cero);
                                              setEditandoSecuencia(false);
                                              setLoadingUpdateSecuencia(false);
                                            }}
                                          >
                                            <p>Cancelar</p>
                                            <Cross2Icon />
                                          </div>
                                        </IconButton> */}
                                        
                                      </div>
                                    </>
                                    :
                                    <>
                                      <div onClick={() => { setEditandoSecuencia(!editandoSecuencia) }}>
                                        <IconButton>
                                          <div className='text-blue-500 flex gap-2 items-center underline select-none '>
                                            <p>Editar</p>
                                            <Pencil2Icon />
                                          </div>
                                        </IconButton>
                                      </div>
                                    </>
                                }
                              </div>
                            </div>
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
                          <div className='flex w-full gap-3'>
                            {
                              !loadingUpdateSecuencia ?
                                <>
                                  <div className='flex flex-col  mt-3'>
                                    {
                                      secuenciaReal?.map((orden, index) => (
                                        <>
                                          <div className=' h-[84.5px] mb-[10px] flex items-center justify-center'>
                                            <p>{index + 1}</p>
                                          </div>
                                        </>
                                      ))
                                    }
                                  </div>

                                  <ul ref={tomasSecuenciaRef} id='secuencia' className={`w-full ${editandoSecuencia == true ? "" : "pointer-events-none"}`} >
                                    {
                                      <>
                                        {secuencia?.map((orden, index) => (
                                          <>
                                            <li className={`shadow-md gap-4 select-none my-3 border py-4 rounded-md flex items-center px-3 cursor-pointer relative
                                          ${editandoSecuencia == true ? "border-green-500" : ""}
                                        `}>
                                              <p className={`bg-orange-500 text-white rounded-full px-3 py-1`}>{orden?.numero_secuencia}</p>
                                              <div className='flex flex-col'>
                                                <p>{orden?.toma?.codigo_toma}</p>
                                                <p>{orden?.toma?.clave_catastral}</p>
                                              </div>

                                              <input
                                                defaultValue={orden?.numero_secuencia}
                                                type="number"
                                                className='bg-background border rounded-md w-[20%] outline-none p-2 absolute right-2'
                                                placeholder='Posicion'
                                                onKeyDown={(e) => {
                                                  if (e.key === 'Enter') {
                                                    const nuevaPosicion = e.target.value;
                                                    if (nuevaPosicion > secuencia.length || nuevaPosicion < 0) {
                                                      toast({
                                                        title: "Fuera del tango de posiciones",
                                                        action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
                                                      })

                                                    } else {
                                                      moverPosicionLibro(nuevaPosicion, secuencia, setSecuencia, orden?.numero_secuencia, setLoadingUpdateSecuencia, setRutas, libro?.id);
                                                    }
                                                  }
                                                }}
                                              />
                                            </li>
                                          </>
                                        ))}
                                      </>
                                    }
                                  </ul>
                                </>
                                :
                                <>
                                  {/* <Skeleton className='w-full h-[60vh]' /> */}
                                  <div className='w-full flex h-[60vh] items-center justify-center'>
                                    <p>  Cargando ...</p>
                                  </div>
                                </>
                            }
                          </div>
                        </div>
                      </div>

                      <div className='w-[50%] max-h-[70vh] overflow-auto'>
                        <div className='flex justify-between items-center'>
                          <div className='h-10 flex items-center px-3'>
                            <p>Tomas sin secuencia</p>
                          </div>
                        </div>
                        <div className='max-h-[60vh] overflow-auto w-full px-3  no-scrollbar'>
                          <ul ref={tomasSinSecuenciaRef} id='sinSecuencia' className={`w-full ${editandoSecuencia == true ? "" : "pointer-events-none"}`} >
                            {
                              <>
                                {secuenciaCero?.map((orden, index) => (
                                  <>
                                    <li id={orden?.id}
                                      className={`shadow-md select-none my-3 border py-4 rounded-md flex flex-col px-3 cursor-pointer relative
                                          ${editandoSecuencia == true ? "border-green-500" : ""}
                                        `}>
                                      <p>{orden?.toma?.codigo_toma}</p>
                                      <p>{orden?.toma?.clave_catastral}</p>
                                    </li>
                                  </>
                                ))}
                              </>
                            }
                          </ul>
                        </div>
                      </div>
                      <div className='w-[100%]'>
                        <div ref={mapRef} id='mapa_google' className='w-full h-[70vh]'></div>
                      </div>
                    </div>
                    <div className='w-[50%] absolute right-0 flex justify-end py-2'>
                      <div className='flex gap-2'>

                        <div className='flex items-center  gap-3'>
                          <div className='bg-green-500 w-5 h-5'></div>
                          <p>Primero</p>
                        </div>

                        <div className='flex items-center  gap-3'>
                          <div className='bg-blue-950 w-5 h-5'></div>
                          <p>Último</p>
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
