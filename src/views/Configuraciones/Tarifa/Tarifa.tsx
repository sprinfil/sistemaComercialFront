
import React, { useState } from 'react';
import { ContextProvider } from "../../../contexts/ContextTarifa.tsx";
import { useStateContext } from "../../../contexts/ContextTarifa.tsx";
import TarifaTable from '../../../components/Tables/Components/TarifaTable.tsx'
import TarifaForm from '../../../components/Forms/TarifaForm.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TarifaServicios } from '../Tarifa/TarifaServicios.tsx';
import { TarifaConceptos } from '../Tarifa/TarifaConceptos.tsx';
import { Button } from '../../../components/ui/button.tsx';
import { EdicionTarifaServicio } from '../../../components/Tables/Components/EdicionTarifaServicio.tsx';
import { OcultarTable } from '../../../components/Tables/Components/OcultarTable.tsx';

export const Tarifa = () => {


  const [activeTab, setActiveTab] = useState("Detalles");

  const opciones = [
    {
      titulo: "Detalles",
      componente: <TarifaFormEdit/>
    },
    {
      titulo: "Servicios",
      componente: <TarifaServicios />
    },
    {
      titulo: "Conceptos",
      componente: <TarifaConceptos />
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
        <TarifaTable />
      </OcultarTable>

    </>
  )


};


const TarifaFormEdit = () => {

  const { accion } = useStateContext();

  return (
    <>
        {/*AQUI SE MANDA A LLAMAR EL FORMULARIO PERO CON LA VALIDACION SI ES EDITAR SE CAMBIE DE COLOR GGG*/}
      {accion == "editar" ? (<div className='w-full rounded-md border border-primary h-[66vh] p-4  overflow-auto'>
            <TarifaForm /> 
          </div>) : (<div className='w-full rounded-md border border-border h-[66vh] p-4 overflow-auto '>
            <TarifaForm />
          </div>)}
    </>
  );
};


