import { useEffect, useState } from 'react';
import { DataTable } from '../../../components/ui/DataTable';
import { columns, AsignarOrdenDeTrabajo } from "../../../components/Tables/Columns/AsignarOrdenDeTrabajoColumnsIndividual.tsx";
import axiosClient from '../../../axios-client.ts';
import { useStateContext } from '../../../contexts/ContextAnomalias.tsx';
import Loader from '../../ui/Loader.tsx';
import IconButton from '../../ui/IconButton.tsx';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { DataTableAsignarOTIndividual } from '../../ui/DataTableAsignarOTIndividual.tsx';
import { ZustandGeneralUsuario } from '../../../contexts/ZustandGeneralUsuario.tsx';
import { BuscarUsuario } from '../Columns/ContratoConsultaUsuarioColumns.tsx';
import ModalInformacionOtToma from '../../ui/ModalInformaciónOtToma.tsx';

export default function AsignarOrdenDeTrabajoIndividualEnDetalleUsuarioTable() {

  const {usuariosEncontrados, setIdSeleccionadoTomaAsignacionOT,idSeleccionadoTomaAsignacionOT,setIdSeleccionadoAsignarOrdenDeTrabajoToma} = ZustandGeneralUsuario();

      console.log("esto llego para asignar individual",usuariosEncontrados[0].tomas[0].codigo_toma);
      console.log("esto llego para asignar individual",usuariosEncontrados[0]);
  const [abrirModalInformativo, setAbrirModalInformativo] = useState(false);
  
  const [data, setData] = useState({});

  useEffect(() => {
    getTomasConOrdenDeTrabajo();
  }, []);

  const getTomasConOrdenDeTrabajo = async () => {
    //setLoadingTable(true);
    try {
      const response = await axiosClient.get(`Toma/ordenesTrabajo/${usuariosEncontrados[0].tomas[0].codigo_toma}`);
      console.log(response.data.data);
      setData(response.data.data);
    } catch (error) {
      //setLoadingTable(false);
      console.error("Failed to fetch anomalias:", error);
    }
  };

  console.log(data);

  const handleRowClick = (usuarioToma: BuscarUsuario) =>
  {

    //este es el id de la toma seleccionada
    //setAnomalia(anomalia);
    //setAccion("ver");
    
    //setAbrirModalInformativo(true);
    setIdSeleccionadoAsignarOrdenDeTrabajoToma(usuarioToma.tomas[0].id)
  };

  
 

  return (

    <div>
      
      <DataTableAsignarOTIndividual columns={columns} data={data} sorter='nombre' onRowClick={handleRowClick}/>
      
      <ModalInformacionOtToma
      isOpen={abrirModalInformativo}
      setIsOpen={setAbrirModalInformativo}
      method={handleRowClick}
      text={"Información de la orden de trabajo"}
      />
    </div>
  );
}