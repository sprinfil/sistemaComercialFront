import React from 'react'
import ConvenioTable from '../../../components/Tables/Components/ConvenioTable'
import ConvenioForm from '../../../components/Forms/ConvenioForm'
import { ContextProvider } from "../../../contexts/ContextConvenio.tsx";
import { useStateContext } from "../../../contexts/ContextConvenio.tsx";
import { OcultarTable } from '../../../components/Tables/Components/OcultarTable.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const Convenios = () => {
  return (

    <ContextProvider>
      <div className='w-full max-h-[75vh] '>

        {/*Contenedor principal*/}
        <div className='flex gap-2 '>

          {/*Datatable*/}
          <MostrarTable />

          {/*Formulario*/}
          <ConveniosFormEdit />

        </div>
      </div>
    </ContextProvider>
  )
}

export default Convenios


const ConveniosFormEdit = () => {

  const { accion } = useStateContext();

  return (
    <>
      {/*AQUI SE MANDA A LLAMAR EL FORMULARIO PERO CON LA VALIDACION SI ES EDITAR SE CAMBIE DE COLOR GG*/}
      {accion == "editar" ? (<div className='w-full rounded-md border border-primary h-[77vh] p-4'>
        <TabsConevios />
      </div>) : (<div className='w-full rounded-md border border-border h-[77vh] p-4 overflow-auto'>
        <TabsConevios />
      </div>)}
    </>
  );
};

const MostrarTable = () => {
  const { accion } = useStateContext();
  return (
    <>
      {/*Datatable*/}
      <OcultarTable accion={accion}>
        <ConvenioTable />
      </OcultarTable>
    </>
  )
};

const TabsConevios = () => {
  return (
    <Tabs defaultValue="" className="">
      <TabsList>
        <TabsTrigger value="Convenio">Convenio</TabsTrigger>
   
      </TabsList>
      <TabsContent value="Convenio">
        <ConvenioForm />
      </TabsContent>

    </Tabs>
  )

}