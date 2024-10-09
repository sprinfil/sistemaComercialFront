import React from 'react'
import { DoubleContainer, Seccion2, Seccion1 } from '../../components/ui/DoubleContainer'
import { DataTableMonitorAnomalias, columns } from '../../components/ui/DataTableMonitorAnomalias'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const MonitorAnomalias = () => {
  return (
    <>
      <div className='flex flex-col flex-grow h-full'>
        <DoubleContainer>
          <Seccion1>
            <div className='w-full px-2 overflow-auto h-[75vh]'>
              <DataTableMonitorAnomalias columns={columns} />
            </div>
          </Seccion1>
          <Seccion2>

            <Tabs defaultValue="account" className="w-full">
              <TabsList>
                <TabsTrigger value="imagen">Imagen</TabsTrigger>
                <TabsTrigger value="toma">Toma</TabsTrigger>
                <TabsTrigger value="consumos">Consumos</TabsTrigger>
                <TabsTrigger value="ordenes">Ordenes de trabajo</TabsTrigger>
              </TabsList>
              <TabsContent value="imagen">Make changes to your account here.</TabsContent>
              <TabsContent value="toma">Change your password here.</TabsContent>
              <TabsContent value="consumos">Make changes to your account here.</TabsContent>
              <TabsContent value="ordenes">Change your password here.</TabsContent>
            </Tabs>
          </Seccion2>
        </DoubleContainer>
      </div>
    </>
  )
}
