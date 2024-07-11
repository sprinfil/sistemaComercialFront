import { useEffect, useState} from 'react';
import { DataTableTarifa } from '../../ui/DataTable Tarifas/DataTableTarifaServicios.tsx';
import { columns, Tarifa } from "../Columns/Tarifa-Columns/TarifaServicioColumns.tsx";
import axiosClient from '../../../axios-client.ts';
import { useStateContext } from '../../../contexts/ContextTarifa.tsx';
import Loader from '../../ui/Loader.tsx';
import IconButton from '../../ui/IconButton.tsx';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { EdicionTarifaServicio } from './EdicionTarifaServicio.tsx';

export default function TarifaServiciosTable({data}) {
  const { tarifas, setTarifas, loadingTable, setLoadingTable, setAccion, setTarifa, accion} = useStateContext();
  
  const [abrir, SetAbrir] = useState(false);

  useEffect(() => {
    if (!data || data.length === 0) {
      getConcepto();
    } else {
      setTarifas(data);
    }
  }, [data]);

  const getConcepto = async () => {
    setLoadingTable(true);
    try {
      const response = await axiosClient.get("/Concepto");
      setLoadingTable(false);
      setTarifas(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      setLoadingTable(false);
      console.error("Failed to fetch concepto:", error);
    }
  };

  //Metodo para seleccionar las filas
  const handleRowClick = (tarifa: Tarifa) => {
    setTarifa(tarifa);
    setAccion("editar");
    SetAbrir(true);
    console.log(abrir)
  };


  return (
    <div className='w-full h-full '>
      {<DataTableTarifa columns={columns} data={tarifas} sorter='nombre' onRowClick={handleRowClick} />}
    </div>
  );
}
