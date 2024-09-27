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
import { ComboBoxAnomalia } from "./ComboBoxAnomalia.tsx";

const ModalAgregarLectura = ({open, setOpen }) => {
  const { toast } = useToast();
  


  const handleGuardarLectura = () => {

    const values = {
        id_toma: 5,
        id_periodo: 3, 
        id_origen: 0, //DEFECTO 0
        modelo_origen: "", // MANDAR VACIO
        id_anomalia: 2,  //SI HAY ANOMALÍA NO MANDAR LECTURA
        lectura: 100.5, 
        comentario: "Lectura realizada sin inconvenientes." //OPCIONAL
    }
    try{
      const response = axiosClient.post('/lectura/store', )
    }
    catch(err)
    {

    }
  }

  


  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="max-w-screen-2xl max-h-screen overflow-auto">
        <AlertDialogHeader>
         
          <AlertDialogTitle>Agregar lectura
            
          </AlertDialogTitle>
          <AlertDialogDescription> 
          <ComboBoxAnomalia selected_conceptos={selected_conceptos} set={set_selected_conceptos} />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
        
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalAgregarLectura;
