import React, {useEffect,useState} from 'react'
import FiltrosContratacionMonitor from '../OrdenesDeTrabajo/FiltrosContratacionMonitor';
import { OcultarTable } from '../../components/Tables/Components/OcultarTable';
import { ContratosMonitorDataTable } from '../../components/ui/ContratosMonitorDataTable';
import Loader from '../../components/ui/Loader';
import axiosClient from '../../axios-client';
import { columns } from '../../components/Tables/Columns/ContratacionMonitorColumns';
import { ZustandFiltrosContratacion } from '../../contexts/ZustandFiltrosContratacion';

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

  const {dataMonitorContratos, setDataMonitorContratos, loadingTableMonitorContrato, setLoadingTableMonitorContrato} =  ZustandFiltrosContratacion();

  useEffect(() => {
    fetch_contratos();
  }, [])

  const fetch_contratos = async () => {
    setLoadingTableMonitorContrato(true);
    try {
      const response = await axiosClient.get("/contratos");
      setLoadingTableMonitorContrato(false);
      setDataMonitorContratos(response.data.contrato);
      console.log(response.data.contrato);
    } catch (error) {
      setLoadingTableMonitorContrato(false);
      console.error("Failed to fetch anomalias:", error);
    }
  }







  return (
    <div className='flex space-x-2'>
      
      <MostrarFiltros/>

    <div className='w-full border rounded-sm ml-10 p-2'>
      <div className='p-5'>
      {
          loadingTableMonitorContrato ? <Loader/>
            :
            <>
         <ContratosMonitorDataTable columns={columns} data={dataMonitorContratos}/>
      </>
        }
      </div>
    </div> 
    
    </div>
  )
}
