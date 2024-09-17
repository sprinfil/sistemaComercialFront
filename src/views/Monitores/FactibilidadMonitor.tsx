import React, { useEffect, useState } from 'react';
import { OcultarTableFactibilidadMonitor } from '../../components/Tables/Components/OcultarTableFactibilidadMonitor';
import FiltrosFactibilidadesMonitor from './Factibilidades/FiltrosFactibilidadesMonitor';
import { FactibilidadMonitorDataTable } from '../../components/ui/FactibilidadMonitorDataTable';
import { FactiblidadMonitorColumns } from '../../components/Tables/Columns/FactibilidadMonitorColumns';
import factibilidadService from '../../lib/FactibilidadService';
import { Skeleton } from '../../components/ui/skeleton';
import Loader from '../../components/ui/Loader';
import ModalVerFactibilidadMonitor from '../../components/ui/ModalVerFactibilidadMonitor';
import ZustandMonitorFactibilidad from '../../contexts/ZustandMonitorFactibilidad';


export const FactibilidadMonitor = () => {
  const [factibilidad, setFactibilidad] = useState([]);
  const [loadingFact, setLoadingFact] = useState(false);
  const { set_factibilidades, factibilidades } = ZustandMonitorFactibilidad();
  const [factibilidades_temp, set_factibilidades_temp] = useState([]);

  useEffect(() => {
    fetchFact();
  }, []);

  const fetchFact = async () => {
    setLoadingFact(true);
    let factTemp = await factibilidadService.get_all();
    setLoadingFact(false);
    set_factibilidades(factTemp);
  };

  useEffect(() => {
    set_factibilidades_temp(factibilidades)
  }, [factibilidades])

  return (
    <div className='flex gap-2 px-2'>
      {/* <OcultarTableFactibilidadMonitor accion={""}>
      <FiltrosFactibilidadesMonitor />
    </OcultarTableFactibilidadMonitor> */}
      <div className='w-full border rounded-md max-h-[75vh] overflow-auto'>
        {
          loadingFact ?
            <>
              <div className='h-[60vh] w-full'>
                <Loader/>
              </div>

            </>
            :
            <FactibilidadMonitorDataTable columns={FactiblidadMonitorColumns} data={factibilidades_temp} />
        }
      </div>
    </div>
  );
};
