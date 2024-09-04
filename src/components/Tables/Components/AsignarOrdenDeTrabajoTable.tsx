import { useEffect, useState } from 'react';
import { DataTable } from '../../../components/ui/DataTable';
import { columns, AsignarOrdenDeTrabajo } from "../../../components/Tables/Columns/AsignarOrdenDeTrabajoColumnsIndividual.tsx";
import axiosClient from '../../../axios-client.ts';
import { useStateContext } from '../../../contexts/ContextAnomalias.tsx';
import Loader from '../../ui/Loader.tsx';
import IconButton from '../../ui/IconButton.tsx';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { DataTableAsignarOTIndividual } from '../../ui/DataTableAsignarOTIndividual copy.tsx';
import { ZustandGeneralUsuario } from '../../../contexts/ZustandGeneralUsuario.tsx';
import { BuscarUsuario } from '../Columns/ContratoConsultaUsuarioColumns.tsx';
import ModalInformacionOtToma from '../../ui/ModalInformaciónOtToma.tsx';
import { ZustandFiltrosOrdenTrabajo } from '../../../contexts/ZustandFiltrosOt.tsx';
export default function AsignarOrdenDeTrabajoTable() {

  const {usuariosEncontrados, setIdSeleccionadoTomaAsignacionOT,idSeleccionadoTomaAsignacionOT,setIdSeleccionadoAsignarOrdenDeTrabajoToma, 
    setAbrirModalInformativo, abrirModalInformativo} = ZustandGeneralUsuario();

  const {setSelectedAction, selectedAction, dataAsignarOtIndividual, setDataAsignarOtIndividual, setLoadingTable, loadingTable} = ZustandFiltrosOrdenTrabajo();


  //console.log("esto llego para asignar individual",usuariosEncontrados[0]?.tomas[0].codigo_toma);

    useEffect(() => {
      getAnomalias();
    }, [selectedAction]);

    const [data,setData] = useState({});
  
    const getAnomalias = async () => {
      setLoadingTable(true);
      try {
        const response = await axiosClient.get(`Toma/ordenesTrabajo/${usuariosEncontrados[0]?.tomas[0]?.codigo_toma}`);
        setLoadingTable(false);
        //setAnomalias(response.data.data);
        console.log(response.data.data);
        setDataAsignarOtIndividual(response.data.data)
      } catch (error) {
        //setLoadingTable(false);
        console.error("Failed to fetch anomalias:", error);
      }
    };

console.log(dataAsignarOtIndividual);

if (loadingTable) {
  return <div><Loader /></div>;
}


  const handleRowClick = (usuarioToma: BuscarUsuario) =>
  {
    //este es el id de la toma seleccionada
    //setAnomalia(anomalia);
    //setAccion("ver");
    setIdSeleccionadoAsignarOrdenDeTrabajoToma(usuarioToma?.id)
  };

  

  return (

    <div>
      
      <DataTableAsignarOTIndividual columns={columns} data={dataAsignarOtIndividual} sorter='toma.codigo_toma' onRowClick={handleRowClick}/>
      
      <ModalInformacionOtToma
      isOpen={abrirModalInformativo}
      setIsOpen={setAbrirModalInformativo}
      method={handleRowClick}
      text={"Información de la orden de trabajo"}
      />
    </div>
  );
}