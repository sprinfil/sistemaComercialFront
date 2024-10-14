import React, { useState } from 'react'
import { FaArrowCircleLeft } from "react-icons/fa";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from '../../components/ui/card';
import { CargasTrabajo } from './CargasTrabajo';
import { MonitorAnomalias } from './MonitorAnomalias';
import { InformacionGeneral } from './InformacionGeneral';

const PeriodoFacturacionDetalle = ({ setDetalle }) => {
  return (
    <>
      <div className='h-full flex flex-col relative'>
        <div className='flex gap-2 items-center mb-2 absolute top-0'>
          <div onClick={() => { setDetalle({}) }} className='rounded-md cursor-pointer flex gap-2 items-center text-[15px] text-primary transition-all hover:bg-muted p-2'>
            <FaArrowCircleLeft />
            <p >Volver</p>
          </div>
          <div className='h-full flex items-center mt-[2px]'>
            <p className='text-[14px] font-medium'>R01 Enero 2024</p>
          </div>
        </div>
        <div className='rounded-md border flex-grow overflow-auto no-scrollbar'>
          <div className='w-full'>
            <Tabs defaultValue="cargasTrabajo" className="">
              <TabsList>
                <TabsTrigger value="cargasTrabajo">Cargas de trabajo</TabsTrigger>
                <TabsTrigger value="anomalias">Anomalías</TabsTrigger>
                <TabsTrigger value="recorridos">Recorridos</TabsTrigger>
                <TabsTrigger value="facturacion">Facturación</TabsTrigger>
              </TabsList>
              <TabsContent value="cargasTrabajo"><CargasTrabajo /></TabsContent>
              <TabsContent value="anomalias">Anomalías</TabsContent>
              <TabsContent value="recorridos">Recorridos account here.</TabsContent>
              <TabsContent value="facturacion">Facturación</TabsContent>
            </Tabs>

          </div>
        </div>
      </div>

    </>

  )
}

export default PeriodoFacturacionDetalle