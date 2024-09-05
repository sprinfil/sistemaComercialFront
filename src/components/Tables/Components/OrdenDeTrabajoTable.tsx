import { useEffect, useState } from 'react';
import { DataTable } from '../../../components/ui/DataTable';
import { columns, OrdenDeTrabajo } from "../Columns/OrdenDeTrabajoOtCatalogoColumns .tsx";
import axiosClient from '../../../axios-client.ts';
import { useStateContext } from '../../../contexts/ContextOrdenDeTrabajo.tsx';
import Loader from '../../ui/Loader.tsx';
import IconButton from '../../ui/IconButton.tsx';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { ZustandGeneralUsuario } from '../../../contexts/ZustandGeneralUsuario.tsx';
export default function OrdenDeTrabajoTable() {

  const { ordenDeTrabajos, setOrdenDeTrabajos, loadingTable, setLoadingTable, setAccion, setOrdenDeTrabajo} = useStateContext();
 const {setIdSeleccionadoConfiguracionOrdenDeTrabajo, idSeleccionadoConfiguracionOrdenDeTrabajo, setAccionGeneradaEntreTabs} = ZustandGeneralUsuario();
 console.log("Actualizando ID a:", idSeleccionadoConfiguracionOrdenDeTrabajo);

  useEffect(() => {
    getOrdenDeTrabajo();
  }, []);

  const getOrdenDeTrabajo = async () => {
    setLoadingTable(true);
    try {
      const response = await axiosClient.get("/OrdenTrabajoCatalogo");
      setLoadingTable(false);
      setOrdenDeTrabajos(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      setLoadingTable(false);
      console.error("Failed to fetch Orden de trabajo:", error);
    }
  };
  
console.log(ordenDeTrabajos);
const HandleClickRow = (tipoDeToma: OrdenDeTrabajo) =>
    {
    setOrdenDeTrabajo(tipoDeToma);
    setAccionGeneradaEntreTabs("ver");
    setIdSeleccionadoConfiguracionOrdenDeTrabajo(tipoDeToma.id);
    console.log(tipoDeToma);
  }

  if (loadingTable) {
    return <div><Loader /></div>;
  }

  return (

    <div>
      <div onClick={()=>{setAccionGeneradaEntreTabs("crear")}}>
        <IconButton>
          <div className='flex gap-2 items-center'> Agregar nueva orden de trabajo <PlusCircledIcon className='w-[20px] h-[20px]' /></div>
        </IconButton>
      </div>
      <DataTable columns={columns} data={ordenDeTrabajos} sorter='nombre' onRowClick={HandleClickRow}/>
    </div>
  );
}
