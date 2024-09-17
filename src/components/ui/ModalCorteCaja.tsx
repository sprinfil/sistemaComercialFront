import React, { useState, useEffect } from 'react';
import axiosClient from '../../axios-client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from './use-toast';
import { GrDocumentText } from "react-icons/gr";
import ZustandPuntoVenta from '../../contexts/ZustandPuntoVenta';
import { Table, TableBody, TableCell, TableRow } from './table';
import Loader from './Loader';
import { Skeleton } from './skeleton';
import estructura_ticket from '../../tickets/TicketCorteCaja';
import imprimir from '../../tickets/FuncionesImpresora';

import { ToastAction } from "@/components/ui/toast"; //IMPORTACIONES TOAST



export const ModalCorteCaja = ({ trigger, onRegister, initialFund }) => {


  const [billetesCentavos, setBilletesCentavos] = useState({
    0.05: 0,
    0.20: 0,
    0.50: 0,
    20: 0,
    50: 0,
    100: 0,
    200: 0,
    500: 0,
    1000: 0,
  });


  const [monedas, setMonedas] = useState({
    1: 0,
    2: 0,
    5: 0,
    10: 0,
    20: 0,
  });
  const [totalTarjetas, setTotalTarjetas] = useState(0);
  const [totalCheques, setTotalCheques] = useState(0);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [cajaInfo, setCajaInfo] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [pagos, set_pagos] = useState();
  const [total_tarjeta_credito, set_total_tarjeta_credito] = useState();
  const [total_tarjeta_debito, set_total_tarjetas_debito] = useState();
  const [total_cheques, set_total_cheques] = useState();
  const [total_efectivo, set_total_efectivo] = useState();
  const [total_transferencia, set_total_transferencia] = useState();
  const [total_esperado_caja, set_total_esperado_caja] = useState(0);
  const { session_caja, session_caja_completo } = ZustandPuntoVenta();

  function successToastCreado() {
    toast({
      title: "¡Éxito!",
      description: "La caja se ha cerrado correctamenta",
      variant: "success",
    })
  }

  useEffect(() => {
    // Fetch caja info when the first modal opens
    if (isFirstModalOpen) {
      fetchCajaInfo();
      fetch_pagos();
    }
  }, [isFirstModalOpen]);

  useEffect(() => {
    let efectivo = parseFloat(total_efectivo);
    let retirado = parseFloat(cajaInfo?.Total_retirado);
    let fondo_inicial = parseFloat(cajaInfo?.fondo_inicial);
    set_total_esperado_caja(efectivo - retirado + fondo_inicial);
  }, [total_efectivo])

  const fetchCajaInfo = async () => {
    try {
      const response = await axiosClient.get('/cajas/estadoSesionCobro');
      console.log(response.data)
      setCajaInfo(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const imprimir_ticket_corte_caja = () => {
    console.log(session_caja) 
    let ticket_data_original = {
      nombre_caja: session_caja.caja_nombre,
      consecutivo: "000123",
      nombre_cajero: session_caja.nombre_operador,
      apertura: session_caja.fecha_apertura,
      cierre: session_caja.fecha_cierre,

      fondo_inicial: session_caja.fondo_inicial,
      retirado: cajaInfo.Total_retirado,
      total_ingreso_efectivo: total_efectivo,
      total_esperado: total_esperado_caja,
      total_real: totalAmount,
      pagos: pagos,

      total_efectivo: total_efectivo,
      total_tarjeta_credito: total_tarjeta_credito,
      total_tarjeta_debito: total_tarjeta_debito,
      total_cheques: total_cheques
    };
   
    console.log(ticket_data_original);
    let ticket_original = estructura_ticket(ticket_data_original);

    imprimir(ticket_original, "", "logosapa.png")
      .then((response) => {
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

  const handleOpenChange = (open) => {
    setIsFirstModalOpen(open);
    if (open) {
      setBilletesCentavos({
        0.05: session_caja_completo.cantidad_centavo_10 || 0,
        0.20: session_caja_completo.cantidad_centavo_20 || 0,
        0.50: session_caja_completo.cantidad_centavo_50 || 0,
        20: session_caja_completo.cantidad_billete_20   || 0,
        50: session_caja_completo.cantidad_billete_50 || 0,
        100: session_caja_completo.cantidad_billete_100 || 0,
        200: session_caja_completo.cantidad_billete_200 || 0,
        500: session_caja_completo.cantidad_billete_500 || 0,
        1000: session_caja_completo.cantidad_billete_1000 || 0,
      });
      setMonedas({
        1: session_caja_completo.cantidad_moneda_1 || 0,
        2: session_caja_completo.cantidad_moneda_2 || 0,
        5: session_caja_completo.cantidad_moneda_5 || 0,
        10: session_caja_completo.cantidad_moneda_10 || 0,
        20: session_caja_completo.cantidad_moneda_20 || 0,
      });
      setTotalTarjetas(0);
      setTotalCheques(0);
    }
  };

  const handleNextStep = () => {
    setIsSecondModalOpen(true);
  };



  const handleConfirmAndClose = async () => {
    try {
      const corteData = {
        cantidad_centavo_10: billetesCentavos[0.05],
        cantidad_centavo_20: billetesCentavos[0.20],
        cantidad_centavo_50: billetesCentavos[0.50],
        cantidad_moneda_1: monedas[1],
        cantidad_moneda_2: monedas[2],
        cantidad_moneda_5: monedas[5],
        cantidad_moneda_10: monedas[10],
        cantidad_moneda_20: monedas[20],
        cantidad_billete_20: billetesCentavos[20],
        cantidad_billete_50: billetesCentavos[50],
        cantidad_billete_100: billetesCentavos[100],
        cantidad_billete_200: billetesCentavos[200],
        cantidad_billete_500: billetesCentavos[500],
        cantidad_billete_1000: billetesCentavos[1000],

        total_documentos_real: parseFloat("0.00").toFixed(2),
        total_efectivo_real: totalAmount.toFixed(2),
        total_tarjetas_credito_real: parseFloat(total_tarjeta_credito).toFixed(2),
        total_tarjetas_debito_real: parseFloat(total_tarjeta_debito).toFixed(2),
        total_transferencias_real: parseFloat(total_transferencia).toFixed(2),
        total_cheques_real: parseFloat(total_cheques).toFixed(2),
        total_real: ((total_tarjeta_debito || 0) + (total_tarjeta_credito || 0) + (total_cheques || 0) + (total_efectivo || 0)).toFixed(2),
      };

      const cajaData = {
        id_caja_catalogo: 51,
        fondo_final: (totalAmount + totalTarjetas + totalCheques).toFixed(2),
      };

      const payload = {
        caja_data: [cajaData],
        corte_data: [corteData],
      };

      console.log(payload);
      const response = await axiosClient.put('/cajas/update', payload);
      console.log('API Response:', response.data);

      if (onRegister) {
        onRegister(billetesCentavos, monedas, totalTarjetas, totalCheques);
      }

      setIsSecondModalOpen(false);
      setIsFirstModalOpen(false);
    } catch (error) {
      console.error('Error al realizar el corte de caja:', error);
    }
  };

  const handleCancel = () => {
    setIsSecondModalOpen(false);
    setIsFirstModalOpen(false);
  };

  const handleBillChange = (denomination, value) => {
    if (denomination in billetesCentavos) {
      setBilletesCentavos(prev => ({
        ...prev,
        [denomination]: value
      }));
    }
  };

  const handlemonedasChange = (denomination, value) => {
    if (denomination in monedas) {
      setMonedas(prev => ({
        ...prev,
        [denomination]: value
      }));
    }
  }

  const totalAmount = Object.entries(billetesCentavos).reduce((total, [denomination, count]) => {
    return total + (parseFloat(denomination) * count);
  }, 0) + Object.entries(monedas).reduce((total, [denomination, count]) => {
    return total + (parseFloat(denomination) * count);
  }, 0);

  const handleExitClick = () => {
    localStorage.removeItem('isFondoCajaRegistered');
    localStorage.removeItem('fondoCajaAmount');

    // Redirigir al usuario a la página principal
    navigate("/dashboard");
  };

  const fetch_pagos = () => {

    axiosClient.get("/cajas/pagos", {
      params: {
        id_caja: session_caja.id
      } 
    })
      .then((response) => {
        set_pagos(response.data);

        let total_efectivo_temp: any = 0;
        let total_cheques_temp: any = 0;
        let total_tarjeta_credito_temp: any = 0;
        let total_tarjeta_debito_temp: any = 0;
        let total_transferencia_temp: any = 0;

        response.data.map((pago: any) => {
          total_efectivo_temp += (pago.forma_pago == "efectivo" ? parseFloat(pago.total_abonado) : 0);
          total_cheques_temp += (pago.forma_pago == "cheque" ? parseFloat(pago.total_abonado) : 0);
          total_tarjeta_credito_temp += (pago.forma_pago == "tarjeta_credito" ? parseFloat(pago.total_abonado) : 0);
          total_tarjeta_debito_temp += (pago.forma_pago == "tarjeta_debito" ? parseFloat(pago.total_abonado) : 0);
          total_transferencia_temp += (pago.forma_pago == "transferencia" ? parseFloat(pago.total_abonado) : 0);
        })

        set_total_efectivo(total_efectivo_temp);
        set_total_tarjeta_credito(total_tarjeta_credito_temp);
        set_total_tarjetas_debito(total_tarjeta_debito_temp);
        set_total_cheques(total_cheques_temp);
        set_total_transferencia(total_transferencia_temp);

      }).catch((response) => {
        console.log(response)
      })
  }

  return (
    <div>
      <AlertDialog open={isFirstModalOpen} onOpenChange={handleOpenChange}>
        <AlertDialogTrigger asChild>
          {trigger}
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-[80rem] max-h-[90vh] overflow-auto">
          <AlertDialogHeader>
            <AlertDialogTitle>Corte de caja</AlertDialogTitle>
          </AlertDialogHeader>
          <div className='px-3 text-[20px] gap-2'>
            <p>{session_caja.nombre_operador}</p>
            <p>{session_caja.caja_nombre}</p>
          </div>
          <div className="p-4 grid grid-cols-3 gap-6">


            {/* Conteo de Billetes */}
            <div className="space-y-4">
              <p className="text-sm font-medium mb-2">Ingrese la cantidad de billetes:</p>
              {[20, 50, 100, 200, 500, 1000].map(denomination => (
                <div key={denomination} className="flex items-center space-x-4">
                  <label className="block text-sm font-medium w-1/2">Billetes de ${denomination}:</label>
                  <input
                    type="text"
                    value={billetesCentavos[denomination]}
                    onChange={(e) => handleBillChange(denomination, parseInt(e.target.value) || 0)}
                    className="block w-1/3 p-1 bg-background border rounded-md shadow-sm bg-background sm:text-sm"
                    placeholder="Cantidad"
                    maxLength={3}
                  />
                  <div className="text-sm font-medium w-1/6">${(billetesCentavos[denomination] * denomination).toFixed(2)}</div>
                </div>
              ))}
            </div>

            {/* Conteo de Monedas */}
            <div className="space-y-4">
              <p className="text-sm font-medium mb-2">Ingrese la cantidad de monedas:</p>
              {[1, 2, 5, 10, 20].map(denomination => {

                return (
                  <div key={denomination} className="flex items-center space-x-4">
                    <label className="block text-sm font-medium w-1/2">Monedas de ${denomination}:</label>
                    <input
                      type="text"
                      value={monedas[denomination]}
                      onChange={(e) => handlemonedasChange(denomination, parseInt(e.target.value) || 0)}
                      className="block w-1/3 p-1 border bg-background rounded-md shadow-sm bg-background sm:text-sm"
                      placeholder="Cantidad"
                      maxLength={3}
                    />
                    <div className="text-sm font-medium w-1/6">${(monedas[denomination] * denomination).toFixed(2)}</div>
                  </div>
                );
              })}
            </div>


            {/* Conteo de Centavos */}
            <div className="space-y-4">
              <p className="text-sm font-medium mb-2">Ingrese la cantidad de centavos:</p>
              {[0.05, 0.20, 0.50].map(denomination => (
                <div key={denomination} className="flex items-center space-x-4">
                  <label className="block text-sm font-medium w-1/2">Centavos de ${denomination.toFixed(2)}:</label>
                  <input
                    type="text"
                    value={billetesCentavos[denomination]}
                    onChange={(e) => handleBillChange(denomination, parseInt(e.target.value) || 0)}
                    className="block w-1/3 p-1 border rounded-md shadow-sm bg-background sm:text-sm"
                    placeholder="Cantidad"
                    maxLength={3}
                  />
                  <div className="text-sm font-medium w-1/6">${(billetesCentavos[denomination] * denomination).toFixed(2)}</div>
                </div>
              ))}
            </div>

            {/* Total Tarjetas 
              <div className="space-y-4">
              <p className="text-sm font-medium mb-2">Total tarjetas:</p>
              <input
                type="number"
                value={totalTarjetas}
                onChange={(e) => setTotalTarjetas(parseFloat(e.target.value))}
                className="block w-full p-1 border rounded-md shadow-sm bg-background sm:text-sm"
                placeholder="Cantidad"
                maxLength={10}
              />
            </div>
            */}


            {/* Total Cheques     <div className="space-y-4">
              <p className="text-sm font-medium mb-2">Total cheques:</p>
              <input
                type="number"
                value={totalCheques}
                onChange={(e) => setTotalCheques(parseFloat(e.target.value))}
                className="block w-full p-1 border rounded-md shadow-sm bg-background sm:text-sm"
                placeholder="Cantidad"
                maxLength={10}
              />
            </div>*/}

          </div>

          <div className="p-1 border-gray-200">
            <div className='p-3 rounded-md my-5'>
              {
                !cajaInfo &&
                <>
                  <Skeleton className='w-full h-[40vh]' />
                </>
              }
              {
                cajaInfo && 
                <>
                  <Table>
                    <TableBody className="text-[20px]">
                      <TableRow className="bg-muted">
                        <TableCell>Monto Esperado en caja</TableCell>
                        <TableCell>
                          $ {total_esperado_caja?.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "<<Sin datos>>"},
                          Monto Real: {totalAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Fondo Inicial</TableCell>
                        <TableCell>
                          $ {session_caja.fondo_inicial?.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "<<Sin datos>>"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Total Retirado</TableCell>
                        <TableCell>
                          $ {cajaInfo.Total_retirado?.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "<<Sin datos>>"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Total Efectivo</TableCell>
                        <TableCell>
                          $ {total_efectivo?.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "<<Sin datos>>"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Total Tarjeta Credito</TableCell>
                        <TableCell>
                          $ {total_tarjeta_credito?.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "<<Sin datos>>"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Total Tarjeta Debito</TableCell>
                        <TableCell>
                          $ {total_tarjeta_debito?.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "<<Sin datos>>"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Total Transferencia</TableCell>
                        <TableCell>
                          $ {total_transferencia?.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "<<Sin datos>>"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Total Cheques</TableCell>
                        <TableCell>
                          $ {total_cheques?.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "<<Sin datos>>"}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </>
              }
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCancel}>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleNextStep}>Continuar</AlertDialogAction>
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Segundo Modal para Confirmación */}
      <AlertDialog open={isSecondModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Es correcto el total?</AlertDialogTitle>
          </AlertDialogHeader>
          <p className="text-lg font-medium mb-4">
            El total ingresado es de ${(totalAmount + totalTarjetas + totalCheques).toFixed(2)}. ¿Es correcto?
          </p>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>No</AlertDialogCancel>
            <AlertDialogAction onClick={() => {imprimir_ticket_corte_caja() }}>Imprimrir Ticket</AlertDialogAction>
            <AlertDialogAction onClick={() => { handleConfirmAndClose(), handleExitClick(), successToastCreado() }}>Sí, Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
