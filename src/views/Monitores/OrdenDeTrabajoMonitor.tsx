import React, { useState } from 'react'
import { OcultarTable } from '../../components/Tables/Components/OcultarTable';
import FiltrosAsignarOTMasiva from '../OrdenesDeTrabajo/FiltrosAsignarOTMasiva';
import MonitorOrdenDeTrabajoTable from '../../components/Tables/Components/MonitorOrdenDeTrabajoTable';
import { TrashIcon } from 'lucide-react';
import IconButton from '../../components/ui/IconButton';
import ModalEstasSeguroCancelarMasivamenteOT from '../../components/ui/ModalEstasSeguroCancelarMasivamenteOT';
const MostrarFiltros = () => {

    //const { accion } = useStateContext();
   // const {accionGeneradaEntreTabs} = ZustandGeneralUsuario();

    return (
      <>
        {/*Datatable*/}
  
        <OcultarTable accion={""}>
        <FiltrosAsignarOTMasiva/>
        </OcultarTable>
  
      </>
    )
  
  
  };
  


export const OrdenDeTrabajoMonitor = () => {
  const [abrirModal, setAbrirModal] = useState(false);
  const abrirModalGG = () =>
    {
      //setAnomalia(anomalia);
      //setAccion("ver");
      setAbrirModal(true);
    };
  
  return (
    <div>
        <div className='flex space-x-2'>
        <MostrarFiltros/>
        <div className='w-full p-5 border rounded-sm'>
          <div className='flex justify-end mr-2 w' title='Cancelar orden de trabajo masivamente'>
            <IconButton onClick={abrirModalGG}>          
              <TrashIcon className='w-[2vh] h-[2vh]'/>
            </IconButton>
          </div>

            <MonitorOrdenDeTrabajoTable/>
            </div>
            </div>

          <ModalEstasSeguroCancelarMasivamenteOT
           isOpen={abrirModal}
           setIsOpen={setAbrirModal}
           method={""}
           />
   

    </div>
    
  )
}