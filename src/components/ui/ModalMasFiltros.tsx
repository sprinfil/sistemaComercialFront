import React, {useEffect, useState}from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import axiosClient from '../../axios-client';
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from '@radix-ui/react-toast'
import PoligonosZustand from '../../contexts/PoligonosZustand';
import { BuscarUsuarioForm } from '../../views/Usuarios/Contratos/FormsContratos/BuscarUsuarioForm';
import { ZustandGeneralUsuario } from '../../contexts/ZustandGeneralUsuario';
export const ModalMasFiltros = ({trigger, setUserData, cerrarForm}) => {

    const {controlDetalleCaja, setControlDetalleCaja} = ZustandGeneralUsuario();
    const [isOpen, setIsOpen] = useState(false);
    const [conditionMet, setConditionMet] = useState(false);

   // Simula una acción que cumple la condición después de 3 segundos
   useEffect(() => {
    const timer = setTimeout(() => {
      setConditionMet(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  // Cierra el AlertDialog cuando la condición se cumple
  useEffect(() => {
    if (controlDetalleCaja == "encontroUno") {
      setIsOpen(false);
    }
  }, [conditionMet]);

    
    
  return (
    <div>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
          {trigger}
        </AlertDialogTrigger>
                <AlertDialogContent className="max-w-[80rem] ">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Selecciona El Usuario/Toma</AlertDialogTitle>
                        <AlertDialogDescription>
                             <div className='h-[70vh] overflow-auto p-4 max-w-[75rem]'>
                  
                                    <BuscarUsuarioForm 
                                    navegacion={""} 
                                    botonCrearUsuario={false}  
                                    tipoAccion={"verDetalleEnCaja"}
                                    setUserData = {setUserData}
                                    />
                                    
                             </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogAction onClick={() => setIsOpen(false)}>Cerrar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
    </div>
  )
}
