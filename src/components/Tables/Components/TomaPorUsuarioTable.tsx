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

export default function TomaPorUsuarioTable({idUsuario}) {



  const {tomas, setTomas, loadingTable, setLoadingTable, setToma, setAccion, setTomasRuta} = ZustandTomasPorUsuario();

  const navigate = useNavigate();


  useEffect(() => {
    gettomaPorUsuario();
  }, [idUsuario]);

  const gettomaPorUsuario = async () => {
    setLoadingTable(true);
    try {
      const response = await axiosClient.get(`/usuarios/consulta/tomas/${idUsuario}`);
      setLoadingTable(false);
      setTomas(response.data.data);
      console.log(response);
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
    console.log("se debió abrir la ruta");
    navigate('/usuario/toma');
    setAccion("ver");
  };


  if (loadingTable) {
    return <div><Loader /></div>;
  }

  return (

    <div>      
      <DataTable columns={columns} data={tomas} sorter='nombre' onRowClick={handleRowClick}/>
    </div>
  );
}