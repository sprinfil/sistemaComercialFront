import { useEffect, useState } from 'react';
import { DataTable } from '../../../components/ui/DataTable';
import { columns} from "../../../components/Tables/Columns/RolColumns.tsx";
import axiosClient from '../../../axios-client.ts';
import { useStateContext } from '../../../contexts/ContextRol.tsx';
import Loader from '../../ui/Loader.tsx';
import IconButton from '../../ui/IconButton.tsx';
import { PlusCircledIcon } from '@radix-ui/react-icons';

export default function RolTable() {

    const { roles, setRoles, loadingTable, setLoadingTable, setAccion } = useStateContext();

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
   


    if (loadingTable) {
        return <div><Loader /></div>;
    }

    return (

        <div>
            <div onClick={() => { setAccion("crear") }}>
                <IconButton>
                    <div className='flex gap-2 items-center'> Agregar nuevo Rol<PlusCircledIcon className='w-[20px] h-[20px]' /></div>
                </IconButton>
            </div>
            <DataTable columns={columns} data={roles} sorter='name' />
        </div>
    );
}