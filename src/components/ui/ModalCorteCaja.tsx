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

export const ModalCorteCaja = ({ trigger, onRegister, initialFund }) => {
  const [billetesCentavos, setBilletesCentavos] = useState({
    0.10: 0,
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
    }
  }, [isFirstModalOpen]);

  const fetchCajaInfo = async () => {
    try {
      const response = await axiosClient.get('/cajas/estadoSesionCobro');
      console.log(response.data)
      setCajaInfo(response.data);
    } catch (error) {
      console.error( error);
    }
  };

  const handleOpenChange = (open) => {
    setIsFirstModalOpen(open);
    if (open) {
      setBilletesCentavos({
        0.10: 0,
        0.20: 0,
        0.50: 0,
        20: 0,
        50: 0,
        100: 0,
        200: 0,
        500: 0,
        1000: 0,
      });
      setMonedas({
        1: 0,
        2: 0,
        5: 0,
        10: 0,
        20: 0,
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
        cantidad_centavo_10: billetesCentavos[0.10],
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
        total_efectivo_real: totalAmount.toFixed(2),
        total_tarjetas_real: totalTarjetas.toFixed(2),
        total_cheques_real: totalCheques.toFixed(2),
        total_real: (totalAmount + totalTarjetas + totalCheques).toFixed(2),
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

  return (
    <div>
      <AlertDialog open={isFirstModalOpen} onOpenChange={handleOpenChange}>
        <AlertDialogTrigger asChild>
          {trigger}
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-[80rem] max-h-[100vh] overflow-auto">
          <AlertDialogHeader>
            <AlertDialogTitle>Corte de caja</AlertDialogTitle>
          </AlertDialogHeader>
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
                    className="block w-1/3 p-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                      className="block w-1/3 p-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              {[0.10, 0.20, 0.50].map(denomination => (
                <div key={denomination} className="flex items-center space-x-4">
                  <label className="block text-sm font-medium w-1/2">Centavos de ${denomination}:</label>
                  <input
                    type="text"
                    value={billetesCentavos[denomination]}
                    onChange={(e) => handleBillChange(denomination, parseInt(e.target.value) || 0)}
                    className="block w-1/3 p-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Cantidad"
                    maxLength={3}
                  />
                  <div className="text-sm font-medium w-1/6">${(billetesCentavos[denomination] * denomination).toFixed(2)}</div>
                </div>
              ))}
            </div>

            {/* Total Tarjetas */}
            <div className="space-y-4">
              <p className="text-sm font-medium mb-2">Total tarjetas:</p>
              <input
                type="text"
                value={totalTarjetas}
                onChange={(e) => setTotalTarjetas(parseFloat(e.target.value) || 0)}
                className="block w-full p-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Cantidad"
                maxLength={3}
              />
            </div>

            {/* Total Cheques */}
            <div className="space-y-4">
              <p className="text-sm font-medium mb-2">Total cheques:</p>
              <input
                type="text"
                value={totalCheques}
                onChange={(e) => setTotalCheques(parseFloat(e.target.value) || 0)}
                className="block w-full p-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Cantidad"
                maxLength={3}
              />
            </div>
          </div>

          <div className="p-4 grid grid-cols-1 gap-6">
            {/* Información de la Caja */}
            {cajaInfo && (
              <div className="flex flex-col lg:flex-row gap-6 mb-4">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <p><strong>Nombre de la caja:</strong> {cajaInfo.caja_nombre}</p>
                  </div>
                  <div className="flex-1">
                    <p><strong>Operador:</strong> {cajaInfo.nombre_operador}</p>
                  </div>
                  <div className="flex-1">
                    <p><strong>Fondo inicial:</strong> ${cajaInfo.fondo_inicial}</p>
                  </div>
                  <div className="flex-1">
                    <p><strong>Total retirado:</strong> ${cajaInfo.Total_retirado}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-200">
            <p className="text-lg font-medium mb-4">
              Total calculado: ${(totalAmount + totalTarjetas + totalCheques).toFixed(2)}
            </p>
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
            <AlertDialogAction onClick={() => {handleConfirmAndClose(), handleExitClick(), successToastCreado()}}>Sí, Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
