import React, { useState, useEffect } from 'react';
import PuntoVentaForm from '../../components/Forms/PuntoVentaForm';
import { ModalCorteCaja } from '../../components/ui/ModalCorteCaja';
import { ModalFondoCaja } from '../../components/ui/ModalFondoCaja';
import axiosClient from '../../axios-client'; // Importa la instancia configurada de axiosClient
import { useStateContext } from '../../contexts/ContextProvider'; // Importa el hook personalizado

export default function PuntoVenta() {
  const { user } = useStateContext(); // Accede al contexto para obtener el usuario
  const [isFondoCajaRegistered, setIsFondoCajaRegistered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialFund, setInitialFund] = useState('');
  const [cajaCatalogoId, setCajaCatalogoId] = useState(null); // ID de la caja catalogada

  useEffect(() => {
    // Obtener los valores almacenados en localStorage
    const isRegistered = localStorage.getItem('isFondoCajaRegistered');
    const amount = localStorage.getItem('fondoCajaAmount');
    const cajaCatalogo = 51; // Obtener la caja

    setCajaCatalogoId(cajaCatalogo ? parseInt(cajaCatalogo, 10) : null);

    if (isRegistered === 'true') {
      setIsFondoCajaRegistered(true);
      setInitialFund(parseFloat(amount) || 0);
    } else {
      setIsModalOpen(true);
    }
  }, []);

  const handleRegister = async (amount) => {
    
     // Formatear la fecha y hora actual como "YYYY-MM-DD HH:mm:ss"

    

    // Formatear el fondo_inicial a un string con dos decimales
    const formattedAmount = parseFloat(amount).toFixed(2);

    const data = {
       // Asegurarse de que es un número
      id_caja_catalogo: cajaCatalogoId,
      fondo_inicial: formattedAmount, // Usar el valor formateado
      
    };

    try {
      // Hacer la petición a la API usando axiosClient
      const response = await axiosClient.post('/cajas/store', data);
      console.log('Caja abierta con éxito:', response.data);
      
      // Actualizar el estado y localStorage después de una apertura exitosa
      setIsFondoCajaRegistered(true);
      setInitialFund(formattedAmount || 0);
      localStorage.setItem('isFondoCajaRegistered', 'true');
      
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
