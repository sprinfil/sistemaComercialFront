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
import { useLocation } from 'react-router-dom';
export default function TomaPorUsuarioTable() {



  const { mostrarSiguiente, setMostrarSiguiente } = useBreadcrumbStore();

  const location = useLocation();

  const { obtenerIdUsuarioInDetalle, tomas, setTomas, toma, setToma, loadingTable, setLoadingTable, setAccion, setTomasRuta, usuariosEncontrados, setUsuariosEncontrados, clearUsuariosEncontrado, setTomaUsuariosEncontrados } = ZustandGeneralUsuario();
  const [tomas_real, set_tomas_real] = useState([])
  const navigate = useNavigate();
  const idUsuario = location.state?.idUsuario;

  console.log("ESTE ES EL ID DEL USUARIO SELECCIONADO", usuariosEncontrados[0].id);

  useEffect(() => {
    if (usuariosEncontrados[0].id) {
      gettomaPorUsuario(usuariosEncontrados[0].id);
    }

  }, [setToma, toma, usuariosEncontrados]);

  const gettomaPorUsuario = async (idUsuario) => {
    setLoadingTable(true);
    try {
      const response = await axiosClient.get(`/usuarios/consulta/tomas/${idUsuario}`);
      setLoadingTable(false);
      setTomas(response.data.data);
      console.log("tomas del usuario" + JSON.stringify(response.data.data));
    } catch (error) {
      setLoadingTable(false);
      console.error("Failed to fetch tomas de usuario:", error);
    }
  };

  useEffect(() => {
    console.log(tomas)
    set_tomas_real(tomas);
  }, [tomas])

  //metodo para las filas

  const handleRowClick = (tomaPorUsuario: TomaPorUsuario) => {
    setToma(tomaPorUsuario);
    setTomasRuta(true);
    let usuariosEncontradosTemp = usuariosEncontrados;
    usuariosEncontradosTemp[0].tomas[0] = tomaPorUsuario;
    setUsuariosEncontrados(usuariosEncontradosTemp);

    setMostrarSiguiente(true)
    console.log("se debió abrir la ruta");
    navigate('/usuario/toma');
    setAccion("ver");
  };

  console.log(toma);


  if (loadingTable) {
    return <div><Loader /></div>;
  }

  return (

    <div>
      <DataTable columns={columns} data={tomas_real} sorter='clave_catastral' onRowClick={handleRowClick} />
    </div>
  );
}