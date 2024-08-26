import React, { useState, useEffect } from 'react';

const FechaHora = () => {
  const [fechaHora, setFechaHora] = useState(new Date());

  useEffect(() => {
    const intervalo = setInterval(() => {
      setFechaHora(new Date());
    }, 1000);

    return () => clearInterval(intervalo); // Limpiar el intervalo cuando el componente se desmonte
  }, []);

  const formatearFechaHora = (fecha) => {
    const opcionesFecha = { year: 'numeric', month: 'long', day: 'numeric' };
    const opcionesHora = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const fechaFormateada = fecha.toLocaleDateString('es-ES', opcionesFecha);
    const horaFormateada = fecha.toLocaleTimeString('es-ES', opcionesHora);
    return `${fechaFormateada} ${horaFormateada}`;
  };

  return (
    <div>
      {formatearFechaHora(fechaHora)}
    </div>
  );
};

export default FechaHora;