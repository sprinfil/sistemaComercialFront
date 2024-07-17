import { useEffect, useState } from 'react';
import { DataTableTarifa } from '../../ui/DataTable Tarifas/DataTableTarifaServicios.tsx';
import { columns, Tarifa } from "../Columns/Tarifa-Columns/TarifaServicioColumns.tsx";
import axiosClient from '../../../axios-client.ts';
import { useStateContext } from '../../../contexts/ContextTarifa.tsx';
import Loader from '../../ui/Loader.tsx';
import IconButton from '../../ui/IconButton.tsx';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { EdicionTarifaServicio } from './EdicionTarifaServicio.tsx';
import { Button } from '../../../components/ui/button.tsx';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { AgregarTarifaServicio } from './AgregarTarifaServicio.tsx';

export default function TarifaServiciosTable({ data }) {
  const { tarifas, setTarifas, loadingTable, setLoadingTable, setAccion, setTarifa, accion } = useStateContext();

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
    console.log(abrir)
  };

  const AbrirAgregar = () => {
    SetAbrir(true);
  }


  return (
    <div className="w-full h-full">
      <div className='mb-[6px]'>

        <AgregarTarifaServicio trigger=
          {<div onClick={() => { setAccion("") }}>
            <IconButton>
              <div className='flex gap-2 items-center'> Agregar nuevo servicio <PlusCircledIcon className='w-[20px] h-[20px]' /></div>
            </IconButton>
          </div>
          } />

      </div>
      
      <DataTableTarifa columns={columns} data={tarifas} sorter="nombre" onRowClick={handleRowClick} />

    </div>
  );
}
