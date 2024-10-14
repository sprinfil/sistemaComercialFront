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
import { useToast } from "@/components/ui/use-toast"; //IMPORTACIONES TOAST
import { ToastAction } from "@/components/ui/toast"; //IMPORTACIONES TOAST
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
import { Button } from './button';

const ModalModificarMulta = ({ isOpen, setIsOpen, idMulta }) => {
    const { toast } = useToast()

    const [estadoMulta, setEstadoMulta] = useState('');
    const [valorMulta, setValorMulta] = useState('');
    const [selectedMulta, setSelectedMulta] = useState("");

    const [error, setError] = useState(""); // Para manejar errores

    console.log(idMulta);

    const handleValorInput = (event) => {
        setValorMulta(event.target.value);
    };

    console.log(estadoMulta);

    const handleMultaSelect = (multaId) => {
        setSelectedMulta(multaId); // Actualiza el estado con el ID de la multa seleccionada
    };


    useEffect(() => {
        return () => {
            setValorMulta("");
            setEstadoMulta("");
        }
    }, [])

    const HandleLimpiarEstados = () => {
        setValorMulta("");
        setEstadoMulta("");
        setIsOpen(false);

    }


    const handleModificarMulta = async () => {
        if (!estadoMulta) {
            toast({
                variant: "destructive",
                title: "Oh, no. Error",
                description: "Debes seleccionar un estado antes de enviar.",
                action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
            })
            return;
        }

        const values = {
            estado:estadoMulta,
            monto: valorMulta
        }

        console.log(values);

        try {

            const response = await axiosClient.put(`/multas/monitor/modificarmulta/${idMulta?.id}`, values)
            console.log(response);
            setValorMulta("");
            setEstadoMulta("");
            //setIsOpen(false);
            toast({
                title: "¡Éxito!",
                description: "La multa se ha modificado correctamente",
                variant: "success",

            })
        }
        catch (response) {
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

    console.log(selectedMulta);
    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent className="max-w-[85vh]">
                <AlertDialogHeader>

                    <AlertDialogTitle className="text-2xl">
                        Gestionar multa


                    </AlertDialogTitle>

                    <AlertDialogDescription>
                   
                      



                        <div className='mt-5 text-xl'>Selecciona el estado</div>

                        <Select onValueChange={(value) => setEstadoMulta(value)}>
                            <SelectTrigger className="w-full mt-5">
                                <SelectValue placeholder="Selecciona el estado de la multa" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Estado</SelectLabel>
                                    <SelectItem value="activo">Activo</SelectItem>
                                    <SelectItem value="cancelado">Cancelado</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {estadoMulta != "cancelado" && estadoMulta != "" 
                            &&
                            <>
                              <div className="mt-5">
                        <div className="text-xl ">
                            Ingresa la cantidad de UMAS
                        </div>
                        <div className="text-sm mt-1">
                            <span className='text-base'>Min: <span >{selectedMulta.UMAS_min}</span></span> 
                            <span className="ml-3 text-base">Max: <span >{selectedMulta.UMAS_max}</span></span>
                        </div>
                                                    

                                </div>
                                <div className='mt-5'>
                                    <Input value={valorMulta}
                                        onChange={handleValorInput} />
                                </div>
                            </>

                        }




                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={HandleLimpiarEstados}>Cancelar</AlertDialogCancel>


                    <Button onClick={handleModificarMulta}>
                        Aceptar
                    </Button>


                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default ModalModificarMulta;
