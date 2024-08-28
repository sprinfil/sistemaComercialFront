import { useEffect } from 'react';
import { DataTable } from '../../../components/ui/DataTable';
import { columns, Caja } from "../../../components/Tables/Columns/CajaColumns";
import axiosClient from '../../../axios-client';
import { useStateContext } from '../../../contexts/ContextCaja';
import Loader from '../../ui/Loader';
import IconButton from '../../ui/IconButton';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { ZustandGeneralUsuario } from '../../../contexts/ZustandGeneralUsuario';

export default function CajaTable() {
  const { cajas, setCajas, loadingTable, setLoadingTable, setAccion, setCaja } = useStateContext();
  const { setIdSeleccionadoConfiguracionOrdenDeTrabajo, setAccionGeneradaEntreTabs} = ZustandGeneralUsuario();

  useEffect(() => {
    getCaja();
  }, []);

  const getCaja = async () => {
    setLoadingTable(true);
    try {
      const response = await axiosClient.get("/cajas/consultarCajas");
      setLoadingTable(false);
      setCajas(response.data);
      console.log(response.data);
    } catch (error) {
      setLoadingTable(false);
      console.error("Failed to fetch caja:", error);
    }
  };

  // Método para las filas
  const handleRowClick = (caja: Caja) => {
    setCaja(caja);
    setIdSeleccionadoConfiguracionOrdenDeTrabajo(caja.id);
    setAccionGeneradaEntreTabs("ver");
  };

  if (loadingTable) {
    return <div><Loader /></div>;
  }

  return (
    <div>
      <div onClick={() => setAccionGeneradaEntreTabs("crear")}>
        <IconButton>
          <div className='flex gap-2 items-center'> 
            Agregar nueva caja
            <PlusCircledIcon className='w-[20px] h-[20px]' />
          </div>
        </IconButton>
      </div>
      
      <DataTable columns={columns} data={cajas} sorter='nombre_caja' onRowClick={handleRowClick} />
    </div>
  );
}
