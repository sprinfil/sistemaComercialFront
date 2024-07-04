import { useEffect, useState } from 'react';
import { DataTable } from '../../ui/DataTable.tsx';
import { columns, GiroComercial } from "../../../components/Tables/Columns/GiroComercialColumns.tsx";
import axiosClient from '../../../axios-client.ts';
import { useStateContext } from '../../../contexts/ContextGiroComercial.tsx';
import Loader from '../../ui/Loader.tsx';
import IconButton from '../../ui/IconButton.tsx';
import { PlusCircledIcon } from '@radix-ui/react-icons';

export default function GiroComercialTable() {

  const { giroscomerciales, setGirosComerciales, loadingTable, setLoadingTable, setAccion } = useStateContext();

  useEffect(() => {
    getGirosComerciales();
  }, []);

  const getGirosComerciales = async () => {
    setLoadingTable(true);
    try {
      const response = await axiosClient.get("/GirosComercialesCatalogo");
      setLoadingTable(false);
      setGirosComerciales(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      setLoadingTable(false);
      console.error("Failed to fetch Giros Comerciales:", error);
    }
  };

  if (loadingTable) {
    return <div><Loader /></div>;
  }

  return (

    <div>
      <div onClick={()=>{setAccion("crear")}}>
        <IconButton>
          <div className='flex gap-2 items-center'> Agregar nuevo Giro Comercial<PlusCircledIcon className='w-[20px] h-[20px]' /></div>
        </IconButton>
      </div>
      <DataTable columns={columns} data={giroscomerciales} sorter='nombre' />
    </div>
  );
}
