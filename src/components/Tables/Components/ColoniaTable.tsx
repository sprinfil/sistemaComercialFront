import { useEffect } from 'react';
import { DataTable } from '../../../components/ui/DataTable';
import { columns, Colonia } from "../Columns/Colonia-Columns/ColoniaColums.tsx";
import axiosClient from '../../../axios-client.ts';
import { useStateContext } from '../../../contexts/ContextColonia.tsx';
import Loader from '../../ui/Loader.tsx';
import IconButton from '../../ui/IconButton.tsx';
import { PlusCircledIcon } from '@radix-ui/react-icons';

export default function ColoniaTable() {
  const { colonias, setColonias, loadingTable, setLoadingTable, setAccion, setColonia } = useStateContext();

  useEffect(() => {
    getColonia();
  }, []);

  const getColonia = async () => {
    setLoadingTable(true);
    try {
      const response = await axiosClient.get("/colonia");
      setLoadingTable(false);
      setColonias(response.data);
      //console.log(response.data.data);
    } catch (error) {
      setLoadingTable(false);
      console.error("Failed to fetch colonia:", error);
    }
  };

  //Metodo para seleccionar las filas
  const handleRowClick = (colonia: Colonia) => {
    setColonia(colonia);
    setAccion("ver");
  };

  if (loadingTable) {
    return <div><Loader /></div>;
  }


  return (
    <div>
      <div onClick={() => { setAccion("crear") }}>
        <IconButton>
          <div className='flex gap-2 items-center mt-5'> Agregar nueva colonia <PlusCircledIcon className='w-[20px] h-[20px]' /></div>
        </IconButton>
      </div>
      <DataTable columns={columns} data={colonias} sorter='nombre' onRowClick={handleRowClick} />
    </div>
  );
}
