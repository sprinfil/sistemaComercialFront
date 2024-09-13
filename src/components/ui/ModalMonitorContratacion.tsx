import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast"; //IMPORTACIONES TOAST
import { ToastAction } from "@/components/ui/toast"; //IMPORTACIONES TOAST
import EscogerOrdenDeTrabajoTable from "../Tables/Components/EscogerOrdenDeTrabajoTable";
import axiosClient from "../../axios-client";
import { ZustandGeneralUsuario } from "../../contexts/ZustandGeneralUsuario";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form.tsx";
import { OperadoresOtIndividualComboBox } from "./OperadoresOtIndividualComboBox.tsx";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrdenDeTrabajoAsignarIndividualSchema } from "../Forms/OrdenDeTrabajoValidaciones.ts";
import { z } from "zod";
import { Button } from "./button.tsx";
import AsignarOrdenDeTrabajoTable from "../Tables/Components/AsignarOrdenDeTrabajoTable.tsx";
import { ZustandFiltrosOrdenTrabajo } from "../../contexts/ZustandFiltrosOt.tsx";
import AsignarOrdenDeTrabajoIndividualEnDetalleUsuarioTable from "../Tables/Components/AsignarOrdenDeTrabajoIndividualEnDetalleUsuarioTable.tsx";
import { MdDeleteOutline } from "react-icons/md";
import IconButton from "./IconButton.tsx";
import { FaUserEdit } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaTools } from "react-icons/fa";
import MarcoForm from "./MarcoForm.tsx";
import MarcoFormModalContratoMonitor from "./MarcoFormModalContratoMonitor.tsx";
import { ZustandFiltrosContratacion } from "../../contexts/ZustandFiltrosContratacion.tsx";
import ModalMonitorContratacionCambioDePropietario from "./ModalMonitorContratacionCambioDePropietario.tsx";
import { MdOutlinePriceChange } from "react-icons/md";
import ModalMonitorContratacionCotizacion from "./ModalMonitorContratacionCotizacion.tsx";
import ModalMonitorContratacionCotizacionAgua from "./ModalMonitorContratacionCotizacionAgua.tsx";
import ModalMonitorContratacionCotizacionAlcantarilladoSaneamiento from "./ModalMonitorContratacionCotizacionAlcantarilladoSaneamiento.tsx";
import { TooltipMessage } from "./TooltipMessage.tsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
const ModalMonitorContratacion = ({ selected_contrato, open, set_open}) => {
  const { toast } = useToast();
  
  const {setDataMonitorContratos,  setLoadingTableMonitorContrato, boolModalContratacionMonitor, setBoolModalContratacionMonitor, 
    setBoolModalContratacionCambioDeNombre, setControlModalMonitorContratacionClick,setBoolModalCotizacionMonitor} =  ZustandFiltrosContratacion();

  console.log(selected_contrato);


  const fetch_contratos = async () => {
    setLoadingTableMonitorContrato(true);
    try {
      const response = await axiosClient.get("/contratos");
      setLoadingTableMonitorContrato(false);
      setDataMonitorContratos(response.data.contrato);
      setBoolModalContratacionMonitor(false);
      console.log(response.data.contrato);
    } catch (error) {
      setLoadingTableMonitorContrato(false);
      console.error("Failed to fetch contratos:", error);
    }
  }

  const handleBorrarContrato = async () => {
    if (!selected_contrato) {
      toast({
        variant: "warning",
        title: "Advertencia",
        description: "No hay contrato seleccionado para eliminar.",
      });
      return;
    }
  
    try {
    const  response =  await axiosClient.delete(`contratos/log_delete/${selected_contrato.id}`);
      
      const mensaje = response.data.message;
      toast({
        title: "¡Éxito!",
        description: mensaje,
        variant: "success",
      });
      fetch_contratos();
      console.log(response);
    } catch (error) {

      console.error("Error eliminando el contrato:", error);
      toast({
        variant: "destructive",
        title: "Oh, no. Error",
        description: "Algo salió mal.",
        action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
      });
    }
  };
  

  const handleCambioDePropietarioModal = () => {
    setBoolModalContratacionCambioDeNombre(true);
  }

  const handleCotizacionModal= () => {

    
      setBoolModalCotizacionMonitor(true);
  }
  


  const handleCerrarContrato = async () => {
 
    const values = {
      contrato: {
        id: selected_contrato.id
      }
    };

    console.log(values);

    try {
    const  response =  await axiosClient.put(`contratos/cerrar`, values);
      
      const mensaje = response.data.message;
      toast({
        title: "¡Éxito!",
        description: mensaje,
        variant: "success",
      });
      fetch_contratos();
      set_open(false);
      console.log(response);
    } catch (response) {
      const mensaje = response.request.response
     
        
        console.error("Error eliminando el contrato:", response);
        toast({
          variant: "destructive",
          title: "Oh, no. Error",
          description: mensaje,
          action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
        });
      

      }

     
  };
  

  return (
    <AlertDialog open={open} onOpenChange={set_open}>
      <AlertDialogContent className="max-w-[180vh] max-h-[102vh] ">
        <AlertDialogHeader>
        <span className="font-bold text-lg">Detalle del contrato</span>
          <div className="ml-[60vh] bg-muted w-[38vh] rounded-lg">
            {/* Título al principio */}
            <div className="flex">
            </div>

            {/* Iconos con títulos */}
            <div className="flex space-x-2">
    
          

          <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                  <IconButton onClick={handleBorrarContrato}>
                      <MdDeleteOutline className="w-[8vh] h-[5vh]" />
                    </IconButton>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Eliminar contrato</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
               
               
                <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                  <div className="w-[6vh]">
                  <IconButton>
                    <FaEdit className="w-[8vh] h-[5vh]" />
                </IconButton>
                </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Editar contrato</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>



              

              <div className="w-[6vh]" title="Cotización">
                <IconButton onClick={handleCotizacionModal}>
                  <MdOutlinePriceChange className="w-[8vh] h-[5vh]" />
                </IconButton>
                {selected_contrato?.servicio_contratado == "alcantarillado y saneamiento" &&
                 <ModalMonitorContratacionCotizacionAlcantarilladoSaneamiento
                 selected_contrato={selected_contrato}/>}

            {selected_contrato?.servicio_contratado == "agua" &&
                 <ModalMonitorContratacionCotizacionAgua
                 selected_contrato={selected_contrato}/>}
               
              </div>

              <div className="w-[6vh]" title="Cambio de propietario">
                <IconButton onClick={handleCambioDePropietarioModal}>
                  <FaUserEdit className="w-[8vh] h-[5vh]" />
                </IconButton>
                <ModalMonitorContratacionCambioDePropietario
                selected_contrato={selected_contrato}
                />
              </div>

              <div className="w-[5vh]" title="Consultar factibilidad">
                <IconButton>
                  <FaTools className="w-[8vh] h-[5vh]" />
                </IconButton>
              </div>

              <div className="w-[5vh]" title="Cerrar contrato" onClick={handleCerrarContrato}>
                <IconButton>
                  <FaCheckCircle className="w-[8vh] h-[5vh]" />
                </IconButton>
              </div>
            </div>
          </div>

          <AlertDialogTitle></AlertDialogTitle>
          <AlertDialogDescription>
            <div className="mb-[5vh]">
              <MarcoFormModalContratoMonitor title={"Datos del contrato"}>
                <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className=" dark:text-gray-400 font-medium mb-1">
                    Nombre de contrato:
                  </div>
                  <p className="text-gray-800 dark:text-gray-200">
                    {selected_contrato?.nombre_contrato}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className=" dark:text-gray-400 font-medium mb-1">
                  Folio de solicitud:
                  </div>
                  <p className="text-gray-800 dark:text-gray-200">
                  {selected_contrato?.folio_solicitud}
                  </p>
                </div>
                
              </MarcoFormModalContratoMonitor>
            </div>

            <MarcoFormModalContratoMonitor title={"Datos de la toma"}>
            <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className=" dark:text-gray-400 font-medium mb-1">
                  Clave catastral:
                  </div>
                  <p className="text-gray-800 dark:text-gray-200">
                  {selected_contrato?.clave_catastral}
                  </p>
                </div>
             

                <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className=" dark:text-gray-400 font-medium mb-1">
                  Calle:
                  </div>
                  <p className="text-gray-800 dark:text-gray-200">
                  {selected_contrato?.calle}
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className=" dark:text-gray-400 font-medium mb-1">
                  Numero de casa:
                  </div>
                  <p className="text-gray-800 dark:text-gray-200">
                  {selected_contrato?.num_casa}
                  </p>
                </div>


                <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className=" dark:text-gray-400 font-medium mb-1">
                  Entre calle 1:
                  </div>
                  <p className="text-gray-800 dark:text-gray-200">
                  {selected_contrato?.entre_calle1}
                  </p>
                </div>




                <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className=" dark:text-gray-400 font-medium mb-1">
                  Entre calle 2:
                  </div>
                  <p className="text-gray-800 dark:text-gray-200">
                  {selected_contrato?.entre_calle2}
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className=" dark:text-gray-400 font-medium mb-1">
                  Localidad:
                  </div>
                  <p className="text-gray-800 dark:text-gray-200">
                  {selected_contrato?.localidad}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className=" dark:text-gray-400 font-medium mb-1">
                  Municipio
                  </div>
                  <p className="text-gray-800 dark:text-gray-200">
                  {selected_contrato?.municipio}
                  </p>
                </div>


                <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className=" dark:text-gray-400 font-medium mb-1">
                  Servicio contratado:

                  </div>
                  <p className="text-gray-800 dark:text-gray-200">
                  {selected_contrato?.servicio_contratado}
                  </p>
                </div>


             
                <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className=" dark:text-gray-400 font-medium mb-1">
                  Estatus:

                  </div>
                  <p className="text-gray-800 dark:text-gray-200">
                  {selected_contrato?.estatus}
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className=" dark:text-gray-400 font-medium mb-1">
                  Diametro de la toma:

                  </div>
                  <p className="text-gray-800 dark:text-gray-200">
                  {selected_contrato?.diametro_de_la_toma}
                  </p>
                </div>
          
         
            </MarcoFormModalContratoMonitor>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setBoolModalContratacionMonitor(false)}>
            Cancelar
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalMonitorContratacion;
