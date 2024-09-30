import { useEffect, useState } from 'react';
import { DataTable } from '../../../components/ui/DataTable';
import { columns, OrdenDeTrabajo } from "../Columns/OrdenDeTrabajoCrearIndividualColumns.tsx";
import axiosClient from '../../../axios-client.ts';
import Loader from '../../ui/Loader.tsx';
import IconButton from '../../ui/IconButton.tsx';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { EscogerOrdenDeTrabajoDataTable } from '../../ui/EscogerOrdenDeTrabajoDataTable.tsx';
import { zustandOrdenTrabajoStore } from '../../../contexts/ZustandOrdenesDeTrabajoUsuario.tsx';
import { ZustandGeneralUsuario } from '../../../contexts/ZustandGeneralUsuario.tsx';
import { ZustandFiltrosOrdenTrabajo } from '../../../contexts/ZustandFiltrosOt.tsx';

export default function EscogerOrdenDeTrabajoTable() {

  const {idSeleccionadoConfiguracionOrdenDeTrabajo, setIdSeleccionadoGenerarOrdenDETrabajoToma, idSeleccionadoGenerarOrdenDETrabajoToma, asignadasEnToma} = ZustandGeneralUsuario();
  const {loadingTable, setLoadingTable} = ZustandFiltrosOrdenTrabajo();
  const {
    ordenDeTrabajos,
    setOrdenDeTrabajos,
    setAccion,
    setOrdenDeTrabajo
  } = zustandOrdenTrabajoStore();

  useEffect(() => {
    getOrdenDeTrabajoDelUsuario();
  }, []);

  const [data, setData] = useState({});

  const getOrdenDeTrabajoDelUsuario = async () => {
    setLoadingTable(true);
    try {
      const response = await axiosClient.get("/OrdenTrabajoCatalogo");
      setData(response.data.data);
      console.log(response.data.data);
      setLoadingTable(false);
    } catch (error) {
      setLoadingTable(false);
      console.error("Failed to fetch Orden de trabajo:", error);
      setLoadingTable(false);
    }
  };

  console.log(data);

const HandleClickRow = (ordenTrabajo: OrdenDeTrabajo) =>
    {
    setOrdenDeTrabajo(ordenTrabajo);
    setAccion("ver");
    setIdSeleccionadoGenerarOrdenDETrabajoToma(ordenTrabajo.id);
    console.log("entro");
    console.log(idSeleccionadoGenerarOrdenDETrabajoToma);
}

  if (loadingTable) {
    return <div><Loader /></div>;
  }

  return (
    <div>
      <EscogerOrdenDeTrabajoDataTable columns={columns} data={data} sorter='descripcion' onRowClick={HandleClickRow}/>
    </div>
  );
}
