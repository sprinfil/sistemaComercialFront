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

const ModalGenerarOrdenDeTrabajo = ({ isOpen, setIsOpen, method }) => {

    const action = () => {
        method();
        setIsOpen(false);
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
                    <AlertDialogAction onClick={action}>Generar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default ModalGenerarOrdenDeTrabajo;
