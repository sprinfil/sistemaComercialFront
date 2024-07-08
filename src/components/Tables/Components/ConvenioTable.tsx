import { useEffect} from 'react';
import { DataTable } from '../../../components/ui/DataTable';
import { columns, Convenio} from "../Columns/ConvenioColumns.tsx";
import axiosClient from '../../../axios-client.ts';
import { useStateContext } from '../../../contexts/ContextConvenio.tsx';
import Loader from '../../ui/Loader.tsx';
import IconButton from '../../ui/IconButton.tsx';
import { PlusCircledIcon } from '@radix-ui/react-icons';

export default function ConceptoTable() {

  const { convenios, setConvenios, loadingTable, setLoadingTable, setAccion } = useStateContext();

  useEffect(() => {
    getConcepto();
  }, []);

  const getConcepto = async () => {
    setLoadingTable(true);
    try {
      const response = await axiosClient.get("/Convenio");
      setLoadingTable(false);
      setConvenios(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      setLoadingTable(false);
      console.error("Failed to fetch convenio:", error);
    }
  };

  if (loadingTable) {
    return <div><Loader /></div>;
  }

  return (

    <div>
      <div onClick={()=>{setAccion("crear")}}>
        <IconButton>
          <div className='flex gap-2 items-center'> Agregar nuevo convenio <PlusCircledIcon className='w-[20px] h-[20px]'/></div>
        </IconButton>
      </div>
      <DataTable columns={columns} data={convenios} sorter='nombre' />
    </div>
  );
}
