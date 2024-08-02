import { useEffect, useRef, useState} from 'react';
import { DataTable } from '../../ui/DataTable.tsx';
import { columns, BuscarUsuario } from "../Columns/ContratoConsultaUsuarioColumns.tsx";
import axiosClient from '../../../axios-client.ts';
import Loader from '../../ui/Loader.tsx';
import { useStateContext } from '../../../contexts/ContextContratos.tsx';
import { ContextProvider } from '../../../contexts/ContextContratos.tsx';
import { DataTableUsuarios } from '../../ui/DataTableUsuarios.tsx';
import DetalleUsuario from '../../../views/Usuarios/Consultar/DetalleUsuario.tsx';
import { useNavigate } from 'react-router-dom';
import { ZustandGeneralUsuario } from '../../../contexts/ZustandGeneralUsuario';
import { Link } from 'react-router-dom';
interface ConsultaUsuarioTableProps {
  nombreBuscado: string;
}

export default function ContratoConsultaUsuarioTable({ nombreBuscado, accion2, filtroSeleccionado}: ConsultaUsuarioTableProps) {

  console.log("este es el que recibeeee" + nombreBuscado)
  const { usuarioObtenido, setUsuarioObtenido, setUsuariosEncontrados, usuariosEncontrados, setLoadingTable, loadingTable, setAccion, setUsuario, usuario, setUsuariosRecuperado} = ZustandGeneralUsuario(); // obtener la ruta del componente breadCrumb

  const tableRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (nombreBuscado) {
        const loadAndScroll = async () => {
            setLoadingTable(true);

            let endpoint = "";

            switch (filtroSeleccionado) {
              case "1":
                  endpoint = `/usuarios/consulta/${nombreBuscado}`;
                  break;
              case "2":
                  endpoint = `/usuarios/consultaCodigo/${nombreBuscado}`;
  
                  break;
              case "3":
                  endpoint = `/usuarios/consultaCorreo/${nombreBuscado}`;
                  break;

              default:
                  console.log("Filtro no válido");
                  return;
          }

          try {
            const response = await axiosClient.get(endpoint);
            const results = response.data.data;
            setUsuariosEncontrados(results);

          } catch (err) {
            console.log("Error en la consulta:", err);
          } finally {
            setLoadingTable(false);
          }
           
            if (tableRef.current) {
                tableRef.current.scrollIntoView({ behavior: 'auto' });
            }
        };

        loadAndScroll();
    }
}, [nombreBuscado, setUsuariosEncontrados, setLoadingTable]);

  const handleRowClick = (contratobuscarUsuario: BuscarUsuario) => {
    setUsuariosEncontrados([contratobuscarUsuario]);
    if(accion2 == "verUsuarioDetalle")
    {
      navigate("/usuario");
    }
    
    if(accion2 == "crearContratacionUsuario")
      {
        navigate("/Crear/Contrato/Usuario");
      }
  };

  if (loadingTable) {
    return <div><Loader /></div>;
  }

  return (
    <ContextProvider>
    <div ref={tableRef}>
        <DataTableUsuarios columns={columns} data={usuariosEncontrados} sorter='nombre' onRowClick={handleRowClick} />
      </div>
    </ContextProvider>
  
  );
}