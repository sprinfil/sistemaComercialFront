import { useEffect, useState } from 'react';
import { DataTable } from '../../../components/ui/DataTable';
import { columns, OrdenDeTrabajo } from "../Columns/OrdenDeTrabajoColumns.tsx";
import axiosClient from '../../../axios-client.ts';
import Loader from '../../ui/Loader.tsx';
import IconButton from '../../ui/IconButton.tsx';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { EscogerOrdenDeTrabajoDataTable } from '../../ui/EscogerOrdenDeTrabajoDataTable.tsx';
import { zustandOrdenTrabajoStore } from '../../../contexts/ZustandOrdenesDeTrabajoUsuario.tsx';

export default function EscogerOrdenDeTrabajoTable() {

  const {
    ordenDeTrabajos,
    setOrdenDeTrabajos,
    loadingTable,
    setLoadingTable,
    setAccion,
    setOrdenDeTrabajo
  } = zustandOrdenTrabajoStore();

  useEffect(() => {
    getOrdenDeTrabajoDelUsuario();
  }, []);

  const getOrdenDeTrabajoDelUsuario = async () => {
    try {
      const response = await axiosClient.get("/OrdenTrabajoCatalogo");
      setOrdenDeTrabajos(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      setLoadingTable(false);
      console.error("Failed to fetch Orden de trabajo:", error);
    }
  };

const HandleClickRow = (tipoDeToma: OrdenDeTrabajo) =>
    {
      setOrdenDeTrabajo(tipoDeToma);
    setAccion("ver");
    console.log(tipoDeToma);
}

  if (loadingTable) {
    return <div><Loader /></div>;
  }

  return (
    <div>
      <EscogerOrdenDeTrabajoDataTable columns={columns} data={ordenDeTrabajos} sorter='nombre' onRowClick={HandleClickRow}/>
    </div>
  );
}
