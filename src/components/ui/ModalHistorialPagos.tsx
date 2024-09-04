import React, { useEffect, useRef, useState } from 'react';
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
import ZustandPuntoVenta from '../../contexts/ZustandPuntoVenta';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import IconButton from './IconButton';
import { ReaderIcon } from '@radix-ui/react-icons';
import { Input } from './input';
import estructura_ticket from '../../tickets/TicketPagoEnCaja';
import imprimir from '../../tickets/FuncionesImpresora';
import { useToast } from "@/components/ui/use-toast"; //IMPORTACIONES TOAST
import { ToastAction } from "@/components/ui/toast"; //IMPORTACIONES TOAST
import ModalSolicitudCancelacionPago from './ModalSolicitudCancelacionPago';

const ModalHistorialPagos = ({ trigger }) => {

    const { session_caja } = ZustandPuntoVenta();
    const [pagos, set_pagos] = useState([]);
    const [filtered_pagos, set_filtered_pagos] = useState([])
    const input_folio = useRef()
    const input_numero_toma = useRef()
    const input_numero_usuario = useRef()

    const { toast } = useToast()
    const [selected_pago, set_selected_pago] = useState([]);

    useEffect(() => {
        if (session_caja.id) {
            fetch_pagos();
        }
    }, [session_caja.id])

    const fetch_pagos = () => {
        axiosClient.get("/cajas/pagos", {
            params: {
                id_caja: session_caja.id
            }
        })
            .then((response) => {
                set_pagos(response.data);
                console.log(response.data)
                set_filtered_pagos(response.data)
                console.log(response.data);
            }).catch((response) => {
                console.log(response)
            })
    }

    const hanlde_filter_pagos = () => {
        let folio = input_folio?.current?.value;
        let pagos_temp = pagos.filter(pago => pago?.folio.includes(folio));
        set_filtered_pagos(pagos_temp);
    }

    const solicitud_cancelacion = (pago) => {
        axiosClient.post("/cajas/solicitudCancelacion",
            {
                id_operador: session_caja.id_operador,
                id_caja: session_caja.id,
                folio: pago.folio
            }
        ).then((response) => {
            console.log(response)
        })
            .catch((response) => {
                console.log(response)
            })
    }

    useEffect(() => {
        console.log(selected_pago)
    }, [selected_pago])

    const reimprimir = (pago) => {
        let ticket_data_original = {
            nombre_caja: session_caja.caja_nombre,
            consecutivo: "000123",
            nombre_cajero: session_caja.nombre_operador,
            pago_folio: pago.folio,
            fecha_pago: pago.fecha_pago,
            copia: false,
            //usuario_nombre: dueno?.usuario?.nombre + " " + dueno?.usuario?.apellido_paterno + " " + dueno?.usuario?.apellido_materno,
            usuario_nombre: selected_pago.usuario.nombre + " " + selected_pago.usuario.apellido_paterno + " " + selected_pago.usuario.apellido_materno,
            numero_cuenta: pago.dueno.codigo_toma,
            calle: pago.dueno?.calle,
            numero: pago.dueno?.numero_casa,
            codigo_postal: pago.dueno?.codigo_postal,
            colonia: pago.dueno?.colonia,
            rfc: pago.dueno?.usuario?.rfc,
            conceptos: pago.abonos_con_cargos,
            //saldo_anterior: total_neto.toFixed(2).toString(),
            saldo_anterior: pago.saldo_anterior,
            metodo_pago: pago.forma_pago,
            recibido: pago.recibido,
            pago_neto: pago.total_pagado,
            cambio: pago.cambio,
            //saldo_pendiente: (total_neto - abono).toFixed(2).toString()
            saldo_pendiente: pago.saldo_actual || 0,
            saldo_a_favor: pago.saldo_no_aplicado || 0,
            modelo_dueno: pago.modelo_dueno
        };

        let ticket_original = estructura_ticket(ticket_data_original);
        let barcode = pago.folio.toString();

        imprimir(ticket_original, barcode, "logosapa.png")
            .then((response) => {
                let estructura_talon = []
                estructura_talon.push([`TALON CAJERO`, `CT`, `B`])
                imprimir(estructura_talon, "", "").then(() => { }).catch((response) => {
                    toast({
                        variant: "destructive",
                        title: "Error",
                        //description: response.response.data.error,
                        description: "Ocurrio un error al imprimir",
                        action: <ToastAction altText="Try again">Aceptar</ToastAction>,
                    })
                })
            })
            .catch((response) => {
                toast({
                    variant: "destructive",
                    title: "Error",
                    //description: response.response.data.error,
                    description: "Ocurrio un error al imprimir",
                    action: <ToastAction altText="Try again">Aceptar</ToastAction>,
                })
            })
    }

    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger asChild onClick={() => { fetch_pagos() }}>{trigger}</AlertDialogTrigger>
                <AlertDialogContent className="max-w-[80rem] ">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Historial de Pagos</AlertDialogTitle>
                        <AlertDialogDescription>Pagos del día.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className='h-[70vh]'>

                        <>
                            {
                                selected_pago?.folio ?
                                    <>
                                        <div className='flex gap-3 shadow-md p-2 items-center border rounded-md'>
                                            <p>Pago: {selected_pago?.folio}</p>
                                            <div className='w-[200px] gap-2 flex items-center justify-center px-2 py-2 rounded-md dark:hover:bg-blue-900 hover:bg-blue-100 cursor-pointer ease-in duration-100'
                                                onClick={() => { reimprimir(selected_pago) }}
                                            >
                                                <ReaderIcon className='w-[20px] h-[20px] text-blue-500' />
                                                <p>Reimprimir Ticket</p>
                                            </div>
                                            <ModalSolicitudCancelacionPago trigger={
                                                <Button variant={"destructive"} >Solicitud de Cancelación</Button>
                                            }
                                                cancelacion_pago={() => { solicitud_cancelacion(selected_pago) }}
                                            />

                                        </div>
                                        <div className='grid grid-cols-2 gap-4 mt-5'>
                                            <div className='max-h-[60vh] overflow-auto'>
                                                <Table>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell>Nombre Caja</TableCell>
                                                            <TableCell>{session_caja.caja_nombre}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>Consecutivo</TableCell>
                                                            <TableCell>000123</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>Nombre Cajero</TableCell>
                                                            <TableCell>{session_caja.nombre_operador}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>Folio de Pago</TableCell>
                                                            <TableCell>{selected_pago.folio}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>Fecha de Pago</TableCell>
                                                            <TableCell>{selected_pago.fecha_pago}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>Nombre del Usuario</TableCell>
                                                            <TableCell>{selected_pago?.usuario?.nombre + " " + selected_pago?.usuario?.apellido_paterno + " " + selected_pago?.usuario?.apellido_materno}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>Número de Cuenta</TableCell>
                                                            <TableCell>{selected_pago.dueno.codigo_toma}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>Calle</TableCell>
                                                            <TableCell>{selected_pago.dueno?.calle}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>Número</TableCell>
                                                            <TableCell>{selected_pago.dueno?.numero_casa}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>Código Postal</TableCell>
                                                            <TableCell>{selected_pago.dueno?.codigo_postal}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>Colonia</TableCell>
                                                            <TableCell>{selected_pago.dueno?.colonia}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>RFC</TableCell>
                                                            <TableCell>{selected_pago.dueno?.usuario?.rfc}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>Saldo Anterior</TableCell>
                                                            <TableCell>{selected_pago.saldo_anterior}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>Método de Pago</TableCell>
                                                            <TableCell>{selected_pago.forma_pago}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>Recibido</TableCell>
                                                            <TableCell>{selected_pago.recibido}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>Pago Neto</TableCell>
                                                            <TableCell>{selected_pago.total_abonado}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>Cambio</TableCell>
                                                            <TableCell>{selected_pago.cambio}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>Saldo Pendiente</TableCell>
                                                            <TableCell>{selected_pago.saldo_actual || 0}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>Saldo a Favor</TableCell>
                                                            <TableCell>{selected_pago.saldo_no_aplicado || 0}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </div>

                                            <div className='w-full h-full '>
                                                <div className='max-h-[60vh] overflow-auto'>
                                                    <Table>
                                                        <TableBody>
                                                            <TableRow className="bg-muted">
                                                                <TableCell>Concepto</TableCell>
                                                                <TableCell>Monto Abonado</TableCell>
                                                                <TableCell>Monto Pendiente</TableCell>
                                                            </TableRow>
                                                            {selected_pago.abonos_con_cargos.map(abono => (
                                                                <TableRow>
                                                                    <TableCell>{abono?.nombre}</TableCell>
                                                                    <TableCell>{abono?.monto_abonado}</TableCell>
                                                                    <TableCell>{abono?.monto_pendiente}</TableCell>
                                                                </TableRow>

                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </div>
                                            </div>
                                        </div>

                                    </>
                                    :
                                    <>
                                        <div>
                                            <Input ref={input_folio} onChange={hanlde_filter_pagos} className='mb-5 w-[20%]' placeholder='Folio' />
                                        </div>
                                        <div className='h-[62vh] overflow-auto relative'>
                                            <Table>
                                                <TableHeader className="bg-muted ">
                                                    <TableRow>
                                                        <TableHead>Folio</TableHead>
                                                        <TableHead>Monto</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {
                                                        filtered_pagos.map((pago) => (
                                                            <>
                                                                <TableRow className="cursor-pointer" onClick={() => { set_selected_pago(pago) }}>
                                                                    <TableCell>{pago.folio}</TableCell>

                                                                    <TableCell>$ {pago.total_pagado}</TableCell>
                                                                </TableRow>
                                                            </>
                                                        )
                                                        )
                                                    }
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </>
                            }

                        </>
                    </div>
                    <AlertDialogFooter>
                        {selected_pago.folio &&
                            <>
                                <Button onClick={() => { set_selected_pago([]) }} variant={"destructive"}>Volver</Button>
                            </>
                        }
                        <AlertDialogAction onClick={() => { set_selected_pago([]) }} >Aceptar</AlertDialogAction>

                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default ModalHistorialPagos;

