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
import { DetalleContrato } from "../../views/Usuarios/Contratos/DetalleContrato.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ModalEstasSeguroEliminarContrato from "./ModalEstasSeguroEliminarContrato.tsx";
import { CotizacionContrato } from "../../views/Usuarios/Contratos/FormsContratos/CotizacionContrato.tsx";




const ModalMonitorContratacion = ({ selected_contrato, open, set_open}) => {
  const { toast } = useToast();
  
  const {setDataMonitorContratos,  setLoadingTableMonitorContrato, boolModalContratacionMonitor, setBoolModalContratacionMonitor, 
    setBoolModalContratacionCambioDeNombre, setControlModalMonitorContratacionClick,setBoolModalCotizacionMonitor,
    setBooleanModalSubirArchivosContratacion, setIdContrato, idContrato, setAccion} =  ZustandFiltrosContratacion();

    const[openEliminar, setOpenEliminar] = useState(false);

    const [abrirModalCotizacionAgua, setAbrirModalCotizacionAgua] = useState(false);
    const [abrirModalCotizacionAlcantarilladoS, setAbrirModalCotizacionAlcantarilladoS] = useState(false);

  //console.log(selected_contrato);
    //console.log(selected_contrato?.id_toma)
    //setIdContrato(selected_contrato?.id_toma)
    //console.log(idContrato);
    const [activeTab, setActiveTab] = useState("Detalles");

    const opciones = [
      {
        titulo: "Detalles",
        componente: <DetalleContrato selected_contrato={selected_contrato}/>
      },
      {
        titulo: "Cotizacion",
        componente: <CotizacionContrato  selected_contrato={selected_contrato}/>
      },
      {
        titulo: "Contrato",
        componente: ""
      },
    ]
  
    
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

  const handleAbrirModalEliminarContrato = async () => {
    setOpenEliminar(true);
  };
  

  const handleCambioDePropietarioModal = () => {
    setBoolModalContratacionCambioDeNombre(true);
  }

  const handleCotizacionModal= () => {

    
      setBoolModalCotizacionMonitor(true);
      setAbrirModalCotizacionAlcantarilladoS(true)
      setAbrirModalCotizacionAgua(true);
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


  const handleFactibilidad = async () => {
 
   

    try {
    const  response =  await axiosClient.get(`Tomas/factibilidades/${selected_contrato?.toma?.codigo_toma}`);
      
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
    axiosClient.get(`/contratos/imprimirContrato/${selected_contrato?.id}`, {
      responseType: 'arraybuffer' 
    })
    .then((response) => {
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const newTab = window.open(url, '_blank');
    
      if (newTab) {
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
        }, 100);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudo abrir el documento en una nueva pestaña. Verifica la configuración del navegador.",
        });
      }
    
      toast({
        title: "¡Éxito!",
        description: "El contrato se abrió en una nueva pestaña.",
        variant: "success",
      });
    })
    .catch((err) => {
      console.error("Error abriendo el contrato:", err);
      toast({
        variant: "destructive",
        title: "Oh, no. Error",
        description: "No se pudo abrir el contrato.",
        action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
      });
    });
    
  };
  

  const handleEditarContrato = () => {
    setAccion("editar")
  }
  

  return (
    <AlertDialog open={open} onOpenChange={set_open}>
<AlertDialogContent className="w-full max-w-full max-h-[full] p-9 overflow-hidden ">
<AlertDialogHeader>
        <span className="font-bold text-lg">Detalle del contrato</span>
        <div className="bg-muted h-[6vh]">
           

            {/* Iconos con títulos */}
            <div className="flex justify-center items-center space-x-4 m-1 ">
    
          

          <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    {
                       selected_contrato.estatus != "contratado" &&
                       <IconButton onClick={handleAbrirModalEliminarContrato}>
                       <MdDeleteOutline className="w-[3.5vh] h-[3.5vh]" />
                     </IconButton>
                    }
                 
                    <ModalEstasSeguroEliminarContrato
                    selected_contrato={selected_contrato}
                    boolEliminar={openEliminar}
                    setBoolEliminar={setOpenEliminar}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Eliminar contrato</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
               
               
                {/*<TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    {
                      selected_contrato.estatus != "contratado" && 
                      <IconButton onClick={handleEditarContrato} >
                      <FaEdit className="w-[3vh] h-[3vh]"/>
                     </IconButton>
                    }
                 
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Editar contrato</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>*/}


              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    {                       selected_contrato.estatus != "contratado" &&
                     <IconButton onClick={handleCotizacionModal}>
                     <MdOutlinePriceChange className="w-[3.5vh] h-[3.5vh]" />
                   </IconButton>
                    }
                 
                {selected_contrato?.servicio_contratado == "alcantarillado y saneamiento" &&
                 <ModalMonitorContratacionCotizacionAlcantarilladoSaneamiento
                 selected_contrato={selected_contrato}
                 open={abrirModalCotizacionAlcantarilladoS}
                 setOpen={setAbrirModalCotizacionAlcantarilladoS}
             />}

              {selected_contrato?.servicio_contratado == "agua" &&
                 <ModalMonitorContratacionCotizacionAgua
                 selected_contrato={selected_contrato}
                 open={abrirModalCotizacionAgua}
                 setOpen={setAbrirModalCotizacionAgua}/>}

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
                  <IconButton onClick={handleFactibilidad}>
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
    

     
          {/*Formulario*/}
          <div className='w-full rounded-md border border-border h-[80vh] p-4 overflow-auto'>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                {opciones.map((opcion, index) => (
                  <>
                    <TabsTrigger value={opcion.titulo} key={index}>{opcion.titulo}</TabsTrigger>
                  </>
                ))}
              </TabsList>
              {opciones.map((opcion, index) => (
                <>
                  <TabsContent value={opcion.titulo} key={index}>{opcion.componente}</TabsContent>
                </>
              ))}
            </Tabs>
          </div>

       
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => {setBoolModalContratacionMonitor(false); setAccion("")}} className="w-[10vh] bg-red-500 border  border-black">
            Salir
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalMonitorContratacion;
