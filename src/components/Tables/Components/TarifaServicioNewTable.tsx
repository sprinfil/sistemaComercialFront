import { useEffect, useState } from 'react';
import { DataTableTarifaServicioNew } from '../../ui/DataTable Tarifas/DataTableTarifaServiciosNew.tsx';
import { columns, TarifaServicioDetalle } from "../../../components/Tables/Columns/TarifaServicioDetalleColumns.tsx";
import axiosClient from '../../../axios-client.ts';
import { useStateContext } from '../../../contexts/ContextTarifa.tsx';
import Loader from '../../ui/Loader.tsx';
import IconButton from '../../ui/IconButton.tsx';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { AgregarTarifaServicio } from './AgregarTarifaServicio.tsx';
export default function TarifaServicioNewTable({tipoToma, tarifa}) {

  const {setTarifas, loadingTable, setLoadingTable, setAccion, setTarifa, tipoTomas, setTipoTomas} = useStateContext();
  const [newData, setNewData] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    getDetalleServicios();
  }, []);

  const getDetalleServicios = async () => {
    setLoading(true);
    try {
        const response = await axiosClient.get(`/tarifaServicioDetalle/${tarifa.id}`);
        //setLoadingTable(false)
        console.log(response);
        let temp = [];
        let ctr = 0;
        response.data.forEach(servicios => {
            if (servicios.id_tipo_toma == tipoToma) {
                temp[ctr] = servicios;
                ctr = ctr + 1;
            }
        });
        setNewData(temp);
        setLoading(false);
    } catch (error) {
        setLoading(false);
        console.error("Failed to fetch concepto:", error);
    }
}


  const getAnomalias = async () => {
    try {
      const response = await axiosClient.get("/AnomaliasCatalogo");
      setLoadingTable(false);
      setTarifas(response.data.data);
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
      <p>asd {tipoTomas.id}</p>
      <div onClick={()=>{setAccion("crear")}}>
      <div className='flex gap-2 items-center w-full'>
        <AgregarTarifaServicio trigger={
          <div onClick={()=>{setAccion("")}}>
      <IconButton>
          <div className='flex gap-5 items-center'> 
            <div className='text-lg'>Agregar nuevo servicio </div>
            <PlusCircledIcon className='w-[20px] h-[20px]'/>
          </div>
        </IconButton>

      </div>
        } id_tipo_toma={tipoTomas.id}/>
      
        
        </div>
      </div>
      
      <DataTableTarifaServicioNew columns={columns} data={newData} sorter='nombre' onRowClick={handleRowClick}/>
    </div>
  );
}