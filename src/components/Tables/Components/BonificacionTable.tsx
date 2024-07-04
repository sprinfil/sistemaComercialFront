import { useEffect, useState } from 'react';
import { DataTable } from '../../../components/ui/DataTable';
import { columns, Bonificacion } from "../../../components/Tables/Columns/BonificacionesColumns.tsx";
import axiosClient from '../../../axios-client.ts';
import { useStateContext } from '../../../contexts/ContextBonificaciones.tsx';
import Loader from '../../ui/Loader.tsx';
import IconButton from '../../ui/IconButton.tsx';
import { PlusCircledIcon } from '@radix-ui/react-icons';

export default function BonificacionTable() {

const { bonificaciones, setBonificaciones, loadingTable, setLoadingTable, setAccion } = useStateContext();

useEffect(() => {
    getBonificaciones();
}, []);

const getBonificaciones = async () => {
    setLoadingTable(true);
    try {
    const response = await axiosClient.get("/AnomaliasCatalogo");
    setLoadingTable(false);
    setBonificaciones(response.data.data);
    console.log(response.data.data);
    } catch (error) {
    setLoadingTable(false);
    console.error("Failed to fetch bonificaciones:", error);
    }
};

if (loadingTable) {
    return <div><Loader /></div>;
}

return (

    <div>
    <div onClick={()=>{setAccion("crear")}}>
        <IconButton>
        <div className='flex gap-2 items-center'> Agregar nueva bonificación<PlusCircledIcon className='w-[20px] h-[20px]' /></div>
        </IconButton>
    </div>
    <DataTable columns={columns} data={bonificaciones} sorter='nombre' />
    </div>
);
}
