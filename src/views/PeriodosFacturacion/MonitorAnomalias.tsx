import React, { useEffect, useState } from 'react'
import { DoubleContainer, Seccion2, Seccion1 } from '../../components/ui/DoubleContainer'
import { DataTableMonitorAnomalias, columns } from '../../components/ui/DataTableMonitorAnomalias.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Consumos } from './MonitorAnomaliasTabs/Consumos'
import { VerToma } from './MonitorAnomaliasTabs/VerToma'
import { VerImagen } from './MonitorAnomaliasTabs/VerImagen'
import { getTomasPorPeriodo } from '../../lib/Services/MonitorAnomaliaService.ts';
import Loader from '../../components/ui/Loader.tsx';
import { Skeleton } from '../../components/ui/skeleton.tsx';

export const MonitorAnomalias = ({ detalle }) => {

  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedToma, setSelectedToma] = useState({});
  getTomasPorPeriodo(setData, setLoading, detalle?.id);

  return (
    <>
      <div className='flex flex-col flex-grow h-full relative'>
        <DoubleContainer>
          <Seccion1 size={"md"}>
            <div className='w-full px-2 overflow-auto h-[80vh] no-scrollbar'>
              {
                !loading ?
                  <>
                    {
                      data?.length > 0 ?
                        < DataTableMonitorAnomalias data={data} setSelectedToma = {setSelectedToma} />
                        : <></>
                    }
                  </>
                  :
                  <>
                    <Loader />
                  </>
              }
            </div>
          </Seccion1>
          <Seccion2>
            <Tabs defaultValue="consumos" className="w-full h-full flex flex-col ">
              <TabsList>
                <TabsTrigger value="imagen">Imagen</TabsTrigger>
                <TabsTrigger value="toma">Toma</TabsTrigger>
                <TabsTrigger value="consumos">Consumos</TabsTrigger>
                <TabsTrigger value="ordenes">Ordenes de trabajo</TabsTrigger>
              </TabsList>
              <TabsContent value="imagen" className="h-full"><VerImagen /></TabsContent>
              <TabsContent value="toma" className="h-full"><VerToma selectedToma ={selectedToma}/></TabsContent>
              <TabsContent value="consumos" className="h-full"><Consumos selectedToma ={selectedToma} detalle={detalle}/></TabsContent>
              <TabsContent value="ordenes" className="h-full">Change your password here.</TabsContent>
            </Tabs>
          </Seccion2>
        </DoubleContainer>
      </div>
    </>
  )
}
