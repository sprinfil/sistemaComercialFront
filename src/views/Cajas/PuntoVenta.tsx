import React, { useState, useEffect } from 'react';
import PuntoVentaForm from '../../components/Forms/PuntoVentaForm';
import { ModalCorteCaja } from '../../components/ui/ModalCorteCaja';
import { ModalFondoCaja } from '../../components/ui/ModalFondoCaja';
import axiosClient from '../../axios-client'; // Importa la instancia configurada de axiosClient

export default function PuntoVenta() {
  const [isFondoCajaRegistered, setIsFondoCajaRegistered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialFund, setInitialFund] = useState('');
  const [cajaCatalogoId, setCajaCatalogoId] = useState(null); // ID de la caja catalogada


  useEffect(() => {
    // Obtener los valores almacenados en localStorage
    const isRegistered = localStorage.getItem('isFondoCajaRegistered');
    const amount = localStorage.getItem('fondoCajaAmount');
    const cajaCatalogo = 7; // Obtener la caja

    setCajaCatalogoId(cajaCatalogo ? parseInt(cajaCatalogo, 10) : null);

    if (isRegistered === 'true') {
      setIsFondoCajaRegistered(true);
      setInitialFund(parseFloat(amount) || 0);
    } else {
      setIsModalOpen(true);
    }
  }, []);

  const handleRegister = async (amount) => {
    const operatorId = localStorage.getItem('user_id'); // Obtener el operador logeado directamente antes de la solicitud
    const fechaApertura = formatDateTime(new Date()); // Formatear la fecha y hora actual como "YYYY-MM-DD HH:mm:ss"

    // Validar que el operador esté definido
    if (!operatorId) {
      console.error("El operador no está definido.");
      return;
    }

    // Formatear el fondo_inicial a un string con dos decimales
    const formattedAmount = parseFloat(amount).toFixed(2);

    const data = {
      id_operador: parseInt(operatorId, 10), // Asegurarse de que es un número
      id_caja_catalogo: cajaCatalogoId,
      fondo_inicial: formattedAmount, // Usar el valor formateado
      fecha_apertura: fechaApertura,
    };

    try {
      // Hacer la petición a la API usando axiosClient
      const response = await axiosClient.post('/cajas/store', data);
      console.log('Caja abierta con éxito:', response.data);
      
      // Actualizar el estado y localStorage después de una apertura exitosa
      setIsFondoCajaRegistered(true);
      setInitialFund(formattedAmount || 0);
      localStorage.setItem('isFondoCajaRegistered', 'true');
      localStorage.setItem('fondoCajaAmount', formattedAmount);
      setIsModalOpen(false);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.error('Error en los datos enviados:', error.response.data);
      } else {
        console.error('Error al abrir la caja:', error.message || error);
      }
    }
  };

  // Función para formatear la fecha y hora en el formato "YYYY-MM-DD HH:mm:ss"
  const formatDateTime = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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
      {}
      <ModalCorteCaja
        trigger={<button className="btn-primary"></button>}
        onRegister={() => {}}
        initialFund={initialFund}
      />
    </div>
  );
}
