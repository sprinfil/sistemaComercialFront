import { useEffect, useRef, useState} from 'react';
import { DataTable } from '../../ui/DataTable.tsx';
import { columns, ContratoBuscarUsuario } from "../Columns/ContratoConsultaUsuarioColumns.tsx";
import axiosClient from '../../../axios-client.ts';
import Loader from '../../ui/Loader.tsx';
import { useStateContext } from '../../../contexts/ContextContratos.tsx';
import { ContextProvider } from '../../../contexts/ContextContratos.tsx';
import { DataTableUsuarios } from '../../ui/DataTableUsuarios.tsx';
import DetalleUsuario from '../../../views/Usuarios/Consultar/DetalleUsuario.tsx';
import { useNavigate } from 'react-router-dom';

interface ConsultaUsuarioTableProps {
  nombreBuscado: string;
}

export default function ContratoConsultaUsuarioTable({ nombreBuscado, accion2}: ConsultaUsuarioTableProps) {

  console.log("este es el que recibeeee" + nombreBuscado)
  const { usuariosEncontrados, setusuariosEncontrados, loadingTable, setLoadingTable, setAccion,setusuario, usuario} = useStateContext();
  const tableRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (nombreBuscado) {
        const loadAndScroll = async () => {
            setLoadingTable(true);

            try {
                const endpoints = [
                    `/usuarios/consultaCorreo/${nombreBuscado}`,
                    `/usuarios/consultaRFC/${nombreBuscado}`,
                    `/usuarios/consulta/${nombreBuscado}`,
                    `/usuarios/consultaCodigo/${nombreBuscado}`,
                    `/usuarios/consultaCURP/${nombreBuscado}`,

                ];

                const results = await Promise.all(endpoints.map(endpoint =>
                    axiosClient.get(endpoint)
                        .then(response => response.data.data)
                        .catch(err => {
                            console.error('Error fetching data:', err);
                            return []; // Devuelve un array vacío en caso de error
                        })
                ));

                // Combina los resultados de todas las consultas
                const combinedResults = results.flat();
                setusuariosEncontrados(combinedResults); // Actualiza los datos

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoadingTable(false);
            }

            if (tableRef.current) {
                tableRef.current.scrollIntoView({ behavior: 'auto' });
            }
        };

        loadAndScroll();
    }
}, [nombreBuscado, setusuariosEncontrados, setLoadingTable]);

  const handleRowClick = (contratoBuscarUsuario: ContratoBuscarUsuario) => {
    setusuario(contratoBuscarUsuario);

    if(accion2 == "verUsuarioDetalle")
    {
      navigate("/usuario",{ state: { contratoBuscarUsuario } });
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
