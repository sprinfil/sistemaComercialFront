import { useEffect, useState } from 'react';
import { DataTable } from '../../../components/ui/DataTable';
import { columns, AsignarOrdenDeTrabajo } from "../../../components/Tables/Columns/AsignarOrdenDeTrabajoColumns.tsx";
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
export default function AsignarOrdenDeTrabajoMasivamenteTable() {

  const {informacionRecibidaPorFiltros,setSelectedAction, selectedAction, loadingTable, setLoadingTable} = ZustandFiltrosOrdenTrabajo();
    
  const [abrirModalInformativo, setAbrirModalInformativo] = useState(false);
 


  useEffect(()=>
  {

  },[])

  const handleRowClick = (usuarioToma: AsignarOrdenDeTrabajo) =>
  {

    //este es el id de la toma seleccionada
    //setAnomalia(anomalia);
    //setAccion("ver");
    //setAbrirModalInformativo(true);
    console.log(usuarioToma);

  };
  console.log(informacionRecibidaPorFiltros);

  return (

    <div>
      
      {loadingTable ? (
        <div className="flex items-center justify-center h-64">
          <Loader /> 
        </div>
      ) : (
        <DataTableAsignarOTIndividual
          columns={columns}
          data={informacionRecibidaPorFiltros}
          sorter='nombre'
          onRowClick={handleRowClick}
        />
      )}

      
      <ModalInformacionOtToma
      isOpen={abrirModalInformativo}
      setIsOpen={setAbrirModalInformativo}
      method={handleRowClick}
      text={"Información de la orden de trabajo"}
      />
    </div>
  );
}