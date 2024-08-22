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

export const ModalMetodoPago = ({ open_modal, set_open_modal }) => {

  const [metodo_pago_selected, set_metodo_pago_selected] = useState("efectivo");

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
                      <div className={metodo_pago_selected == "efectivo" ? "my-5 w-full h-[20vh] rounded-md flex items-center justify-center cursor-pointer transition-all bg-muted" : `my-5 w-full h-[15vh] hover:h-[20vh] rounded-md flex items-center justify-center cursor-pointer transition-all hover:bg-muted`} onClick={() => { set_metodo_pago_selected("efectivo") }}>
                        <div className='flex flex-col gap-2 items-center justify-center'>
                          <img src={cash} alt="" className='w-[70px]' />
                          <p>Efectivo</p>
                        </div>
                      </div>
                      <div className={metodo_pago_selected == "tarjeta_credito" ? "my-5 w-full h-[20vh] rounded-md flex items-center justify-center cursor-pointer transition-all bg-muted" : `my-5 w-full h-[15vh] hover:h-[20vh] rounded-md flex items-center justify-center cursor-pointer transition-all hover:bg-muted`}
                        onClick={() => { set_metodo_pago_selected("tarjeta_credito") }}>
                        <div className='flex flex-col gap-2 items-center justify-center'>
                          <img src={credit_card} alt="" className='w-[70px]' />
                          <p>Tarjeta Crédito</p>
                        </div>
                      </div>
                      <div className={metodo_pago_selected == "tarjeta_debito" ? "my-5 w-full h-[20vh] rounded-md flex items-center justify-center cursor-pointer transition-all bg-muted" : `my-5 w-full h-[15vh] hover:h-[20vh] rounded-md flex items-center justify-center cursor-pointer transition-all hover:bg-muted`}
                        onClick={() => { set_metodo_pago_selected("tarjeta_debito") }}>
                        <div className='flex flex-col gap-2 items-center justify-center'>
                          <img src={credit_card_2} alt="" className='w-[70px]' />
                          <p>Tarjeta Débito</p>
                        </div>
                      </div>
                      <div className={metodo_pago_selected == "documento" ? "my-5 w-full h-[20vh] rounded-md flex items-center justify-center cursor-pointer transition-all bg-muted" : `my-5 w-full h-[15vh] hover:h-[20vh] rounded-md flex items-center justify-center cursor-pointer transition-all hover:bg-muted`}
                        onClick={() => { set_metodo_pago_selected("documento") }}>
                        <div className='flex flex-col gap-2 items-center justify-center'>
                          <img src={cheque} alt="" className='w-[70px]' />
                          <p>Documento</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='w-[80%] h-full max-h-[60vh]'>
                  <p className='mb-5'>Información de pago</p>
                  <div className='border w-full p-4 rounded-md h-full'>
                    {
                      metodo_pago_selected == "efectivo" &&
                      <>
                        
                      </>
                    }
                  </div>
                </div>

              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => { set_open_modal(false) }}>Cerrar</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
