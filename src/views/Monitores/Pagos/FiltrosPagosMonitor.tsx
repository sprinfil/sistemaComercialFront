import React from 'react'
import { MdCleaningServices } from "react-icons/md";
import { FiFilter } from "react-icons/fi";
import { Input } from '../../../components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const FiltrosPagosMonitor = () => {
  return (
    <div>
      <div className='w-full p-4 bg-muted shadow-md mb-2 flex justify-between items-center'>
        <p>Filtros</p>
        <FiFilter className='w-[25px] h-[25px]' />
      </div>
      <div className='p-4'>
        <Accordion collapsible className="w-full" type="multiple" defaultValue={["item-1", "item-2"]}>
          <AccordionItem value="item-1">
            <AccordionTrigger>Información de Caja</AccordionTrigger>
            <AccordionContent>
              Próximamente
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Información de Toma/Usuario</AccordionTrigger>
            <AccordionContent>
              Próximamente
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

export default FiltrosPagosMonitor