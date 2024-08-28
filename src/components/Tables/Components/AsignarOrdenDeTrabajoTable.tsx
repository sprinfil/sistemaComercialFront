import { useEffect, useState } from 'react';
import { DataTable } from '../../../components/ui/DataTable';
import { columns, AsignarOrdenDeTrabajo } from "../../../components/Tables/Columns/AsignarOrdenDeTrabajoColumns.tsx";
import axiosClient from '../../../axios-client.ts';
import { useStateContext } from '../../../contexts/ContextAnomalias.tsx';
import Loader from '../../ui/Loader.tsx';
import IconButton from '../../ui/IconButton.tsx';
import { PlusCircledIcon } from '@radix-ui/react-icons';

export default function AsignarOrdenDeTrabajoTable() {

  const { anomalias, setAnomalias, loadingTable, setLoadingTable, setAccion, setAnomalia} = useStateContext();

  useEffect(() => {
    getAnomalias();
  }, []);

  const getAnomalias = async () => {
    setLoadingTable(true);
    try {
      const response = await axiosClient.get("/OrdenTrabajo");
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


       
        </div>
      
      <DataTable columns={columns} data={anomalias} sorter='nombre' onRowClick={handleRowClick}/>
    </div>
  );
}