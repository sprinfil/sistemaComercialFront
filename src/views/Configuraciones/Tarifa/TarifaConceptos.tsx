import React, { useEffect, useState } from 'react'
import { ContextProvider, useStateContext } from "../../../contexts/ContextTarifa.tsx";
import TarifaConceptosTable from '../../../components/Tables/Components/TarifaConceptosTable.tsx'
import axiosClient from '../../../axios-client.ts';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Loader from '../../../components/ui/Loader.tsx';
import TarifaConceptosNewTable from '../../../components/Tables/Components/TarifaConceptosNewTable.tsx';

export const TarifaConceptos = () => {

  const { tarifas, setTarifas, loadingTable, setLoadingTable, setAccion, setTarifa, tarifa } = useStateContext();
  const [tipoTomas, setTipoTomas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [conceptos, setConceptos] = useState([]);
  const [conceptosTarifa, setConceptosTarifa] = useState([]);


  useEffect(() => { getTipoTomas(); }, [])
  useEffect(() => { getTipoTomas(); }, [tarifa])

  //con este metodo obtienes las anomalias de la bd
  const getTipoTomas = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get("/TipoToma");
      setLoading(false);
      //setTarifas(response.data);
      //console.log(response.data.data);
      setTipoTomas(response.data.data);
    } catch (error) {
      setLoading(false);
      console.error("Failed to fetch constancias:", error);
    }
  };

  return (
    <>
      {
        loading &&
        <Loader />
      }
      {
        !loading &&
        <>
          <ContextProvider>
            <Accordion type="single" collapsible className="w-full">
              {
                tipoTomas.map((tipoToma, index) => (
                  <div key={index}>
                    <AccordionItem value={index + 1}>
                      <AccordionTrigger>{tipoToma.nombre}</AccordionTrigger>
                      <AccordionContent>
                      <TarifaConceptosNewTable tipoToma = {tipoToma.id} tarifa = {tarifa}
                      />
                      </AccordionContent>
                    </AccordionItem>
                  </div>
                ))
              }

            </Accordion>
          </ContextProvider>
        </>

      }
    </>


  )
}
