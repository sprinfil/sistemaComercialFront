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
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "../../components/ui/form.tsx";
import { OperadoresOtIndividualComboBox } from './OperadoresOtIndividualComboBox.tsx';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OrdenDeTrabajoAsignarIndividualSchema } from '../Forms/OrdenDeTrabajoValidaciones.ts';
import { z } from "zod";
import { Button } from './button.tsx';
import AsignarOrdenDeTrabajoTable from '../Tables/Components/AsignarOrdenDeTrabajoTable.tsx';
import { ZustandFiltrosOrdenTrabajo } from '../../contexts/ZustandFiltrosOt.tsx';
import AsignarOrdenDeTrabajoIndividualEnDetalleUsuarioTable from '../Tables/Components/AsignarOrdenDeTrabajoIndividualEnDetalleUsuarioTable.tsx';
import { MdDeleteOutline } from "react-icons/md";
import IconButton from './IconButton.tsx';
import { FaUserEdit } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaTools } from "react-icons/fa";


const ModalMonitorContratacion = ({ isOpen, setIsOpen, selected_contrato}) => {
    
    const { toast } = useToast()

    const {usuariosEncontrados, setUsuariosEncontrados, idSeleccionadoGenerarOrdenDETrabajoToma} = ZustandGeneralUsuario();
    const {arregloAsignarIndividualTomaAOperador, setLoadingTable, loadingTable, setDataOrdenesDeTrabajoHistorialToma, loadingTableOrdenesDeTrabajoHistorial, setLoadingTableOrdenesDeTrabajoHistorial} = ZustandFiltrosOrdenTrabajo();


   const [operadorSeleccionado, setOperadorSeleccionado ] = useState("");

console.log(selected_contrato);
    const action = () => {
        setIsOpen(false);
    }



    


    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent   className="max-w-[150vh] ">
                <AlertDialogHeader>

                <div className='flex justify-between items-center'>
                {/* Título al principio */}
            <div className='flex'>
                <span className='font-bold text-lg'>Contratación</span>
            </div>

            {/* Iconos con títulos */}
            <div className='flex space-x-2'>
                <div className='w-[6vh]' title='Borrar contrato'>
                <IconButton>
                    <MdDeleteOutline className='w-[8vh] h-[5vh]' />
                </IconButton>
                </div>
                <div className='w-[5vh]' title='Editar contrato'>
                <IconButton>
                    <FaEdit className='w-[8vh] h-[5vh]'/>
                </IconButton>
                </div>

                <div className='w-[6vh]' title='Cambio de propietario'>
                <IconButton>
                    <FaUserEdit className='w-[8vh] h-[5vh]' />
                </IconButton>
                </div>
                
                <div className='w-[5vh]' title='Consultar factibilidad'>
                <IconButton>
                    <FaTools className='w-[8vh] h-[5vh]' />
                </IconButton>
                </div>

                <div className='w-[5vh]' title='Cerrar contrato'>
                <IconButton>
                    <FaCheckCircle className='w-[8vh] h-[5vh]' />
                </IconButton>
                </div>
            </div>
            </div>


                   
                    
               
                    <AlertDialogTitle>

                    </AlertDialogTitle>
                    <AlertDialogDescription>

                   

                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setIsOpen(false)}>Cancelar</AlertDialogCancel>
                </AlertDialogFooter>

            </AlertDialogContent>
        </AlertDialog>
    );
}

export default ModalMonitorContratacion;
