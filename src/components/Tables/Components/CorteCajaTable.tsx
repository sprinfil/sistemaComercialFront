import { useEffect, useState } from 'react';
import { DataTable } from '../../../components/ui/DataTable';
import { columns, CorteCaja } from "../../../components/Tables/Columns/CorteCajaColumns.tsx";
import axiosClient from '../../../axios-client.ts';
import { useStateContext } from '../../../contexts/ContextCorteCaja.tsx';
import Loader from '../../ui/Loader.tsx';
import IconButton from '../../ui/IconButton.tsx';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import {ScissorsIcon} from '@radix-ui/react-icons';

export default function CorteCajaTable() {

  const { cortecaja, setCorteCajas, loadingTable, setLoadingTable, setAccion, setCorteCaja, cortecajas} = useStateContext();

  useEffect(() => {
    getCorteCajas();
  }, []);

  const getCorteCajas = async () => {
    setLoadingTable(true);
    try {
      const response = await axiosClient.get("/CorteCajasCatalogo");
      setLoadingTable(false);
      setCorteCajas(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      setLoadingTable(false);
      console.error("Failed to fetch anomalias:", error);
    }
  };

  //metodo para las filas

  const handleRowClick = (cortecaja: CorteCaja) =>
  {
    setCorteCaja(cortecaja);
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
            Hacer corte de caja
            
            <ScissorsIcon className='w-[20px] h-[20px]'/>
          
          </div>
        </IconButton>
        </div>
      
      <DataTable columns={columns} data={cortecajas} sorter='nombre' onRowClick={handleRowClick}/>
    </div>
  );
}