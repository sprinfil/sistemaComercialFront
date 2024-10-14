import React from 'react'
import { DoubleContainer, Seccion2, Seccion1 } from '../../components/ui/DoubleContainer'
import { DataTableMonitorAnomalias, columns } from '../../components/ui/DataTableMonitorAnomalias.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Consumos } from './MonitorAnomaliasTabs/Consumos'
import { VerToma } from './MonitorAnomaliasTabs/VerToma'
import { VerImagen } from './MonitorAnomaliasTabs/VerImagen'

export const MonitorAnomalias = () => {
  return (
    <>
      <div className='flex flex-col flex-grow h-full relative'>
        <DoubleContainer>
          <Seccion1 width={"40%"}>
            <div className='w-full px-2 overflow-auto h-[80vh] no-scrollbar'>
              <DataTableMonitorAnomalias columns={columns} />
            </div>
          </Seccion1>
          <Seccion2>
            <Tabs defaultValue="account" className="w-full h-full flex flex-col ">
              <TabsList>
                <TabsTrigger value="imagen">Imagen</TabsTrigger>
                <TabsTrigger value="toma">Toma</TabsTrigger>
                <TabsTrigger value="consumos">Consumos</TabsTrigger>
                <TabsTrigger value="ordenes">Ordenes de trabajo</TabsTrigger>
              </TabsList>
              <TabsContent value="imagen" className="h-full"><VerImagen/></TabsContent>
              <TabsContent value="toma" className="h-full"><VerToma /></TabsContent>
              <TabsContent value="consumos" className="h-full"><Consumos /></TabsContent>
              <TabsContent value="ordenes" className="h-full">Change your password here.</TabsContent>
            </Tabs>
          </Seccion2>
        </DoubleContainer>
      </div>
    </>
  )
}
