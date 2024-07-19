import { useEffect, useState } from 'react';
import { DataTable } from '../../../components/ui/DataTable';
import { columns, Rol } from "../../../components/Tables/Columns/RolColumns.tsx";
import axiosClient from '../../../axios-client.ts';
import { useStateContext } from '../../../contexts/ContextRol.tsx';
import Loader from '../../ui/Loader.tsx';
import IconButton from '../../ui/IconButton.tsx';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { useToast } from "@/components/ui/use-toast"; //IMPORTACIONES TOAST
import { ToastAction } from "@/components/ui/toast"; //IMPORTACIONES TOAST

export default function RolTable({setActiveTab}) {
  const { toast } = useToast()
  const { roles, setRoles, loadingTable, setLoadingTable, setAccion, setRol, editando } = useStateContext();

  useEffect(() => {
    getRoles();
  }, []);

  const getRoles = async () => {
    setLoadingTable(true);
    try {
      const response = await axiosClient.get("/Rol");
      setLoadingTable(false);
      setRoles(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      setLoadingTable(false);
      console.error("Failed to fetch anomalias:", error);
    }
  };

  const handleRowClick = (rol: Rol) => {
    if (!editando) {
      setRol(rol);
      setAccion("ver");
    }else{
      successToastCreado();
    }

  };

  const setDetallesTab = () =>{
    setActiveTab("Detalles");
  }

  function successToastCreado() {
    toast({
        title: "Cambios sin Guardar",
        description: "Guarda tus cambios antes de cambiar de pantalla",
        variant: "destructive",
    })
}

  if (loadingTable) {
    return <div><Loader /></div>;
  }

  return (

    <div>
      <div onClick={() => { setAccion("crear"); setDetallesTab(); }}>
        <IconButton>
          <div className='flex gap-2 items-center'> Agregar nuevo Rol<PlusCircledIcon className='w-[20px] h-[20px]' /></div>
        </IconButton>
      </div>
      <DataTable columns={columns} data={roles} sorter='name' onRowClick={handleRowClick} />
    </div>
  );
}