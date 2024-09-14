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
import { GoDownload, GoUpload } from "react-icons/go";
import ModalSubirArchivosContratacion from "./ModalSubirArchivosContratacion.tsx";
import { Input } from "./input.tsx";




const ModalMonitorContratacion = ({ selected_contrato, open, set_open}) => {
  const { toast } = useToast();
  
  const {setDataMonitorContratos,  setLoadingTableMonitorContrato, boolModalContratacionMonitor, setBoolModalContratacionMonitor, 
    setBoolModalContratacionCambioDeNombre, setControlModalMonitorContratacionClick,setBoolModalCotizacionMonitor,setBooleanModalSubirArchivosContratacion, setIdContrato, idContrato} =  ZustandFiltrosContratacion();

  //console.log(selected_contrato);
    //console.log(selected_contrato?.id_toma)
    //setIdContrato(selected_contrato?.id_toma)
    //console.log(idContrato);

    
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
    } catch (err) {
      const mensaje = err.response?.data?.message || "No se pudo cerrar el contrato.";

     console.log(err);
        
        toast({
          variant: "destructive",
          title: "Oh, no. Error",
          description: mensaje,
          action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
        });
      

      }

     
  };

  const handleSubirArchivos = () => 
  {
    setBooleanModalSubirArchivosContratacion(true);

  }

  const handleDescargarContrato = () => {
    axiosClient.get(`/contratos/imprimirContrato/${selected_contrato?.id}`, { responseType: 'blob' })
      .then((response) => {

        // Crea un nuevo objeto URL para el blob recibido
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const fileName = `contrato_folio_${selected_contrato?.folio_solicitud}.pdf`;

        // Crea un enlace temporal y haz clic en él para descargar el archivo
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        
      
        window.URL.revokeObjectURL(url);
  
        toast({
          title: "¡Éxito!",
          description: "El contrato se descargó.",
          variant: "success",
        });
      })
      .catch((err) => {
        console.error("Error descargando el contrato:", err);
        toast({
          variant: "destructive",
          title: "Oh, no. Error",
          description: "No se pudo descargar el contrato.",
          action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
        });
      });
  };
  

  return (
    <AlertDialog open={open} onOpenChange={set_open}>
      <AlertDialogContent className="max-w-[180vh] max-h-[102vh] ">
        <AlertDialogHeader>
        <span className="font-bold text-lg">Detalle del contrato</span>
          <div className="ml-[63vh] bg-muted w-[46vh] rounded-lg">
            {/* Título al principio */}
            <div className="flex">
            </div>

            {/* Iconos con títulos */}
            <div className="flex space-x-2">
    
          

          <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                  <IconButton onClick={handleBorrarContrato}>
                      <MdDeleteOutline className="w-[3.5vh] h-[3.5vh]" />
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
                  <IconButton>
                    <FaEdit className="w-[3vh] h-[3vh]" />
                </IconButton>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Editar contrato</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>


              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                  <IconButton onClick={handleCotizacionModal}>
                  <MdOutlinePriceChange className="w-[3.5vh] h-[3.5vh]" />
                </IconButton>
                {selected_contrato?.servicio_contratado == "alcantarillado y saneamiento" &&
                 <ModalMonitorContratacionCotizacionAlcantarilladoSaneamiento
                 selected_contrato={selected_contrato}/>}

            {selected_contrato?.servicio_contratado == "agua" &&
                 <ModalMonitorContratacionCotizacionAgua
                 selected_contrato={selected_contrato}/>}

                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Cotización</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>



              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                  <IconButton onClick={handleCambioDePropietarioModal}>
                  <FaUserEdit className="w-[3.5vh] h-[3.5vh]" />
                </IconButton>
                <ModalMonitorContratacionCambioDePropietario
                selected_contrato={selected_contrato}
                />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Cambio de propietario</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

               
      

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                  <IconButton>
                  <FaTools className="w-[3vh] h-[3vh]" />
                </IconButton>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Consultar factibilidad</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              


              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                  <IconButton onClick={handleSubirArchivos}>
                  <GoUpload className="w-[3.7vh] h-[3.7vh]" />
                  <ModalSubirArchivosContratacion
                  selected_contrato={selected_contrato}/>
                </IconButton>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Subir archivos</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                  <IconButton onClick={handleDescargarContrato}>
                  <GoDownload  className="w-[3.7vh] h-[3.7vh]" />
                </IconButton>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Descargar contrato</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                  <IconButton onClick={handleCerrarContrato}>
                  <FaCheckCircle className="w-[3.5vh] h-[3.5vh]" />
                </IconButton>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Cerrar contrato</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

            </div>
          </div>

          <AlertDialogTitle></AlertDialogTitle>
          <AlertDialogDescription>
            <div className="mb-[5vh]">
              <MarcoFormModalContratoMonitor title={"Datos del contrato"}>

              <div className="flex flex-col space-y-2">
                <div className="block text-sm font-medium text-gray-700">Folio de solicitud:</div>
                <Input
                  value={selected_contrato?.folio_solicitud|| ""}
                  ></Input>


                </div>

                <div className="flex flex-col space-y-2">
                <div className="block text-sm font-medium text-gray-700">Nombre del contrato:</div>
                <Input
                  value={selected_contrato?.nombre_contrato || ""}
                  ></Input>

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
