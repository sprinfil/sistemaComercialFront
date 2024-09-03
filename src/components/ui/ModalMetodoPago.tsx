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
} from "@/components/ui/alert-dialog"
import axiosClient from '../../axios-client';
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from '@radix-ui/react-toast'
import PoligonosZustand from '../../contexts/PoligonosZustand';
import { BuscarUsuarioForm } from '../../views/Usuarios/Contratos/FormsContratos/BuscarUsuarioForm';
import { ZustandGeneralUsuario } from '../../contexts/ZustandGeneralUsuario';
import MarcoForm from './MarcoForm';
import cash from "../../img/cash.svg"
import credit_card from "../../img/credit-card.svg";
import credit_card_2 from "../../img/credit-card-2.svg";
import cheque from "../../img/cheque.svg";
import { Button } from './button';
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
import dayjs from 'dayjs';
import estructura_ticket from '../../tickets/TicketPagoEnCaja';
import axios from 'axios';
import imprimir from '../../tickets/FuncionesImpresora';
import ZustandPuntoVenta from '../../contexts/ZustandPuntoVenta';
export const ModalMetodoPago = ({
  open_modal,
  set_open_modal,
  total,
  total_iva,
  cargos, 
  dueno,
  update_data,
  all_cargos,
  modelo_dueno = "toma"
}) => {
  const { toast } = useToast()
  const [metodo_pago_selected, set_metodo_pago_selected] = useState("");
  const [cambio, set_cambio] = useState(0);
  const recibi = useRef();
  const recibi_real = useRef();
  const [errores, set_errores] = useState([]);
  const { session_caja } = ZustandPuntoVenta();
  const [folio, set_folio] = useState("");
  const folio_input = useRef();

  let total_neto = total;

  //console.log(estructura_ticket(ticket_data));

  useEffect(() => {
    if (recibi_real.current) {
      recibi_real.current.focus();
    }
    if (folio_input.current) {
      folio_input.current.focus();
    }
  }, [metodo_pago_selected])


  useEffect(() => {
    window.addEventListener('keydown', handleF5Press);
    return () => {
      window.removeEventListener('keydown', handleF5Press);
    };
  }, []);


  const calculateTotal = () => {
    return all_cargos.reduce((acc, cargo) => acc + parseFloat(cargo.monto_pendiente || 0), 0);
  };

  if (cargos.length == 0) {
    total_neto = calculateTotal();
  }

  const handleF5Press = (event: KeyboardEvent) => {
    if (event.key === 'F1') {
      event.preventDefault();
      set_metodo_pago_selected("efectivo")
    }
    if (event.key === 'F2') {
      event.preventDefault();
      set_metodo_pago_selected("tarjeta_credito")
    }
    if (event.key === 'F3') {
      event.preventDefault();
      set_metodo_pago_selected("tarjeta_debito")
    }
    if (event.key === 'F4') {
      event.preventDefault();
      set_metodo_pago_selected("cheque")
    }
    if (event.key === 'F5') {
      event.preventDefault();
      set_metodo_pago_selected("transferencia")
    }
  };

  const handleCambio = () => {

    let errores_temp = [];
    let recibi_temp = parseFloat(recibi.current.value);

    cargos.map((cargo, index) => {
      let cargo_monto_neto = parseFloat(cargo.monto) + parseFloat(cargo.iva);
      cargo_monto_neto = Math.trunc(cargo_monto_neto * 100) / 100;

      if (cargo.concepto.abonable === 0 && recibi_temp < cargo_monto_neto) {
        errores_temp.push({ cargo_id: cargo.id, mensaje: "No se alcanza a cubrir " + cargo.concepto.nombre })
      }

      recibi_temp = recibi_temp - cargo.monto;
    })

    let recibi_real_temp = parseFloat(recibi_real.current.value || 0);

    let cantidad_abonar = parseFloat(recibi.current.value);

    recibi_real_temp != 0 ? set_cambio(recibi_real_temp - cantidad_abonar) : set_cambio(0);

    if (recibi_real_temp < cantidad_abonar && metodo_pago_selected == "efectivo") {
      errores_temp.push({ cargo_id: 0, mensaje: "El abono no puede ser superior a la cantidad de dinero recibida" })
    }

    set_errores(errores_temp);
  };


  const procesar_pago = () => {
    let recibi_temp = parseFloat(recibi.current.value);
    const today = dayjs().format('YYYY-MM-DD');

    let cargos_temp: any = []

    cargos.map((cargo: any) => {
      cargos_temp.push(
        {
          id_cargo: cargo.id
        }
      )
    })

    if (errores.length > 0) {
      toast({
        title: "Error",
        description: "Resuelve los conflictos antes de procesar el pago",
        action: <ToastAction altText="Try again">Aceptar</ToastAction>,
      })
    } else {
      axiosClient.post("/pagos/store", {
        id_caja: session_caja.id,
        id_dueno: dueno.id,
        modelo_dueno: modelo_dueno,
        total_pagado: recibi_temp,
        forma_pago: metodo_pago_selected,
        fecha_pago: today,
        cargos: cargos_temp,
        folio: folio
      })
        .then((response) => {
          set_open_modal(false);
          
          if(modelo_dueno == "usuario"){
            update_data();
          }else{
            update_data(dueno.codigo_toma)
          }

          let abono = parseFloat(recibi?.current.value);
          let recibi_temp = metodo_pago_selected == "efectivo" ? parseFloat(recibi_real?.current.value) : "0";

          let abonos: any[] = [];

          response.data.abonos.map((abono) => {
            abonos.push(
              {
                nombre: abono.cargo,
                monto_abonado: abono.total_abonado,
                monto_pendiente: abono.monto_pendiente
              }
            )
          })

          let ticket_data_original = {
            nombre_caja: session_caja.caja_nombre,
            consecutivo: "000123",
            nombre_cajero: session_caja.nombre_operador,
            pago_folio: response.data.folio,
            fecha_pago: response.data.fecha_pago,
            copia: false,
            usuario_nombre: dueno?.usuario?.nombre + " " + dueno?.usuario?.apellido_paterno + " " + dueno?.usuario?.apellido_materno,
            numero_cuenta: dueno.codigo_toma,
            calle: dueno?.calle,
            numero: dueno?.numero_casa,
            codigo_postal: dueno?.codigo_postal,
            colonia: dueno?.colonia,
            rfc: dueno?.usuario?.rfc,
            conceptos: abonos,
            //saldo_anterior: total_neto.toFixed(2).toString(),
            saldo_anterior: response.data.saldo_anterior,
            metodo_pago: metodo_pago_selected,
            recibido: recibi_temp.toString(),
            cambio: cambio.toFixed(2).toString(),
            pago_neto: abono.toString(),
            //saldo_pendiente: (total_neto - abono).toFixed(2).toString()
            saldo_pendiente: response.data.saldo_actual,
            saldo_a_favor: response.data.saldo_no_aplicado
          };

          console.log(ticket_data_original)

          let ticket_original = estructura_ticket(ticket_data_original);
          let barcode = response.data.folio.toString();

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

        })
        .catch((response) => {
          toast({
            variant: "destructive",
            title: "Error",
            //description: response.response.data.error,
            description: "No se pudo procesar el pago",
            action: <ToastAction altText="Try again">Aceptar</ToastAction>,
          })

          console.log(response)
        })
    }
  }

  const handle_folio = () => {
    set_folio(folio_input?.current?.value);
  }

  cargos = cargos.sort((a, b) => a.concepto.prioridad_abono - b.concepto.prioridad_abono)

  return (
    <div>
      <AlertDialog open={open_modal} /*onOpenChange={setBooleanCerrarModalFiltros}*/>
        <AlertDialogTrigger asChild>
          {/*trigger*/}
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-[80rem] ">
          <AlertDialogHeader>
            <AlertDialogTitle>Pagar</AlertDialogTitle>
            <AlertDialogDescription>
              <div className='h-[70vh] p-4 max-w-[75rem] flex gap-4'>
                <div className='w-[20%]'>
                  <p className='mb-5'>Método de pago</p>
                  <div className='border p-4 rounded-md'>
                    <div className='overflow-auto max-h-[55vh] no-scrollbar select-none'>
                      <div className={metodo_pago_selected == "efectivo" ? "my-1 w-full h-[12vh] rounded-md flex items-center justify-center cursor-pointer transition-all bg-muted" : `my-1 w-full h-[10vh] hover:h-[12vh] rounded-md flex items-center justify-center cursor-pointer transition-all hover:bg-muted`} onClick={() => { set_metodo_pago_selected("efectivo") }}>
                        <div className='flex flex-col gap-2 items-center justify-center'>
                          <img src={cash} alt="" className='w-[30px]' />
                          <p>Efectivo (F1)</p>
                        </div>
                      </div>
                      <div className={metodo_pago_selected == "tarjeta_credito" ? "my-1 w-full h-[12vh] rounded-md flex items-center justify-center cursor-pointer transition-all bg-muted" : `my-1 w-full h-[10vh] hover:h-[12vh] rounded-md flex items-center justify-center cursor-pointer transition-all hover:bg-muted`}
                        onClick={() => { set_metodo_pago_selected("tarjeta_credito") }}>
                        <div className='flex flex-col gap-2 items-center justify-center'>
                          <img src={credit_card} alt="" className='w-[30px]' />
                          <p>Tarjeta Crédito (F2)</p>
                        </div>
                      </div>
                      <div className={metodo_pago_selected == "tarjeta_debito" ? "my-1 w-full h-[12vh] rounded-md flex items-center justify-center cursor-pointer transition-all bg-muted" : `my-1 w-full h-[10vh] hover:h-[12vh] rounded-md flex items-center justify-center cursor-pointer transition-all hover:bg-muted`}
                        onClick={() => { set_metodo_pago_selected("tarjeta_debito") }}>
                        <div className='flex flex-col gap-2 items-center justify-center'>
                          <img src={credit_card_2} alt="" className='w-[30px]' />
                          <p>Tarjeta Débito (F3)</p>
                        </div>
                      </div>
                      <div className={metodo_pago_selected == "cheque" ? "my-1 w-full h-[12vh] rounded-md flex items-center justify-center cursor-pointer transition-all bg-muted" : `my-1 w-full h-[10vh] hover:h-[12vh] rounded-md flex items-center justify-center cursor-pointer transition-all hover:bg-muted`}
                        onClick={() => { set_metodo_pago_selected("cheque") }}>
                        <div className='flex flex-col gap-2 items-center justify-center'>
                          <img src={cheque} alt="" className='w-[30px]' />
                          <p>Cheque (F4)</p>
                        </div>
                      </div>
                      <div className={metodo_pago_selected == "transferencia" ? "my-1 w-full h-[12vh] rounded-md flex items-center justify-center cursor-pointer transition-all bg-muted" : `my-1 w-full h-[10vh] hover:h-[12vh] rounded-md flex items-center justify-center cursor-pointer transition-all hover:bg-muted`}
                        onClick={() => { set_metodo_pago_selected("transferencia") }}>
                        <div className='flex flex-col gap-2 items-center justify-center'>
                          <img src={cheque} alt="" className='w-[30px]' />
                          <p>Transferencia (F5)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='w-[80%] h-full max-h-[60vh]'>
                  <p className='mb-5'>Información de pago</p>
                  <div className='border w-full p-4 rounded-md h-full relative'>
                    {
                      metodo_pago_selected == "efectivo" &&
                      <>
                        <div className='relative h-full'>
                          <div className='w-full flex h-[5vh] gap-5'>
                            <div>
                              <p>Cantidad Abonar</p>
                              <input ref={recibi} defaultValue={total_neto.toFixed(2)} onChange={() => { handleCambio() }} type="number" className='bg-muted p-4 w-[20vw] h-[6vh] outline-border' name="" id="" />
                            </div>
                            <div>
                              <p className=''>Recibo</p>
                              <input ref={recibi_real} onChange={() => { handleCambio() }} type="number" className='bg-muted p-4 w-[20vw] h-[6vh] outline-border' name="" id="" />
                            </div>
                            {errores.length > 0 &&
                              <div className='h-[10vh] overflow-auto'>
                                {errores.map((error, index) => (
                                  <p className='text-red-500'>{error.mensaje}</p>
                                ))}
                              </div>
                            }
                          </div>
                          <div className='mt-10 '>
                            <div className="w-full relative overflow-auto">
                              <div className='items-center overflow-auto h-[33vh]'>
                                <Table>
                                  <TableCaption></TableCaption>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Concepto</TableHead>
                                      <TableHead>Abonar</TableHead>
                                      <TableHead>Monto + IVA</TableHead>
                                      <TableHead>Prioridad</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {
                                      cargos.length > 0 ?
                                        cargos.map((cargo, index) => (
                                          <TableRow key={cargo.id}
                                            className={`${errores.some(error => error.cargo_id === cargo.id) ? "bg-red-500 text-white hover:bg-red-600" : ""}`} >
                                            <TableCell className="font-medium">{cargo.nombre}</TableCell>
                                            <TableCell> {cargo.concepto.abonable == 1 ? <> <p>Abonable</p> </> : <><p>No Abonable</p></>}</TableCell>
                                            <TableCell className="">$ {(parseFloat(cargo.monto_pendiente)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                            <TableCell className="">{cargo.concepto.prioridad_abono}</TableCell>
                                          </TableRow>
                                        )) :
                                        <>
                                          {
                                            all_cargos.length > 0 ?
                                              all_cargos.map((cargo, index) => (
                                                <TableRow key={cargo.id}
                                                  className={`${errores.some(error => error.cargo_id === cargo.id) ? "bg-red-500 text-white hover:bg-red-600" : ""}`} >
                                                  <TableCell className="font-medium">{cargo.nombre}</TableCell>
                                                  <TableCell> {cargo.concepto.abonable == 1 ? <> <p>Abonable</p> </> : <><p>No Abonable</p></>}</TableCell>
                                                  <TableCell className="">$ {(parseFloat(cargo.monto_pendiente)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                                  <TableCell className="">{cargo.concepto.prioridad_abono}</TableCell>
                                                </TableRow>
                                              ))
                                              :
                                              <TableRow>
                                                <TableCell className="font-medium">Abono a saldo a favor</TableCell>
                                                <TableCell>Abonable</TableCell>
                                                <TableCell className="">Sin Monto</TableCell>
                                                <TableCell className="">Sin prioridad</TableCell>
                                              </TableRow>
                                          }
                                        </>
                                    }

                                  </TableBody>

                                </Table>
                              </div>

                            </div>
                            <div className="w-full relative bg-muted h-[10vh] flex items-center">
                              <div className='absolute right-0 px-5 py-3 text-[22px]'>
                                <p className='mb-3'>Total: ${total_neto.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                <p>Cambio: ${cambio.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                              </div>
                            </div>
                          </div>

                        </div>
                      </>
                    }
                    {
                      metodo_pago_selected == "tarjeta_credito" || metodo_pago_selected == "tarjeta_debito" ||
                      metodo_pago_selected == "transferencia" || metodo_pago_selected == "cheque"  ?
                      <>
                        <div className='relative h-full'>
                          <div className='w-full flex h-[5vh] gap-5'>
                            <div>
                              <p>Cantidad Abonar</p>
                              <input ref={recibi} defaultValue={total_neto.toFixed(2)} onChange={() => { handleCambio() }} type="number" className='bg-muted p-4 w-[20vw] h-[6vh] outline-border' name="" id="" />
                            </div>
                            <div>
                              <p>Folio</p>
                              <input ref={folio_input} onChange={() => { handle_folio(); }} type="number" className='bg-muted p-4 w-[20vw] h-[6vh] outline-border' name="" id="" />
                            </div>
                            {errores.length > 0 &&
                              <div className='h-[10vh] overflow-auto'>
                                {errores.map((error, index) => (
                                  <p className='text-red-500'>{error.mensaje}</p>
                                ))}
                              </div>
                            }
                          </div>
                          <div className='mt-10 '>
                            <div className="w-full relative overflow-auto">
                              <div className='items-center overflow-auto h-[33vh]'>
                                <Table>
                                  <TableCaption></TableCaption>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Concepto</TableHead>
                                      <TableHead>Abonar</TableHead>
                                      <TableHead>Monto + IVA</TableHead>
                                      <TableHead>Prioridad</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {
                                      cargos.length > 0 ?
                                        cargos.map((cargo, index) => (
                                          <TableRow key={cargo.id}
                                            className={`${errores.some(error => error.cargo_id === cargo.id) ? "bg-red-500 text-white hover:bg-red-600" : ""}`} >
                                            <TableCell className="font-medium">{cargo.nombre}</TableCell>
                                            <TableCell> {cargo.concepto.abonable == 1 ? <> <p>Abonable</p> </> : <><p>No Abonable</p></>}</TableCell>
                                            <TableCell className="">$ {(parseFloat(cargo.monto_pendiente)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                            <TableCell className="">{cargo.concepto.prioridad_abono}</TableCell>
                                          </TableRow>
                                        )) :
                                        <>
                                          {
                                            all_cargos.length > 0 ?
                                              all_cargos.map((cargo, index) => (
                                                <TableRow key={cargo.id}
                                                  className={`${errores.some(error => error.cargo_id === cargo.id) ? "bg-red-500 text-white hover:bg-red-600" : ""}`} >
                                                  <TableCell className="font-medium">{cargo.nombre}</TableCell>
                                                  <TableCell> {cargo.concepto.abonable == 1 ? <> <p>Abonable</p> </> : <><p>No Abonable</p></>}</TableCell>
                                                  <TableCell className="">$ {(parseFloat(cargo.monto_pendiente)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                                  <TableCell className="">{cargo.concepto.prioridad_abono}</TableCell>
                                                </TableRow>
                                              ))
                                              :
                                              <TableRow>
                                                <TableCell className="font-medium">Abono a saldo a favor</TableCell>
                                                <TableCell>Abonable</TableCell>
                                                <TableCell className="">Sin Monto</TableCell>
                                                <TableCell className="">Sin prioridad</TableCell>
                                              </TableRow>
                                          }
                                        </>
                                    }

                                  </TableBody>

                                </Table>
                              </div>

                            </div>
                            <div className="w-full relative bg-muted h-[10vh] flex items-center">
                              <div className='absolute right-0 px-5 py-3 text-[22px]'>
                                <p className='mb-3'>Total: ${total_neto.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                <p>Cambio: ${cambio.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                              </div>
                            </div>
                          </div>

                        </div>
                      </>
                      :
                      <></>
                    }
                  </div>
                </div>

              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>

            <Button onClick={() => { procesar_pago(); }}>Procesar Pago</Button>
            <Button variant={"outline"} onClick={() => { set_open_modal(false); set_cambio(0); set_errores([]) }}>Cancelar</Button>
          </AlertDialogFooter>
        </AlertDialogContent>

      </AlertDialog>
    </div>
  )
}
