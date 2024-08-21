import React, { useState, useEffect } from 'react';
import PuntoVentaForm from '../../components/Forms/PuntoVentaForm';
import { ModalCorteCaja } from '../../components/ui/ModalCorteCaja';
import { ModalFondoCaja } from '../../components/ui/ModalFondoCaja';

export default function PuntoVenta() {
  const [isFondoCajaRegistered, setIsFondoCajaRegistered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialFund, setInitialFund] = useState(0);

  useEffect(() => {
    const isRegistered = localStorage.getItem('isFondoCajaRegistered');
    const amount = localStorage.getItem('fondoCajaAmount');

    if (isRegistered === 'true') {
      setIsFondoCajaRegistered(true);
      setInitialFund(parseFloat(amount) || 0);
      
    } else {
      setIsModalOpen(true);
    }
  }, []);

  const handleRegister = (amount) => {
    setIsFondoCajaRegistered(true);
    setInitialFund(parseFloat(amount) || 0);
    setIsModalOpen(false);
    localStorage.setItem('isFondoCajaRegistered', 'true');
    localStorage.setItem('fondoCajaAmount', amount);
    console.log(parseFloat(amount));
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
        trigger={<button className="btn-primary">Hacer Corte de Caja</button>}
        onRegister={() => {}}
        initialFund={initialFund}
      />
    </div>
  );
}
