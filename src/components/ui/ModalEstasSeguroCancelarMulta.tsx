import React, { useEffect, useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import EscogerOrdenDeTrabajoTable from '../Tables/Components/EscogerOrdenDeTrabajoTable';
import axiosClient from '../../axios-client';
import { ZustandGeneralUsuario } from '../../contexts/ZustandGeneralUsuario';
import { ZustandFiltrosOrdenTrabajo } from '../../contexts/ZustandFiltrosOt';
import { zustandOrdenTrabajoStore } from '../../contexts/ZustandOrdenesDeTrabajoUsuario';
import IconButton from './IconButton';
import { TrashIcon } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from './input';
import { MultasComboBox } from './MultasComboBox';
import { useToast } from "@/components/ui/use-toast"; //IMPORTACIONES TOAST
import { ToastAction } from "@/components/ui/toast"; //IMPORTACIONES TOAST
const ModalEstasSeguroCancelarMulta = ({ isOpen, setIsOpen, idMulta }) => {
    const { toast } = useToast()


    const handleCancelarMulta =  async () =>
    {
        try
        {
            const response = await axiosClient.put(`/multas/monitor/cancelarmulta/${idMulta}`)
            console.log(response);
            toast({
                title: "¡Éxito!",
                description: "La multa se ha cancelado correctamente",
                variant: "success",
    
            })
        } 
        catch(response)
        {
            console.log(response.response.data.message);
            const mensaje = response.response.data.message;
            
        toast({
            variant: "destructive",
            title: "Oh, no. Error",
            description: mensaje,
            action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
        })

        }
    }
    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent className="max-w-[85vh]">
                <AlertDialogHeader>

                    <AlertDialogTitle className="text-2xl">
                        ¿Estas seguro que deseas cancelar la multa?


                    </AlertDialogTitle>

                    <AlertDialogDescription>
                       



                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setIsOpen(false)}>Cancelar</AlertDialogCancel>


                    <AlertDialogAction onClick={handleCancelarMulta}>
                        Aceptar
                    </AlertDialogAction>


                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default ModalEstasSeguroCancelarMulta;
