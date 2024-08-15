import React, { useState } from 'react';

const CorteCaja = () => {
  const [registros, setRegistros] = useState([]);
  const [nuevoCorte, setNuevoCorte] = useState({
    nombre: '',
    montoInicial: 0,
    montoFinal: 0,
  });
  const [showForm, setShowForm] = useState(false);

  // Maneja el cambio en el formulario
  const handleChange = (e) => {
    const { id, value } = e.target;
    setNuevoCorte((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setRegistros([...registros, nuevoCorte]);
    setNuevoCorte({ nombre: '', montoInicial: 0, montoFinal: 0 });
    setShowForm(false); // Cierra el formulario después de guardar
  };

  return (
    <div className='p-4'>
      <h1 className='text-xl font-bold mb-4'>Corte de Caja</h1>

      {/* Tabla de registros */}
      <div className='mb-4'>
        <h2 className='text-lg font-semibold'>Registros de Corte de Caja</h2>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead>
            <tr>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-900'>Nombre</th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-900'>Monto Inicial</th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-900'>Monto Final</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {registros.map((registro, index) => (
              <tr key={index}>
                <td className='px-4 py-2 text-sm text-gray-900'>{registro.nombre}</td>
                <td className='px-4 py-2 text-sm text-gray-900'>{registro.montoInicial}</td>
                <td className='px-4 py-2 text-sm text-gray-900'>{registro.montoFinal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Botón para abrir el formulario */}
      <button
        onClick={() => setShowForm(!showForm)}
        className='bg-blue-500 text-white px-4 py-2 rounded-md'
      >
        {showForm ? 'Cancelar' : 'Agregar Corte'}
      </button>

      {/* Formulario para agregar un nuevo corte */}
      {showForm && (
        <form onSubmit={handleSubmit} className='mt-4'>
          <div className='mb-4'>
            <label htmlFor='nombre' className='block text-sm font-medium text-gray-700'>Nombre</label>
            <input
              type='text'
              id='nombre'
              value={nuevoCorte.nombre}
              onChange={handleChange}
              className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='montoInicial' className='block text-sm font-medium text-gray-700'>Monto Inicial</label>
            <input
              type='number'
              id='montoInicial'
              value={nuevoCorte.montoInicial}
              onChange={handleChange}
              className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='montoFinal' className='block text-sm font-medium text-gray-700'>Monto Final</label>
            <input
              type='number'
              id='montoFinal'
              value={nuevoCorte.montoFinal}
              onChange={handleChange}
              className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              required
            />
          </div>
          <button
            type='submit'
            className='bg-green-500 text-white px-4 py-2 rounded-md'
          >
            Registrar Corte
          </button>
        </form>
      )}
    </div>
  );
};

export default CorteCaja;
