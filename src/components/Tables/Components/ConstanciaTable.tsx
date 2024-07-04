import { useEffect, useState } from 'react';
import { DataTable } from '../../../components/ui/DataTable';
import { columns, Constancia } from "../../../components/Tables/Columns/ConstanciaColumns.tsx";
import axiosClient from '../../../axios-client.ts';
import { useStateContext } from '../../../contexts/ContextConstancias.tsx';
import Loader from '../../ui/Loader.tsx';
import IconButton from '../../ui/IconButton.tsx';
import { PlusCircledIcon } from '@radix-ui/react-icons';

export default function ConstanciaTable() {

  const { constancias, setConstancias, loadingTable, setLoadingTable, setAccion } = useStateContext();

  useEffect(() => {
    getCosntancias();
  }, []);

  const getCosntancias = async () => {
    setLoadingTable(true);
    try {
      const response = await axiosClient.get("/ConstanciasCatalogo");
      setLoadingTable(false);
      setConstancias(response.data.data);
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
          <div className='flex gap-2 items-center'> Agregar nueva constancia<PlusCircledIcon className='w-[20px] h-[20px]' /></div>
        </IconButton>
      </div>
      <DataTable columns={columns} data={constancias} sorter='nombre' />
    </div>
  );
}
