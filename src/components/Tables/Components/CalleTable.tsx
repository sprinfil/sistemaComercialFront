import { useEffect, useState } from 'react';
import { DataTable } from '../../../components/ui/DataTable';
import { columns, Calle } from "../../../components/Tables/Columns/CalleColumns.tsx";
import axiosClient from '../../../axios-client.ts';
import { useStateContext } from '../../../contexts/ContextCalle.tsx';
import Loader from '../../ui/Loader.tsx';
import IconButton from '../../ui/IconButton.tsx';
import { PlusCircledIcon } from '@radix-ui/react-icons';

export default function AnomaliaTable() {

  const { calles, setCalles, loadingTable, setLoadingTable, setAccion, setCalle} = useStateContext();

  useEffect(() => {
    getCalles();
  }, []);

  const getCalles = async () => {
    setLoadingTable(true);
    try {
      const response = await axiosClient.get("/CallesCatalogo");
      setLoadingTable(false);
      setCalles(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      setLoadingTable(false);
      console.error("Failed to fetch Calles:", error);
    }
  };

  //metodo para las filas

  const handleRowClick = (calle: Calle) =>
  {
    setCalle(calle);
    setAccion("ver");
  };


  if (loadingTable) {
    return <div><Loader /></div>;
  }

  return (

    <div>
      <div onClick={()=>{setAccion("crear")}}>


      <div className='flex gap-2 items-center'>
        <IconButton>
          <div className='flex gap-5 w-full'> 
            Agregar nueva calle
            
            <PlusCircledIcon className='w-[20px] h-[20px]'/>
          
          </div>
        </IconButton>
        </div>
      
      </div>
      
      <DataTable columns={columns} data={calles} sorter='nombre' onRowClick={handleRowClick}/>
    </div>
  );
}