
import React, { useState } from 'react';
import { ContextProvider } from "../../../contexts/ContextTarifa.tsx";
import TarifaTable from '../../../components/Tables/Components/TarifaTable.tsx'
import TarifaForm from '../../../components/Forms/TarifaForm.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TarifaServicios } from '../Tarifa/TarifaServicios.tsx';
import { TarifaConceptos } from '../Tarifa/TarifaConceptos.tsx';
import { DoubleContainer, Seccion1, Seccion2 } from '../../../components/ui/DoubleContainer.tsx';

export const Tarifa = () => {


  const [activeTab, setActiveTab] = useState("Detalles");

  const opciones = [
    {
      titulo: "Detalles",
      componente: <TarifaForm />
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
      <div className='w-full h-[90vh] mt-1'>
        <DoubleContainer>
          <Seccion1>
            <TarifaTable />
          </Seccion1>
          <Seccion2>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="">
              <TabsList>
                {opciones.map((opcion, index) => (
                  <>
                    <TabsTrigger value={opcion.titulo} key={index}>{opcion.titulo}</TabsTrigger>
                  </>
                ))}
              </TabsList>
              {opciones.map((opcion, index) => (
                <>
                  <TabsContent value={opcion.titulo} key={index} className="px-3">{opcion.componente}</TabsContent>
                </>
              ))}
            </Tabs>
          </Seccion2>
        </DoubleContainer>
      </div>
    </ContextProvider>
  )
}



