import React from 'react'
import TarifaServiciosTable from '../../../components/Tables/Components/TarifaServiciosTable'
import { ContextProvider } from '../../../contexts/ContextProvider'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


export const TarifaServicios = () => {




  return (

     <ContextProvider>
      <div className="w-full h-64 flex items-center justify-center mt-10 pt-10">
        <Carousel >
          <CarouselContent className="p-1 flex max-w-[900px] ">
            {/* Primer item del carousel */}
            <CarouselItem className="w-full">
              <div className="h-full flex items-center justify-center w-full">
                <TarifaServiciosTable />
              </div>
            </CarouselItem>

            {/* Segundo item del carousel */}
            <CarouselItem className="w-full">
              <div className="h-full flex items-center justify-center">
              <TarifaServiciosTable />
              </div>
            </CarouselItem>

            {/* Tercer item del carousel */}
            <CarouselItem className="w-full">
              <div className="h-full flex items-center justify-center">
              <TarifaServiciosTable />
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
