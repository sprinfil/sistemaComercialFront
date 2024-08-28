import React, { useEffect, useRef, useState } from 'react'
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
    const monto_input = useRef();

    const cargar_cargo_directo = () => {
        const monto = parseFloat(monto_input.current.value);

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

    useEffect(() => {

        let tarifas = selected_concepto?.tarifas;
        const monto = parseFloat(tarifas?.filter(tarifa => tarifa.id_tipo_toma == dueño.id_tipo_toma)[0].monto);
        if (monto_input.current) {
            monto_input.current.value = monto;
            selected_concepto.pide_monto == 1 ? monto_input.current.disabled = false : monto_input.current.disabled = true;
        }
    }, [selected_concepto])

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
                            <p className='text-[14px] mt-5'>Monto (No Incluye IVA)</p>
                            <input ref={monto_input} type="number" className='bg-background border p-2 mt-2 w-full rounded-md outline-none' placeholder='Monto' />
                            {
                                selected_concepto?.pide_monto == 1 ?
                                    <>
                                        <p className='text-[14px] m-1 text-blue-500'>Monto Variable</p>
                                    </>
                                    :
                                    <>
                                        <p className='text-[14px] m-1 text-yellow-500'>Monto Fijo</p>
                                    </>
                            }

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