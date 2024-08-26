import React, { useState, useEffect } from 'react';
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

export const ModalCorteCaja = ({ trigger, onRegister, initialFund }) => {
  const [billsAndCoins, setBillsAndCoins] = useState({
    0.10: 0,   // Centavos
    0.20: 0,
    0.50: 0,
    1: 0,    // Monedas
    2: 0,
    5: 0,
    10: 0,
    20: 0,   // Billetes
    50: 0,
    100: 0,
    200: 0,
    500: 0,
    1000: 0,
  });
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);

  useEffect(() => {
    console.log('initialFund:', initialFund);
  }, [initialFund]);

  const handleOpenChange = (open) => {
    setIsFirstModalOpen(open);
    if (open) {
      setBillsAndCoins({
        0.10: 0,
        0.20: 0,
        0.50: 0,
        1: 0,
        2: 0,
        5: 0,
        10: 0,
        20: 0,
        50: 0,
        100: 0,
        200: 0,
        500: 0,
        1000: 0,
      }); // Limpia los campos cuando el modal se abre
    }
  };

  const handleNextStep = () => {
    setIsSecondModalOpen(true); // Abre el segundo modal
  };

  const handleConfirmAndClose = () => {
    if (onRegister) {
      onRegister(billsAndCoins); // Realiza la acción de registro con el conteo de billetes y monedas
    }
    // Cierra ambos modales
    setIsSecondModalOpen(false);
    setIsFirstModalOpen(false);
  };

  const handleCancel = () => {
    // Cierra ambos modales
    setIsSecondModalOpen(false);
    setIsFirstModalOpen(false);
  };

  const handleBillChange = (denomination, value) => {
    setBillsAndCoins(prev => ({
      ...prev,
      [denomination]: value
    }));
  };

  const totalAmount = Object.entries(billsAndCoins).reduce((total, [denomination, count]) => {
    return total + (parseFloat(denomination) * count); // Asegúrate de convertir la denominación a número
  }, 0);

  return (
    <div>
      <AlertDialog open={isFirstModalOpen} onOpenChange={handleOpenChange}>
        <AlertDialogTrigger asChild>
          {trigger}
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-[80rem] max-h-[95vh] overflow-auto">
          <AlertDialogHeader>
            <AlertDialogTitle>Corte de caja</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="p-4 grid grid-cols-2 gap-6">
            {/* Conteo de Monedas y Billetes */}
            <div className="space-y-4">
              <div className="space-y-4">
                <p className="text-sm font-medium mb-2">
                  Ingrese la cantidad de centavos:
                </p>
                {[0.10, 0.20, 0.50].map(denomination => (
                  <div key={denomination} className="flex items-center space-x-4">
                    <label className="block text-sm font-medium w-1/2">
                      Centavos de ${denomination}:
                    </label>
                    <input
                      type="text"
                      value={billsAndCoins[denomination]}
                      onChange={(e) => handleBillChange(denomination, parseInt(e.target.value) || 0)}
                      className="block w-1/3 p-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Cantidad"
                    />
                    <div className="text-sm font-medium w-1/6">
                      ${(billsAndCoins[denomination] * denomination).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <p className="text-sm font-medium mb-2">
                  Ingrese la cantidad de monedas:
                </p>
                {[1, 2, 5, 10].map(denomination => (
                  <div key={denomination} className="flex items-center space-x-4">
                    <label className="block text-sm font-medium w-1/2">
                      Monedas de ${denomination}:
                    </label>
                    <input
                      type="text"
                      value={billsAndCoins[denomination]}
                      onChange={(e) => handleBillChange(denomination, parseInt(e.target.value) || 0)}
                      className="block w-1/3 p-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Cantidad"
                    />
                    <div className="text-sm font-medium w-1/6">
                      ${(billsAndCoins[denomination] * denomination).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <p className="text-sm font-medium mb-2">
                  Ingrese la cantidad de billetes:
                </p>
                {[20, 50, 100, 200, 500, 1000].map(denomination => (
                  <div key={denomination} className="flex items-center space-x-4">
                    <label className="block text-sm font-medium w-1/2">
                      Billetes de ${denomination}:
                    </label>
                    <input
                      type="text"
                      value={billsAndCoins[denomination]}
                      onChange={(e) => handleBillChange(denomination, parseInt(e.target.value) || 0)}
                      className="block w-1/3 p-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Cantidad"
                    />
                    <div className="text-sm font-medium w-1/6">
                      ${(billsAndCoins[denomination] * denomination).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Información de la Caja */}
            <div className="space-y-4 pl-6">
              <p className="text-sm font-medium mb-2">Información de la Caja:</p>
              <div className="space-y-2">
                <p className="text-sm font-medium">Número de Caja:</p>
                
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Usuario Logueado:</p>
                
              </div>
              <div className="space-y-2">
                <p className="text-xs font-medium">Fondo Inicial:</p>
                <div className="p-1 text-sm border rounded-md shadow-sm w-1/3">
                  ${initialFund}
                </div>  
              </div>
              <div className="space-y-2">
                <p className="text-xs font-medium">Total Retirado:</p>
                <div className="p-1 text-sm border rounded-md shadow-sm w-1/3">
                  $
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-medium">Total en Caja:</p>
                <div className="p-1 text-sm border rounded-md shadow-sm w-1/3">
                  ${totalAmount.toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleNextStep}>Siguiente</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isSecondModalOpen} onOpenChange={(open) => setIsSecondModalOpen(open)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmación</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="p-4">
            <p className="text-sm font-medium">
              ¿Es correcta la cantidad total de ${totalAmount.toFixed(2)}?
            </p>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsSecondModalOpen(false)}>No</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmAndClose}>Sí</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
