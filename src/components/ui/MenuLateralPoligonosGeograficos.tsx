import React, { useState } from 'react';
import { Mapa } from '../../components/ui/Mapa';
import { TrashIcon, ContainerIcon, PlusIcon, Pencil2Icon, ReaderIcon } from '@radix-ui/react-icons';
import IconButton from '../../components/ui/IconButton';
import { Checkbox } from "@/components/ui/checkbox"
import Mapa2 from '../../components/ui/Mapa2';
import { Mapa3 } from '../../components/ui/Mapa3';
import { Icon } from 'lucide-react';

const MenuLateralPoligonosGeograficos = () => {

    const [openContainer, setOpenContainer] = useState(false);

    function toggle_open(id_container) {
        setOpenContainer(!openContainer);
        let container = document.getElementById(id_container);
        container?.classList.toggle("scale-y-100");
        container?.classList.toggle("scale-y-0");
        container?.classList.toggle("max-h-0");
    }

    return (
        <>
            <div className='h-full w-full overflow-auto mt-[10px]'>
                {/*Menu de poligonos*/}
                <div className='bg-principal border-border border'>
                    {/*superior*/}
                    <div className='h-[50px] w-full p-2 flex rounded-tl-md rounded-tr-md'>
                        <div className='w-[90%] text-[12px] flex items-center'>
                            <p>Poligonos Geográficos</p>
                        </div>
                        <div className='w-[10%] flex items-center justify-end'>
                            <IconButton>
                                <ContainerIcon className="w-[17px] h-[17px]" />
                                <PlusIcon className="ml-[2px] w-[17px] h-[17px]" />
                            </IconButton>
                        </div>
                    </div>
                    {/*Cuerpo*/}
                    <div className=' h-full'>
                        {/*contenedor rutas y libros*/}
                        <div>
                            <div className='w-full flex items-center border border-b-border relative '>
                                <div className='w-[45%]  py-1 px-2 flex items-center gap-2 ml-[10px] cursor-pointer transition-all duration-200 hover:bg-muted' onClick={() => { toggle_open("Ruta1") }}>
                                    <p>Ruta 1</p>
                                </div>
                                <div className='w-[55%]'>
                                    <div className=' flex items-center justify-end gap-2 '>
                                        <div className='ml-[40px] flex items-center'>
                                            <Checkbox id="terms" className="mr-[10px]" />
                                            <IconButton>
                                                <Pencil2Icon />
                                            </IconButton>
                                            <IconButton>
                                                <ReaderIcon className="w-[17px] h-[17px]" />
                                                <PlusIcon className="w-[17px] h-[17px]" />
                                            </IconButton>
                                            <IconButton>
                                                <TrashIcon className='w-[17px] h-[17px] text-red-500' />
                                            </IconButton>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={` w-full relative transition-all ease duration-300 overflow-hidden scale-y-100`} id='Ruta1'>
                                <div className='bg-primary w-[10px] h-full absolute'></div>
                               
                                    <div className='flex w-full'>
                                        <div className='w-full pl-[40px] flex items-center gap-2'>
                                            <p>Libro 1</p>

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

                                    <div className='flex w-full'>
                                        <div className='w-full pl-[40px] flex items-center gap-2'>
                                            <p>Libro 1</p>

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

                                    <div className='flex w-full'>
                                        <div className='w-full pl-[40px] flex items-center gap-2'>
                                            <p>Libro 1</p>

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
                                    <div className='flex w-full'>
                                        <div className='w-full pl-[40px] flex items-center gap-2'>
                                            <p>Libro 1</p>

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
                                    <div className='flex w-full'>
                                        <div className='w-full pl-[40px] flex items-center gap-2'>
                                            <p>Libro 1</p>

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
                                    <div className='flex w-full'>
                                        <div className='w-full pl-[40px] flex items-center gap-2'>
                                            <p>Libro 1</p>

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
                                    <div className='flex w-full'>
                                        <div className='w-full pl-[40px] flex items-center gap-2'>
                                            <p>Libro 1</p>

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
                                    <div className='flex w-full'>
                                        <div className='w-full pl-[40px] flex items-center gap-2'>
                                            <p>Libro 1</p>

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
                                    <div className='flex w-full'>
                                        <div className='w-full pl-[40px] flex items-center gap-2'>
                                            <p>Libro 1</p>

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
                                    <div className='flex w-full'>
                                        <div className='w-full pl-[40px] flex items-center gap-2'>
                                            <p>Libro 1</p>

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
                                    <div className='flex w-full'>
                                        <div className='w-full pl-[40px] flex items-center gap-2'>
                                            <p>Libro 1</p>

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
                                    <div className='flex w-full'>
                                        <div className='w-full pl-[40px] flex items-center gap-2'>
                                            <p>Libro 1</p>

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
                                    <div className='flex w-full'>
                                        <div className='w-full pl-[40px] flex items-center gap-2'>
                                            <p>Libro 1</p>

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
                            </div>

                            {/*Ruta*/}
                        </div>
                 
                    


                    </div>
                </div>
            </div>
        </>
    )
}

export default MenuLateralPoligonosGeograficos