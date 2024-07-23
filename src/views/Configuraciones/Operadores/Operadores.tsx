import React from 'react'
import OperadorTable from '../../../components/Tables/Components/OperadorTable'
import OperadorForm from '../../../components/Forms/InformacionDeOperdorForm'
import RolForm from '../../../components/Forms/RolForm'
import { ContextProvider } from '../../../contexts/ContextOperador'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useStateContext } from "../../../contexts/ContextOperador.tsx";
import { OperadoresRoles } from './OperadoresRoles.tsx'
import Permisos from '../Roles/Permisos.tsx'




const Roles = () => {



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
                            <TabsComponent />
                        </div>

                    </div>
                </div>
            </ContextProvider>
        </div>
    )
}

const InformacionDeOperdorForm = () => {

    const { accion } = useStateContext();

    return (
        <>
            {/*AQUI SE MANDA A LLAMAR EL FORMULARIO PERO CON LA VALIDACION SI ES EDITAR SE CAMBIE DE COLOR GG*/}
            {accion == "editar" ? (<div className='w-full rounded-md border border-primary h-[75vh] p-4 overflow-auto no-scrollbar'>
                <OperadorForm />
            </div>) : (<div className='w-full rounded-md border border-border h-[75vh] p-4 overflow-auto no-scrollbar'>
                <OperadorForm />
            </div>)}
        </>
    );
};

const TabsComponent = () => {

    const { setTab, tab } = useStateContext();

    const opciones = [
        {
            titulo: "Información de operador",
            componente: <InformacionDeOperdorForm />
        },
        {
            titulo: "Roles",
            componente: <OperadoresRoles />
        },
        {
            titulo: "Permisos",
            componente: <Permisos type='Operadores' />
        },

    ]

    const handleTabChange = (newValue) => {
      setTab(newValue);
    };

    return (
        <>
            <Tabs defaultValue="Información de operador" className="" onValueChange={handleTabChange}>
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
        </>
    )

}

export default Roles