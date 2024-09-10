import React, { useEffect, useState } from 'react'
import { OcultarTableFactibilidadMonitor } from '../../components/Tables/Components/OcultarTableFactibilidadMonitor';
import FiltrosFactibilidadesMonitor from './Factibilidades/FiltrosFactibilidadesMonitor';
import { FactibilidadMonitorDataTable } from '../../components/ui/FactibilidadMonitorDataTable';
import { FactiblidadMonitorColumns } from '../../components/Tables/Columns/FactibilidadMonitorColumns';
import factibilidadService from '../../lib/FactibilidadService';
import { Data } from '@react-google-maps/api';
import { Skeleton } from '../../components/ui/skeleton';
import Loader from '../../components/ui/Loader';


export const FactibilidadMonitor = () => {

  const [factibilidad, set_factibilidad] = useState([]);
  const [loading_fact, set_loading_fact] = useState(false);

  useEffect(() => {
    fetch_pagos();
  }, [])

  const fetch_pagos = async () => {
    set_loading_fact(true);
    let fact_temp = await factibilidadService.get_all();
    set_loading_fact(false);
    set_factibilidad(fact_temp);
  }

  return (
    <div className='flex gap-2 px-2'>
      <OcultarTableFactibilidadMonitor accion={""}>
        <FiltrosFactibilidadesMonitor />
      </OcultarTableFactibilidadMonitor>
      <div className='w-full border rounded-md max-h-[75vh] overflow-auto'>
        {
          loading_fact ? <Loader/>
            :
            <>
              <FactibilidadMonitorDataTable columns={FactiblidadMonitorColumns} data={factibilidad} />
            </>
        }
      </div>
    </div>
  )
}
