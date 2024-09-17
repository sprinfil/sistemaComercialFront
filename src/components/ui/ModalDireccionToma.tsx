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

const ModalDireccionToma = ({ isOpen, setIsOpen, method1, method2 }) => {

    const action = () => {
        method1();
        setIsOpen(false);
    }
    const action2 = () => {
        method2();
        setIsOpen(false);
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent className="max-w-[88vh] ">
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Desea que lleguen las notificaciones a la dirección de esta toma?</AlertDialogTitle>
                    <AlertDialogDescription></AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={action2}>Escoger otra dirección</AlertDialogCancel>
                    <AlertDialogAction onClick={action}>Aceptar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default ModalDireccionToma;
