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
import { UsuariosComboBox } from "./UsuariosComboBox.tsx";
import { BuscarUsuarioForm } from "../../views/Usuarios/Contratos/FormsContratos/BuscarUsuarioForm.tsx";

import { ZustandGeneralUsuario } from "../../contexts/ZustandGeneralUsuario";
import { Input } from "./input.tsx";

const ModalMonitorContratacionCotizacion = ({ selected_contrato }) => {
  const { toast } = useToast();
  
  const {boolModalCotizacionMonitor, setBoolModalCotizacionMonitor, MonitorsetDataMonitorContratos,  setLoadingTableMonitorContrato, setBoolModalContratacionCambioDeNombre, boolModalContratacionCambioDeNombre, setControlModalMonitorContratacionClick} =  ZustandFiltrosContratacion();

  console.log(selected_contrato);

  const [operadorSeleccionado, setOperadorSeleccionado] = useState();
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







async function onSubmit(values: z.infer<typeof cambioPropietarioSchema>) {
  const values2 = {
    id: selected_contrato?.id,
    nombre_contrato: values.nombre_contrato,
    id_usuario: usuariosEncontrados[0]?.id,
  };

  const contrato = {
    contrato: values2
  }
  
  console.log(contrato);

  try {
    const response = await axiosClient.put('contratos/cambio_nombre', contrato);

    const mensaje = response.data.message;
    setControlModalMonitorContratacionClick(false);
    toast({
      title: '¡Éxito!',
      description: mensaje,
      variant: 'success',
    });

    
    console.log(response);
  } catch (error) {
    console.error('Error eliminando el contrato:', error);

    toast({
      variant: 'destructive',
      title: 'Oh, no. Error',
      description: 'Algo salió mal.',
      action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
    });
  }
}


  // Función para manejar el cierre del modal
  const handleCloseModal = () => {
    setBoolModalContratacionCambioDeNombre(false);
    setControlModalMonitorContratacionClick(false);
  };
  return (
    <AlertDialog open={boolModalCotizacionMonitor} onOpenChange={setBoolModalCotizacionMonitor}>
      <AlertDialogContent className="max-w-screen-2xl max-h-screen overflow-auto">
        <AlertDialogHeader>
          <div className="flex justify-between items-center">
            {/* Título al principio */}
            <div className="flex">
              <span className="text-lg">Cotizacion</span>
            </div>
            
            
         </div>
          <AlertDialogTitle></AlertDialogTitle>
          <AlertDialogDescription> 
            <div className="overflow-x-auto">
              <div className="min-w-full">
          
              <div>
              Cargo:
            

    
            <div>Servicio de alcantarillado:</div>


              </div>
              </div>

            </div>

          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCloseModal}>
            Cancelar
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalMonitorContratacionCotizacion;
