import React from 'react';
import Prueba from './Prueba.tsx';
import CrearUsuarioNuevoForm from '../../../components/Forms/CrearUsuarioNuevoForm.tsx';
import CrearUsuarioForm from '../../../components/Forms/CrearUsuarioForm.tsx';

export default function CrearUsuarioNuevo() {

  //ESTA ES LA VISTA PRINCIPAL DEL CATALOGO QUE CONTIENE LOS COMPONENTES DE LA TABLA Y
  //FORMULARIO DE ANOMALIAS


  return (


    <div className='w-[100%] rounded-md border border-border h-[75vh] p-4 overflow-auto'>
        {/*Formulario*/}
        <CrearUsuarioForm/>
    </div>
  );
};
