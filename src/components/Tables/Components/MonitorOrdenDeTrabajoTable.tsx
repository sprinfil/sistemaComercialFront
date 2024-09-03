import { useEffect, useState } from 'react';
import { DataTable } from '../../../components/ui/DataTable';
import { columns, Anomalia } from "../../../components/Tables/Columns/MonitorOrdenDeTrabajoColumns.tsx";
import axiosClient from '../../../axios-client.ts';
import { useStateContext } from '../../../contexts/ContextAnomalias.tsx';
import Loader from '../../ui/Loader.tsx';
import IconButton from '../../ui/IconButton.tsx';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { ZustandFiltrosOrdenTrabajo } from '../../../contexts/ZustandFiltrosOt.tsx';
import { DataTableMonitorOrdenDeTrabajo } from '../../ui/DataTableMonitorOrdenDeTrabajo.tsx';
import { MonitorOrden, columns2 } from '../Columns/MonitorOrdenDeTrabajoColumns2.tsx';
import ModalMonitorOrdenTrabajoTable from '../../ui/ModalMonitorOrdenTrabajoTable.tsx';
export default function MonitorOrdenDeTrabajoTable() {

  const {setDataOrdenDeTrabajoMonitor, dataOrdenDeTrabajoMonitor, setLoadingTable, 
    loadingTable, 
    informacionRecibidaPorFiltros,boolUsoFiltros, valorParaSaberSiUsaLaTablaDeFiltros} = ZustandFiltrosOrdenTrabajo();

    const [abrirModal, setAbrirModal] = useState(false);

  useEffect(() => {
    getOrdenDeTrabajoMonitor();
  }, []);

  const getOrdenDeTrabajoMonitor = async () => {
    setLoadingTable(true);
    try {
      const response = await axiosClient.get("OrdenTrabajo/NoAsignada");
      setLoadingTable(false);
      setDataOrdenDeTrabajoMonitor(response.data.data);
      console.log(response);
    } catch (error) {
      setLoadingTable(false);
      console.error("Failed to fetch orden:", error);
    }
  };

  console.log(dataOrdenDeTrabajoMonitor);
  console.log(boolUsoFiltros, "SE USARON LOS FILTROS ", informacionRecibidaPorFiltros);

  //metodo para las filas

  const handleRowClick = (anomalia: Anomalia) =>
  {
    //setAnomalia(anomalia);
    //setAccion("ver");
    setAbrirModal(true);
  };


  if (loadingTable) {
    return <div><Loader /></div>;
  }

  return (

    <div>
     
     {
      valorParaSaberSiUsaLaTablaDeFiltros ?
      <DataTableMonitorOrdenDeTrabajo columns={columns2} data={informacionRecibidaPorFiltros} sorter='nombre' onRowClick={handleRowClick}/>
      :
      <DataTableMonitorOrdenDeTrabajo columns={columns} data={dataOrdenDeTrabajoMonitor} sorter='nombre' onRowClick={handleRowClick}/>


     }

  <ModalMonitorOrdenTrabajoTable
            isOpen={abrirModal}
            setIsOpen={setAbrirModal}
            method={""}
          />
    </div>
  );
}