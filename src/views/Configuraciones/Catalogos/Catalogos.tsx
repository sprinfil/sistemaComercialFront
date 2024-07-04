import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Anomalias from './Anomalias'
import Conceptos from './Conceptos'
import Descuentos from './Descuentos'
import Convenios from './Convenios'
import Ajustes from './Ajustes'
import Constancias from './Constancias'
import GiroComercial from './GiroComercial'

const Catalogos = () => {

  const opciones = [
    {
      titulo: "Anomalias",
      componente: <Anomalias />
    },
    {
      titulo: "Conceptos",
      componente: <Conceptos />
    },
    {
      titulo: "Descuentos",
      componente: <Descuentos />
    },
    {
      titulo: "Convenios",
      componente: <Convenios />
    },
    {
      titulo: "Ajustes",
      componente: <Ajustes />
    },
    {
        titulo: "Constancias",
        componente: <Constancias />
      },
      {
        titulo: "Giro Comercial",
        componente: <GiroComercial />
      },
  ]

  return (
    <div>
      <Tabs defaultValue="account" className="w-full">

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
    </div >
  )
}

export default Catalogos
