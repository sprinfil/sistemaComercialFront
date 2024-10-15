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
import { ZustandMultas } from '../../contexts/ZustandMultas';
const ModalEstasSeguroCancelarMulta = ({ isOpen, setIsOpen, idMulta }) => {
    const { toast } = useToast()

    console.log(idMulta);
    const {setMultasTabla, multasTabla} = ZustandMultas();
    const [multasTablaFront, setMultasTablaFront] = useState([]);
    const [mostrarEnFront, setMostrarEnFront] = useState(false);

    const handleCancelarMulta =  async () =>
    {
        setMostrarEnFront(false);
        try
        {
            const response = await axiosClient.put(`/multas/monitor/cancelarmulta/${idMulta}`)
            console.log(response.data.multa);
            const nuevaMulta = response.data.multa;

            setMultasTablaFront((prevMultas) => {
                console.log("Estado anterior de multas:", prevMultas); // Verifica el estado anterior aquí
    
                return prevMultas.map((multa) =>
                    multa.id === idMulta
                        ? nuevaMulta // Reemplaza todo el objeto de la multa con el nuevo
                        : multa
                );
            }); // Suponiendo que aquí se devuelve el objeto completo de la multa actualizada
            toast({
                title: "¡Éxito!",
                description: "La multa se ha cancelado correctamente",
                variant: "success",
    
            })
            setMostrarEnFront(true);

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




useEffect(() => {
    setMultasTablaFront(multasTabla);
}, [multasTabla])

useEffect(() => {
    if(mostrarEnFront)
    {
        setMultasTabla(multasTablaFront);
        //console.log(mostrarEnFront);
       // console.log(multasTabla);
    }
    //console.log(multasTablaFront);
}, [multasTablaFront])


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
