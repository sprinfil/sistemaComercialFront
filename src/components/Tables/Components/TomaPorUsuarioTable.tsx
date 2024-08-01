import { useEffect, useState } from 'react';
import { DataTable } from '../../../components/ui/DataTable';
import { columns, TomaPorUsuario } from "../../../components/Tables/Columns/TomaPorUsuarioColumns.tsx";
import axiosClient from '../../../axios-client.ts';
import { useStateContext } from '../../../contexts/ContextAnomalias.tsx';
import Loader from '../../ui/Loader.tsx';
import IconButton from '../../ui/IconButton.tsx';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { ZustandTomasPorUsuario } from '../../../contexts/ZustandTomasPorUsuario.tsx';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ZustandGeneralUsuario } from '../../../contexts/ZustandGeneralUsuario.tsx';
import { useBreadcrumbStore } from '../../../contexts/ZustandGeneralUsuario.tsx';

export default function TomaPorUsuarioTable() {



  const { mostrarSiguiente, setMostrarSiguiente } = useBreadcrumbStore();


  const {tomas, setTomas, loadingTable, setLoadingTable, setToma, setAccion, setTomasRuta, usuariosEncontrados, setUsuariosEncontrados, clearUsuariosEncontrados} = ZustandGeneralUsuario();

  const navigate = useNavigate();


  useEffect(() => {
    if (usuariosEncontrados.length > 0) {
      gettomaPorUsuario(usuariosEncontrados[0].id);
    }
    
  }, [usuariosEncontrados]);

  const gettomaPorUsuario = async (idUsuario) => {
    setLoadingTable(true);
    try {
      const response = await axiosClient.get(`/usuarios/consulta/tomas/${idUsuario}`);
      setLoadingTable(false);
      setTomas(response.data.data);
      console.log("tomas del usuario" + JSON.stringify(response.data.data));
    } catch (error) {
      setLoadingTable(false);
      console.error("Failed to fetch anomalias:", error);
    }
  };

  //metodo para las filas

  const handleRowClick = (tomaPorUsuario: TomaPorUsuario) =>
  {
    setToma(tomaPorUsuario);
    setTomasRuta(true);
    setMostrarSiguiente(true)
    console.log("se debió abrir la ruta");
    navigate('/usuario/toma');
    setAccion("ver");
  };


  if (loadingTable) {
    return <div><Loader /></div>;
  }

  return (

    <div>      
      <DataTable columns={columns} data={tomas} sorter='clave_catastral' onRowClick={handleRowClick}/>
    </div>
  );
}