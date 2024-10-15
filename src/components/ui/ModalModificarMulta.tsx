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
import { ZustandMultas } from '../../contexts/ZustandMultas';
const ModalModificarMulta = ({ isOpen, setIsOpen, idMulta }) => {
    const { toast } = useToast()

    const [estadoMulta, setEstadoMulta] = useState('');
    const [valorMulta, setValorMulta] = useState('');
    const [selectedMulta, setSelectedMulta] = useState("");
    const [multasTablaFront, setMultasTablaFront] = useState([]);

    const [error, setError] = useState(""); // Para manejar errores
    const {setMultasTabla,multasTabla} = ZustandMultas();
    console.log(idMulta.nombre_multa);

    const [mostrarEnFront, setMostrarEnFront] = useState(false);

    const handleValorInput = (event) => {
        setValorMulta(event.target.value);
    };

    console.log(estadoMulta);

    const handleMultaSelect = (multaId) => {
        setSelectedMulta(multaId); // Actualiza el estado con el ID de la multa seleccionada
    };


    const HandleLimpiarEstados = () => {
        setValorMulta("");
        setEstadoMulta("");
        setIsOpen(false);

    }




    const handleModificarMulta = async () => {
        setMostrarEnFront(false);
       

        const values = {
            estado:"activo",
            monto: valorMulta
        }

        console.log(values);

        try {

            const response = await axiosClient.put(`/multas/monitor/modificarmulta/${idMulta?.id}`, values)
            console.log(response.data.multa);
            setValorMulta("");
            setEstadoMulta("");
            const nuevaMulta = response.data.multa; // Suponiendo que aquí se devuelve el objeto completo de la multa actualizada

            setMultasTablaFront((prevMultas) => {
                console.log("Estado anterior de multas:", prevMultas); // Verifica el estado anterior aquí
    
                return prevMultas.map((multa) =>
                    multa.id === idMulta?.id
                        ? nuevaMulta // Reemplaza todo el objeto de la multa con el nuevo
                        : multa
                );
            });

           
            setMultasTabla(multasTablaFront);
            setMostrarEnFront(true);
            //setIsOpen(false);
            toast({
                title: "¡Éxito!",
                description: "La multa se ha modificado correctamente",
                variant: "success",

            })
            setIsOpen(false);
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



    useEffect(() => {
            setMultasTablaFront(multasTabla);
    }, [multasTabla])
    
    
    useEffect(() => {
        if(mostrarEnFront)
        {
            setMultasTabla(multasTablaFront);
            console.log(mostrarEnFront);
            console.log(multasTabla);
        }
        //console.log(multasTablaFront);
}, [multasTablaFront])

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent className="max-w-[85vh]">
                <AlertDialogHeader>

                    <AlertDialogTitle className="text-2xl">
                        Multa


                    </AlertDialogTitle>

                    <AlertDialogDescription>
                   
                      



                <div className='text-base mt-5'>Nombre de multa: {idMulta?.nombre_multa}</div>
                     
                        
                            
                            <>
                              <div className="mt-5">
                        <div className="text-xl ">
                            Ingresa la cantidad de UMAS
                        </div>
                        <div className="text-sm mt-1">
                            <span className='text-base'>Min: <span >{idMulta.UMAS_min}</span></span> 
                            <span className="ml-3 text-base">Max: <span >{idMulta.UMAS_max}</span></span>
                        </div>
                                                    

                                </div>
                                <div className='mt-5'>
                                    <Input value={valorMulta}
                                        onChange={handleValorInput}
                                        type='number' />
                                </div>
                            </>

                        




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
