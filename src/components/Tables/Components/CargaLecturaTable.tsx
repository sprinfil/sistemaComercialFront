import { useEffect, useState } from 'react';
import { DataTable } from '../../../components/ui/DataTable';
import { columns, CargaTrabajo} from "../../../components/Tables/Columns/CargaLecturasColumns.tsx";
import axiosClient from '../../../axios-client.ts';
import { useStateContext } from "../../../contexts/ContextAjuste.tsx"
import Loader from '../../ui/Loader.tsx';
import IconButton from '../../ui/IconButton.tsx';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { DataTableCargaLecturas } from '../../ui/DataTableCargaLecturas.tsx';
import { ZustandCargaDeTrabajo } from '../../../contexts/ZustandCargaDeTrabajo.tsx';
export default function CargaLecturaTable({data}) {

  const {setFilasSeleccionadasCargaTrabajo} = ZustandCargaDeTrabajo();
  console.log(data);
 //Metodo para seleccionar las filas
 const handleRowClick = (cargaTrabajo: CargaTrabajo) => {
  //setAjuste(ajuste);
  //setAccion("ver");
  console.log(cargaTrabajo);
  setFilasSeleccionadasCargaTrabajo(cargaTrabajo);

};


  // if (loadingTable) {
  //   return <div><Loader /></div>;
  // }

  return (

    <div className='w-[70vh]'>
     <div className='w-full'>
     <DataTableCargaLecturas columns={columns} data={data} onRowClick={handleRowClick}/>
     </div>
    </div>
  );
}