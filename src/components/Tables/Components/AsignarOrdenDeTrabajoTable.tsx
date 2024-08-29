import { useEffect, useState } from 'react';
import { DataTable } from '../../../components/ui/DataTable';
import { columns, AsignarOrdenDeTrabajo } from "../../../components/Tables/Columns/AsignarOrdenDeTrabajoColumns.tsx";
import axiosClient from '../../../axios-client.ts';
import { useStateContext } from '../../../contexts/ContextAnomalias.tsx';
import Loader from '../../ui/Loader.tsx';
import IconButton from '../../ui/IconButton.tsx';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { DataTableAsignarOTIndividual } from '../../ui/DataTableAsignarOTIndividual.tsx';
import { ZustandGeneralUsuario } from '../../../contexts/ZustandGeneralUsuario.tsx';
import { BuscarUsuario } from '../Columns/ContratoConsultaUsuarioColumns.tsx';
import ModalInformacionOtToma from '../../ui/ModalInformaciónOtToma.tsx';

export default function AsignarOrdenDeTrabajoTable() {

  const {usuariosEncontrados, setIdSeleccionadoTomaAsignacionOT,idSeleccionadoTomaAsignacionOT} = ZustandGeneralUsuario();

      console.log("esto llego para asignar individual",usuariosEncontrados);
  const [abrirModalInformativo, setAbrirModalInformativo] = useState(false);


  const handleRowClick = (usuarioToma: BuscarUsuario) =>
  {

    //este es el id de la toma seleccionada
    //setAnomalia(anomalia);
    //setAccion("ver");
    setAbrirModalInformativo(true);

  };

  
 

  return (

    <div>
      
      <DataTableAsignarOTIndividual columns={columns} data={usuariosEncontrados} sorter='nombre' onRowClick={handleRowClick}/>
      
      <ModalInformacionOtToma
      isOpen={abrirModalInformativo}
      setIsOpen={setAbrirModalInformativo}
      method={handleRowClick}
      text={"Información de la orden de trabajo"}
      />
    </div>
  );
}