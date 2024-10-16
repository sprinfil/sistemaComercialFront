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

const ModalVerCFDIMonitor = ({ selected_pago, open, set_open }) => {

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
                  <p>Timbre: {selected_pago?.folio}</p>
                  <Button variant={"outline"}>Mandar Correo</Button>
                  <Button variant={"outline"}>Imprimir Timbre</Button>
                </div>
                <div className='grid grid-cols-2 gap-4 mt-5 relative'>
                  <div className='max-h-[60vh] overflow-auto'>
                    <p className=' p-2 bg-muted'>Información Fiscal</p>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell>Nombre</TableCell>
                          <TableCell>{selected_pago.datos_fiscales.nombre || "<<Sin datos>>"}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Correo</TableCell>
                          <TableCell>{selected_pago.datos_fiscales.correo || "<<Sin datos>>"}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Regimen Fiscal</TableCell>
                          <TableCell>{selected_pago.datos_fiscales.regimen_fiscal || "<<Sin datos>>"}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Razón Social</TableCell>
                          <TableCell>{selected_pago.datos_fiscales.razon_social || "<<Sin datos>>"}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Teléfono</TableCell>
                          <TableCell>{selected_pago.datos_fiscales.telefono || "<<Sin datos>>"}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>País</TableCell>
                          <TableCell>{selected_pago.datos_fiscales.pais || "<<Sin datos>>"}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Estado</TableCell>
                          <TableCell>{selected_pago.datos_fiscales.estado || "<<Sin datos>>"}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Municipio</TableCell>
                          <TableCell>{selected_pago.datos_fiscales.municipio || "<<Sin datos>>"}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Locallidad</TableCell>
                          <TableCell>{selected_pago.datos_fiscales.localidad || "<<Sin datos>>"}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Colonia</TableCell>
                          <TableCell>{selected_pago.datos_fiscales.colonia || "<<Sin datos>>"}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Calle</TableCell>
                          <TableCell>{selected_pago.datos_fiscales.calle || "<<Sin datos>>"}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Referencia</TableCell>
                          <TableCell>{selected_pago.datos_fiscales.referencia || "<<Sin datos>>"}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Número Exterior</TableCell>
                          <TableCell>{selected_pago.datos_fiscales.numero_exterior || "<<Sin datos>>"}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Código Postal</TableCell>
                          <TableCell>{selected_pago.datos_fiscales.codigo_postal || "<<Sin datos>>"}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  <div className='w-full h-full '>
                    <div className='max-h-[60vh] overflow-auto'>
                      <p className='p-2 bg-muted'>Pagos</p>
                      <Table>
                        <TableBody>
                          <TableRow className="bg-muted">
                            {/*
                              <TableCell>Folio</TableCell>
                            */}
                          </TableRow>
                          {selected_pago?.pagos?.map(pago => (
                            <TableRow>
                              <TableCell>{pago?.fecha_pago}</TableCell>

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

export default ModalVerCFDIMonitor;

