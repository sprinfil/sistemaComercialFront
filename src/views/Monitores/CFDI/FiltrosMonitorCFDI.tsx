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

export const FiltrosMonitorCFDI = () => {
  return (
    <div>
      <div className='w-full p-4 bg-muted shadow-md mb-2 flex justify-between items-center'>
        <p>Filtros</p>
        <FiFilter className='w-[25px] h-[25px]' />
      </div>
      <div className='p-4'>
        <Accordion collapsible className="w-full" type="multiple" defaultValue={["item-1", "item-2"]}>
          <AccordionItem value="item-1">
            <AccordionTrigger>Información del timbre</AccordionTrigger>
            <AccordionContent>
              <div className='p-4 space-y-4'>
                <div>
                  <p>Folio</p>
                  <Input/>
                </div>
                <div>
                  <p>Timbro</p>
                  <Input/>
                </div>
                <div>
                  <p>Estado del timbrado</p>
                  <Input/>
                </div>
                <div>
                  <p>Fecha de solicitud</p>
                  <Input/>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
