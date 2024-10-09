import React,{useState} from 'react'
import CargaLecturaTable from '../../components/Tables/Components/CargaLecturaTable'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import IconButton from '../../components/ui/IconButton'
import { FaSave } from "react-icons/fa";
import IconButtonCargaTrabajo from '../../components/ui/IconButtonCargaTrabajo';
import { TipoDeCarga } from './TipoDeCarga';
import { IoMdPrint } from "react-icons/io";

export const CargasTrabajo = () => {
  const [activeTab, setActiveTab] = useState("tipoDeCarga");


  return (
    <div className='max-h-[81vh] overflow-auto'>
                  <div className='ml-5 text-2xl mt-2'>
                    Cargas de trabajo
                  </div>
      <div className='flex space-x-2'>
              <div className='p-2 '>
                    <CargaLecturaTable/>
                  </div>
          <div className='w-full mt-6'>
      




                <div className="flex space-x-1">
                <div className="flex-1 bg-green-600 hover:bg-green-700  ">
              <IconButtonCargaTrabajo><IoMdPrint className='mr-1 w-[3.0vh] h-[3.0vh] text-white' /> <div className='text-white'>Imprimir</div></IconButtonCargaTrabajo>

              </div>


              <div className="flex-1 bg-green-600 hover:bg-green-700 ">
                <IconButtonCargaTrabajo><FaSave className='mr-1 w-[2.5vh] h-[2.5vh] text-white' /> <div className='text-white'>Guardar</div></IconButtonCargaTrabajo>

                </div>
                </div> 
             

            <TipoDeCarga/>
              

          </div>
      </div>
                 

                  
    </div>
  )
}
