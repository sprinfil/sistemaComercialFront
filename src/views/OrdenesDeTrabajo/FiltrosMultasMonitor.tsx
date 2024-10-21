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
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { useToast } from "@/components/ui/use-toast"; //IMPORTACIONES TOAST
import { ToastAction } from "@/components/ui/toast"; //IMPORTACIONES TOAST
import axiosClient from "../../axios-client";
import { ZustandMultas } from "../../contexts/ZustandMultas";
const FiltrosMultasMonitor = () => {

  const { setMultasTabla, setLoadingTableMonitor } = ZustandMultas();
  const { toast } = useToast()


  const [IsCodigoToma, setIsCodigoToma] = useState("");


  const handleValueCodigoToma = (event) => 
  {
      setIsCodigoToma(event.target.value);
  }






  const handleFiltrosMonitorMultas = async () => {

    setLoadingTableMonitor(true);
   
    try {
      const response = await axiosClient.get("/multa/consultarmultas", {
        params:
        {
          codigo_toma:IsCodigoToma,
          codigo_usuario:"",
          modelo_multado: "toma",
          tipo_multa:"",
          tipo_toma:"",
          fecha_solicitud:"",
          fecha_revision:"",
        }});




      console.log(response.data);
      setMultasTabla(response.data);
      setLoadingTableMonitor(false);
    }
    catch (e) {
      setLoadingTableMonitor(false);
      setMultasTabla([]);
      toast({
        variant: "destructive",
        title: "Oh, no. Error",
        description: "Algo salió mal.",
        action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
      })
    }
  }






  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="h-[90vh]">

          <div className='w-full p-4 bg-muted shadow-md mb-2 flex items-center '>
            <FiFilter className="w-[4vh] h-[4vh]" />
            <p>Filtros</p>

            {/** ESTE ES EL BUSCAR DE EL MONITOR DE ORDENES DE TRABAJO */}
            <div className="ml-auto">
              <IconButton title="Filtrar" onClick={handleFiltrosMonitorMultas} >
                <FaSearch className="w-[2.5vh] h-[2.5vh] " />

              </IconButton>
            </div>

          </div>
          <div className='p-4'>
            <Accordion collapsible className="w-full" type="multiple" defaultValue={["item-1", "item-2"]}>
              <AccordionItem value="item-1">
                <AccordionTrigger>Estado</AccordionTrigger>
                <AccordionContent>
                  <div>


                    Activo <Checkbox />


                    Rechazado <Checkbox />


                    Pendiente <Checkbox />


                    Cancelado <Checkbox />


                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Tipo de servicio</AccordionTrigger>
                <AccordionContent>
                  Proximamente
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Código de toma</AccordionTrigger>
                <AccordionContent>
                  <Input
                  value={IsCodigoToma}
                  onChange={handleValueCodigoToma}/>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem>
          Buscar
          <ContextMenuShortcut>

          </ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Limpiar
          <ContextMenuShortcut>

          </ContextMenuShortcut>
        </ContextMenuItem>

      </ContextMenuContent>
    </ContextMenu>

  );
};

export default FiltrosMultasMonitor;
