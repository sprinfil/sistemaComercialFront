import { useEffect } from 'react';
import { DataTableTarifaConceptos } from '../../ui/DataTable Tarifas/DataTableTarifaConceptos.tsx';
import { columns, Tarifa } from "../Columns/Tarifa-Columns/TarifaConceptosColumns.tsx";
import axiosClient from '../../../axios-client.ts';
import { useStateContext } from '../../../contexts/ContextTarifa.tsx';
import Loader from '../../ui/Loader.tsx';
import IconButton from '../../ui/IconButton.tsx';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { AgregarTarifaConcepto } from './AgregarTarifaConcepto.tsx';
export default function TarifaServiciosTable() {
  const { tarifas, setTarifas, loadingTable, setLoadingTable, setAccion, setTarifa } = useStateContext();

  useEffect(() => {
    getConcepto();
    getTarifas();

  }, []);
//con este metodo obtienes las tarifas de la bd
const getTarifas = async () => {
  setLoadingTable(true);
  try {
      const response = await axiosClient.get("/AnomaliasCatalogo");
      setLoadingTable(false);
      setTarifas(response.data.data);
  } catch (error) {
      setLoadingTable(false);
      console.error("Failed to fetch tarifas:", error);
  }
};

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
      <div className='mb-[6px]'>
        <AgregarTarifaConcepto trigger={
          <div onClick={() => setAccion("CrearConcepto")}>
          <IconButton>
        <div className='flex gap-2 items-center'> Agregar nuevo concepto <PlusCircledIcon className='w-[20px] h-[20px]' /></div>
        </IconButton>
        </div>}/>
        
    
      </div>
      <DataTableTarifaConceptos columns={columns} data={tarifas} sorter='nombre' onRowClick={handleRowClick} />
    </div>
  );
}
