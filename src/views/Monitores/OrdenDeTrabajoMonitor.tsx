import React, { useState } from 'react'
import { OcultarTable } from '../../components/Tables/Components/OcultarTable';
import FiltrosAsignarOTMasiva from '../OrdenesDeTrabajo/FiltrosAsignarOTMasiva';
import MonitorOrdenDeTrabajoTable from '../../components/Tables/Components/MonitorOrdenDeTrabajoTable';
import { TrashIcon } from 'lucide-react';
import IconButton from '../../components/ui/IconButton';
import ModalEstasSeguroCancelarMasivamenteOT from '../../components/ui/ModalEstasSeguroCancelarMasivamenteOT';
import { MdOutlineCancel } from 'react-icons/md';
import ModalEstasSeguroCancelarOTSSS from '../../components/ui/ModalEstasSeguroCancelarOTSSS';


const MostrarFiltros = () => {

  //const { accion } = useStateContext();
  // const {accionGeneradaEntreTabs} = ZustandGeneralUsuario();

  return (
    <>
      {/*Datatable*/}
      <OcultarTable accion={""}>
        <FiltrosAsignarOTMasiva />
      </OcultarTable>
    </>
  )


};



export const OrdenDeTrabajoMonitor = () => {




  return (
    <div>
      <div className='flex space-x-2'>
        <MostrarFiltros />
        <div className='w-full p-5 border rounded-sm overflow-auto h-[76vh]'>
          
          <MonitorOrdenDeTrabajoTable />
        </div>
      </div>

      


    </div>

  )
}
