import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import axiosClient from '../../axios-client';
import { useToast } from "@/components/ui/use-toast"; 
import dayjs from 'dayjs';
import ZustandPuntoVenta from '../../contexts/ZustandPuntoVenta';
import { useStateContext } from '../../contexts/ContextProvider';

export const ModalFondoCaja = ({ open, onRegister, iniciar_session_cancelada }) => {
  const { toast } = useToast()
  const [amount, setAmount] = useState('');
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const navigate = useNavigate(); // Hook para navegar a otra ruta
  const [sessiones_rechazadas, set_sessiones_rechazadas] = useState();
  const { set_session_caja, set_session_caja_completo } = ZustandPuntoVenta();
  const { user } = useStateContext();
  useEffect(() => {
    fetch_sessiones_rechazadas();
  }, [])

  const fetch_sessiones_rechazadas = async () => {
    try {
      let response = await axiosClient.get("/cajas/cortesRechazados");
      set_sessiones_rechazadas(response.data);
      console.log(response.data)
    } catch (err) {
      console.log(err);
    }
  }

  const handleBlur = () => {
    // Si el campo no está vacío y no contiene un punto decimal, añade ".00"
    if (amount && !amount.includes('.')) {
      setAmount(`${amount}.00`);
    }
  };

  const handleNextStep = () => {
    setIsSecondModalOpen(true); // Abre el segundo modal

  };

  const handleConfirmAndClose = () => {
    if (onRegister) {
      onRegister(amount); // Realiza la acción de registro con el monto
    }
    setIsSecondModalOpen(false); // Cierra ambos modales
  };

  const handleCancel = () => {
    navigate(-1); // Navega a la ruta anterior
  };

  const handle_session_cancelada = (session) => {
    set_session_caja(session)
    iniciar_session_cancelada();
  }

  return (
    <div>

      <AlertDialog open={open}>
        <AlertDialogContent className="max-w-[30rem]">
          <AlertDialogHeader>
            <AlertDialogTitle>Apertura de caja</AlertDialogTitle>
          </AlertDialogHeader>

          {
            user?.caja?.id_caja_catalogo != null ?
              <>
                <div className="border p-4 rounded-md">
                  <p className='mb-3'>Iniciar nueva sesión</p>
                  <label htmlFor="amount" className="block text-sm font-medium ">
                    Fondo inicial:
                  </label>
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    onBlur={handleBlur} // Formatea cuando el campo pierde el foco
                    className="mt-1 block w-full p-2 border rounded-md shadow-sm bg-background sm:text-sm"
                    placeholder="Ingrese la cantidad"
                    maxLength={5}
                  />
                  {
                    sessiones_rechazadas?.length > 0 &&
                    <>
                      <p className='mt-5 mb-2'>Cortes de caja rechazados</p>
                      {sessiones_rechazadas.map((session) => (
                        <>
                          <div className='max-h-[40vh] overflow-auto'>
                            <div onClick={() => {
                              handle_session_cancelada(session.caja);
                              set_session_caja_completo(session);

                            }} className='mb-4 px-3 py-2 hover:py-4  w-[full] rounded-md border border-red-500 cursor-pointer transition-all duration-200'>
                              <p>Fecha Apertura: {dayjs(session.caja.fecha_apertura).format('DD-MM-YYYY hh:mm A')}</p>
                              <p>Fecha Cierre: {dayjs(session.caja.fecha_cierre).format('DD-MM-YYYY hh:mm A')}</p>
                            </div>
                          </div>
                        </>
                      ))}
                    </>
                  }
                </div>
              </>
              :
              <>
                <p>Este usuario no tiene ninguna caja asignada.</p>
              </>
          }


          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Cancelar</AlertDialogCancel>
            {user?.caja?.id_caja_catalogo != null &&
              <AlertDialogAction onClick={handleNextStep}>Siguiente</AlertDialogAction>
            }

          </AlertDialogFooter>
        </AlertDialogContent>

        {/* Segundo Modal */}
        {isSecondModalOpen && (
          <AlertDialog open={isSecondModalOpen}>
            <AlertDialogContent className="max-w-[30rem]">
              <AlertDialogHeader>
                <AlertDialogTitle>¿La cantidad $ {amount} es correcta?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={handleCancel}>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirmAndClose}>Registrar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </AlertDialog>
    </div>
  );
};
