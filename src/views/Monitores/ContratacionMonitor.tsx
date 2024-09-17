import React from 'react'
import FiltrosContratacionMonitor from '../OrdenesDeTrabajo/FiltrosContratacionMonitor';
import { OcultarTable } from '../../components/Tables/Components/OcultarTable';
import MonitorContratacionTable from '../../components/Tables/Components/MonitorContratacionTable';








const MostrarFiltros = () => {

    //const { accion } = useStateContext();
    // const {accionGeneradaEntreTabs} = ZustandGeneralUsuario();
  
    return (
      <>
        {/*Datatable*/}
  
        <OcultarTable accion={""}>
          <FiltrosContratacionMonitor />
        </OcultarTable>
  
      </>
    )
  
  
  };
  






export const ContratacionMonitor = () => {
  return (
    <div className='flex space-x-2'>
      
      <MostrarFiltros/>

    <div className='w-full border rounded-sm ml-10 p-2'>
      <div className='p-5'>
      <MonitorContratacionTable/>

      </div>
    </div>
    
    </div>
  )
}
