import { useEffect, useState } from 'react';
import { DataTable } from '../../ui/DataTable.tsx';
import { columns, GiroComercial } from "../../../components/Tables/Columns/GiroComercialColumns.tsx";
import axiosClient from '../../../axios-client.ts';
import { useStateContext } from '../../../contexts/ContextGiroComercial.tsx';
import Loader from '../../ui/Loader.tsx';
import IconButton from '../../ui/IconButton.tsx';
import { PlusCircledIcon } from '@radix-ui/react-icons';

export default function GiroComercialTable() {

  const { giroscomerciales, setGirosComerciales, loadingTable, setLoadingTable, setAccion, setGiroComercial} = useStateContext();

  useEffect(() => {
    getGirosComerciales();
  }, []);

  const getGirosComerciales = async () => {
    setLoadingTable(true);
    try {
      const response = await axiosClient.get("/Giros");
      setLoadingTable(false);
      setGirosComerciales(response.data);
      console.log(response.data);
      console.log(response);
    } catch (error) {
      setLoadingTable(false);
      console.error("Failed to fetch Giros Comerciales:", error);
    }
  };
  const HandleClickRow = (giroComercial: GiroComercial) =>
    {
      setGiroComercial(giroComercial);
    setAccion("ver");
}

  if (loadingTable) {
    return <div><Loader /></div>;
  }

  return (

    <div>
      <div onClick={()=>{setAccion("crear")}}>
        <IconButton>
          <div className='flex gap-2 items-center'> Agregar nuevo giro comercial<PlusCircledIcon className='w-[20px] h-[20px]' /></div>
        </IconButton>
      </div>
      <DataTable columns={columns} data={giroscomerciales} sorter='nombre' onRowClick={HandleClickRow}/>
    </div>
  );
}
