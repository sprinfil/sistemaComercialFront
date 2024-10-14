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
        setIsOpen(false);
        setAbrirModalModificar(true);
    }

    const handleAbrirModalEliminarMulta = () => {
        setIsOpen(false);
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

                            <div className='bg-muted'>
                                <div className='flex space-x-2 justify-center items-center'>
                                    <div className=''>
                                        <IconButton title='Cancelar multa' onClick={handleAbrirModalEliminarMulta}>
                                            <TiCancel className='w-[3.8vh] h-[3.8vh]' />

                                        </IconButton>
                                    </div>
                                    <div className=''>
                                        <IconButton title='Modificar multa' onClick={handleAbrirModalModificarMulta}>
                                            <FaEdit className='w-[3vh] h-[3vh]' />
                                        </IconButton>

                                    </div>
                                </div>

                            </div>


                            <div className='max-h-[90vh] overflow-auto'>
                            <h1 className="text-2xl mb-[7vh] mt-5 text-black">
                            Información del usuario
                                </h1>
                            <Table>
                            <TableCaption></TableCaption>
                            <TableHeader>
                                <TableRow>
                                <TableHead >Código de toma</TableHead>
                                <TableHead>Nombre del usuario</TableHead>
                                <TableHead>Dirección</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow >
                                    <TableCell>{idMulta.codigo_toma}</TableCell>
                                    <TableCell>{idMulta.nombre_multado}</TableCell>
                                    <TableCell>"{idMulta.codigo_toma}"</TableCell>
                                </TableRow>
                            </TableBody>
                     
                            </Table>

                            <h1 className="text-2xl mb-[7vh] mt-5 text-black">
                            Información de la multa
                                </h1>
                            <Table>
                            <TableCaption></TableCaption>
                            <TableHeader>
                                <TableRow>
                                <TableHead >Multa</TableHead>
                                <TableHead >Motivo</TableHead>
                                <TableHead >Estado</TableHead>
                                <TableHead >Monto</TableHead>
                                <TableHead>Levantó la multa</TableHead>
                                <TableHead>Revisó la multa</TableHead>
                                <TableHead>Fecha de solicitud</TableHead>
                                <TableHead>Fecha de revisión</TableHead>

                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow >
                                    <TableCell >{idMulta.nombre_multa}</TableCell>
                                    <TableCell >{idMulta.motivo}</TableCell>
                                    <TableCell >{idMulta.estado}</TableCell>
                                    <TableCell >{idMulta.monto}</TableCell>
                                    <TableCell >{idMulta.operador_levanto_multa}</TableCell>
                                    <TableCell >{idMulta.nombre_operador_revisor}</TableCell>
                                    <TableCell >{idMulta.fecha_solicitud}</TableCell>
                                    <TableCell >{idMulta.fecha_revision}</TableCell>

                                </TableRow>
                            </TableBody>
                     
                            </Table>
                            </div>


                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <Button onClick={HandleLimpiarEstados}>Cancelar</Button>


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
