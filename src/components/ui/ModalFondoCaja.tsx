import React, { useState } from 'react';
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

export const ModalFondoCaja = ({ open, onRegister }) => {
  const [amount, setAmount] = useState('');
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const navigate = useNavigate(); // Hook para navegar a otra ruta



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

  return (
    <div>
      <AlertDialog open={open}>
        <AlertDialogContent className="max-w-[30rem]">
          <AlertDialogHeader>
            <AlertDialogTitle>Registre el fondo de caja inicial</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="p-4">
            <label htmlFor="amount" className="block text-sm font-medium ">
              Cantidad de dinero:
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
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleNextStep}>Siguiente</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>

        {/* Segundo Modal */}
        {isSecondModalOpen && (
          <AlertDialog open={isSecondModalOpen}>
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
