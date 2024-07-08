import { useEffect, useState } from 'react';
import { DataTable } from '../../../components/ui/DataTable';
import { columns, TipoDeToma } from "../Columns/TipoDeTomaColumns.tsx";
import axiosClient from '../../../axios-client.ts';
import { useStateContext } from '../../../contexts/ContextTipoDeToma.tsx';
import Loader from '../../ui/Loader.tsx';
import IconButton from '../../ui/IconButton.tsx';
import { PlusCircledIcon } from '@radix-ui/react-icons';

export default function TipoDeTomaTable() {

  const { tipodetomas, setTipoDeTomas, loadingTable, setLoadingTable, setAccion } = useStateContext();

  useEffect(() => {
    getTipoDeToma();
  }, []);

  const getTipoDeToma = async () => {
    setLoadingTable(true);
    try {
      const response = await axiosClient.get("/Giros");
      setLoadingTable(false);
      setTipoDeTomas(response.data);
      console.log(response.data);
    } catch (error) {
      setLoadingTable(false);
      console.error("Failed to fetch Tipo de toma:", error);
    }
  };

  if (loadingTable) {
    return <div><Loader /></div>;
  }

  return (

    <div>
      <div onClick={()=>{setAccion("crear")}}>
        <IconButton>
          <div className='flex gap-2 items-center'> Agregar nuevo tipo de toma <PlusCircledIcon className='w-[20px] h-[20px]' /></div>
        </IconButton>
      </div>
      <DataTable columns={columns} data={tipodetomas} sorter='nombre' />
    </div>
  );
}
