import React, { useEffect, useState } from 'react';
import { Mapa } from '../../components/ui/Mapa';
import { TrashIcon, ContainerIcon, PlusIcon, Pencil2Icon, ReaderIcon, EyeOpenIcon, EyeClosedIcon, UploadIcon, DotsVerticalIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import IconButton from '../../components/ui/IconButton';
import { Checkbox } from "@/components/ui/checkbox"
import Mapa2 from '../../components/ui/Mapa2';
import { Mapa3 } from '../../components/ui/Mapa3';
import { Icon } from 'lucide-react';
import SheetRuta from './SheetRuta';
import axiosClient from '../../axios-client';
import { useStateContext } from '../../contexts/ContextPoligonos';
import { count } from 'console';
import Modal from './Modal';
import SheetLibro from './SheetLibro';
import PoligonosZustand from '../../contexts/PoligonosZustand';
import { ModalImportarGeoJson } from './ModalImportarGeoJson';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ModalEliminarRuta from './ModalEliminarRuta';
import ModalGestionarLibro from './ModalGestionarLibro';

const MenuLateralPoligonosGeograficos = () => {
  const [effect, setEffect] = useState(false);
  const { setRutas, rutas } = useStateContext();
  const [open, set_open] = useState(false);
  //const [ loading_rutas, set_loading_rutas ] = useState(false);
  //const [libro_visibility, set_libro_visibility] = useState([]);
  //const [ruta_visibility, set_ruta_visibility] = useState([]);

  const { libro_visibility, set_libro_visibility, ruta_visibility, set_ruta_visibility, loading_import, loading_rutas, set_loading_rutas } = PoligonosZustand();

  function toggle_open(id_container) {
    let container = document.getElementById(id_container);
    container?.classList.toggle("scale-y-100");
    container?.classList.toggle("scale-y-0");
    container?.classList.toggle("max-h-0");
  }

  useEffect(() => {
    getRutas()
  }, []);

  useEffect(() => {
    let new_visibility = {};
    rutas.forEach(ruta => {
      ruta.libros.forEach(libro => {
        new_visibility[libro.id] = true;
      });
    });
    set_libro_visibility(new_visibility);

    new_visibility = {};

    rutas.forEach(ruta => {
      new_visibility[ruta.id] = true;
    });
    set_ruta_visibility(new_visibility);
  }, [rutas]);

  //useEffect((()=>{console.log(libro_visibility)}),[libro_visibility])

  const getRutas = async () => {
    set_loading_rutas(true);
    try {
      const response = await axiosClient.get("/ruta/secuencias");
      setRutas(response.data.data);
      //console.log(response.data.data)
      set_loading_rutas(false);
    } catch (error) {
      console.error("Error fetching rutas:", error.response?.data?.message || error.message);
      set_loading_rutas(false);
    }
  };

  const delete_ruta = async (ruta_id) => {
    try {
      const response = await axiosClient.delete(`/ruta/log_delete/${ruta_id}`);
      getRutas();
    } catch (error) {
      console.error("Error fetching rutas:", error.response?.data?.message || error.message);
    }
  }

  const delete_libro = async (libro_id) => {
    try {
      const response = await axiosClient.delete(`/libro/log_delete/${libro_id}`);
      getRutas();
    } catch (error) {
      console.error("Error fetching rutas:", error.response?.data?.message || error.message);
    }
  }

  //rutas
  const change_libro_visibility = (ruta) => {

    let new_visibility = { ...ruta_visibility };
    new_visibility[ruta.id] = !new_visibility[ruta.id];
    set_ruta_visibility(new_visibility);

    new_visibility = { ...libro_visibility };
    ruta.libros.forEach(libro => {
      new_visibility[libro.id] = ruta_visibility[ruta.id] == true ? false : true;
    });

    set_libro_visibility(new_visibility);

  }

  //libros
  const change_libro_visibility_by_libro_id = (libro_id) => {
    let new_visibility = { ...libro_visibility };
    new_visibility[libro_id] = !new_visibility[libro_id];
    set_libro_visibility(new_visibility);
  }

  const toggle_open_import = () => {
    set_open(!open);
  }

  const export_geojson = () => {
    axiosClient.get("/ruta/export_geojson")
      .then((response) => {
        const jsonData = JSON.stringify(response.data, null, 2);
        const url = window.URL.createObjectURL(new Blob([jsonData], { type: 'application/json' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'libroslapaz.geojson'); // nombre del archivo
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((response) => {
        console.log(response)
      })
  }

  return (
    <>
      <div className='h-full w-full overflow-auto px-2'>
        {/*Menu de poligonos*/}
        <div className='bg-principal border-border border'>
          {/*superior*/}
          <div className='h-[50px] w-full p-2 flex rounded-tl-md rounded-tr-md'>
            <div className='w-[90%] text-[12px] flex items-center'>
              <p>Polígonos Geográficos</p>
            </div>
            <div className='w-[10%] flex items-center justify-end'>
              <a title='Crear Ruta'>
                {/*
                                 <SheetRuta
                                    trigger={
                                        <IconButton>
                                            <ContainerIcon className="w-[17px] h-[17px]" />
                                            <PlusIcon className="ml-[2px] w-[17px] h-[17px]" />
                                        </IconButton>
                                    }
                                    updateData={getRutas}
                                />
                                */}

              </a>

              <ModalImportarGeoJson
                open={open}
                toggle_open={toggle_open_import}
                updateData={getRutas}
              />

              <DropdownMenu>
                <DropdownMenuTrigger><DotsHorizontalIcon /></DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={toggle_open_import}>Importar GeoJson</DropdownMenuItem>
                  <DropdownMenuItem onClick={export_geojson}>Exportar GeoJson</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/*Cuerpo*/}
          {
            loading_rutas &&
            <p className='p-2 bg-green-500 text-white sticky top-0 z-50'> Cargando Rutas ... </p>
          }
          {
            loading_import &&
            <p className='p-2 bg-blue-500 text-white sticky top-0 z-50'> Cargando Importación ... </p>
          }
          {
            rutas?.length == 0 && !loading_import && !loading_rutas &&
            <p className='p-2 text-red-500 sticky top-0 z-50'> Sin Polígonos. </p>
          }

          {rutas?.length > 0 &&
            <div className=' h-full'>
              {/*contenedor rutas y libros*/}
              {rutas.map((ruta, index) => {
                return (
                  <>
                    <div>
                      <div className='w-full flex items-center border border-b-border relative '>
                        <div style={{ backgroundColor: ruta.color ? ruta.color : '' }} className={` w-[10px] h-full absolute ${!ruta.color ? 'bg-primary' : ''}`}></div>
                        <div style={{ color: ruta.color ? ruta.color : '' }} className={`w-[45%] text-primary py-1 px-2 flex items-center gap-2 ml-[10px] cursor-pointer transition-all duration-200 hover:bg-muted`} onClick={() => { toggle_open(ruta.id) }}>
                          <p className='select-none'>{ruta.nombre}</p>
                        </div>
                        <div className='w-[55%]'>
                          <div className=' flex items-center justify-end gap-2 '>
                            <div className='ml-[40px] flex items-center'>
                              <div onClick={() => change_libro_visibility(ruta)}>
                                {
                                  ruta_visibility[ruta.id] &&
                                  <IconButton>
                                    <EyeOpenIcon />
                                  </IconButton>
                                }
                                {
                                  !ruta_visibility[ruta.id] &&
                                  <IconButton>
                                    <EyeClosedIcon />
                                  </IconButton>
                                }

                              </div>
                              <a title='Editar Ruta'>
                                <SheetRuta
                                  trigger={
                                    <IconButton>
                                      <Pencil2Icon />
                                    </IconButton>
                                  }
                                  updateData={getRutas}
                                  ruta={ruta}
                                />
                              </a>
                              {
                                /*
                                       <a title='Agregar libro'>
                                <SheetLibro
                                    trigger={
                                        <IconButton>
                                            <ReaderIcon className="w-[17px] h-[17px]" />
                                            <PlusIcon className="w-[17px] h-[17px]" />
                                        </IconButton>}
                                    id_ruta={ruta.id}
                                    updateData={getRutas}
                                />
                            </a>
                                */
                              }

                              {/*
                                                                <ModalEliminarRuta
                                                                    button={
                                                                        <IconButton>
                                                                            <TrashIcon className='w-[17px] h-[17px] text-red-500' />
                                                                        </IconButton>
                                                                    }
                                                                    method={delete_ruta}
                                                                    delete_id={ruta.id}
                                                                />
                                                            */}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={`ml-[5px] w-full relative transition-all ease duration-300 overflow-hidden max-h-0 scale-y-0`} id={`${ruta.id}`}>
                        <div style={{ backgroundColor: ruta.color ? ruta.color : '' }} className={` w-[10px] h-full absolute ${!ruta.color ? 'bg-primary' : ''}`}></div>
                        {
                          ruta.libros[0] == null &&
                          <p className='ml-[15px] text-red-500'>Sin libros.</p>
                        }
                        {ruta.libros.map((libro, index) => {
                          return (
                            <div className='flex w-full'>
                              <div className='w-full pl-[40px] flex items-center gap-2'>
                                <p>{libro.nombre}</p>
                              </div>
                              <div className='ml-[40px] flex items-center '>
                                <Checkbox checked={libro_visibility[libro.id]} id={ruta.id} className={`mr-[10px] ruta-${ruta.id}`} onClick={() => { change_libro_visibility_by_libro_id(libro.id) }} />
                                {/* <SheetLibro
                                  trigger={
                                    <IconButton>
                                      <Pencil2Icon />
                                    </IconButton>
                                  }
                                  updateData={getRutas}
                                  id_ruta={ruta.id}
                                  libro={libro}
                                /> */}

                                <ModalGestionarLibro
                                  trigger={
                                    <IconButton>
                                      <Pencil2Icon />
                                    </IconButton>}
                                  title={libro?.nombre}
                                  description='Opciones del libro'
                                  libro={libro}
                                  setRutas = {setRutas}
                                  rutas = {rutas}
                                />

                                {/*
                                    <ModalEliminarRuta
                                    button={
                                        <IconButton>
                                            <TrashIcon className='w-[17px] h-[17px] text-red-500' />
                                        </IconButton>
                                    }
                                    method={delete_libro}
                                    delete_id={libro.id}
                                />
                                */}

                              </div>
                            </div>
                          )
                        })}

                      </div>
                    </div>
                  </>
                )

              })}
            </div>
          }

        </div>
      </div>
    </>
  )
}

export default MenuLateralPoligonosGeograficos