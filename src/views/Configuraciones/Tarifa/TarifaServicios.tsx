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



  //con este metodo obtienes las anomalias de la bd
  const getTarifas = async () => {
    setLoadingTable(true);
    try {
      const response = await axiosClient.get("/Concepto");
      setLoadingTable(false);
      setTarifas(response.data);
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
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Domestica</AccordionTrigger>
            <AccordionContent>
              Yes. It's animated by default, but you can disable it if you prefer.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Especial</AccordionTrigger>
            <AccordionContent>
              Yes. It's animated by default, but you can disable it if you prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ContextProvider>
    </div>


  )
}
