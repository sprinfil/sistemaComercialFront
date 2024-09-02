import { useEffect, useState } from 'react';
import { DataTable } from '../../../components/ui/DataTable';
import { columns, OrdenDeTrabajoCrearTomas } from "../../../components/Tables/Columns/OrdenDeTrabajoCrearTomas.tsx";
import axiosClient from '../../../axios-client.ts';
import { useStateContext } from '../../../contexts/ContextAnomalias.tsx';
import Loader from '../../ui/Loader.tsx';
import IconButton from '../../ui/IconButton.tsx';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { ZustandFiltrosOrdenTrabajo } from '../../../contexts/ZustandFiltrosOt.tsx';
export default function OrdenDeTrabajoCrearTomasTable() {



  const {informacionRecibidaPorFiltros} = ZustandFiltrosOrdenTrabajo();

  //metodo para las filas

  const handleRowClick = (anomalia: OrdenDeTrabajoCrearTomas) =>
  {
    //setAnomalia(anomalia);
    //setAccion("ver");
  };


 // if (loadingTable) {
   // return <div><Loader /></div>;
 // }

  return (

    <div>
      <DataTable columns={columns} data={informacionRecibidaPorFiltros} sorter='nombre' onRowClick={handleRowClick}/>
    </div>
  );
}