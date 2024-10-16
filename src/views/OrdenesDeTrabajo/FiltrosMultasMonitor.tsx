import React, { useState } from "react";
import { FiFilter } from "react-icons/fi";
import { Checkbox } from "@/components/ui/checkbox";
import MarcoForm from "../../components/ui/MarcoForm";
import { MdCleaningServices } from "react-icons/md";
import MarcoFormFiltrosOT from "../../components/ui/MarcoFormFiltrosOT";
import { LibroFilterComboBox } from "../../components/ui/LibroFilterComboBox";
import { RutaFilterComboBox } from "../../components/ui/RutaFilterComboBox";
import { ZustandFiltrosOrdenTrabajo } from "../../contexts/ZustandFiltrosOt";
import { Input } from "../../components/ui/input";
import { useLocation } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import IconButton from "../../components/ui/IconButton";
import { LuDelete } from "react-icons/lu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FaSearch } from "react-icons/fa";
const FiltrosMultasMonitor = () => {
  return (
    <div>
    <div className='w-full p-4 bg-muted shadow-md mb-2 flex items-center'>
    <FiFilter className="w-[4vh] h-[4vh]"  />
      <p>Filtros</p>
    
             {/** ESTE ES EL BUSCAR DE EL MONITOR DE ORDENES DE TRABAJO */}
             <div className="ml-auto">
             <IconButton title="Filtrar" >
       <FaSearch className="w-[2.5vh] h-[2.5vh] " />

     </IconButton>
             </div>
    
    </div>
    <div className='p-4'>
      <Accordion collapsible className="w-full" type="multiple" defaultValue={["item-1", "item-2"]}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Estatus</AccordionTrigger>
          <AccordionContent>
            Proximamente
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Tipo de servicio</AccordionTrigger>
          <AccordionContent>
            Proximamente
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  </div>
  );
};

export default FiltrosMultasMonitor;
