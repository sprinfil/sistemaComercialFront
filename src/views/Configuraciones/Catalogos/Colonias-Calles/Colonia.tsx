
import React, { useState } from 'react';
import { ContextProvider } from "../../../../contexts/ContextColonia.tsx";
import { useStateContext } from "../../../../contexts/ContextColonia.tsx";
import ColoniaTable from '../../../../components/Tables/Components/ColoniaTable.tsx'
import ColoniaForm from '../../../../components/Forms/ColoniaForm.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ColoniaCalle } from '../Colonias-Calles/ColoniaCalle.tsx';
import { Button } from '../../../../components/ui/button.tsx';
import { EdicionTarifaServicio } from '../../../../components/Tables/Components/EdicionTarifaServicio.tsx';
import { OcultarTable } from '../../../../components/Tables/Components/OcultarTable.tsx';

export const Colonia = () => {


  const [activeTab, setActiveTab] = useState("Detalles");

  const opciones = [
    {
      titulo: "Detalles",
      componente: <ColoniaFormEdit/>
    },
    {
      titulo: "Calles",
      componente: <ColoniaCalle />
    },
    
  ]


  return (
    <ContextProvider>
      <div className='w-full max-h-[50vh] mt-[15px]'>
        {/*Contenedor principal*/}
        <div className='flex gap-2 '>


            <MostrarTable />
          {/*Datatable*/}

          {/*Formulario*/}
          <div className='w-full rounded-md border border-border h-[80vh] p-4 overflow-auto'>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
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
  )
}

const MostrarTable = (className) => {

  const { accion } = useStateContext();

  return (
    <>
      {/*Datatable*/}
      <OcultarTable accion={accion}>
        <ColoniaTable />
      </OcultarTable>

    </>
  )


};


const ColoniaFormEdit = () => {

  const { accion } = useStateContext();

  return (
    <>
        {/*AQUI SE MANDA A LLAMAR EL FORMULARIO PERO CON LA VALIDACION SI ES EDITAR SE CAMBIE DE COLOR GGG*/}
      {accion == "editar" ? (<div className='w-full rounded-md border border-primary h-[66vh] p-4  overflow-auto'>
            <ColoniaForm /> 
          </div>) : (<div className='w-full rounded-md border border-border h-[66vh] p-4 overflow-auto '>
            <ColoniaForm />
          </div>)}
    </>
  );
};
