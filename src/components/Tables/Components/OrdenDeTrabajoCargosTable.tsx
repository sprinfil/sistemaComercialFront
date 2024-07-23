import { useEffect, useState } from 'react';
import { DataTable } from '../../../components/ui/DataTable';
import { columns, OrdenDeTrabajo } from "../Columns/OrdenDeTrabajoCargosColumns.tsx";
import axiosClient from '../../../axios-client.ts';
import { useStateContext } from '../../../contexts/ContextOrdenDeTrabajo.tsx';
import Loader from '../../ui/Loader.tsx';
import IconButton from '../../ui/IconButton.tsx';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { DataTableCargos } from '../../ui/DataTableCargos.tsx';

export default function OrdenDeTrabajoCargosTable({ cargos }: { cargos: string[] }) {

  const { tipodetomas, setTipoDeTomas, loadingTable, setLoadingTable, setAccion, setTipoDeToma} = useStateContext();
  
  const [data, setData] = useState<OrdenDeTrabajo[]>([]);
  console.log("desde la tabla a ver que llega", cargos);

  useEffect(() => {
    const transformedData: OrdenDeTrabajo[] = cargos.map((cargo, index) => ({
      nombre: cargo,
    }));
    setData(transformedData);
  }, [cargos]);

const HandleClickRow = (tipoDeToma: OrdenDeTrabajo) =>
    {
      setTipoDeToma(tipoDeToma);
    setAccion("ver");
}

  if (loadingTable) {
    return <div><Loader /></div>;
  }

  return (

    <div>
      <DataTableCargos columns={columns} data={data} onRowClick={HandleClickRow}/>
    </div>
  );
}
