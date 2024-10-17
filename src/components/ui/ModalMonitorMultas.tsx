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
import ModalModificarMulta from './ModalModificarMulta';
import { TiCancel } from 'react-icons/ti';
import { FaEdit } from "react-icons/fa";
import { Button } from './button';
import ModalEstasSeguroCancelarMulta from './ModalEstasSeguroCancelarMulta';
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
import { MdAddBox, MdOutlineAddCircleOutline } from 'react-icons/md';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { IoMdAddCircle } from 'react-icons/io';

const ModalMonitorMultas = ({ isOpen, setIsOpen, idMulta }) => {

    const [estadoMulta, setEstadoMulta] = useState('');
    const [valorMulta, setValorMulta] = useState('');
    const [abrirModalModificar, setAbrirModalModificar] = useState(false);
    const [abrirModalEliminar, setAbrirModalEliminar] = useState(false)

    console.log(idMulta);

    const handleValorInput = (event) => {
        setValorMulta(event.target.value);
    };

    console.log(estadoMulta);

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

    const handleAbrirModalModificarMulta = () => {
        setAbrirModalModificar(true);
    }

    const handleAbrirModalEliminarMulta = () => {
        setAbrirModalEliminar(true);
    }

    return (
        <>
            <ModalModificarMulta isOpen={abrirModalModificar} setIsOpen={setAbrirModalModificar} idMulta={idMulta} />
            <ModalEstasSeguroCancelarMulta isOpen={abrirModalEliminar} setIsOpen={setAbrirModalEliminar} idMulta={idMulta?.id} />

            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogContent className="max-w-screen-2xl max-h-screen-2xl overflow-auto">
                    <AlertDialogHeader>

                        <AlertDialogTitle className="text-2xl ">

                            Detalle de la multa
                        </AlertDialogTitle>

                        <AlertDialogDescription>

                            <div className='bg-muted rounded-lg'>
                                <div className='flex space-x-1 justify-center items-center'>
                                    <div className=''>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                        <IconButton onClick={handleAbrirModalEliminarMulta} >
                                                            <TiCancel className='w-[4.5vh] h-[4.5vh] text-black dark:text-white ' />

                                                        </IconButton>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Cancelar multa</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <div className=''>

                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger> 
                                                   <IconButton onClick={handleAbrirModalModificarMulta}>
                                                        <IoMdAddCircle className='w-[3.8vh] h-[3.8vh] text-black dark:text-white ' />
                                                    </IconButton>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Agregar cantidad de UMAS</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>


                                    </div>
                                </div>

                            </div>


                            <div className='max-h-[90vh] overflow-auto'>
                                <h1 className="text-2xl mb-[7vh] mt-5 text-black dark:text-white ">
                                    Información del usuario
                                </h1>
                                <Table className="text-black">
                                    <TableCaption></TableCaption>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="text-black text-base dark:text-white" >Código de toma</TableHead>
                                            <TableHead className="text-black text-base dark:text-white">Nombre del usuario</TableHead>
                                            <TableHead className="text-black text-base dark:text-white">Dirección</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow >
                                            <TableCell className="text-black text-base dark:text-white">{idMulta?.codigo_toma}</TableCell>
                                            <TableCell className="text-black text-base dark:text-white">{idMulta?.nombre_multado}</TableCell>
                                            <TableCell className="text-black text-base dark:text-white">{idMulta?.codigo_toma}</TableCell>
                                        </TableRow>
                                    </TableBody>

                                </Table>

                                <h1 className="text-2xl mb-[7vh] mt-5 text-black dark:text-white">
                                    Información de la multa
                                </h1>
                                <Table className="text-black">
                                    <TableCaption></TableCaption>
                                    <TableHeader >
                                        <TableRow >
                                            <TableHead className="text-black  text-base dark:text-white" >Multa</TableHead>
                                            <TableHead className="text-black text-base dark:text-white">Motivo</TableHead>
                                            <TableHead className="text-black text-base dark:text-white">Estado</TableHead>
                                            <TableHead className="text-black text-base dark:text-white">Monto</TableHead>
                                            <TableHead className="text-black text-base dark:text-white">Levantó la multa</TableHead>
                                            <TableHead className="text-black text-base dark:text-white">Revisó la multa</TableHead>
                                            <TableHead className="text-black text-base dark:text-white">Fecha de solicitud</TableHead>
                                            <TableHead className="text-black text-base dark:text-white">Fecha de revisión</TableHead>

                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow >
                                            <TableCell  className="text-black  text-base dark:text-white">{idMulta?.nombre_multa}</TableCell>
                                            <TableCell className="text-black  text-base dark:text-white">{idMulta?.motivo}</TableCell>
                                            <TableCell className="text-black  text-base dark:text-white">{idMulta?.estado}</TableCell>
                                            <TableCell className="text-black  text-base dark:text-white">{idMulta?.monto}</TableCell>
                                            <TableCell className="text-black  text-base dark:text-white">{idMulta?.operador_levanto_multa}</TableCell>
                                            <TableCell className="text-black  text-base dark:text-white">{idMulta?.nombre_operador_revisor}</TableCell>
                                            <TableCell className="text-black  text-base dark:text-white">{idMulta?.fecha_solicitud}</TableCell>
                                            <TableCell className="text-black  text-base dark:text-white">{idMulta?.fecha_revision}</TableCell>

                                        </TableRow>
                                    </TableBody>

                                </Table>
                            </div>


                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={HandleLimpiarEstados}>Cancelar</AlertDialogCancel>


                        <Button>
                            Aceptar
                        </Button>


                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>

    );
}

export default ModalMonitorMultas;
