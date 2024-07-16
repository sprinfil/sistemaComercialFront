import React, { useContext, useState } from 'react'
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

    <ContextProvider>
      <div className="w-full h-[60vh] flex items-center justify-center mt-10 pt-10 ">
        <Carousel >
          <CarouselContent className="p-1 flex max-w-[800px] ">
            {/* Primer item del carousel */}
            <CarouselItem className="w-full">
            <div className="h-full flex items-center justify-center w-full ">
                <TarifaServiciosTable data = {seedServiciosDomestica} />
                
              </div>
            </CarouselItem>

            {/* Segundo item del carousel */}
            <CarouselItem className="w-full">
              <div className="h-full flex items-center justify-center">
              <TarifaServiciosTable data = {seedServiciosDomestica}/>
              </div>
            </CarouselItem>

            {/* Tercer item del carousel */}
            <CarouselItem className="w-full">
              <div className="h-full flex items-center justify-center">
              <TarifaServiciosTable data = {seedServiciosDomestica} />
              </div>
            </CarouselItem>
          </CarouselContent>

          {/* Navegación del carousel */}
          <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white px-2 py-1 rounded-full cursor-pointer">
            Previous
          </CarouselPrevious>
          <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white px-2 py-1 rounded-full cursor-pointer">
            Next
          </CarouselNext>
        </Carousel> 
      </div>
    </ContextProvider>
  
)
}
