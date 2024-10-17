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
import { FaSearch } from 'react-icons/fa';
import { FaArrowRight } from "react-icons/fa6";
import { LuFilterX } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { ZustandFiltrosContratacion } from "../../contexts/ZustandFiltrosContratacion";
import axiosClient from "../../axios-client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ZustandGeneralUsuario } from "../../contexts/ZustandGeneralUsuario";
import { MdOutlineNavigateNext } from "react-icons/md";
import IconButtonContratos from "../../components/ui/IconButtonContratos";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
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
import { FaChevronCircleRight } from "react-icons/fa";

const FiltrosContratacionPuntoToma = () => {

  const navigate = useNavigate();

  const handleSiguienteContratacion = () => {
    navigate("/Contrato/Usuario");
    setTomaPreContratada([]);
    setBoolPeticionContratacion(true);
    setEsPreContratado(false);
    setTomaPreContratada([]);
  }



  const {setIsCheckedPreContratadas, isCheckedPreContratadas, setPuntosFiltradosParaElMapa, 
    tomaPreContratada, setTomaPreContratada, 
    setBoolPeticionContratacion, seleccionoPuntoEnMapa, 
    codigoToma, setCodigoToma, 
    setEsPreContratado, setSeleccionoPuntoEnMapa,
    setSelectedLocation, setTomasFiltradas, boolCrearUsuarioProcesoContratacion, obtenerNombreUsuario} = ZustandFiltrosContratacion();
 
    const {usuariosEncontrados} = ZustandGeneralUsuario();
//console.log(isCheckedPreContratadas);

const handleLimpiarFiltros = () => {
  setCodigoToma("");
  setIsCheckedPreContratadas(false);
  setEsPreContratado(false);
  setSeleccionoPuntoEnMapa(false);
  setSelectedLocation(null);
  setTomasFiltradas([]);
}

  const handleBuscarTomas = () => 
  {

    // Verifica si el checkbox está marcado
  const contratadas = isCheckedPreContratadas ? "pre-contrato" : null;

  const values = {
    filtros: {
      ...(contratadas && { tipo_contratacion: [contratadas] }),
      codigo_toma: codigoToma,
    },
  };
    
    console.log(values);

    try
    {
        const response = axiosClient.post("contratos/filtros", values);
        console.log(response);
        setPuntosFiltradosParaElMapa(response);
    }
    catch(response)
    { 
      console.log(response);

    }

  }
console.log(usuariosEncontrados);
  const handleChangeCodigoToma = (e) => {
    setCodigoToma(e.target.value);
  };

  console.log(codigoToma);
  return (
    <ContextMenu>
   <ContextMenuTrigger className="">
    <div className="">

    <div className="overflow-auto min-h-[80vh]">
  
      <div>
      <div className='w-full p-4 bg-muted shadow-md mb-2 flex justify-between items-center'>
        <div className="text-lg mr-1">
          Usuario: 
        </div>
        {
          boolCrearUsuarioProcesoContratacion ?
          <div className="text-lg truncate flex-grow min-w-[20vh]">
         {obtenerNombreUsuario || "No hay usuario seleccionado"} 
          </div>
          :
          <div className="text-lg truncate flex-grow min-w-[20vh]">
          {usuariosEncontrados[0]?.nombre_completo || "No hay usuario seleccionado"}
          </div>
  
          
        }
    
        <div className="flex justify-end">
        {seleccionoPuntoEnMapa ? (
          <div className="]" title="Iniciar proceso">
            <IconButtonContratos onClick={handleSiguienteContratacion}>
              <FaChevronCircleRight className="w-[3.5vh] h-[3.5vh]"/>
            </IconButtonContratos>
          </div>
        )
      :
      <div className="w-[4vh] h-[4vh] flex justify-end">
      <IconButton onClick={handleBuscarTomas} title="Buscar tomas">            
          <FaSearch className="w-[2.5vh] h-[2.5vh]"/>
        </IconButton>
      </div>
      }
        </div>
      
      </div>
  
     
      <div className='p-4'>
        <Accordion collapsible className="w-full" type="multiple" defaultValue={["item-1", "item-2"]}>
          <AccordionItem value="item-1">
            <AccordionTrigger>Tipo de toma</AccordionTrigger>
            <AccordionContent>
            <div className="flex items-center space-x-2 mt-2">
              <div className="text-sm font-medium mb-2 mt-2">Desarrolladora</div>
              <div className="ml-2">
                <Checkbox
                 className="w-[2.8vh] h-[2.8vh]"
                  checked={isCheckedPreContratadas}
                  onCheckedChange={setIsCheckedPreContratadas}
                />
              </div>
              
            </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Código de toma</AccordionTrigger>
            <AccordionContent>
            <Input
          placeholder="Ingresa el código de toma"
          value={codigoToma}
          onChange={handleChangeCodigoToma}
          />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
      
      <ContextMenuContent className="w-64">
      <ContextMenuItem onClick={handleBuscarTomas}>
          <IconButton>Buscar</IconButton>

        </ContextMenuItem>
        <ContextMenuItem onClick={handleLimpiarFiltros}>
          <IconButton >Limpiar</IconButton>

        </ContextMenuItem>
       
      </ContextMenuContent>
    



      </div>



    


      </div>
        </ContextMenuTrigger>

      </ContextMenu>


  );
};

export default FiltrosContratacionPuntoToma;
