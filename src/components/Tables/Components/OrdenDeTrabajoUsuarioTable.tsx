import { useEffect, useState } from 'react';
import { DataTable } from '../../../components/ui/DataTable';
import { columns, OrdenDeTrabajo } from "../Columns/OrdenDeTrabajoColumns.tsx";
import axiosClient from '../../../axios-client.ts';
import Loader from '../../ui/Loader.tsx';
import IconButton from '../../ui/IconButton.tsx';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { EscogerOrdenDeTrabajoDataTable } from '../../ui/EscogerOrdenDeTrabajoDataTable.tsx';
import { zustandOrdenTrabajoStore } from '../../../contexts/ZustandOrdenesDeTrabajoUsuario.tsx';
import { ZustandGeneralUsuario } from '../../../contexts/ZustandGeneralUsuario.tsx';
export default function OrdenDeTrabajoUsuarioTable() {

  const {usuariosEncontrados, setIdSeleccionadoTomaAsignacionOT,idSeleccionadoTomaAsignacionOT,setIdSeleccionadoAsignarOrdenDeTrabajoToma} = ZustandGeneralUsuario();

      console.log("esto llego para asignar individual",usuariosEncontrados[0]?.tomas[0]?.codigo_toma);
      console.log("esto llego para asignar individual",usuariosEncontrados[0]);
  const {
    ordenDeTrabajos,
    setOrdenDeTrabajos,
    loadingTable,
    setLoadingTable,
    setAccion,
    setOrdenDeTrabajo
  } = zustandOrdenTrabajoStore();

  const [data,setData] = useState({})

  useEffect(() => {
    getOrdenDeTrabajoDelUsuario();
  }, []);

  const getOrdenDeTrabajoDelUsuario = async () => {
    try {
      const response = await axiosClient.get(`Toma/ordenesTrabajo/${usuariosEncontrados[0]?.tomas[0]?.codigo_toma}`);
      setData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      setLoadingTable(false);
      console.error("Failed to fetch Orden de trabajo:", error);
    }
  };

console.log(data);
  

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
      <EscogerOrdenDeTrabajoDataTable columns={columns} data={data} sorter='nombre' onRowClick={HandleClickRow}/>
    </div>
  );
}
