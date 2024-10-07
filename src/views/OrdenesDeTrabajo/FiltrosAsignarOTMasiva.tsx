import React, { useState, useEffect } from "react";
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
import { FaSearch } from "react-icons/fa";
import { LuFilterX } from "react-icons/lu";
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
import axiosClient from "../../axios-client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
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
    setIsCodigoDeTomaFiltro, setLoadingTableFiltrarOrdenDeTrabajoMasivas
    ,setvalorParaSaberSiUsaLaTablaDeFiltros, setInformacionRecibidaPorFiltrosMonitorOrdenDeTrabajo,
    setLoadingTableMonitor,setInformacionRecibidaPorFiltrosGenerarOtMasiva
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














  console.log("Desde: ", isDesdeFecha, "Hasta", isHastaFecha);

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


  const getOrdenesDeTrabajoFiltrosMonitor = async () => {
    setLoadingTableFiltrarOrdenDeTrabajoMasivas(true);
    const values = {
      asignada: isAsignadaChecked,
      no_asignada: isNoAsignadaChecked,
      concluida: isConcluidaChecked,
      cancelada: isCanceladaChecked,
      domestica: isDomesticaChecked,
      comercial: isComercialChecked,
      industrial: isIndustrialChecked,
      especial: isEspecialChecked,
      ruta_id: idRutaFiltro,
      libro_id: idLibroFiltro,
      saldo_min: saldoMinFiltro,
      saldo_max: saldoMaxFiltro,
      fecha_tipo:  isFechaTipo,
      fecha_inicio :isDesdeFecha ,
      fecha_fin:isHastaFecha,
      codigo_toma:isCodigoDeTomaFiltro
    };
    console.log("VALORES ENVIADOS", values);
    try {
      const response = await axiosClient.post("OrdenTrabajo/filtros", values);
      console.log(response);
      setvalorParaSaberSiUsaLaTablaDeFiltros(true);
      setLoadingTableFiltrarOrdenDeTrabajoMasivas(false);
      limpiar();
      if (Array.isArray(response.data.ordenes_trabajo)) {
        const tomas = response.data.ordenes_trabajo.map((item: any) => item);
        console.log("Tomas extraídas", tomas);
        setInformacionRecibidaPorFiltrosMonitorOrdenDeTrabajo(tomas);
        setIdLibroFiltro("");
        setIdRutaFiltro("");
      } else {
        console.log("No jala", response.data.ordenes_trabajo);
      }
    } catch (error) {
      setLoadingTableFiltrarOrdenDeTrabajoMasivas(false);
      console.error("Failed to fetch ot:", error);
    }
  };

  const getOrdenesDeTrabajoGenerarOrdenDeTrabajoMasivas = async () => {
    setLoadingTableMonitor(true);
    const values = {
      asignada: "",
      no_asignada: "",
      concluida: "",
      cancelada: "",
      domestica: isDomesticaChecked,
      comercial: isComercialChecked,
      industrial: isIndustrialChecked,
      especial: isEspecialChecked,
      ruta_id: idRutaFiltro,
      libro_id: idLibroFiltro,
      saldo_min: saldoMinFiltro,
      saldo_max: saldoMaxFiltro,
      fecha_tipo:  isFechaTipo,
      fecha_inicio :isDesdeFecha ,
      fecha_fin:isHastaFecha,
      codigo_toma:isCodigoDeTomaFiltro,
    }
    console.log("VALORES ENVIADOS", values);
    try {
      const response = await axiosClient.post("Toma/tipo/", values);
      console.log(response);


      if (Array.isArray(response.data.tomas)) {
        const tomas = response.data.tomas.map((item: any) => item);

        console.log("Tomas extraídas", tomas);
        setLoadingTableMonitor(false);
        setInformacionRecibidaPorFiltrosGenerarOtMasiva(tomas);
        limpiar();
      } else {
        console.log("No jala", response.data.ordenes_trabajo);
      }

    } catch (error) {
      setLoadingTableMonitor(false);
      console.error("Failed to fetch anomalias:", error);
    }
  };

  console.log(isCodigoDeTomaFiltro);





  return (
    <ContextMenu>
      <ContextMenuTrigger className="">
    <div className="overflow-auto min-h-[90vh]">
  
    
      <div>
        
      <div className='w-full p-4 bg-muted shadow-md mb-2 flex items-center'>
      <FiFilter className="w-[4vh] h-[4vh]" />
        <p>Filtros</p>
        
        {!isOrdenesTrabajoRoute ?
       <div className="ml-auto">
       {/** ESTE ES EL BUSCAR DE EL MONITOR DE ORDENES DE TRABAJO */}
     <IconButton title="Filtrar" onClick={getOrdenesDeTrabajoFiltrosMonitor} >
       <FaSearch className="w-[2.5vh] h-[2.5vh]" />
     </IconButton>
   </div>
   :
   <div className="ml-auto">
        {/** ESTE ES EL BUSCAR DE GENERAR ORDEN DE TRABAJO MASIVAS*/}
      <IconButton title="Buscar" >
        <FaSearch className="w-[2.5vh] h-[2.5vh]" onClick={getOrdenesDeTrabajoGenerarOrdenDeTrabajoMasivas}/>
      </IconButton>
      </div>
      }
      </div>
      <div className='p-4'>
        <Accordion collapsible className="w-full" type="multiple" defaultValue={["item-1", "item-2"]}>
          <AccordionItem value="item-1">
            <AccordionTrigger>Estado de la orden de trabajo</AccordionTrigger>
            <AccordionContent>
            {!isOrdenesTrabajoRoute && (
          <div>
            <div className="flex flex-col mt-6 w-full">
              <div className="grid grid-cols-2 gap-x-[10vh] mb-2">
                <div className="flex items-center space-x-2">
                  <div className="text-base font-medium mb-2 mt-2">Asignada</div>
                  <div className="ml-2">
                    <Checkbox
                      checked={isAsignadaChecked}
                      onCheckedChange={setIsAsignadaChecked}
                      className="w-[2.7vh] h-[2.7vh]"
                      />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="text-sm font-medium mb-2 mt-2">No asignada</div>
                  <div className="ml-2">
                    <Checkbox
                      checked={isNoAsignadaChecked}
                      onCheckedChange={setIsNoAsignadaChecked}
                      className="w-[2.7vh] h-[2.7vh]"

                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="text-sm font-medium mb-2 mt-2">Concluida</div>
                  <div className="ml-4">
                    <Checkbox
                      checked={isConcluidaChecked}
                      onCheckedChange={setIsConcluidaChecked}
                      className="w-[2.7vh] h-[2.7vh] ml-1"

                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="text-sm font-medium mb-2 mt-2">Cancelada</div>
                  <div className="ml-2">
                    <Checkbox
                      checked={isCanceladaChecked}
                      onCheckedChange={setIsCanceladaChecked}
                      className="w-[2.7vh] h-[2.7vh] ml-3"

                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Tipo de toma</AccordionTrigger>
            <AccordionContent>
            <div className="grid grid-cols-2 gap-x-[10vh] mb-2">
        <div className="flex items-center">
              <div className="text-sm font-medium mb-2 mt-2">Doméstica</div>
              <div className="ml-2">
                <Checkbox
                  checked={isDomesticaChecked}
                  onCheckedChange={setIsDomesticaChecked}
                  className="w-[2.7vh] h-[2.7vh]"

                />
              </div>
            </div>
            <div className="flex items-center">
              <div className="text-sm font-medium mb-2 mt-2">Comercial</div>
              <div className="ml-2">
                <Checkbox
                  checked={isComercialChecked}
                  onCheckedChange={setIsComercialChecked}
                  className="w-[2.7vh] h-[2.7vh]"

                />
              </div>
            </div>
            <div className="flex items-center">
              <div className="text-sm font-medium mb-2 mt-2">Industrial</div>
              <div className="ml-3">
                <Checkbox
                  checked={isIndustrialChecked}
                  onCheckedChange={setIsIndustrialChecked}
                  className="w-[2.7vh] h-[2.7vh] ml-1"

                />
              </div>
            </div>
            <div className="flex items-center">
              <div className="text-sm font-medium mb-2 mt-2">Especial</div>
              <div className="ml-2">
                <Checkbox
                  checked={isEspecialChecked}
                  onCheckedChange={setIsEspecialChecked}
                  className="w-[2.7vh] h-[2.7vh] ml-3"

                />
              </div>
            </div>
          </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Código de toma</AccordionTrigger>
            <AccordionContent>
            <Input
                value={isCodigoDeTomaFiltro}
                onChange={handleChangeCodigoDeToma}
                placeholder="Escribe el código de toma..."
                className="w-[43vh]"
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Ruta y Libro</AccordionTrigger>
            <AccordionContent>
            <div className="mt-5">
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
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>Saldo</AccordionTrigger>
            <AccordionContent>
            <div className="flex space-x-5 items-center mt-5">
          <div className="text-sm font-medium mb-2">Minimo</div>
          <div className="mb-5">
            <Input
              id="min"
              className="w-[8vh]"
              value={saldoMinFiltro}
              onChange={handleInputChangeMin}
            />
          </div>
          <div className="text-sm font-medium mb-2">Maximo</div>
          <div className="mb-5">
            <Input
              id="max"
              className="w-[8vh]"
              value={saldoMaxFiltro}
              onChange={handleInputChangeMax}
            />
          </div>


        </div>
            </AccordionContent>
          </AccordionItem>
          {!isOrdenesTrabajoRoute && (
          <>
             <AccordionItem value="item-6">
          
          <AccordionTrigger>Fechas de las ordenes de trabajo</AccordionTrigger>
          <AccordionContent>
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
            <div className="text-sm font-medium mb-2 mt-5">Fecha de inicio</div>
            <div>
              <input
                type="datetime-local"
                value={isDesdeFecha}
                onChange={handleChangeDesdeFecha}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"

              />
            </div>
            <div className="text-sm font-medium mb-2 mt-5">Fecha de fin</div>
            <div>
              <input
                type="datetime-local"
                value={isHastaFecha}
                onChange={handleChangeHastaFecha}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"

              />
            </div>

          </div>
          </AccordionContent>
        </AccordionItem>
          
          </>

        )}
         
        </Accordion>
      </div>
    </div>
      
      <ContextMenuContent className="w-64">
        {!isOrdenesTrabajoRoute ?
         <ContextMenuItem onClick={getOrdenesDeTrabajoFiltrosMonitor}>
         <IconButton >Buscar</IconButton>
       </ContextMenuItem>
       :
       <ContextMenuItem onClick={getOrdenesDeTrabajoGenerarOrdenDeTrabajoMasivas}>
       <IconButton >Buscar</IconButton>
     </ContextMenuItem>
        }
     
        <ContextMenuItem onClick={limpiar}>
          <IconButton >Limpiar filtros</IconButton>
        </ContextMenuItem>
      </ContextMenuContent>
    </div>
    </ContextMenuTrigger>

    </ContextMenu>

  );
}
export default FiltrosAsignarOTMasiva;
