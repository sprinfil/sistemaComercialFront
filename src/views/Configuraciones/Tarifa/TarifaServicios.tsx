import React, { useContext, useState, useEffect} from 'react'
import TarifaServiciosTable from '../../../components/Tables/Components/TarifaServiciosTable'
import { ContextProvider } from '../../../contexts/ContextProvider'
import { useStateContext } from "../../../contexts/ContextTarifa.tsx";
import { Button } from '../../../components/ui/button.tsx';
import axiosClient from '../../../axios-client.ts';
import TarifaServicioNewTable from '../../../components/Tables/Components/TarifaServicioNewTable.tsx';
import { Card, CardContent } from "@/components/ui/card"
import Loader from '../../../components/ui/Loader.tsx';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const TarifaServicios = () => {

  const { tarifa, setTarifas, loadingTable, setLoadingTable, setAccion, setTarifa } = useStateContext();
  const [tipoTomas, setTipoTomas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    getTipoTomas();
  },[])

  //con este metodo obtienes las tipo de tomas de la bd
  const getTipoTomas = async () => {
<<<<<<< HEAD
    setLoading(true);
    try {
      const response = await axiosClient.get("/TipoToma")
      setLoading(false);
      setLoadingTable(false);
      setTipoTomas(response.data.data);
=======
  
    try {
      const response = await axiosClient.get("/TipoToma");
    
      //setTarifas(response.data);
>>>>>>> Develop
      console.log(response.data.data);
    } catch (error) {
    
      console.error("Failed to fetch constancias:", error);
    }
  };

  if (loading) {
    return <div><Loader /></div>;
  }

  return (
    <div className=' w-full  flex justify-center'>
      <ContextProvider>
        <Accordion type="single" collapsible className="w-full">
          {tipoTomas.map((tipoToma, index) => 
          <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>{tipoToma.nombre}</AccordionTrigger> 
          <AccordionContent>
              <TarifaServicioNewTable/>  {/* FALTA TRAER LA DATA*/}
            </AccordionContent>
            </AccordionItem>
          )}
          </Accordion>
      </ContextProvider>
    </div>


  )
}
