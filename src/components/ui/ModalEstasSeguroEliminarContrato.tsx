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
import { cambioPropietarioSchema } from "../Forms/validaciones.ts";
import { z } from "zod";
import { ZustandFiltrosContratacion } from "../../contexts/ZustandFiltrosContratacion.tsx";
import { ZustandGeneralUsuario } from "../../contexts/ZustandGeneralUsuario";

const ModalEstasSeguroEliminarContrato = ({ selected_contrato, boolEliminar, setBoolEliminar }) => {
  const { toast } = useToast();
  
  const {boolModalCotizacionMonitor, setBoolModalCotizacionMonitor, MonitorsetDataMonitorContratos,  
    setLoadingTableMonitorContrato, setBoolModalContratacionCambioDeNombre, boolModalContratacionCambioDeNombre,
     setControlModalMonitorContratacionClick, setDataMonitorContratos,setBoolModalContratacionMonitor} =  ZustandFiltrosContratacion();

  console.log(selected_contrato);

  const {usuariosEncontrados, } = ZustandGeneralUsuario();


console.log(usuariosEncontrados[0]?.id);

console.log(selected_contrato?.id);





const form = useForm<z.infer<typeof cambioPropietarioSchema>>({
  resolver: zodResolver(cambioPropietarioSchema),
  defaultValues: {
      id: 0,
      nombre_contrato: "",
  },
})


    
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
    setBoolEliminar(false);
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


  // Función para manejar el cierre del modal
  const handleCloseModal = () => {
    setBoolModalContratacionCambioDeNombre(false);
    setControlModalMonitorContratacionClick(false);
  };



  return (
    <AlertDialog open={boolEliminar} onOpenChange={setBoolEliminar}>
      <AlertDialogContent className="max-w-screen-sm overflow-auto">
        <AlertDialogHeader>
        
          <AlertDialogTitle>¿Estás seguro de que deseas eliminar este contrato?</AlertDialogTitle>
          <AlertDialogDescription> 
            <div className="overflow-x-auto">

            </div>

          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleBorrarContrato}>Aceptar</AlertDialogAction>
          <AlertDialogCancel onClick={handleCloseModal}>
            Cancelar
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalEstasSeguroEliminarContrato;
