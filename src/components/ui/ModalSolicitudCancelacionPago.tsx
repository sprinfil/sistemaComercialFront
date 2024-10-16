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
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../../components/ui/button";

interface ModalProps {
    trigger: React.ReactNode;
    title: string;
    description?: string;
    children: React.ReactNode;
    onConfirm: () => void;
}

const ModalSolicitudCancelacionPago = ({ trigger, cancelacion_pago }) => {



    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger>{trigger}</AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Seguro que desea realizar una solicitud de cancelación?</AlertDialogTitle>
                        <AlertDialogDescription>

                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={cancelacion_pago}>Aceptar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default ModalSolicitudCancelacionPago;

