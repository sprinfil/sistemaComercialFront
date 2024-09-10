import React, {useEffect,useState} from 'react'
import FiltrosContratacionMonitor from '../OrdenesDeTrabajo/FiltrosContratacionMonitor';
import { OcultarTable } from '../../components/Tables/Components/OcultarTable';
import { ContratosMonitorDataTable } from '../../components/ui/ContratosMonitorDataTable';
import Loader from '../../components/ui/Loader';
import axiosClient from '../../axios-client';
import { columns } from '../../components/Tables/Columns/ContratacionMonitorColumns';


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

  const [data, setData] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);


  useEffect(() => {
    fetch_contratos();
  }, [])

  const fetch_contratos = async () => {
    setLoadingTable(true);
    try {
      const response = await axiosClient.get("/contratos");
      setLoadingTable(false);
      setData(response.data.contrato);
      console.log(response.data.contrato);
    } catch (error) {
      setLoadingTable(false);
      console.error("Failed to fetch anomalias:", error);
    }
  }







  return (
    <div className='flex space-x-2'>
      
      <MostrarFiltros/>

    <div className='w-full border rounded-sm ml-10 p-2'>
      <div className='p-5'>
      {
          loadingTable ? <Loader/>
            :
            <>
         <ContratosMonitorDataTable columns={columns} data={data}/>
      </>
        }
      </div>
    </div> 
    
    </div>
  )
}
