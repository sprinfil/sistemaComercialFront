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
import { ConceptosComboBox } from "./ConceptosComboBox.tsx";
import { ConceptosComboBoxCotizacion } from "./ConceptosComboBoxCotizacion.tsx";
import ComboBoxCargosCargables from "./ComboBoxCargosCargables.tsx";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { LiaFileDownloadSolid } from "react-icons/lia";


const ModalMonitorContratacionConsultarFactibilidad = ({ selected_contrato, open, setOpen }) => {
  const { toast } = useToast();
  
  const {boolModalCotizacionMonitor, setBoolModalCotizacionMonitor, MonitorsetDataMonitorContratos,  setLoadingTableMonitorContrato, setBoolModalContratacionCambioDeNombre, boolModalContratacionCambioDeNombre, setControlModalMonitorContratacionClick} =  ZustandFiltrosContratacion();

  console.log(selected_contrato);

  const [operadorSeleccionado, setOperadorSeleccionado] = useState();
  const {usuariosEncontrados, } = ZustandGeneralUsuario();


console.log(usuariosEncontrados[0]?.id);

console.log(selected_contrato?.toma?.id_tipo_toma);



const [verArchivos, setVerArchivos] = useState([]);

useEffect(() => {
  handleFactibilidad();
}, [])



const handleFactibilidad = async () => {
 
   
 // setAbrirModalFactibilidad(true);
  try {
  const  response =  await axiosClient.get(`Tomas/factibilidades/${selected_contrato?.toma?.codigo_toma}`);
    

    const archivosArray = Array.isArray(response.data) ? response.data : [response.data];

    setVerArchivos(archivosArray);
    console.log(response.data);
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
const handleDownload = async (url) => {
  try {
    const response = await axiosClient.get(`/archivo/download/${url}`, {
      responseType: 'arraybuffer'  // Importante para recibir el archivo en formato binario
    });

    const blob = new Blob([response.data], { type: 'application/pdf' }); 
    const fileUrl = window.URL.createObjectURL(blob);

    const newTab = window.open(fileUrl, '_blank');

    if (newTab) {
      setTimeout(() => {
        window.URL.revokeObjectURL(fileUrl);
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
      description: "El archivo se abrió en una nueva pestaña.",
      variant: "success",
    });
  } catch (err) {
    console.error("Error abriendo el archivo:", err);
    toast({
      variant: "destructive",
      title: "Oh, no. Error",
      description: "No se pudo abrir el archivo.",
      action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
    });
  }
};




  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="max-w-screen-2xl max-h-screen overflow-auto">
        <AlertDialogHeader>
         
          <AlertDialogTitle>Factibilidad</AlertDialogTitle>
          <AlertDialogDescription> 
      
       <Table className="mt-5">
  <TableCaption></TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead >Archivo</TableHead>
      <TableHead>Tipo</TableHead>
      <TableHead>Fecha de Creación</TableHead>
      <TableHead>Descargar</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    
    {verArchivos.map((item, index) => (
      item.archivos.map((archivo) => (
        <TableRow key={archivo.id}>
          <TableCell className="text-sm">{archivo.url}</TableCell>
          <TableCell  className="text-sm">{archivo.tipo}</TableCell>
          <TableCell  className="text-sm">{archivo.fecha_creacion}</TableCell>
          <TableCell  className="text-sm"><div className="w-[5vh] h-[5vh] flex items-center justify-center">
            <IconButton onClick={() => handleDownload(archivo.url)}>
              <LiaFileDownloadSolid className="w-[4vh] h-[4vh]" /> 
            </IconButton>
          </div>
          </TableCell>
        </TableRow>
      ))
    ))}
  </TableBody>
  <TableFooter>
    <TableRow>
      {/* Puedes agregar aquí celdas si necesitas mostrar algo en el pie de tabla */}
    </TableRow>
  </TableFooter>
</Table>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
        <AlertDialogCancel onClick={() =>setOpen(false)}>
            Salir
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalMonitorContratacionConsultarFactibilidad;
