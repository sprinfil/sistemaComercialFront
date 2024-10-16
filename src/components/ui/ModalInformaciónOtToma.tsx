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
import { ZustandGeneralUsuario } from '../../contexts/ZustandGeneralUsuario.tsx';
const ModalInformacionOtToma = ({ isOpen, setIsOpen, method, text}) => {
    const {usuariosEncontrados, setIdSeleccionadoTomaAsignacionOT,idSeleccionadoTomaAsignacionOT} = ZustandGeneralUsuario();

   //console.log("asdasdasdasd", usuariosEncontrados[0]);
    const action = () => {
        method();
        setIsOpen(false);
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{text}</AlertDialogTitle>
                    <AlertDialogDescription>
                        <div className='flex space-x-2'>
                        <p>Nombre:</p>  {usuariosEncontrados[0]?.nombre} {usuariosEncontrados[0]?.apellido_paterno}  {usuariosEncontrados[0]?.apellido_materno}

                        </div>
                   
                 



                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setIsOpen(false)}>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={action}>Aceptar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default ModalInformacionOtToma;
