
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
export const Tarifa = () => {


  const [activeTab, setActiveTab] = useState("Tarifa");
  const opciones = [
    {
      titulo: "Detalles",
      componente: <TarifaForm setActiveTab={setActiveTab} />
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
      <div className='w-full max-h-[75vh] mt-[10px]'>
        {/*Contenedor principal*/}
        <div className='flex gap-2 '>

          {/*Datatable*/}
          <div className='w-[35%] rounded-md border border-border p-4 overflow-auto h-[88vh]'>
            <TarifaTable />
          </div>

          {/*Formulario*/}
          <div className='w-[65%] rounded-md border border-border h-[88vh] p-4 overflow-auto '>
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