import { useEffect, useState, useRef } from 'react';
import { DataTable } from '../../../../components/ui/DataTable';
import { columns, ContratoBuscarUsuario } from "../Columns/ContratoConsultaUsuarioColumns.tsx";
import axiosClient from '../../../../axios-client.ts';
import { ContextProvider, useStateContext } from '../ContextContratos.tsx';
import Loader from '../../../../components/ui/Loader.tsx';
import IconButton from '../../../../components/ui/IconButton.tsx';
import { PlusCircledIcon } from '@radix-ui/react-icons';

export default function ContratoConsultaUsuarioTable({ nombreBuscado }) {
  const { usuariosEncontrados, setusuariosEncontrados, loadingTable, setLoadingTable, setAccion } = useStateContext();
  const tableRef = useRef<HTMLDivElement | null>(null); // Referencia al contenedor de la tabla

  useEffect(() => {
    const loadAndScroll = async () => {
      await getUsuarios();
      if (tableRef.current) {
        tableRef.current.scrollIntoView({ behavior: 'auto' });
      }
    };

    if (nombreBuscado) {
      loadAndScroll();
    }
  }, [nombreBuscado]);

  const getUsuarios = async () => {
    setLoadingTable(true);

    try {
      const response = await axiosClient.get(`/usuarios/consulta/${nombreBuscado}`);
      setusuariosEncontrados(response.data.data); // Actualiza los datos
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingTable(false);
    }
  };

  const handleRowClick = (nombre: ContratoBuscarUsuario) => {
    setusuariosEncontrados(nombre);
    setAccion("ver");
  };

  if (loadingTable) {
    return <div><Loader /></div>;
  }

  return (
    <ContextProvider>
      <div ref={tableRef}> {/* Contenedor de la tabla */}
        <DataTable columns={columns} data={usuariosEncontrados} sorter='nombre' onRowClick={handleRowClick} />
      </div>
    </ContextProvider>
  );
}
