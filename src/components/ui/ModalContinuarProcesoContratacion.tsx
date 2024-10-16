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

import { useNavigate } from "react-router-dom";
import { ZustandFiltrosContratacion } from "../../contexts/ZustandFiltrosContratacion";

const ModalContinuarProcesoContratacion = ({open, setOpen }) => {
  const { toast } = useToast();
  const {setContratoLocalStorage} = ZustandFiltrosContratacion();
  const navigate = useNavigate();
console.log(open);
  // Función para manejar el cierre del modal
  const handleCloseModal = () => {
  
    setOpen(false);
    
  };

  const eliminarContratacionPendiente = () => {
    localStorage.removeItem("contrato");
    localStorage.removeItem("libro");
    localStorage.removeItem("notificaciones");
    setOpen(false);
  }


  const continuarContratacion = () => {
    navigate('/Contrato/Usuario'); // Cambia esto a la ruta adecuada
    setContratoLocalStorage(true);
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="max-w-screen-md max-h-md overflow-auto">
        <AlertDialogHeader>
         
          <AlertDialogTitle>Tienes un proceso de contratación pendiente. ¿Deseas continuar?</AlertDialogTitle>
          <AlertDialogTitle></AlertDialogTitle>

          <AlertDialogDescription> 
            
          

          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogCancel onClick={eliminarContratacionPendiente}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={continuarContratacion}>Continuar</AlertDialogAction>
          </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalContinuarProcesoContratacion;
