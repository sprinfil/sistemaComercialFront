import { useEffect, useState } from 'react';
import { DataTable } from '../../../components/ui/DataTable';
import { columns, CargaTrabajo} from "../../../components/Tables/Columns/CargaLecturasColumns.tsx";
import axiosClient from '../../../axios-client.ts';
import { useStateContext } from "../../../contexts/ContextAjuste.tsx"
import Loader from '../../ui/Loader.tsx';
import IconButton from '../../ui/IconButton.tsx';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { DataTableCargaLecturas } from '../../ui/DataTableCargaLecturas.tsx';

export default function CargaLecturaTable() {

  const [data, setData] = useState([]);
  
  useEffect(() => {
    getLibros();
  }, []);

  const getLibros = async () => {
    //setLoadingTable(true);
    try {
      const response = await axiosClient.get("/AjustesCatalogo");
      //setLoadingTable(false);
      setData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      //setLoadingTable(false);
      console.error("Failed to fetch libros:", error);
    }
  };
 //Metodo para seleccionar las filas
 const handleRowClick = (cargaTrabajo: CargaTrabajo) => {
  //setAjuste(ajuste);
  //setAccion("ver");
  console.log(cargaTrabajo);
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