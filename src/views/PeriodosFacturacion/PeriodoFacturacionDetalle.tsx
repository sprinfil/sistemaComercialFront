import React, { useState } from 'react'
import { FaArrowCircleLeft } from "react-icons/fa";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from '../../components/ui/card';
import { CargasTrabajo } from './CargasTrabajo';
import { MonitorAnomalias } from './MonitorAnomalias';
import { InformacionGeneral } from './InformacionGeneral';
import { Facturacion } from './Facturacion';
import { Recorridos } from './Recorridos';

const PeriodoFacturacionDetalle = ({ setDetalle, selectedRutaDetalle, setPeriodos }) => {
  return (
    <>
      <div className='h-full flex flex-col relative'>
        <div className='flex gap-2 items-center mb-2 absolute top-0'>
          <div onClick={() => { setDetalle({}) }} className='rounded-md cursor-pointer flex gap-2 items-center text-[15px] text-primary transition-all hover:bg-muted p-2'>
            <FaArrowCircleLeft />
            <p >Volver</p>
          </div>
          <div className='h-full flex items-center mt-[2px]'>
            <p className='text-[14px] font-medium'>{selectedRutaDetalle?.nombre}</p>
          </div>
        </div>
        <div className='rounded-md flex-grow flex flex-col overflow-auto no-scrollbar'>
          <Tabs defaultValue="informacionGeneral" className="w-full flex-grow flex flex-col ">
            <TabsList>
              <TabsTrigger value="informacionGeneral">Información General</TabsTrigger>
              <TabsTrigger value="cargasTrabajo">Cargas de trabajo</TabsTrigger>
              <TabsTrigger value="anomalias">Anomalías</TabsTrigger>
              <TabsTrigger value="recorridos">Recorridos</TabsTrigger>
              <TabsTrigger value="facturacion">Facturación</TabsTrigger>
            </TabsList>
            <TabsContent value="informacionGeneral" className="flex-grow"><InformacionGeneral setPeriodos={setPeriodos} selectedRutaDetalle = {selectedRutaDetalle} setDetalle={setDetalle}/></TabsContent>
            <TabsContent value="cargasTrabajo" className="flex-grow"><CargasTrabajo detalle={selectedRutaDetalle}/></TabsContent>
            <TabsContent value="anomalias" className="flex-grow"><MonitorAnomalias /></TabsContent>
            <TabsContent value="recorridos" className="flex-grow"><Recorridos/></TabsContent>
            <TabsContent value="facturacion" className="flex-grow"><Facturacion setPeriodos={setPeriodos} selectedRutaDetalle = {selectedRutaDetalle} setDetalle={setDetalle}/></TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}

export default PeriodoFacturacionDetalle