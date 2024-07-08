import { useEffect, useState } from 'react';
import { DataTable } from '../../../components/ui/DataTable';
import { columns, Descuento} from "../../../components/Tables/Columns/DescuentoColumns.tsx";
import axiosClient from '../../../axios-client.ts';
import { useStateContext } from '../../../contexts/ContextDescuentos.tsx';
import Loader from '../../ui/Loader.tsx';
import IconButton from '../../ui/IconButton.tsx';
import { PlusCircledIcon } from '@radix-ui/react-icons';

export default function DescuentoTable() {

  const { descuentos, setDescuentos, loadingTable, setLoadingTable, setAccion, setDescuento} = useStateContext();

  useEffect(() => {
    getDescuentos();
  }, []);

  const getDescuentos = async () => {
    setLoadingTable(true);
    try {
      const response = await axiosClient.get("/descuentos-catalogos");
      setLoadingTable(false);
      setDescuentos(response.data);
      console.log(response.data);
    } catch (error) {
      setLoadingTable(false);
      console.error("Failed to fetch descuento:", error);
    }
  };

  const HandleClickRow = (descuento: Descuento) =>
  {
    setDescuento(descuento);
    setAccion("ver");
  }

  if (loadingTable) {
    return <div><Loader /></div>;
  }

  return (

    <div>
      <div onClick={()=>{setAccion("crear")}}>
        <IconButton>
          <div className='flex gap-2 items-center'> Agregar nuevo descuento<PlusCircledIcon className='w-[20px] h-[20px]' /></div>
        </IconButton>
      </div>
      <DataTable columns={columns} data={descuentos} sorter='nombre' onRowClick={HandleClickRow} />
    </div>
  );
}
