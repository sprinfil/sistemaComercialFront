import React, { useState } from 'react'
import { Button } from '../../components/ui/button';
import ModalGenerarOrdenDeTrabajo from '../../components/ui/ModalGenerarOrdenDeTrabajo';
import { MdContentPasteSearch } from "react-icons/md";
import IconButton from '../../components/ui/IconButton';
import OrdenDeTrabajoCrearTomasTable from '../../components/Tables/Components/OrdenDeTrabajoCrearTomasTable';
import FiltrosAsignarOTMasiva from './FiltrosAsignarOTMasiva';
import { OtMasivaForm } from './OtMasivaForm';

export const GenerarOtMasiva = () => {


 

  return (
    <div className=''>
      <div className='flex space-x-2'>
      <FiltrosAsignarOTMasiva/>
        

        <OtMasivaForm/>

      </div>
     
   
  
    </div>
  )
}
