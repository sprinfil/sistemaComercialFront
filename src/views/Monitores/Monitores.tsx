import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OrdenDeTrabajoMonitor } from './OrdenDeTrabajoMonitor'
import { useStateContext } from '../../contexts/ContextProvider'
import FactibilidadMonitor from './FactibilidadMonitor'

export const Monitores = () => {


  const { permissions, user } = useStateContext();
  const [seleccionarCatalogo, setSeleccionarCatalogo] = useState(true);

  const opciones = [
    {
      titulo: "Orden de trabajo",
      componente: <OrdenDeTrabajoMonitor />,
      permission: ""
    },
    {
      titulo: "Factibilidad",
      componente: <FactibilidadMonitor />,
      permission: ""
    },
   
  ]

  return ( 
    <div className='w-full'>
      <Tabs defaultValue="" className="" onValueChange={() => { setSeleccionarCatalogo(false) }}>

        <TabsList>
          {opciones.map((opcion, index) => {
            if (permissions.includes(opcion.permission) || user.id == 1|| user?.roles?.includes("Admin")) {
              return (
                <>
                  <TabsTrigger value={opcion.titulo} key={index}>{opcion.titulo}</TabsTrigger>
                </>
              )
            }
          })}
        </TabsList>
        {opciones.map((opcion, index) => (
          <>
            <TabsContent value={opcion.titulo} key={index}>{opcion.componente}</TabsContent>
          </>
        ))}
      </Tabs>
      {
        seleccionarCatalogo &&
        <>
          <div className='w-full h-[70vh] mt-[20px] flex flex-col items-center justify-center gap-5'>
            <p>Selecciona un monitor.</p>
          </div>
        </>
      }

    </div >
  )
}

