import React, { useEffect, useState } from 'react'
import { OcultarTablePagosMonitor } from '../../components/Tables/Components/OcultarTablePagosMonitor';
import FiltrosPagosMonitor from './Pagos/FiltrosPagosMonitor';
import { PagosMonitorDataTable } from '../../components/ui/PagosMonitorDataTable';
import { PagosMonitorColumns } from '../../components/Tables/Columns/PagosMonitorColumns';
import pagoService from '../../lib/PagoService';
import { Data } from '@react-google-maps/api';
import { Skeleton } from '../../components/ui/skeleton';
import Loader from '../../components/ui/Loader';
import ZustandMonitorPagos from '../../contexts/ZustandMonitorPagos';


export const PagosMonitor = () => {

  const {pagos, set_pagos} = ZustandMonitorPagos();

  const [pagos_real, set_pagos_real] = useState([]);

  const [loading_pagos, set_loading_pagos] = useState(false);

  useEffect(() => {
    fetch_pagos();
  }, [])

  const fetch_pagos = async () => {
    set_loading_pagos(true);
    let pagos_temp = await pagoService.get_all();
    set_loading_pagos(false);
    set_pagos(pagos_temp);
  }

  useEffect(()=>{
    set_pagos_real(pagos);
  }, [pagos])

  return (
    <div className='flex gap-2 px-2'>
      <OcultarTablePagosMonitor accion={""}>
        <FiltrosPagosMonitor />
      </OcultarTablePagosMonitor>
      <div className='w-full border rounded-md max-h-[75vh] overflow-auto'>
        {
          loading_pagos ? <Loader/>
            :
            <>
              <PagosMonitorDataTable columns={PagosMonitorColumns} data={pagos_real} />
            </>
        }
      </div>
    </div>
  )
}
