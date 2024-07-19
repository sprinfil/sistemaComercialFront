import { useEffect, useState } from 'react';
import { DataTableTarifaServicioNew } from '../../ui/DataTable Tarifas/DataTableTarifaServiciosNew.tsx';
import { TarifaConceptoDetalle, columns } from '../Columns/TarifaConceptoDetalleColumns.tsx';
import axiosClient from '../../../axios-client.ts';
import { ContextProvider, useStateContext } from "../../../contexts/ContextTarifa.tsx";
import Loader from '../../ui/Loader.tsx';
import IconButton from '../../ui/IconButton.tsx';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { AgregarTarifaServicio } from './AgregarTarifaServicio.tsx';
import { AgregarTarifaConceptoNew } from './AgregarTarifaConceptoNew.tsx';
import { DataTableTarifaConceptosNew } from '../../ui/DataTable Tarifas/DataTableTarifaConceptosNew.tsx';


export default function TarifaConceptosNewTable({ tipoToma, tarifa }) {

    const [conceptos, setConceptos] = useState([]);
    const [newData, setNewData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => { getDetalleConceptos(); }, [])

    const getDetalleConceptos = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get(`/tarifaConceptoDetalle/${tarifa.id}`);
            //setLoadingTable(false)
            let temp = [];
            let ctr = 0;
            response.data.forEach(concepto => {
                if (concepto.id_tipo_toma == tipoToma) {
                    temp[ctr] = concepto;
                    ctr = ctr + 1;
                }
            });
            setNewData(temp);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("Failed to fetch concepto:", error);
        }
    }


    const handleRowClick = (anomalia: TarifaConceptoDetalle) => {
        //setAnomalia(anomalia);
        //setAccion("ver");
    };

    /**
        const handleAddConcepto = (newConcepto) => {
        setNewData(prevData => [...prevData, newConcepto]);
    };
     */


    return (
        <div className='w-full'>
            {
                loading &&
                <>
                    <Loader />
                </>
            }
            {
                !loading &&
                <>
                    <div className='hidden'>
                        <div className='flex gap-2 items-center w-full'>
                            <AgregarTarifaConceptoNew trigger={
                                <IconButton>
                                    <div className='flex gap-5 items-center '>
                                        <div className=''>Agregar Concepto</div>
                                        <PlusCircledIcon className='w-[20px] h-[20px]' />
                                    </div>
                                </IconButton>
                            }
                                id_tipo_toma={tipoToma} tarifa={tarifa}
                                updateData={getDetalleConceptos}
                            />
                        </div>
                    </div>

                </>
            }
            <DataTableTarifaConceptosNew columns={columns} data={newData} sorter='nombre' onRowClick={handleRowClick} updateData={getDetalleConceptos}/>
        </div>
    );
}