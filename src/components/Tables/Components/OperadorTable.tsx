import { useEffect, useState } from 'react';
import { DataTable } from '../../ui/DataTable.tsx';
import { columns, Operador } from "../../../components/Tables/Columns/OperadorColumns.tsx";
import axiosClient from '../../../axios-client.ts';
import { useStateContext } from '../../../contexts/ContextOperador.tsx';
import Loader from '../../ui/Loader.tsx';
import IconButton from '../../ui/IconButton.tsx';
import { PlusCircledIcon } from '@radix-ui/react-icons';

export default function OperadorTable() {

  const { operadores, setOperadores, loadingTable, setLoadingTable, setAccion, setOperador } = useStateContext();

  useEffect(() => {
    getOperadores();
  }, []);

  const getOperadores = async () => {
    setLoadingTable(true);
    try {
      const response = await axiosClient.get("/Operador");
      setLoadingTable(false);
      setOperadores(response.data);
      console.log(response.data);
    } catch (error) {
      setLoadingTable(false);
      console.error("Failed to fetch Operadores:", error);
    }
  };

  const handleRowClick = (operador: Operador) => {
    setOperador(operador);
    setAccion("ver");
  };



  if (loadingTable) {
    return <div><Loader /></div>;
  }

  return (

    <div>
      <div onClick={() => { setAccion("crear") }}>
        <IconButton>
          <div className='flex gap-2 items-center'> Agregar nuevo operador<PlusCircledIcon className='w-[20px] h-[20px]' /></div>
        </IconButton>
      </div>
      <DataTable columns={columns} data={operadores} sorter='nombre' onRowClick={handleRowClick}/>
    </div>
  );
}