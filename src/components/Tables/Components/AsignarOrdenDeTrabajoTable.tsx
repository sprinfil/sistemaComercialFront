import { useEffect, useState, useCallback} from 'react';
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


  console.log("esto llego para asignar individual",usuariosEncontrados);
  // Definir getAnomalias usando useCallback para prevenir dependencias innecesarias
  const getAnomalias = useCallback(async () => {
    if (!usuariosEncontrados.length) return; // Asegúrate de que usuariosEncontrados tenga datos antes de proceder

    setLoadingTable(true);

    // Limpiar el estado antes de la nueva consulta
    setDataAsignarOtIndividual([]);

    try {
      const response = await axiosClient.get(`Toma/ordenesTrabajo/${usuariosEncontrados[0]?.tomas[0]?.codigo_toma}`);
      console.log('Respuesta de la API:', response.data);
      setDataAsignarOtIndividual(response.data.data);
    } catch (error) {
      console.error("Failed to fetch anomalias:", error);
    } finally {
      setLoadingTable(false);
    }
  }, [usuariosEncontrados]); // Solo depende de usuariosEncontrados

  useEffect(() => {
    // Solo llama a getAnomalias si usuariosEncontrados tiene contenido y no está en carga
    if (usuariosEncontrados.length > 0 && !loadingTable) {
      getAnomalias();
    }
  }, [usuariosEncontrados, getAnomalias]);

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