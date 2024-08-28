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
import axiosClient from '../../axios-client';

export const ModalRetiroCaja = ({ trigger, onRegister, initialFund, idSesionCaja }) => {
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
  const [cajaSesionId, setCajaSesionId] = useState(null);


  useEffect(() => {
    // Obtener los valores almacenados en localStorage
    
    
    const cajaSesion = 17; // Obtener sesion la caja

    setCajaSesionId(cajaSesion ? parseInt(cajaSesion, 10) : null);

    
  }, []);
  

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

  const handleConfirmAndClose = async () => {
    const data = {
      id_sesion_caja: cajaSesionId, // Utiliza el prop idSesionCaja
      cantidad_centavo_10: billsAndCoins[0.10] || 0,
      cantidad_centavo_20: billsAndCoins[0.20] || 0,
      cantidad_centavo_50: billsAndCoins[0.50] || 0,
      cantidad_moneda_1: billsAndCoins[1] || 0,
      cantidad_moneda_2: billsAndCoins[2] || 0,
      cantidad_moneda_5: billsAndCoins[5] || 0,
      cantidad_moneda_10: billsAndCoins[10] || 0,
      cantidad_moneda_20: billsAndCoins[20] || 0,
      cantidad_billete_20: billsAndCoins[20] || 0,
      cantidad_billete_50: billsAndCoins[50] || 0,
      cantidad_billete_100: billsAndCoins[100] || 0,
      cantidad_billete_200: billsAndCoins[200] || 0,
      cantidad_billete_500: billsAndCoins[500] || 0,
      cantidad_billete_1000: billsAndCoins[1000] || 0,
      monto_total: totalAmount.toFixed(2), // Convertir a cadena con formato decimal
    };
  
    try {
      console.log(data);
      const response = await axiosClient.post("/cajas/retiro/registrarRetiro", data);
      console.log('Retiro registrado:', response.data);
      
      if (onRegister) {
        onRegister(billsAndCoins); 
      }
      
      setIsSecondModalOpen(false);
      setIsFirstModalOpen(false);
    } catch (error) {
      console.error('Error registrando el retiro:', error);
      alert('Ocurrió un error durante el registro del retiro.');
    }
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
    return total + (parseFloat(denomination) * count); 
  }, 0);

  return (
    <div>
      <AlertDialog open={isFirstModalOpen} onOpenChange={handleOpenChange}>
        <AlertDialogTrigger asChild>
          {trigger}
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-[80rem] max-h-[100vh] overflow-auto">
          <AlertDialogHeader>
            <AlertDialogTitle>Retiro de caja</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="p-4 grid grid-cols-3 gap-6 ">
            {/* Conteo de Billetes */}
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

            {/* Conteo de Monedas */}
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

            {/* Conteo de Centavos */}
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
          </div>

          {/* Información de la Caja */}
          <div className="p-4 border-t">
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm font-medium">Total calculado:</p>
              <p className="text-sm">${totalAmount.toFixed(2)}</p>
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleNextStep}>Registrar Retiro</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Segundo Modal para Confirmación */}
      <AlertDialog open={isSecondModalOpen} onOpenChange={setIsSecondModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Retiro</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="p-4">
            <p>El total de retiro calculado es: ${totalAmount.toFixed(2)}</p>
            <p>¿Es correcto?</p>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmAndClose}>Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
