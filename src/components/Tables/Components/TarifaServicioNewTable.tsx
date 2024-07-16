import { useEffect, useState } from 'react';
import { DataTableTarifaServicioNew } from '../../ui/DataTable Tarifas/DataTableTarifaServiciosNew.tsx';
import { columns, TarifaServicioDetalle } from "../../../components/Tables/Columns/TarifaServicioDetalleColumns.tsx";
import axiosClient from '../../../axios-client.ts';
import { useStateContext } from '../../../contexts/ContextAnomalias.tsx';
import Loader from '../../ui/Loader.tsx';
import IconButton from '../../ui/IconButton.tsx';
import { PlusCircledIcon } from '@radix-ui/react-icons';

export default function TarifaServicioNewTable() {

  const { anomalias, setAnomalias, loadingTable, setLoadingTable, setAccion, setAnomalia} = useStateContext();

  useEffect(() => {
    getAnomalias();
  }, []);

  
  //seeder pa comercial
  const [seedServiciosDomestica, setSeedServiciosDomestica] = useState([
    {
      id: 1,
      Rango: "17 m3",
      Agua: "$9",
      Alcantarillado: "$2.20",
      Saneamiento: "$2.20"
    },
    {
      id: 1,
      Rango: "24 m3",
      Agua: "$10",
      Alcantarillado: "$2.20",
      Saneamiento: "$2.20"
    },
    {
      id: 1,
      Rango: "30 m3",
      Agua: "$20",
      Alcantarillado: "$2.20",
      Saneamiento: "$2.20"
    },
    {
      id: 1,
      Rango: "40 m3",
      Agua: "$30",
      Alcantarillado: "$2.20",
      Saneamiento: "$2.20"
    },
    {
      id: 1,
      Rango: "40 m3",
      Agua: "$30",
      Alcantarillado: "$2.20",
      Saneamiento: "$2.20"
    },
    {
      id: 1,
      Rango: "40 m3",
      Agua: "$30",
      Alcantarillado: "$2.20",
      Saneamiento: "$2.20"
    },
    {
      id: 1,
      Rango: "40 m3",
      Agua: "$30",
      Alcantarillado: "$2.20",
      Saneamiento: "$2.20"
    },
    {
      id: 1,
      Rango: "40 m3",
      Agua: "$30",
      Alcantarillado: "$2.20",
      Saneamiento: "$2.20"
    },
    {
      id: 1,
      Rango: "40 m3",
      Agua: "$30",
      Alcantarillado: "$2.20",
      Saneamiento: "$2.20"
    },
    {
      id: 1,
      Rango: "40 m3",
      Agua: "$30",
      Alcantarillado: "$2.20",
      Saneamiento: "$2.20"
    },
    {
      id: 1,
      Rango: "40 m3",
      Agua: "$30",
      Alcantarillado: "$2.20",
      Saneamiento: "$2.20"
    },
    {
      id: 1,
      Rango: "40 m3",
      Agua: "$30",
      Alcantarillado: "$2.20",
      Saneamiento: "$2.20"
    },
    
  ]);

  const getAnomalias = async () => {
    setLoadingTable(true);
    try {
      const response = await axiosClient.get("/AnomaliasCatalogo");
      setLoadingTable(false);
      setAnomalias(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      setLoadingTable(false);
      console.error("Failed to fetch anomalias:", error);
    }
  };

  //metodo para las filas

  const handleRowClick = (anomalia: TarifaServicioDetalle) =>
  {
    //setAnomalia(anomalia);
    //setAccion("ver");
  };


  if (loadingTable) {
    return <div><Loader /></div>;
  }

  return (

    <div className='w-full'>
      <div onClick={()=>{setAccion("crear")}}>

      <div className='flex gap-2 items-center w-full'>
        <IconButton>
          <div className='flex gap-5 '> 
            Agregar Tarifa
            <PlusCircledIcon className='w-[20px] h-[20px]'/>
          </div>
        </IconButton>
        </div>
      </div>
      
      <DataTableTarifaServicioNew columns={columns} data={seedServiciosDomestica} sorter='nombre' onRowClick={handleRowClick}/>
    </div>
  );
}