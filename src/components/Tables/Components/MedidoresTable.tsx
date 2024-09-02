import { useEffect, useState} from 'react';
import { DataTable } from '../../../components/ui/DataTable';
import { columns, Medidor } from "../Columns/Medidor-Columns/MedidorColumns.tsx";
import axiosClient from '../../../axios-client.ts';
import { useStateContext } from '../../../contexts/ContextMedidores.tsx';
import Loader from '../../ui/Loader.tsx';
import IconButton from '../../ui/IconButton.tsx';
import { PlusCircledIcon } from '@radix-ui/react-icons';

export default function MedidoresTable() {
  const { medidores, setMedidores, loadingTable, setLoadingTable, setAccion, setMedidor, accion } = useStateContext();

  const [medidorActiva, setMedidorActiva] = useState();

  useEffect(() => {
    getMedidor();
  }, []);

 

  const getMedidor = async () => {
    setLoadingTable(true);
    try {
      const response = await axiosClient.get("/");
      setLoadingTable(false);
      setMedidores(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      setLoadingTable(false);
      console.error("Failed to fetch medidores:", error);
    }
  };
  
  
  

  //Metodo para seleccionar las filas
  const handleRowClick = (medidor: Medidor) => {
    setMedidor(medidor);
    console.log(medidor.estado); 
    setAccion("ver");
  };

  if (loadingTable) {
    return <div><Loader /></div>;
  }


  return (
    <div>
      <div onClick={() => { setAccion("crear") }}>
        <IconButton>
          <div className='flex gap-2 items-center mt-5'> Agregar nuevo medidor <PlusCircledIcon className='w-[20px] h-[20px]' /></div>
        </IconButton>
      </div>
      <DataTable columns={columns} data={medidores} sorter='nombre' onRowClick={handleRowClick} />
    </div>
  );
}
