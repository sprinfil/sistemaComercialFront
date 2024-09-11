import React, { useEffect, useState } from 'react'
import { OcultarTablePagosMonitor } from '../../../components/Tables/Components/OcultarTablePagosMonitor';
import FiltrosPagosMonitor from '../Pagos/FiltrosPagosMonitor';
import Loader from '../../../components/ui/Loader';
import { PagosMonitorDataTable } from '../../../components/ui/PagosMonitorDataTable';
import pagoService from '../../../lib/PagoService';
import { columns } from '../../../components/Tables/Columns/CFDIMonitorColumns';
import { CFDIMonitorTable } from '../../../components/ui/CFDIMonitorTable';
export const MonitorCFDI = () => {

  const [pagos, set_pagos] = useState([]);
  const [loading_pagos, set_loading_pagos] = useState(false);

  useEffect(() => {
    fetch_pagos();
  }, [])

  const fetch_pagos = async () => {
    set_loading_pagos(true);
    let pagos_temp = await pagoService.get_pagos_cfdi();
    set_loading_pagos(false);
    set_pagos(pagos_temp);
    console.log(pagos_temp);
  }

  return (
    <div className='flex gap-2 px-2'>
      <OcultarTablePagosMonitor accion={""}>
        <FiltrosPagosMonitor />
      </OcultarTablePagosMonitor>
      <div className='w-full border rounded-md max-h-[75vh] overflow-auto'>
        {
          loading_pagos ? <Loader />
            :
            <>
              <CFDIMonitorTable columns={columns} data={pagos} />
            </>
        }
      </div>
    </div>
  )
}
