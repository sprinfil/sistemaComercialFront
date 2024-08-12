import { useEffect, useRef, useState} from 'react';
import { DataTable } from '../../ui/DataTable.tsx';
import { columns, BuscarTomaUsuario } from "../Columns/ContratoConsultaTomaColumns.tsx";
import axiosClient from '../../../axios-client.ts';
import Loader from '../../ui/Loader.tsx';
import { useStateContext } from '../../../contexts/ContextContratos.tsx';
import { ContextProvider } from '../../../contexts/ContextContratos.tsx';
import DetalleUsuario from '../../../views/Usuarios/Consultar/DetalleUsuario.tsx';
import { useNavigate } from 'react-router-dom';
import { ZustandGeneralUsuario } from '../../../contexts/ZustandGeneralUsuario';
import { Link } from 'react-router-dom';
import { DataTableTomaUsuarios } from '../../ui/DataTableTomaUsuarios.tsx';
import { TomaPorUsuario } from '../Columns/TomaPorUsuarioColumns.tsx';
interface ConsultaUsuarioTableProps {
  nombreBuscado: string;
}

export default function ContratoConsultaTomaTable({ nombreBuscado, accion2, filtroSeleccionado}: ConsultaUsuarioTableProps) {

  console.log("este es el que recibeeee" + nombreBuscado)
  const {toma, usuarioObtenido, setUsuarioObtenido, setUsuariosEncontrados, usuariosEncontrados, setLoadingTable, loadingTable, setAccion, setUsuario, usuario, setUsuariosRecuperado, tomaUsuariosEncontrados, setTomaUsuariosEncontrados, setToma} = ZustandGeneralUsuario(); // obtener la ruta del componente breadCrumb

  const tableRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (nombreBuscado) {
        const loadAndScroll = async () => {
            setLoadingTable(true);

            let endpoint = "";

            switch (filtroSeleccionado) {
                  case "4":
                    endpoint = `/usuarios/consultaDireccion/${nombreBuscado}`;
                    break;
                    case "5":
                      endpoint = `/Tomas/codigo/${nombreBuscado}`;
                      break;
              default:
                  console.log("No jalo algo paso mal");
                  return;
          }

          try {
            const response = await axiosClient.get(endpoint);
            let results;
            if(filtroSeleccionado == 5)
            {
              results = response.data
            }
            else
            {
              results = response.data.data

            }
            setTomaUsuariosEncontrados(results);
            console.log(response);

          } catch (err) {
            console.log("Error en la consulta toma del usuario:", err);
          } finally {
            setLoadingTable(false);
          }
           
            if (tableRef.current) {
                tableRef.current.scrollIntoView({ behavior: 'auto' });
            }
        };

        loadAndScroll();
    }
}, [toma, setToma, filtroSeleccionado]);

  const handleRowClick = (contratobuscarUsuario: TomaPorUsuario) => {
    setToma(null);
    setToma(contratobuscarUsuario);
    if(accion2 == "verUsuarioDetalle")
    {
      navigate("/usuario/toma");
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
        <DataTableTomaUsuarios columns={columns} data={tomaUsuariosEncontrados}  onRowClick={handleRowClick} />
      </div>
    </ContextProvider>
  
  );
}
