import React from 'react'
import OperadorTable from '../../../components/Tables/Components/OperadorTable'
import OperadorForm from '../../../components/Forms/InformacionDeOperdorForm'
import RolForm from '../../../components/Forms/RolForm'
import Permisos from '../Roles/Permisos'
import { ContextProvider } from '../../../contexts/ContextOperador'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const Roles = () => {
    const opciones = [
        {
            titulo: "Informacion de usuario",
            componente: <OperadorForm />
        },
        {
            titulo: "Roles",
            componente: ""
        },
        {
            titulo: "Permisos",
            componente: ""
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
                            <OperadorTable />
                        </div>

                        {/*VISTAS DEL TAB*/}
                        <div className='w-[65%] rounded-md border border-border h-[88vh] p-4 overflow-auto '>
                            <Tabs defaultValue="Permisos" className="">
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