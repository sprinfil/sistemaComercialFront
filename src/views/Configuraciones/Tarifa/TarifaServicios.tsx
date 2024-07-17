import React, { useContext, useState, useEffect} from 'react'
import TarifaServiciosTable from '../../../components/Tables/Components/TarifaServiciosTable'
import { ContextProvider } from '../../../contexts/ContextProvider'
import { useStateContext } from "../../../contexts/ContextTarifa.tsx";
import { Button } from '../../../components/ui/button.tsx';
import axiosClient from '../../../axios-client.ts';
import TarifaServicioNewTable from '../../../components/Tables/Components/TarifaServicioNewTable.tsx';
import { Card, CardContent } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const TarifaServicios = () => {

  const { tarifas, setTarifas, loadingTable, setLoadingTable, setAccion, setTarifa } = useStateContext();


  useEffect(()=>{
    getTipoTomas();
  },[])

  //con este metodo obtienes las anomalias de la bd
  const getTipoTomas = async () => {
    setLoadingTable(true);
    try {
      const response = await axiosClient.get("/TipoToma");
      setLoadingTable(false);
      //setTarifas(response.data);
      console.log(response.data.data);
    } catch (error) {
      setLoadingTable(false);
      console.error("Failed to fetch constancias:", error);
    }
  };


  return (
    <div className=' w-full  flex justify-center'>
      <ContextProvider>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Comercial</AccordionTrigger>
            <AccordionContent>
              <TarifaServicioNewTable/>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Industrial</AccordionTrigger>
            <AccordionContent>
            <TarifaServicioNewTable/>

            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Domestica</AccordionTrigger>
            <AccordionContent>
            <TarifaServicioNewTable/>

            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Especial</AccordionTrigger>
            <AccordionContent>
            <TarifaServicioNewTable/>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ContextProvider>
    </div>


  )
}
