import React, { useEffect, useState } from 'react';
import { Mapa } from '../../components/ui/Mapa';
import { TrashIcon, ContainerIcon, PlusIcon, Pencil2Icon, ReaderIcon } from '@radix-ui/react-icons';
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

const MenuLateralPoligonosGeograficos = () => {

    const [effect, setEffect] = useState(false);
    const { setRutas, rutas } = useStateContext();

    function toggle_open(id_container) {
        let container = document.getElementById(id_container);
        container?.classList.toggle("scale-y-100");
        container?.classList.toggle("scale-y-0");
        container?.classList.toggle("max-h-0");
    }


    useEffect(() => {
        getRutas()
    }, []);

    const getRutas = async () => {
        try {
            const response = await axiosClient.get("/ruta");
            setRutas(response.data.data);
            //console.log(response.data.data)
        } catch (error) {
            console.error("Error fetching rutas:", error.response?.data?.message || error.message);
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

    return (
        <>
            <div className='h-full w-full overflow-auto mt-[10px] px-2'>
                {/*Menu de poligonos*/}
                <div className='bg-principal border-border border'>
                    {/*superior*/}
                    <div className='h-[50px] w-full p-2 flex rounded-tl-md rounded-tr-md'>
                        <div className='w-[90%] text-[12px] flex items-center'>
                            <p>Poligonos Geográficos</p>
                        </div>
                        <div className='w-[10%] flex items-center justify-end'>
                            <a title='Crear Ruta'>
                                <SheetRuta
                                    trigger={
                                        <IconButton>
                                            <ContainerIcon className="w-[17px] h-[17px]" />
                                            <PlusIcon className="ml-[2px] w-[17px] h-[17px]" />
                                        </IconButton>
                                    }
                                    updateData={getRutas}
                                />
                            </a>


                        </div>
                    </div>
                    {/*Cuerpo*/}
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
                                                        <Checkbox id="terms" className="mr-[10px]" />
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

                                                        <Modal
                                                            button={
                                                                <IconButton>
                                                                    <TrashIcon className='w-[17px] h-[17px] text-red-500' />
                                                                </IconButton>
                                                            }
                                                            method={delete_ruta}
                                                            delete_id={ruta.id}
                                                        />

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
                                                            <Checkbox id="terms" className="mr-[10px]" />
                                                            <IconButton>
                                                                <Pencil2Icon />
                                                            </IconButton>
                                                            <IconButton>
                                                                <TrashIcon className='w-[17px] h-[17px] text-red-500' />
                                                            </IconButton>
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
                </div>
            </div>
        </>
    )
}

export default MenuLateralPoligonosGeograficos