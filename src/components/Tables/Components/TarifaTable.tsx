import { useEffect } from 'react';
import { DataTable } from '../../../components/ui/DataTable';
import { columns, Concepto } from "../Columns/ConceptosColumns.tsx";
import axiosClient from '../../../axios-client.ts';
import { useStateContext } from '../../../contexts/ContextTarifa.tsx';
import Loader from '../../ui/Loader.tsx';
import IconButton from '../../ui/IconButton.tsx';
import { PlusCircledIcon } from '@radix-ui/react-icons';

export default function TarifaTable() {
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
    <div className='w-[70vh]'>
      <div onClick={() => { setAccion("crear") }}>
        <IconButton>
          <div className='flex gap-2 items-center'> Agregar nueva tarifa <PlusCircledIcon className='w-[20px] h-[20px]' /></div>
        </IconButton>
      </div>
      <DataTable columns={columns} data={tarifas} sorter='nombre' onRowClick={handleRowClick} />
    </div>
  );
}
