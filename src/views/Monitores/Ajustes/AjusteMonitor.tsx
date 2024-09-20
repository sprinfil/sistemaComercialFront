import React, { useEffect, useState } from 'react';
import { OcultarTableFactibilidadMonitor } from '../../components/Tables/Components/OcultarTableFactibilidadMonitor';
import FiltrosFactibilidadesMonitor from './Factibilidades/FiltrosFactibilidadesMonitor';
import { AjusteMonitorDataTable } from '../../../components/ui/AjusteMonitorDataTable';
import { AjusteMonitorColumns } from '../../../components/Tables/Columns/AjusteMonitorColumns';
import ajusteService from '../../../lib/AjusteService';
import { Skeleton } from '../../components/ui/skeleton';
import Loader from '../../../components/ui/Loader';
import ModalVerAjusteMonitor from '../../../components/ui/ModalVerAjusteMonitor';
import ZustandMonitorAjuste from '../../../contexts/ZustandMonitorAjuste';


export const AjustesMonitor = () => {
  const [factibilidad, setFactibilidad] = useState([]);
  const [loadingAjuste, setLoadingAjuste] = useState(false);
  const { set_ajustes, ajustes } = ZustandMonitorAjuste();
  const [ajustes_temp, set_ajustes_temp] = useState([]);

  useEffect(() => {
    fetchFact();
  }, []);

  const fetchFact = async () => {
    setLoadingAjuste(true);
    let ajusteTemp = await ajusteService.get_all();
    setLoadingAjuste(false);
    set_ajustes(ajusteTemp);
  };

  useEffect(() => {
    set_ajustes_temp(ajustes)
  }, [ajustes])

  return (
    <div className='flex gap-2 px-2'>
      {/* <OcultarTableFactibilidadMonitor accion={""}>
      <FiltrosFactibilidadesMonitor />
    </OcultarTableFactibilidadMonitor> */}
      <div className='w-full border rounded-md max-h-[75vh] overflow-auto'>
        {
          loadingAjuste ?
            <>
              <div className='h-[60vh] w-full'>
                <Loader/>
              </div>

            </>
            :
            <AjusteMonitorDataTable columns={AjusteMonitorColumns} data={ajustes_temp} />
        }
      </div>
    </div>
  );
};
