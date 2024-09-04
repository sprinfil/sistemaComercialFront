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

  const {setDataOrdenDeTrabajoMonitor, dataOrdenDeTrabajoMonitor, setLoadingTable, 
    loadingTable, 
    informacionRecibidaPorFiltros,boolUsoFiltros, valorParaSaberSiUsaLaTablaDeFiltros,detalleOrdenDeTrabajoTomaMonitor2, setDetalleOrdenDeTrabajoTomaMonitor2} = ZustandFiltrosOrdenTrabajo();

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

  const handleRowClick = (monitor: MonitorOrden) =>
  {
    //setAnomalia(anomalia);
    console.log("este es el monitor 1", monitor);
    setAbrirModal(true);
  };

  
  const handleRowClick2 = (monitor2: MonitorOrden2) => {
    console.log("ESTE ES EL MONITOR 2", monitor2);
    if (!monitor2) {
      console.error("Monitor2 es undefined o null");
      return;
    }
    setDetalleOrdenDeTrabajoTomaMonitor2(monitor2);
    setAbrirModal(true);
  };
  
    console.log("informacion obtenida desde la variable", detalleOrdenDeTrabajoTomaMonitor2);

  if (loadingTable) {
    return <div><Loader /></div>;
  }

  return (

    <div>
     
     {
      valorParaSaberSiUsaLaTablaDeFiltros ?
      <DataTableMonitorOrdenDeTrabajo columns={columns2} data={informacionRecibidaPorFiltros} sorter='nombre' onRowClick={handleRowClick2}/>
      :
      <DataTableMonitorOrdenDeTrabajo columns={columns} data={dataOrdenDeTrabajoMonitor} sorter='nombre' onRowClick={handleRowClick2}/>


     }

  <ModalMonitorOrdenTrabajoTable
            isOpen={abrirModal}
            setIsOpen={setAbrirModal}
            method={""}
          />
    </div>
  );
}