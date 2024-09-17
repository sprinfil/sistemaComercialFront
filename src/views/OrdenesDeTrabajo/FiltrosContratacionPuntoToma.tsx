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

const FiltrosContratacionPuntoToma = () => {

  const navigate = useNavigate();

  const handleSiguienteContratacion = () => {
    navigate("/Contrato/Usuario");
    setTomaPreContratada([]);
    setBoolPeticionContratacion(true);
  }



  const {setIsCheckedPreContratadas, isCheckedPreContratadas, setPuntosFiltradosParaElMapa, 
    tomaPreContratada, setTomaPreContratada, 
    setBoolPeticionContratacion, seleccionoPuntoEnMapa, codigoToma, setCodigoToma} = ZustandFiltrosContratacion();

//console.log(isCheckedPreContratadas);

const handleLimpiarFiltros = () => {
  setCodigoToma("");
  setIsCheckedPreContratadas(false);
}

  const handleBuscarTomas = () => 
  {

    const contratadas = isCheckedPreContratadas && "pre-contrato" 

    const values = {
      filtros: {
        tipo_contratacion: [contratadas],
        codigo_toma: codigoToma
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

  const handleChangeCodigoToma = (e) => {
    setCodigoToma(e.target.value);
  };

  console.log(codigoToma);
  return (
    <div className="overflow-auto min-h-[20vh]">
      <div className="ml-5 mb-[20vh] mt-[1vh] h-full p-3">
      <div className="flex justify-between items-center space-x-4">

        <div className="flex items-center space-x-2">
          <FiFilter className="w-[3vh] h-[3vh]" />
          <span>Filtros</span>
        </div>

        {seleccionoPuntoEnMapa && (
          <div className="rounded-xl" title="Continuar proceso">
            <IconButton onClick={handleSiguienteContratacion}>
              <FaArrowRight />
            </IconButton>
          </div>
        )}
      </div>

        <div className="flex justify-between items-center space-x-2 mt-5">
          
  <div className="flex items-center space-x-4 text-lg font-semibold mt-4">
    <span>Tomas</span>
    <div title="Limpiar filtros">
      <IconButton onClick={handleLimpiarFiltros}>
        <LuFilterX />
      </IconButton>
    </div>
  </div>

      {/* Lupa (ícono de búsqueda) alineada a la derecha */}
      <div title="Buscar" className="flex">
        <IconButton onClick={handleBuscarTomas}>            
          <FaSearch/>
        </IconButton>
      </div>
    </div>



          <hr className="border-t border-border my-1" />

          <div className="grid grid-cols-2 gap-x-[10vh] mb-2">
            <div className="flex items-center space-x-2 mt-2">
              <div className="text-sm font-medium mb-2 mt-2">Desarrolladora</div>
              <div className="ml-2">
                <Checkbox
                 className="w-[2.3vh] h-[2.3vh]"
                  checked={isCheckedPreContratadas}
                  onCheckedChange={setIsCheckedPreContratadas}
                />
              </div>
              
            </div>

            
          </div>
          
          <div className="text-sm font-medium mb-2 mt-5">Codigo de toma</div>
          <hr className="border-t border-border my-1" />
          <div className="mt-5">
          <Input
          placeholder="Ingresa el código de toma"
          value={codigoToma}
          onChange={handleChangeCodigoToma}
          />
          </div>

        </div>
      </div>
  );
};

export default FiltrosContratacionPuntoToma;
