import React, {useEffect, useState} from 'react'
import { ContextProvider, useStateContext } from "../../../contexts/ContextTarifa.tsx";
import TarifaConceptosTable from '../../../components/Tables/Components/TarifaConceptosTable.tsx'
import axiosClient from '../../../axios-client.ts';




export const TarifaConceptos = () => {


  

{/*  
  const {setLoadingTable,setTarifas} = useStateContext();
  useEffect(() => {
  getTarifa();
}, []);

const getTarifa = async () => {
  setLoadingTable(true);
  try {
    const response = await axiosClient.get("/tarifa");
    setLoadingTable(false);
    setTarifas(response.data.data);
    console.log(response.data.data);
  } catch (error) {
    setLoadingTable(false);
    console.error("Failed to fetch concepto:", error);
  }
};*/} 


  return (
    <ContextProvider>
    <div className='w-full max-h-[75vh] '>
      {/*Contenedor principal*/}

        {/*Datatable*/}
        <div className=''>
          <TarifaConceptosTable />
        </div>

    </div>
  </ContextProvider>
  )
}
