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
const ModalMonitorOrdenTrabajoTable = ({ isOpen, setIsOpen, method }) => {

    const { toast } = useToast()
    const {
        loadingTable,
        setLoadingTable
    } = zustandOrdenTrabajoStore();
    const { arregloCrearOrdenesDeTrabajo, setDataOrdenesDeTrabajoHistorialToma } = ZustandFiltrosOrdenTrabajo();


    const { usuariosEncontrados, setUsuariosEncontrados, idSeleccionadoGenerarOrdenDETrabajoToma } = ZustandGeneralUsuario();

    // console.log(JSON.stringify(usuariosEncontrados));
    //console.log(idSeleccionadoGenerarOrdenDETrabajoToma);


    const action = () => {
        method();
        setIsOpen(false);
    }

    const [consultaIdToma, setConsultaIdToma] = useState<Usuario | null>(null);
    const [idDeLaTomaParametro, setIdDeLaTomaParametro] = useState(0)

    //SE DECLARA EL OBJETO USUARIO Y TOMAS
    //USUARIO ES UN OBJETO PERO TOMAS ES UN ARRAY DENTRO DEL OBJETO XD
    type Usuario = {
        id: number
        nombre: string
        apellido_paterno: string
        apellido_materno: string
        telefono: string
        correo: string
        curp: string
        tomas?: tomas;
    }

    type tomas = {
        id: number
        codigo_toma: string

    }

    //SETEAMOS CADA QUE SE ENCUENTRE USUARIOS

    useEffect(() => {

        setConsultaIdToma(usuariosEncontrados[0]);

    }, [usuariosEncontrados]);







    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent >
                <AlertDialogHeader>

                    <AlertDialogTitle>
                        <div className='flex space-x-2'>
                            Información de la orden de trabajo
                            <div className='flex justify-end ml-[18vh]' title='Cancelar orden de trabajo'>
                                <IconButton>
                                    <TrashIcon className='w-[2vh] h-[2vh]' />
                                </IconButton>
                            </div>
                        </div>


                    </AlertDialogTitle>

                    <AlertDialogTitle><div className='text-xl text-gray-600'>Toma</div></AlertDialogTitle>
                    <AlertDialogDescription>

                        <div className=''>
                            <p>Codigo de toma:</p>
                            <p>Tipo de OT:</p>
                            <p>Estado de la OT:</p>
                            <p>Creación de la OT:</p>
                            <p>Fecha finalizada:</p>
                            <p>Clave catastral:</p>
                            <p>Calle:</p>
                            <p>Colonia:</p>
                            <p>Ruta:</p>
                            <p>Libro:</p>
                            <p>Tipo de toma:</p>
                        </div>

                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setIsOpen(false)}>Cancelar</AlertDialogCancel>


                    <AlertDialogAction onClick={() => setIsOpen(false)}>
                        Aceptar
                    </AlertDialogAction>


                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default ModalMonitorOrdenTrabajoTable;
