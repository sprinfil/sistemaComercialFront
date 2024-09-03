import React, { useState, useEffect } from 'react';
import PuntoVentaForm from '../../components/Forms/PuntoVentaForm';
import { ModalCorteCaja } from '../../components/ui/ModalCorteCaja';
import { ModalFondoCaja } from '../../components/ui/ModalFondoCaja';
import axiosClient from '../../axios-client'; // Importa la instancia configurada de axiosClient
import { useStateContext } from '../../contexts/ContextProvider'; // Importa el hook personalizado
import ZustandPuntoVenta from '../../contexts/ZustandPuntoVenta';

export default function PuntoVenta() {
  const { user } = useStateContext(); // Accede al contexto para obtener el usuario
  const [isFondoCajaRegistered, setIsFondoCajaRegistered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialFund, setInitialFund] = useState('');
  const [cajaCatalogoId, setCajaCatalogoId] = useState(null); // ID de la caja catalogada
  const {set_session_caja} = ZustandPuntoVenta();

  useEffect(() => {
    const cajaCatalogo = 51; // Obtener la caja
    setCajaCatalogoId(cajaCatalogo ? parseInt(cajaCatalogo, 10) : null);
    // Hacer una solicitud a la API para verificar el estado de la caja
    const fetchCajaStatus = async () => {
      try {
        const response = await axiosClient.get('/cajas/estadoSesionCobro');
        const { fondo_inicial } = response.data;

        if (fondo_inicial) {
          setIsFondoCajaRegistered(true);
          setInitialFund(parseFloat(fondo_inicial) || 0);
          
        } else {
          setIsModalOpen(true);
        }
      } catch (error) {
        console.error('Error al consultar el estado de la caja:', error.message || error);
      }
    };

    fetchCajaStatus();
  }, []);

  const handleRegister = async (amount) => {
    const formattedAmount = parseFloat(amount).toFixed(2);

    const data = {
      id_caja_catalogo: cajaCatalogoId,
      fondo_inicial: formattedAmount,
    };

    try {
      const response = await axiosClient.post('/cajas/store', data);
      console.log('Caja abierta con éxito:', response.data);
      fetch_session_status();
      setIsFondoCajaRegistered(true);
      setInitialFund(formattedAmount || 0);
      setIsModalOpen(false);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.error('Error en los datos enviados:', error.response.data);
      } else {
        console.error('Error al abrir la caja:', error.message || error);
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const fetch_session_status = async () => {
    try {
        const response = await axiosClient.get("/cajas/estadoSesionCobro");
        console.log(response.data);
        set_session_caja(response.data);
    } catch (error) {
        console.error("Error al obtener el nombre de la caja:", error);
    }
};

  return (
    <div>
      {!isFondoCajaRegistered ? (
        <ModalFondoCaja 
          open={isModalOpen} 
          onRegister={handleRegister}
          onCancel={handleModalClose}
        />
      ) : (
        <PuntoVentaForm />
      )}
      <ModalCorteCaja
        trigger={<button className="btn-primary"></button>}
        onRegister={() => {}}
        initialFund={initialFund}
      />
    </div>
  );
}
