import React, { useState, useEffect } from 'react';
import PuntoVentaForm from '../../components/Forms/PuntoVentaForm';
import { ModalFondoCaja } from '../../components/ui/ModalFondoCaja';

export default function PuntoVenta() {
  const [isFondoCajaRegistered, setIsFondoCajaRegistered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true); // El modal se abre automáticamente al inicio

  const handleRegister = (amount) => {
    console.log(`Monto registrado: ${amount}`);
    setIsFondoCajaRegistered(true);
    setIsModalOpen(false); // Cierra el modal después de registrar el fondo
  };

  useEffect(() => {
    // Abre el modal automáticamente al montar el componente
    setIsModalOpen(true);
  }, []);

  return (
    <div className=''>
      {!isFondoCajaRegistered ? (
        <ModalFondoCaja 
          open={isModalOpen} 
          onRegister={handleRegister} 
        />
      ) : (
        <PuntoVentaForm isFondoCajaRegistered={isFondoCajaRegistered} />
      )}
    </div>
  );
}
