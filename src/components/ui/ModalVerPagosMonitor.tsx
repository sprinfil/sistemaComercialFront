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
import ModalConfirmarTimbre from './ModalConfirmarTimbre';
import pagoService from '../../lib/PagoService';
import { useStateContext } from '../../contexts/ContextProvider';
import ZustandMonitorPagos from '../../contexts/ZustandMonitorPagos';

const ModalVerPagosMonitor = ({ selected_pago, open, set_open }) => {

  const { session_caja } = ZustandPuntoVenta();
  const { user } = useStateContext();
  const { pagos, set_pagos } = ZustandMonitorPagos();

  const { toast } = useToast()
  //const [selected_pago, set_selected_pago] = useState([]);



  useEffect(() => {
    window.addEventListener('keydown', handleF5Press);
    return () => {
      window.removeEventListener('keydown', handleF5Press);
    };
  }, []);

  const handleF5Press = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      set_open(false)
    }
  };

  const solicitud_cancelacion = (pago) => {
    axiosClient.post("/cajas/solicitudCancelacion",
      {
        id_operador: session_caja.id_operador,
        id_caja: session_caja.id,
        folio: pago?.folio
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
      pago_folio: pago?.folio,
      fecha_pago: pago?.fecha_pago,
      copia: false,
      //usuario_nombre: dueno?.usuario?.nombre + " " + dueno?.usuario?.apellido_paterno + " " + dueno?.usuario?.apellido_materno,
      usuario_nombre: selected_pago.usuario.nombre + " " + selected_pago.usuario.apellido_paterno + " " + selected_pago.usuario.apellido_materno,
      numero_cuenta: pago?.dueno?.codigo_toma,
      calle: pago.dueno?.calle,
      numero: pago.dueno?.numero_casa,
      codigo_postal: pago.dueno?.codigo_postal,
      colonia: pago.dueno?.colonia,
      rfc: pago.dueno?.usuario?.rfc,
      conceptos: pago.abonos_con_cargos,
      //saldo_anterior: total_neto.toFixed(2).toString(),
      saldo_anterior: pago?.saldo_anterior,
      metodo_pago: pago?.forma_pago,
      recibido: pago?.recibido,
      pago_neto: pago?.total_pagado,
      cambio: pago?.cambio,
      //saldo_pendiente: (total_neto - abono).toFixed(2).toString()
      saldo_pendiente: pago?.saldo_actual || 0,
      saldo_a_favor: pago?.saldo_no_aplicado || 0,
      modelo_dueno: pago?.modelo_dueno
    };

    let ticket_original = estructura_ticket(ticket_data_original);
    let barcode = pago?.folio.toString();

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
      <AlertDialog open={open}>

        <AlertDialogContent className="max-w-[80rem] ">
          <AlertDialogHeader>
            <AlertDialogTitle>{selected_pago?.folio}</AlertDialogTitle>
            <AlertDialogDescription>Detalles del pago.</AlertDialogDescription>
          </AlertDialogHeader>
          <div className='h-[70vh]'>
            <>

              <>
                <div className='flex gap-3 shadow-md p-2 items-center border rounded-md'>
                  <p>Pago: {selected_pago?.folio}</p>
                  <div className='w-[200px] gap-2 flex items-center justify-center px-2 py-2 rounded-md dark:hover:bg-blue-900 hover:bg-blue-100 cursor-pointer ease-in duration-100'
                    onClick={() => { reimprimir(selected_pago) }}
                  >
                    <ReaderIcon className='w-[20px] h-[20px] text-blue-500' />
                    <p>Reimprimir Ticket</p>
                  </div>
                  {selected_pago?.timbrado == null ?
                    <ModalConfirmarTimbre
                      trigger={<Button variant={"outline"} >Timbrar</Button>}
                      title={`¿Timbrar pago ${selected_pago?.folio}?`}
                      onConfirm={async () => {
                        try {
                          let pago_timbrado = await pagoService.create_cfdi({
                            folio: selected_pago?.folio,
                            id_timbro: user?.operador?.id,
                            metodo: "directo"
                          });
                          set_pagos((prev) => {
                            return prev.map((pago) => {
                              if (pago.folio === selected_pago?.folio) {
                                let nuevo_pago = {
                                  ...pago,
                                  timbrado: pago_timbrado
                                };
                                return nuevo_pago;
                              }
                              return pago;
                            });
                          });
                          toast({
                            variant: "success",
                            title: "Pago timbrado",
                            //description: "Algo salió mal.",
                            action: <ToastAction altText="Try again">Aceptar</ToastAction>,
                          })
                        }
                        catch {
                          toast({
                            variant: "destructive",
                            title: "Algo salio mal",
                            //description: "Algo salió mal.",
                            action: <ToastAction altText="Try again">Aceptar</ToastAction>,
                          })
                        }
                      }}
                    />
                    :
                    <>
                      <div className='bg-blue-500 p-2 rounded-md text-white'>
                        <p>Pago Timbrado</p>
                      </div>
                    </>
                  }


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
                          <TableCell>{session_caja.caja_nombre || "<<Sin datos>>"}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Consecutivo</TableCell>
                          <TableCell>000123</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Nombre Cajero</TableCell>
                          <TableCell>{session_caja.nombre_operador || "<Sin datos>"}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Folio de Pago</TableCell>
                          <TableCell>{selected_pago?.folio || "<Sin datos>"}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Fecha de Pago</TableCell>
                          <TableCell>{selected_pago?.fecha_pago || "<Sin datos>"}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Nombre del Usuario</TableCell>
                          <TableCell>{(selected_pago?.usuario?.nombre + " " + selected_pago?.usuario?.apellido_paterno + " " + selected_pago?.usuario?.apellido_materno) || "<Sin datos>"}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Número de Cuenta</TableCell>
                          <TableCell>{selected_pago?.dueno?.codigo_toma || "<Sin datos>"}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Calle</TableCell>
                          <TableCell>{selected_pago?.dueno?.calle || "<Sin datos>"}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Número</TableCell>
                          <TableCell>{selected_pago?.dueno?.numero_casa || "<Sin datos>"}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Código Postal</TableCell>
                          <TableCell>{selected_pago?.dueno?.codigo_postal || "<Sin datos>"}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Colonia</TableCell>
                          <TableCell>{selected_pago?.dueno?.colonia || "<Sin datos>"}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>RFC</TableCell>
                          <TableCell>{selected_pago?.dueno?.usuario?.rfc || "<Sin datos>"}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Saldo Anterior</TableCell>
                          <TableCell>{selected_pago?.saldo_anterior || "<Sin datos>"}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Método de Pago</TableCell>
                          <TableCell>{selected_pago?.forma_pago || "<Sin datos>"}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Recibido</TableCell>
                          <TableCell>{selected_pago?.recibido}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Pago Neto</TableCell>
                          <TableCell>{selected_pago?.total_abonado}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Cambio</TableCell>
                          <TableCell>{selected_pago?.cambio}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Saldo Pendiente</TableCell>
                          <TableCell>{selected_pago?.saldo_actual || 0}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Saldo a Favor</TableCell>
                          <TableCell>{selected_pago?.saldo_no_aplicado || 0}</TableCell>
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
                          {selected_pago?.abonos_con_cargos?.map(abono => (
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
            </>
          </div>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => { set_open(false) }}>Aceptar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ModalVerPagosMonitor;

