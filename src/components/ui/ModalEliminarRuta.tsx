import React from 'react'
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
} from "@/components/ui/alert-dialog"

const ModalEliminarRuta = ({ method, button, delete_id = null}) => {

    const action = () => {
        if(delete_id){
            method(delete_id);
        }else{
            method();
        }
    }

    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger>{button}</AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Estas seguro que desea eliminar este registro?</AlertDialogTitle>
                        <AlertDialogDescription>
                            
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <div onClick={action}>
                            <AlertDialogAction>Aceptar</AlertDialogAction>
                        </div>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default ModalEliminarRuta