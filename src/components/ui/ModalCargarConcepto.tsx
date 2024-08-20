import React, { useEffect, useState } from 'react'
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
import ComboBoxCargosCargables from './ComboBoxCargosCargables';
import axiosClient from '../../axios-client';
import dayjs from 'dayjs';


const ModalCargarConcepto = ({ trigger, dueño }) => {

    const [selected_concepto, set_selected_concepto] = useState({});

    const cargar_cargo_directo = () => {

        let tarifas = selected_concepto?.tarifas;
        const monto = tarifas?.filter(tarifa => tarifa.id_tipo_toma == dueño.tipo_toma)[0];
        const hoy = dayjs().format('YYYY-MM-DD');

        let data = {
            id_concepto: selected_concepto?.id,
            concepto: selected_concepto?.nombre,
            id_origen: 0,
            modelo_origen: "",
            id_dueño: dueño.id,
            modelo_dueño: "toma",
            monto: monto,
            estado: "pendiente",
            id_convenio: 0,
            fecha_cargo: hoy,
            fecha_liquidacion: null
        }

        axiosClient.post("/cargos/store",data)
        .then((response)=>{
            console.log(response)
        }).catch((response)=>{
            console.log(response)
        })
    }

    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
                <AlertDialogContent className='min-w-[50rem]'>
                    <AlertDialogHeader>
                        <AlertDialogTitle><p>Cargar Concepto</p></AlertDialogTitle>
                        <AlertDialogDescription>Selecciona un concepto</AlertDialogDescription>
                    </AlertDialogHeader>
                    <>
                        <div >
                            <ComboBoxCargosCargables set={set_selected_concepto} />
                        </div>
                    </>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={cargar_cargo_directo}>Aceptar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default ModalCargarConcepto