import { useEffect, useState } from 'react';
import { DataTable } from '../../../components/ui/DataTable';
import { columns, MonitorOrden } from "../../../components/Tables/Columns/MonitorOrdenDeTrabajoColumns.tsx";
import axiosClient from '../../../axios-client.ts';
import { useStateContext } from '../../../contexts/ContextAnomalias.tsx';
import Loader from '../../ui/Loader.tsx';
import IconButton from '../../ui/IconButton.tsx';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { DataTableMonitorOrdenDeTrabajo } from '../../ui/DataTableMonitorOrdenDeTrabajo.tsx';
import { MonitorOrden2, columns2 } from '../Columns/MonitorOrdenDeTrabajoColumns2.tsx';
import ModalMonitorOrdenTrabajoTable from '../../ui/ModalMonitorOrdenTrabajoTable.tsx';
import { ZustandFiltrosOrdenTrabajo } from '../../../contexts/ZustandFiltrosOt.tsx';


export default function MonitorOrdenDeTrabajoTable() {

  const { setDataOrdenDeTrabajoMonitor, dataOrdenDeTrabajoMonitor, setLoadingTable,
    loadingTable,
    informacionRecibidaPorFiltros, boolUsoFiltros, valorParaSaberSiUsaLaTablaDeFiltros, detalleOrdenDeTrabajoTomaMonitor2, 
    setDetalleOrdenDeTrabajoTomaMonitor2, informacionRecibidaPorFiltrosMonitorOrdenDeTrabajo, 
    setInformacionRecibidaPorFiltrosMonitorOrdenDeTrabajo,setLoadingTableFiltrarOrdenDeTrabajoMasivas, loadingTableFiltrarOrdenDeTrabajoMasivas, setIsOpenPadreModalDetalleMonitorOT} = ZustandFiltrosOrdenTrabajo();

  const [abrirModal, setAbrirModal] = useState(false);


  useEffect(() => {
    getOrdenDeTrabajoMonitor();
  }, []);

  const getOrdenDeTrabajoMonitor = async () => {
    setLoadingTableFiltrarOrdenDeTrabajoMasivas(true);
    try {
      const response = await axiosClient.get("OrdenTrabajo/NoAsignada");
      setLoadingTableFiltrarOrdenDeTrabajoMasivas(false);
      setInformacionRecibidaPorFiltrosMonitorOrdenDeTrabajo(response.data.data);
      console.log(response);
    } catch (error) {
      setLoadingTableFiltrarOrdenDeTrabajoMasivas(false);
      console.error("Failed to fetch orden:", error);
    }
  };

  console.log(dataOrdenDeTrabajoMonitor);
  console.log(boolUsoFiltros, "SE USARON LOS FILTROS ", informacionRecibidaPorFiltrosMonitorOrdenDeTrabajo);

  //metodo para las filas

  const handleRowClick = (monitor: MonitorOrden) => {
    //setAnomalia(anomalia);
    console.log("este es el monitor 1", monitor);
    setIsOpenPadreModalDetalleMonitorOT(true);
  };


  const handleRowClick2 = (monitor2: MonitorOrden2) => {
    console.log("ESTE ES EL MONITOR 2", monitor2);
    if (!monitor2) {
      console.error("Monitor2 es undefined o null");
      return;
    }
    setDetalleOrdenDeTrabajoTomaMonitor2(monitor2);
    setIsOpenPadreModalDetalleMonitorOT(true);
  };

  //console.log("informacion obtenida desde la variable", detalleOrdenDeTrabajoTomaMonitor2);

  if (loadingTableFiltrarOrdenDeTrabajoMasivas) {
    return <div><Loader /></div>;
  }

  console.log(informacionRecibidaPorFiltrosMonitorOrdenDeTrabajo);
  
  return (

    <div>

      {
        valorParaSaberSiUsaLaTablaDeFiltros ?
          <DataTableMonitorOrdenDeTrabajo columns={columns2} data={informacionRecibidaPorFiltrosMonitorOrdenDeTrabajo} sorter='toma.codigo_toma' onRowClick={handleRowClick2} />
          :
          <DataTableMonitorOrdenDeTrabajo columns={columns2} data={informacionRecibidaPorFiltrosMonitorOrdenDeTrabajo} sorter='toma.codigo_toma' onRowClick={handleRowClick2} />


      }
      {
        <ModalMonitorOrdenTrabajoTable/>
      }

    </div>
  );
}