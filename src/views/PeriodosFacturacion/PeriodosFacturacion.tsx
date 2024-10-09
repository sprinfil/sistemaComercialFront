import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DataTablePeriodosFacturacion, columns } from '../../components/ui/DataTablePeriodosFacturacion'
import { ComboboxRutas } from '../../components/ui/ComboBoxRutas'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const PeriodosFacturacion = () => {
  // Cambiar el estado inicial a null
  const [selectedRuta, setSelectedRuta] = useState({});
  const [accordionValue, setAccordionValue] = useState("item-1");

  useEffect(() => {
    if (selectedRuta?.nombre) {
      setAccordionValue("item-2");
    } else {
      setAccordionValue("item-1");
    }
  }, [selectedRuta]);
   
  return (
    <div>
      <div className='mx-5 mt-5'>
        <Accordion type="single" collapsible className="w-full" value={accordionValue}>
          <AccordionItem value="item-1" onClick={()=>{setSelectedRuta({})}}>
            <AccordionTrigger className="bg-muted px-2">Seleccionar Ruta</AccordionTrigger>
            <AccordionContent>
              <div className="my-1 shadow-md border border-border rounded-md p-6">
                <p className="ml-1 text-lg">Seleccionar Ruta</p>
                <ComboboxRutas setSelectedRuta={setSelectedRuta} />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="bg-muted px-2">Periodos</AccordionTrigger>
            <AccordionContent>
              <div className='mt-1'>
                <div>
                  <p className='text-lg font-medium my-2'>{selectedRuta?.nombre}</p>
                </div>
                <DataTablePeriodosFacturacion
                  columns={columns}
                  data={[
                    {
                      id: "728ed52f",
                      periodo: "ENE 2024 - FEBRERO 2024",
                      estado: "activo",
                    },
                  ]}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
