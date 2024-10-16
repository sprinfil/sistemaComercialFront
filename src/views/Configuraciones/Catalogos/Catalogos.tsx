import React, { useState } from 'react'
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
import { Colonia } from './Colonias-Calles/Colonia'
import OrdenDeTrabajo from './OrdenDeTrabajo'
import Caja from './Caja'
const Catalogos = () => {

  const { permissions, user } = useStateContext();
  const [seleccionarCatalogo, setSeleccionarCatalogo] = useState(true);


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
    {
      titulo: "Colonias y calles",
      componente: <Colonia />,
      permission: "VerColoniasCalles"
      
    },
    {
      titulo: "Orden de trabajo",
      componente: <OrdenDeTrabajo />,
      permission: "VerOrdenDeTrabajo"
    }
    ,
    {
      titulo: "Caja",
      componente: <Caja />,
      permission: "VerCaja"
    }
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
            <p>Selecciona un catálogo.</p>
          </div>
        </>
      }

    </div >
  )
}

export default Catalogos
