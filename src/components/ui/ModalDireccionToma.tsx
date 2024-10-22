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
import { IoCloseSharp } from "react-icons/io5";
import IconButton from './IconButton';

const ModalDireccionToma = ({ isOpen, setIsOpen, method1, method2, method3}) => {

    const action = () => {
        method1();
        setIsOpen(false);
    }
    const action2 = () => {
        method2();
        setIsOpen(false);
    }

    const action3 = () => {
        method3();
        setIsOpen(false);
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent className="w-[50vw] h-[25vh] max-w-[100vw] max-h-[100vh]">
            <AlertDialogHeader>
                    <AlertDialogTitle>
                        <div className='flex justify-between'>
                        <div className='text-2xl'>
                        ¿Desea que lleguen las notificaciones a la dirección de esta toma?

                        </div>
                        <div className='flex justify-end'>
                        <IconButton title='Cancelar' onClick={action3}>
                        <IoCloseSharp className='w-[2.5vh] h-[2.5vh]'/>

                        </IconButton>
                      

                        </div>
                        </div>
                       
                    </AlertDialogTitle>
                    <AlertDialogDescription></AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={action2} className="text-xl">Escoger otra dirección</AlertDialogCancel>
                    <AlertDialogAction onClick={action} className="text-xl">Aceptar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default ModalDireccionToma;
