import React from 'react'
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


export const ModalMasFiltros = ({trigger}) => {
  return (
    <div>
         <AlertDialog>
                <AlertDialogTrigger>
                    {trigger}
                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-[80rem] ">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Selecciona El Usuario/Toma</AlertDialogTitle>
                        <AlertDialogDescription>
                             <div className='h-[70vh] overflow-auto p-4'>
                                    
                             </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction>Aceptar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
    </div>
  )
}
