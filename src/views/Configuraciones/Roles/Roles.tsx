import React from 'react'
import RolTable from '../../../components/Tables/Components/RolTable'
import RolForm from '../../../components/Forms/RolForm'
import { ContextProvider } from '../../../contexts/ContextRol'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Permisos from './Permisos'

const Roles = () => {
    const opciones = [
        {
            titulo: "Formulario",
            componente: <RolForm />
        },
        {
            titulo: "Permisos",
            componente: <Permisos />
        },
    ]

    return (
        <div>
            <ContextProvider>
                <div className='w-full max-h-[75vh] mt-[10px]'>
                    {/*Contenedor principal*/}
                    <div className='flex gap-2 '>

                        {/*Datatable*/}
                        <div className='w-[35%] rounded-md border border-border p-4 overflow-auto h-[88vh]'>
                            <RolTable />
                        </div>

                        {/*VISTAS DEL TAB*/}
                        <div className='w-[65%] rounded-md border border-border h-[88vh] p-4 overflow-auto '>
                            <Tabs defaultValue="Formulario" className="">
                                <TabsList>
                                    {opciones.map((opcion, index) => (
                                        <>
                                            <TabsTrigger value={opcion.titulo} key={index}>{opcion.titulo}</TabsTrigger>
                                        </>
                                    ))}
                                </TabsList>
                                {opciones.map((opcion, index) => (
                                    <>
                                        <TabsContent value={opcion.titulo} key={index}>{opcion.componente}</TabsContent>
                                    </>
                                ))}
                            </Tabs>
                        </div>

                    </div>
                </div>
            </ContextProvider>
        </div>
    )
}

export default Roles