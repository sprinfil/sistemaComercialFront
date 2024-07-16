import { useEffect, useState } from 'react';
import { DataTable } from '../../../components/ui/DataTable';
import { columns, Colonia } from "../../../components/Tables/Columns/ColoniaColumns.tsx";
import axiosClient from '../../../axios-client.ts';
import { useStateContext } from '../../../contexts/ContextColonia.tsx';
import Loader from '../../ui/Loader.tsx';
import IconButton from '../../ui/IconButton.tsx';
import { PlusCircledIcon } from '@radix-ui/react-icons';

export default function ColoniaTable() {

  const { colonias, setColonias, loadingTable, setLoadingTable, setAccion, setColonia} = useStateContext();

  useEffect(() => {
    getColonias();
  }, []);

  const getColonias = async () => {
    setLoadingTable(true);
    try {
      const response = await axiosClient.get("/ColoniasCatalogo");
      setLoadingTable(false);
      setColonias(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      setLoadingTable(false);
      console.error("Failed to fetch colonias:", error);
    }
  };

  //metodo para las filas

  const handleRowClick = (colonia: Colonia) =>
  {
    setColonia(colonia);
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
            Agregar nueva colonia
            
            <PlusCircledIcon className='w-[20px] h-[20px]'/>
          
          </div>
        </IconButton>
        </div>
      
      </div>
      
      <DataTable columns={columns} data={colonias} sorter='nombre' onRowClick={handleRowClick}/>
    </div>
  );
}