import React from 'react';
import { Mapa } from '../../components/ui/Mapa';
import { TrashIcon, ContainerIcon, PlusIcon, Pencil2Icon, ReaderIcon } from '@radix-ui/react-icons';
import IconButton from '../../components/ui/IconButton';
import { Checkbox } from "@/components/ui/checkbox"
import Mapa2 from '../../components/ui/Mapa2';
import { Mapa3 } from '../../components/ui/Mapa3';

const Poligonos = () => {


    return (
        <div className='flex gap-2 items-center justify-center h-full '>
            {/*Contenedor del menu de poligonos*/}
            <div className='h-full w-[30%] overflow-auto'>
                {/*Boton Superior*/}
                <div>
                    <p>Boton para seleccionar todos</p>
                </div>
                {/*Menu de poligonos*/}
                <div className='bg-principal h-[200px] rounded-md border-border border'>
                    {/*superior*/}
                    <div className='h-[50px] border border-border w-full p-4 flex items-center justify-end rounded-tl-md rounded-tr-md'>
                        <div>
                            <IconButton>
                                <ContainerIcon className="w-[20px] h-[20px]" />
                                <PlusIcon className="ml-[10px] w-[20px] h-[20px]" />
                            </IconButton>
                        </div>
                    </div>
                    {/*Cuerpo*/}
                    <div className=' h-full'>
                        {/*contenedor ruta*/}
                        <div>
                            {/*Ruta*/}
                            <div className=' h-[50px] w-full flex items-center p-2'>
                                <div className='w-[50%]'>
                                    <p>Ruta 1</p>
                                </div>
                                <div className='w-[50%]'>
                                    <div className='flex items-center justify-end gap-2'>
                                        <Checkbox id="terms" />
                                        <div className='flex'>
                                            <IconButton>
                                                <TrashIcon className="w-[20px] h-[20px]" />
                                            </IconButton>
                                            <IconButton>
                                                <Pencil2Icon className="w-[18px] h-[18px]" />
                                            </IconButton>
                                        </div>

                                        <div className='ml-[40px]'>
                                            <IconButton>
                                                <ReaderIcon className="w-[17px] h-[17px]" />
                                                <PlusIcon className="w-[17px] h-[17px]" />
                                            </IconButton>
                                        </div>
                                    </div>
                                    <div>

                                    </div>
                                </div>
                            </div>
                            {/*Libros*/}
                        </div>
                    </div>
                </div>
            </div>
            {/*Contenedor del mapa*/}
            <div className=' h-full w-[70%]'>
                <Mapa3 />
            </div>
        </div>
    );
};

export default Poligonos;
