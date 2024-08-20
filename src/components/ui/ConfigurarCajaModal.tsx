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
import axiosClient from '../../axios-client';
import axios from 'axios';
import { Barcode } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast"; 
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ToastAction } from "@/components/ui/toast"; //IMPORTACIONES TOAST


export const ConfigurarCajaModal = ({ trigger }) => {
    const { toast } = useToast()
    //funcion para alinear los conceptos
    function formatLine(concept, amount, totalWidth = 40) {
        const conceptLength = concept.length;
        const amountLength = amount.length;
        const spacesNeeded = totalWidth - (conceptLength + amountLength);
        const paddedConcept = concept + ' '.repeat(spacesNeeded > 0 ? spacesNeeded : 0);
        return paddedConcept + amount;
    }



    let estructura_ticket = []
    estructura_ticket.push([`FELIX ORTEGA 2330, CENTRO, LA PAZ .C.S`, `CT`, `B`])
    estructura_ticket.push([`(612) 123 8600`, `CT`, `B`])
    estructura_ticket.push([`_________________________________________`, `LT`, `B`])
    estructura_ticket.push([` `, `CT`])
    estructura_ticket.push([`Caja: Caja 10`, `LT`])
    estructura_ticket.push([`Consecutivo: 101`, `LT`])
    estructura_ticket.push([`Cajero: MIGUEL ANGEL MURILLO JAIMES`, `LT`])
    estructura_ticket.push([`Recibo: 42353546023450`, `LT`])
    estructura_ticket.push([`Fecha de Pago: 15/08/2024 13:19`, `LT`, `B`])
    estructura_ticket.push([`_________________________________________`, `LT`, `B`])
    estructura_ticket.push([` `, `CT`])
    estructura_ticket.push([`***COPIA***`, `CT`, `B`])
    estructura_ticket.push([`_________________________________________`, `LT`, `B`])
    estructura_ticket.push([` `, `CT`])
    estructura_ticket.push([`Usuario: PUBLICO EN GENERAL`, `LT`, `B`])
    estructura_ticket.push([`Cuenta: 00002026`, `LT`, `B`])
    estructura_ticket.push([` `, `CT`])
    estructura_ticket.push([`Direccion`, `CT`, `B`])
    estructura_ticket.push([` `, `CT`])
    estructura_ticket.push([`Calle: BAHIA DE LA PAZ #120`, `LT`])
    estructura_ticket.push([`Codigo Postal: 23080`, `LT`])
    estructura_ticket.push([`COLONIA: FOVISSTE`, `LT`])
    estructura_ticket.push([`RFC: XAXXX010101010010`, `LT`])
    estructura_ticket.push([`_________________________________________`, `LT`, `B`])
    estructura_ticket.push([` `, `LT`])
    estructura_ticket.push([`CONCEPTO(S)`, `CT`, `B`])
    estructura_ticket.push([`_________________________________________`, `LT`, `B`])
    estructura_ticket.push([formatLine(`CONSTANCIA DE NO SERVICIO`, `$329`), `LT`, `B`])
    estructura_ticket.push([formatLine(`IVA`, `$20`), `LT`, `B`])
    estructura_ticket.push([`_________________________________________`, `LT`, `B`])
    estructura_ticket.push([` `, `LT`])
    estructura_ticket.push([`Detalle del pago`, `CT`, `B`])
    estructura_ticket.push([`_________________________________________`, `LT`, `B`])
    estructura_ticket.push([formatLine(`SALDO ANTERIOR`, `$329`), `LT`])
    estructura_ticket.push([`TARJETA`, `LT`, `B`])
    estructura_ticket.push([formatLine(`RECIBIDIO`, `$329`), `LT`])
    estructura_ticket.push([formatLine(`CAMBIO`, `$329`), `LT`])
    estructura_ticket.push([` `, `LT`])
    estructura_ticket.push([formatLine(`PAGO NETO`, `$329`), `LT`])
    estructura_ticket.push([formatLine(`SALDO PENDIENTE`, `$0`), `LT`])
    estructura_ticket.push([` `, `LT`])
    estructura_ticket.push([` `, `LT`])
    estructura_ticket.push([`pruebas.sapalapaz.gob.mx`, `CT`])

    const [impresoras, set_impresoras] = useState();
    const [impresora_seleccionada, set_impresora_seleccionada] = useState({});
    const [error_plugin, set_error_plugin] = useState(false);

    useEffect(() => {
        let temp = {vendorId:localStorage.getItem("vendor_id"), productId:localStorage.getItem("product_id")}
        set_impresora_seleccionada(temp);
        get_impresoras();
    }, [])

    useEffect(() => {
        console.log(impresora_seleccionada);
    }, [impresora_seleccionada])

    const guardar_impresora_local_storage = (impresora) => {
        localStorage.setItem("vendor_id", impresora.vendorId);
        localStorage.setItem("product_id", impresora.productId);
    }

    const imprimir = () => {

        axios.post("http://localhost:3001/print-ticket",
            {
                data: estructura_ticket,
                vendor_id: impresora_seleccionada.vendorId ,
                product_id: impresora_seleccionada.productId ,
                barcode: "234523452345",
                imagePath: "logosapa.png",
                qr_url: ""
            }
        )
            .then((response) => {
                console.log(response);
            }).catch((response) => {
                toast({
                    variant: "destructive",
                    title: "Oh, no. Error",
                    description: "Algo salió mal.",
                    action: <ToastAction altText="Try again">Aceptar</ToastAction>,
                })
            })
    }

    const get_impresoras = () => {
        axios.get("http://localhost:3001/get-printers")
            .then((response) => {
                console.log(response)
                set_impresoras(response.data.impresoras);
                set_error_plugin(false);
            })
            .catch((response) => {
                set_error_plugin(true);
            })
    }

    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Configuración</AlertDialogTitle>
                        <AlertDialogDescription></AlertDialogDescription>
                    </AlertDialogHeader>
                    <>
                    <div>
                        {error_plugin && 
                        <>
                            <p className='text-red-500'>El plugin no esta funcionando</p>
                        </>
                        }
                    </div>
                        <div>
                            <div>
                                <p>Impresora Seleccionada:</p>
                                <p>VID: {impresora_seleccionada.vendorId}, PID: {impresora_seleccionada.productId}</p>
                            </div>
                        </div>
                        <Select onValueChange={(value) => { set_impresora_seleccionada(value) }}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecciona una impresora" />
                            </SelectTrigger>
                            <SelectContent>
                                {impresoras?.map((impresora, index) => (
                                    <>
                                        <SelectItem value={impresora}>VID: {impresora.vendorId}, PID: {impresora.productId}</SelectItem>
                                    </>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button onClick={()=>{imprimir();guardar_impresora_local_storage(impresora_seleccionada);}}>Probar impresora</Button>

                    </>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Aceptar</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
