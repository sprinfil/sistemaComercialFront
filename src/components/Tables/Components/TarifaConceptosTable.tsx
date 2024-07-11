import { useEffect } from 'react';
import { DataTableTarifaConceptos } from '../../ui/DataTable Tarifas/DataTableTarifaConceptos.tsx';
import { columns, Tarifa } from "../Columns/Tarifa-Columns/TarifaConceptosColumns.tsx";
import axiosClient from '../../../axios-client.ts';
import { useStateContext } from '../../../contexts/ContextTarifa.tsx';
import Loader from '../../ui/Loader.tsx';
import IconButton from '../../ui/IconButton.tsx';
import { PlusCircledIcon } from '@radix-ui/react-icons';

export default function TarifaServiciosTable() {
  const { tarifas, setTarifas, loadingTable, setLoadingTable, setAccion, setTarifa } = useStateContext();

  useEffect(() => {
    getConcepto();
  }, []);

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
  const handleRowClick = (concepto: Concepto) => {
    setTarifa(concepto);
    setAccion("ver");
  };


  return (
    <div className='w-full h-full '>
      <DataTableTarifaConceptos columns={columns} data={tarifas} sorter='nombre' onRowClick={handleRowClick} />
    </div>
  );
}
