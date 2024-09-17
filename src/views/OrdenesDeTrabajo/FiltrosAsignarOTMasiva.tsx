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
const FiltrosAsignarOTMasiva = () => {
  //#regionVARIABLES PARA OBTENER EL VALOR DE LOS FILTROS
  const {
    isAsignadaChecked,
    setIsAsignadaChecked,
    isNoAsignadaChecked,
    setIsNoAsignadaChecked,
    rutaBooleanForLibro,
    isConcluidaChecked,
    setIsConcluidaChecked,
    isCanceladaChecked,
    setIsCanceladaChecked,
    isDomesticaChecked,
    setIsDomesticaChecked,
    isComercialChecked,
    setIsComercialChecked,
    isIndustrialChecked,
    setIsIndustrialChecked,
    isEspecialChecked,
    setIsEspecialChecked,
    idRutaFiltro,
    setIdRutaFiltro,
    idLibroFiltro,
    setIdLibroFiltro,
    saldoMinFiltro,
    setSaldoMinFiltro,
    saldoMaxFiltro,
    setSaldoMaxFiltro,
    isFechaTipo,
    setIsFechaTipo,
    isHastaFecha,
    setIsHastaFecha,
    isDesdeFecha,
    setIsDesdeFecha,
    isCodigoDeTomaFiltro,
    setIsCodigoDeTomaFiltro
  } = ZustandFiltrosOrdenTrabajo();

  //#end



  const location = useLocation(); // Obtiene la ubicación actual

  const isOrdenesTrabajoRoute = location.pathname === "/crear/orden/masiva"; //PARA QUE NO ME APAREZCAN LOS FILTROS DE ARRIBA

  const limpiar = () => {
    setIsAsignadaChecked(false);
    setIsNoAsignadaChecked(false);
    setIsConcluidaChecked(false);
    setIsCanceladaChecked(false);
    setIsDomesticaChecked(false);
    setIsComercialChecked(false);
    setIsIndustrialChecked(false);
    setIsEspecialChecked(false);
    setIdRutaFiltro("");
    setIdLibroFiltro("");
    setSaldoMinFiltro("");
    setSaldoMaxFiltro("");
    setIsFechaTipo("");
    setIsHastaFecha("");
    setIsDesdeFecha("");
    setIsCodigoDeTomaFiltro("");
}














  console.log("Desde: ",isDesdeFecha, "Hasta", isHastaFecha);

console.log(isFechaTipo);
  const handleInputChangeMin = (event) => {
    setSaldoMinFiltro(event.target.value);
  };

  const handleInputChangeMax = (event) => {
    setSaldoMaxFiltro(event.target.value);
  };

  // Estado para manejar el valor seleccionado
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedValue2, setSelectedValue2] = useState("");

  // Función para manejar la selección del concepto
  const handleSelect = (label: string) => {
    console.log("Concepto seleccionado:", label);
    // Aquí puedes hacer lo que necesites con la selección
  };

  // Simulación de un objeto 'field' como lo usarías en un formulario
  const field = {
    value: selectedValue,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedValue(event.target.value);
    },
  };

  const field2 = {
    value: selectedValue2,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedValue2(event.target.value);
    },
  };

  const handleChangeHastaFecha = (event) => {
    setIsHastaFecha(event.target.value);
};

const handleChangeDesdeFecha = (event) => {
  setIsDesdeFecha(event.target.value);
};

const handleChangeCodigoDeToma = (event) => {
  setIsCodigoDeTomaFiltro(event.target.value);
};



  console.log(isCodigoDeTomaFiltro);

  return (
    <div className="overflow-auto min-h-[20vh]">
      <div className="ml-5 mt-5 h-full p-3">
      <div className="flex items-center">
    <div>
        <FiFilter className="w-[3vh] h-[3vh]" />
    </div>
    <div className="text-sm font-medium">Filtros</div>
    <div className="ml-[30vh]">
        <IconButton onClick={limpiar}>
            <MdCleaningServices />
        </IconButton>
    </div>
</div>
  
        {!isOrdenesTrabajoRoute && (
          <div>
            <div className="flex flex-col mt-6 w-full">
            <div className="text-lg font-semibold- mt-4">
            Estado de la orden de trabajo
              </div>
              <hr className="border-t border-border my-1" />
  
              <div className="grid grid-cols-2 gap-x-[10vh] mb-2">
                <div className="flex items-center space-x-2">
                  <div className="text-sm font-medium mb-2 mt-2">Asignada</div>
                  <div className="ml-2">
                    <Checkbox
                      checked={isAsignadaChecked}
                      onCheckedChange={setIsAsignadaChecked}
                    />
                  </div>
                </div>
  
                <div className="flex items-center space-x-2">
                  <div className="text-sm font-medium mb-2 mt-2">No asignada</div>
                  <div className="ml-2">
                    <Checkbox
                      checked={isNoAsignadaChecked}
                      onCheckedChange={setIsNoAsignadaChecked}
                    />
                  </div>
                </div>
  
                <div className="flex items-center space-x-2">
                  <div className="text-sm font-medium mb-2 mt-2">Concluida</div>
                  <div className="ml-2">
                    <Checkbox
                      checked={isConcluidaChecked}
                      onCheckedChange={setIsConcluidaChecked}
                    />
                  </div>
                </div>
  
                <div className="flex items-center space-x-2">
                  <div className="text-sm font-medium mb-2 mt-2">Cancelada</div>
                  <div className="ml-2">
                    <Checkbox
                      checked={isCanceladaChecked}
                      onCheckedChange={setIsCanceladaChecked}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
  
        <div className="text-lg font-semibold- mt-4">Tipo de toma</div>
        <hr className="border-t border-border my-1" />
        <div className="">
          <div className="grid grid-cols-2 gap-2 items-center justify-center">
            <div className="flex items-center">
              <div className="text-sm font-medium mb-2 mt-2">Doméstica</div>
              <div className="ml-2">
                <Checkbox
                  checked={isDomesticaChecked}
                  onCheckedChange={setIsDomesticaChecked}
                />
              </div>
            </div>
            <div className="flex items-center">
              <div className="text-sm font-medium mb-2 mt-2">Comercial</div>
              <div className="ml-2">
                <Checkbox
                  checked={isComercialChecked}
                  onCheckedChange={setIsComercialChecked}
                />
              </div>
            </div>
            <div className="flex items-center">
              <div className="text-sm font-medium mb-2 mt-2">Industrial</div>
              <div className="ml-2">
                <Checkbox
                  checked={isIndustrialChecked}
                  onCheckedChange={setIsIndustrialChecked}
                />
              </div>
            </div>
            <div className="flex items-center">
              <div className="text-sm font-medium mb-2 mt-2">Especial</div>
              <div className="ml-2">
                <Checkbox
                  checked={isEspecialChecked}
                  onCheckedChange={setIsEspecialChecked}
                />
              </div>
            </div>
          </div>
        </div>
  
        <div className="text-lg font-semibold- mt-2">Codigo de toma</div>
        <hr className="border-t border-border my-1" />
        <div className="mt-2">
          <div className="flex items-center space-x-2">
            <div className="text-sm font-medium mb-2 mt-2">Toma</div>
            <div className="ml-2">
            <Input
                value={isCodigoDeTomaFiltro}
                onChange={handleChangeCodigoDeToma}
                placeholder="Escribe algo..."
            />
            </div>
          </div>
          
        </div>
        
        <div className="text-lg font-semibold- mt-2">Ruta y libro</div>
        <hr className="border-t border-border my-1" />
        <div className="mt-2">
          <div className="flex items-center space-x-2">
            <div className="text-sm font-medium mb-2 mt-2">Ruta</div>
            <div className="ml-2">
              <RutaFilterComboBox
                field={field}
                name="id_concepto" // Puedes cambiar esto si es necesario
                setCargoSeleccionado={setIdRutaFiltro}
              />
            </div>
          </div>
          <div className="flex items-center space-x-3 mt-2">
            <div className="text-sm font-medium mb-2">Libro</div>
            <div className="ml-3">
              <LibroFilterComboBox
                field={field2}
                name="id_libro" // Puedes cambiar esto si es necesario
                setCargoSeleccionado={setIdLibroFiltro}
                disabled={rutaBooleanForLibro}
              />
            </div>
          </div>
        </div>
  
        <div className="text-lg font-semibold- mt-2">Saldo</div>
        <hr className="border-t border-border my-1" />
        <div className="flex space-x-5 items-center mt-5">
          <div className="text-sm font-medium mb-2">Minimo</div>
          <div>
            <Input
              id="min"
              className="w-[8vh]"
              value={saldoMinFiltro}
              onChange={handleInputChangeMin}
            />
          </div>
          <div className="text-sm font-medium mb-2">Maximo</div>
          <div>
            <Input
              id="max"
              className="w-[8vh]"
              value={saldoMaxFiltro}
              onChange={handleInputChangeMax}
            />
          </div>

          
        </div>
        {!isOrdenesTrabajoRoute && (
          <>
          <div className="text-lg font-semibold- mt-5">Fechas de ordenes de trabajo</div>
         <hr className="border-t border-border my-1" />
         <div className="">
           <div className="text-sm font-medium mb-2 mt-5">Tipo de fecha</div>
           <div>
           <Select
           onValueChange={(value) => setIsFechaTipo(value)}
           value={isFechaTipo}
       >
           <SelectTrigger>
               <SelectValue placeholder="Selecciona el tipo de fecha" />
           </SelectTrigger>
           <SelectContent>
               <SelectItem value="fecha de generación">Fecha de generación</SelectItem>
               <SelectItem value="fecha_asignacion">Fecha de asignación</SelectItem>
               <SelectItem value="fecha_finalizada ">Fecha de finalización</SelectItem>
           </SelectContent>
           </Select>
           </div>
           <div className="text-sm font-medium mb-2 mt-2">Fecha de inicio</div>
           <div>
           <input
                 type="datetime-local"
                 value={isDesdeFecha}
                 onChange={handleChangeDesdeFecha}
                 className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
 
             />
           </div>
           <div className="text-sm font-medium mb-2 mt-2">Fecha de fin</div>
           <div>
           <input
                 type="datetime-local"
                 value={isHastaFecha}
                 onChange={handleChangeHastaFecha}
                 className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
 
             />
           </div>
           
         </div>
          </>
          
        )} 
       
      </div>
    </div>
  );
}
export default FiltrosAsignarOTMasiva;
