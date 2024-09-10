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
  const [abrirModal, setAbrirModal] = useState(false);
  const [abrirModal2, setAbrirModal2] = useState(false);

  const abrirModalGG = () => {
    //setAnomalia(anomalia);
    //setAccion("ver");
    setAbrirModal(true);
  };
  const abrirModalGG2 = () => {
    //setAnomalia(anomalia);
    //setAccion("ver");
    setAbrirModal2(true);
  };


  return (
    <div>
      <div className='flex space-x-2'>
        <MostrarFiltros />
        <div className='w-full p-5 border rounded-sm overflow-auto h-[76vh]'>
          <div className='flex justify-end mr-2 w' title='Cerrar ordenes de trabajo'>
            <IconButton onClick={abrirModalGG}>
            <MdOutlineCancel />
            </IconButton>
            <IconButton title="Cancelar ordenes de trabajo" onClick={abrirModalGG2}>  <TrashIcon className='w-[2vh] h-[2vh]' /></IconButton>
          </div>
          <MonitorOrdenDeTrabajoTable />
        </div>
      </div>

      <ModalEstasSeguroCancelarMasivamenteOT
        isOpen={abrirModal}
        setIsOpen={setAbrirModal}
        method={""}
      />
       <ModalEstasSeguroCancelarOTSSS
        isOpen={abrirModal2}
        setIsOpen={setAbrirModal2}
        method={""}
      />


    </div>

  )
}
