import { useEffect} from 'react';
import { DataTable } from '../../../components/ui/DataTable';
import { columns, ConvenioAplicable} from "../Columns/ConvenioAplicableColumns.tsx";
import axiosClient from '../../../axios-client.ts';
import { useStateContext } from '../../../contexts/ContextConvenioAplicable.tsx';
import Loader from '../../ui/Loader.tsx';
import IconButton from '../../ui/IconButton.tsx';
import { PlusCircledIcon } from '@radix-ui/react-icons';

export default function ConceptoAplicableTable() {

  const { conveniosAplicables, setConveniosAplicables, loadingTable, setLoadingTable, setAccion, setConvenioAplicables} = useStateContext();

  useEffect(() => {
    getConceptoAplicable();
  }, []);

  const getConceptoAplicable = async () => {
    setLoadingTable(true);
    try {
      const response = await axiosClient.get("/Convenio");
      setLoadingTable(false);
      setConveniosAplicables(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      setLoadingTable(false);
      console.error("Failed to fetch convenio:", error);
    }
  };

  const HandleClickRow = (conveniosAplicables: ConvenioAplicable) =>
    {
      setConvenioAplicables(conveniosAplicables);
      setAccion("ver");
    }
  

  if (loadingTable) {
    return <div><Loader /></div>;
  }

  return (

    <div>
      
      <DataTable columns={columns} data={conveniosAplicables} sorter='nombre' onRowClick={HandleClickRow}/>
    </div>
  );
}
