import { useEffect, useState } from 'react';
import { DataTable } from '../../../components/ui/DataTable';
import { columns, Caja } from "../../../components/Tables/Columns/CajaColumns.tsx";
import axiosClient from '../../../axios-client.ts';
import { useStateContext } from '../../../contexts/ContextCaja.tsx';
import Loader from '../../ui/Loader.tsx';
import IconButton from '../../ui/IconButton.tsx';
import { PlusCircledIcon } from '@radix-ui/react-icons';

export default function CajaTable() {

  const { anomalias, setAnomalias, loadingTable, setLoadingTable, setAccion, setAnomalia} = useStateContext();

  useEffect(() => {
    getCaja();
  }, []);

  const getCaja = async () => {
    setLoadingTable(true);
    try {
      const response = await axiosClient.get("/AnomaliasCatalogo");
      setLoadingTable(false);
      setAnomalias(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      setLoadingTable(false);
      console.error("Failed to fetch anomalias:", error);
    }
  };

  //metodo para las filas

  const handleRowClick = (anomalia: Anomalia) =>
  {
    setAnomalia(anomalia);
    setAccion("ver");
  };


  if (loadingTable) {
    return <div><Loader /></div>;
  }

  return (

    <div>
      <div onClick={()=>{setAccion("crear")}}>


        <IconButton>
          <div className='flex gap-2 items-center'> 
            Agregar nueva anomalía
            
            <PlusCircledIcon className='w-[20px] h-[20px]'/>
          
          </div>
        </IconButton>
        </div>
      
      <DataTable columns={columns} data={anomalias} sorter='nombre' onRowClick={handleRowClick}/>
    </div>
  );
}