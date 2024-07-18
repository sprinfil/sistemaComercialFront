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

export default function TarifaConceptosNewTable({ tipoToma, tarifa }) {

    const [conceptos, setConceptos] = useState([]);
    const [newData, setNewData] = useState([]);

    if (tarifa.nombre != null) {
        console.log(tarifa)
        let temp = [];
        let ctr = 0;
        tarifa.conceptos.forEach(concepto => {
            if (concepto.id_tipo_toma == tipoToma) {
                newData[ctr] = concepto;
                ctr = ctr + 1;
            }
        });
        //console.log(newData);
    }

    const handleRowClick = (anomalia: TarifaConceptoDetalle) => {
        //setAnomalia(anomalia);
        //setAccion("ver");
    };

    return (
        <div className='w-full'>
            <div>
                <div className='flex gap-2 items-center w-full'>
                    <AgregarTarifaConceptoNew trigger={
                        <IconButton>
                            <div className='flex gap-5 items-center '>
                                <div className=''>Agregar Concepto</div>
                                <PlusCircledIcon className='w-[20px] h-[20px]' />
                            </div>
                        </IconButton>
                    } 
                    id_tipo_toma={ tipoToma} tarifa = {tarifa} 
                    />
                </div>
            </div>

            <DataTableTarifaServicioNew columns={columns} data={newData} sorter='nombre' onRowClick={handleRowClick} />
        </div>
    );
}