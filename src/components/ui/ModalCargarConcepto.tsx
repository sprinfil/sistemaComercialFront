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


const ModalCargarConcepto = ({ trigger, dueño, setCargos, handleCargoSelect }) => {

    const [selected_concepto, set_selected_concepto] = useState({});

    const cargar_cargo_directo = () => {

        let tarifas = selected_concepto?.tarifas;
        const monto = parseFloat(tarifas?.filter(tarifa => tarifa.id_tipo_toma == dueño.tipo_toma)[0].monto);
        //const hoy = dayjs().format('YYYY-MM-DD');
        console.log(monto)
        let data = {
            cargos: [
                {
                    id_concepto: selected_concepto?.id,
                    monto: monto
                },
            ],
            id_dueno: dueño.id,
            modelo_dueno: "toma",
            id_origen: 1,
            modelo_origen: "caja"
        }

        axiosClient.post("/cargo/generarDirecto", data)
            .then((response) => {
                console.log(response.data.data)
                handleCargoSelect(response.data.data, dueño);
              
                actualizar_cargos();
            }).catch((response) => {
                console.log(response)
            })
    }

    const actualizar_cargos = async () => {
        const cargosResponse = await axiosClient.get(`/cargos/porModelo/pendientes`, {
            params: {
                id_dueno: dueño.id,
                modelo_dueno: "toma"
            }
        });
        if (cargosResponse.data) {
            setCargos(cargosResponse.data);
        }
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