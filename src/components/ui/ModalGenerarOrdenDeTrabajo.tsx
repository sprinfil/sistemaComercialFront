import React from 'react';
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

const ModalGenerarOrdenDeTrabajo = ({ isOpen, setIsOpen, method }) => {





    const action = () => {
        method();
        setIsOpen(false);
    }




    const GenerarOrdenDeTrabajoToma = async () => {


        const values = [
            {id_toma: 7,},
            {id_orden_trabajo_catalogo: 2}
        ]
        const values2 = {
            ordenes_trabajo: values,
        }
        console.log(values2);
        try{
            const response = await axiosClient.post(`OrdenTrabajo/create`, values2)
            setIsOpen(false);
            console.log(response);

        }
        catch(response){
            console.log(response)
        }
    }



    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Generar orden de trabajo</AlertDialogTitle>
                    <AlertDialogTitle><div className='text-xs text-gray-600'>Selecciona una orden de trabajo para el usuario.</div></AlertDialogTitle>
                    <AlertDialogDescription>
                    <EscogerOrdenDeTrabajoTable/>{/*LA TABLA PARA ESCOGER ORDEN DE TRABAJO*/}

                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setIsOpen(false)}>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={GenerarOrdenDeTrabajoToma}>Generar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default ModalGenerarOrdenDeTrabajo;
