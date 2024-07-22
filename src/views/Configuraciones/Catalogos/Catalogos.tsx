import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Anomalias from './Anomalias'
import Conceptos from './Conceptos'
import Descuentos from './Descuentos'
import Convenios from './Convenios'
import Ajustes from './Ajustes'
import Constancias from './Constancias'
import GiroComercial from './GiroComercial'
import Bonificaciones from './Bonificaciones'
import TipoDeToma from './TipoDeToma'
import { useStateContext } from '../../../contexts/ContextProvider'


const Catalogos = () => {

  const { permissions, user } = useStateContext();

  const opciones = [
    {
      titulo: "Anomalías",
      componente: <Anomalias />,
      permission: "VerAnomalias"
    },
    {
      titulo: "Conceptos",
      componente: <Conceptos />,
      permission: "VerConceptos"
    },
    {
      titulo: "Descuentos",
      componente: <Descuentos />,
      permission: "VerDescuentos"
    },
    {
      titulo: "Convenios",
      componente: <Convenios />,
      permission: "VerConvenios"
    },
    {
      titulo: "Ajustes",
      componente: <Ajustes />,
      permission: "VerAjustes"
    },
    {
      titulo: "Constancias",
      componente: <Constancias />,
      permission: "VerConstancias"
    },
    {
      titulo: "Bonificaciones",
      componente: <Bonificaciones />,
      permission: "VerBonificaciones"
    },
    {
      titulo: "Giro Comercial",
      componente: <GiroComercial />,
      permission: "VerGirosComerciales"
    },
    {
      titulo: "Tipo de toma",
      componente: <TipoDeToma />,
      permission: "VerTiposDeToma"
    },
  ]

  return (
    <div className='w-full'>
      <Tabs defaultValue="Anomalías" className="">

        <TabsList>
          {opciones.map((opcion, index) => {
            if (permissions.includes(opcion.permission) || user.id == 1) {
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
    </div >
  )
}

export default Catalogos
