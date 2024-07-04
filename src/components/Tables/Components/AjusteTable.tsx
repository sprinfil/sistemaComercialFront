import { useEffect, useState } from 'react';
import { DataTable } from '../../../components/ui/DataTable';
import { columns } from "../../../components/Tables/Columns/AjusteColumns.tsx";
import axiosClient from '../../../axios-client.ts';
import { useStateContext } from "../../../contexts/ContextAjuste.tsx"
import Loader from '../../ui/Loader.tsx';
import IconButton from '../../ui/IconButton.tsx';
import { PlusCircledIcon } from '@radix-ui/react-icons';

export default function AjusteTable() {

  const { ajustes, setAjustes, loadingTable, setLoadingTable, setAccion } = useStateContext();

  useEffect(() => {
    getAnomalias();
  }, []);

  const getAnomalias = async () => {
    setLoadingTable(true);
    try {
      const response = await axiosClient.get("/AjustesCatalogo");
      setLoadingTable(false);
      setAjustes(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      setLoadingTable(false);
      console.error("Failed to fetch anomalias:", error);
    }
  };

  if (loadingTable) {
    return <div><Loader /></div>;
  }

  return (

    <div>
      <div onClick={()=>{setAccion("crear")}}>
        <IconButton>
          <div className='flex gap-2 items-center'> Agregar nuevo Ajuste<PlusCircledIcon className='w-[20px] h-[20px]' /></div>
        </IconButton>
      </div>
      <DataTable columns={columns} data={ajustes} sorter='nombre' />
    </div>
  );
}