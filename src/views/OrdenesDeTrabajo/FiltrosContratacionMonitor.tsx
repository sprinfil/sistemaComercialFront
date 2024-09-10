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

const FiltrosContratacionMonitor = () => {
  return (
    <div className="overflow-auto min-h-[20vh]">
      <div className="ml-5 mt-5 h-full p-3">
        <div className="flex items-center">
          <div>
            <FiFilter className="w-[3vh] h-[3vh]" />
          </div>
          <div className="text-sm font-medium">Filtros</div>
          <div className="ml-[30vh]">
            <IconButton onClick={""}>
              <LuDelete />
            </IconButton>
          </div>
        </div>

        <div className="flex flex-col mt-6 w-full">
          <div className="text-lg font-semibold mt-4">
            Estado de contratación
          </div>
          <hr className="border-t border-border my-1" />

          <div className="grid grid-cols-2 gap-x-[10vh] mb-2">
            <div className="flex items-center space-x-2">
              <div className="text-sm font-medium mb-2 mt-2">Asignada</div>
              <div className="ml-2">
                <Checkbox className="w-[2.3vh] h-[2.3vh]"/>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="text-sm font-medium mb-2 mt-2">No asignada</div>
              <div className="ml-2">
              <Checkbox className="w-[2.3vh] h-[2.3vh]"/>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="text-sm font-medium mb-2 mt-2">Concluida</div>
              <div className="ml-2">
              <Checkbox className="w-[2.3vh] h-[2.3vh]"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltrosContratacionMonitor;
