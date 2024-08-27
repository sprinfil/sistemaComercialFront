import React, { useState } from 'react';
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
import axiosClient from '../../axios-client';

export const ModalRetiroCaja = ({ trigger, onRegister }) => {
  const [amount, setAmount] = useState('');
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);

  // Se asegura de limpiar el campo al abrir el modal
  const handleOpenChange = (open) => {
    setIsFirstModalOpen(open);
    if (open) {
      setAmount(''); // Limpia el campo cuando el modal se abre
    }
  };

  const handleNextStep = () => {
    setIsSecondModalOpen(true); // Abre el segundo modal
  };

  const handleConfirmAndClose = async () => {
    try {
      // Realizar el registro del retiro
      const idSesionCaja = 1; // Reemplaza este valor con el ID real de la sesión de caja
      const formattedAmount = parseFloat(amount).toFixed(2);

      const data = {
        id_sesion_caja: idSesionCaja,
        monto_total: formattedAmount,
      };

      const response = await axiosClient.post('/cajas/retiro/registrarRetiro', data);

      console.log('Retiro registrado con éxito:', response.data);
      
      // Llama a la función onRegister si se pasó como prop
      if (onRegister) {
        onRegister(formattedAmount); // Envía el monto registrado
      }

      // Cierra ambos modales
      setIsSecondModalOpen(false);
      setIsFirstModalOpen(false);
    } catch (error) {
      console.error('Error al registrar el retiro:', error);
      // Aquí podrías manejar el error de manera más específica según sea necesario
    }
  };

  const handleCancel = () => {
    // Cierra ambos modales
    setIsSecondModalOpen(false);
    setIsFirstModalOpen(false);
  };

  return (
    <div>
      <AlertDialog open={isFirstModalOpen} onOpenChange={handleOpenChange}>
        <AlertDialogTrigger asChild>
          {trigger}
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-[30rem]">
          <AlertDialogHeader>
            <AlertDialogTitle>Registre el dinero que desea retirar</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="p-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Cantidad de dinero:
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value) }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Ingrese la cantidad"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleNextStep}>Siguiente</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>

        {/* Segundo Modal */}
        {isSecondModalOpen && (
          <AlertDialog open={isSecondModalOpen} onOpenChange={setIsSecondModalOpen}>
            <AlertDialogContent className="max-w-[30rem]">
              <AlertDialogHeader>
                <AlertDialogTitle>¿La cantidad {amount} es correcta?</AlertDialogTitle>
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
