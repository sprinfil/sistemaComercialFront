import React, { useContext, useState, useEffect} from 'react'
import TarifaServiciosTable from '../../../components/Tables/Components/TarifaServiciosTable'
import { ContextProvider } from '../../../contexts/ContextProvider'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useStateContext } from "../../../contexts/ContextTarifa.tsx";
import { Button } from '../../../components/ui/button.tsx';
import axiosClient from '../../../axios-client.ts';

export const TarifaServicios = () => {

  const { tarifas, setTarifas, loadingTable, setLoadingTable, setAccion, setTarifa } = useStateContext();


  //seeder pa comercial
  const [seedServiciosDomestica, setSeedServiciosDomestica] = useState([
    {
        Rango: "17 m3",
        Agua: "$9",
        Alcantarillado: "$2.20",
        Sanamiento: "$2.20"
    },
    {
        Rango: "24 m3",
        Agua: "$10",
        Alcantarillado: "$2.20",
        Sanamiento: "$2.20"
    },
    {
        Rango: "30 m3",
        Agua: "$20",
        Alcantarillado: "$2.20",
        Sanamiento: "$2.20"
    },
    {
        Rango: "40 m3",
        Agua: "$30",
        Alcantarillado: "$2.20",
        Sanamiento: "$2.20"
    }
]);
{/* useEffect(() => {
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
};
*/}




  return (

    <ContextProvider>
      <div>

            <div className="h-full flex items-center justify-center w-full ">
                <TarifaServiciosTable data = {seedServiciosDomestica} />
                
              </div>
      
            {/* Segundo item del carousel */}
              <div className="h-full flex items-center justify-center">
              <TarifaServiciosTable data = {seedServiciosDomestica}/>
              </div>

            {/* Tercer item del carousel */}
              <div className="h-full flex items-center justify-center">
              <TarifaServiciosTable data = {seedServiciosDomestica} />
              </div>


      </div>
    </ContextProvider>
  
)
}
