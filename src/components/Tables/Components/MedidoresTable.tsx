import React, { useEffect } from 'react';
import { DataTable } from '../../../components/ui/DataTable';
import { columns, Medidor } from "../Columns/Medidor-Columns/MedidorColumns.tsx";
import axiosClient from '../../../axios-client.ts';
import { useStateContext } from '../../../contexts/ContextMedidores.tsx';
import Loader from '../../ui/Loader.tsx';
import IconButton from '../../ui/IconButton.tsx';
import { PlusCircledIcon } from '@radix-ui/react-icons';

export default function MedidoresTable({ idToma }: { idToma: number }) { // Recibir el id de la toma
  const { medidores, setMedidores, loadingTable, setLoadingTable, setAccion, setMedidor } = useStateContext();

  useEffect(() => {
    if (idToma) {
      getMedidor();
    }
  }, [idToma]); // Volver a cargar si cambia el id de la toma

  const getMedidor = async () => {
    setLoadingTable(true);
    try {
      const response = await axiosClient.get(`/medidores/toma/${idToma}`);
      console.log(response.data);
      setMedidores(response.data);
    } catch (error) {
      console.error("Failed to fetch medidores:", error);
    } finally {
      setLoadingTable(false);
    }
  };

  const handleRowClick = (medidor: Medidor) => {
    setMedidor(medidor);
    setAccion("ver");
  };

  if (loadingTable) {
    return <div><Loader /></div>;
  }

  return (
    <div>
      <div onClick={() => { setAccion("crear") }}>
        <IconButton>
          <div className='flex gap-2 items-center mt-5'> Agregar nuevo medidor <PlusCircledIcon className='w-[20px] h-[20px]' /></div>
        </IconButton>
      </div>
      <DataTable columns={columns} data={medidores} sorter='numero_serie' onRowClick={handleRowClick} />
    </div>
  );
}
