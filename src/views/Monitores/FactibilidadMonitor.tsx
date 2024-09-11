import React, { useEffect, useState } from 'react';
import { OcultarTableFactibilidadMonitor } from '../../components/Tables/Components/OcultarTableFactibilidadMonitor';
import FiltrosFactibilidadesMonitor from './Factibilidades/FiltrosFactibilidadesMonitor';
import { FactibilidadMonitorDataTable } from '../../components/ui/FactibilidadMonitorDataTable';
import { FactiblidadMonitorColumns } from '../../components/Tables/Columns/FactibilidadMonitorColumns';
import factibilidadService from '../../lib/FactibilidadService';
import { Skeleton } from '../../components/ui/skeleton';
import Loader from '../../components/ui/Loader';
import ModalVerFactibilidadMonitor from '../../components/ui/ModalVerFactibilidadMonitor'; // Importa el modal

export const FactibilidadMonitor = () => {
  const [factibilidad, setFactibilidad] = useState([]);
  const [loadingFact, setLoadingFact] = useState(false);
  

  useEffect(() => {
    fetchFact();
  }, []);

  const fetchFact = async () => {
    setLoadingFact(true);
    let factTemp = await factibilidadService.get_all();
    setLoadingFact(false);
    setFactibilidad(factTemp);
  };

 

  return (
    <div className='flex gap-2 px-2'>
    {/* <OcultarTableFactibilidadMonitor accion={""}>
      <FiltrosFactibilidadesMonitor />
    </OcultarTableFactibilidadMonitor> */}
    <div className='w-full border rounded-md max-h-[75vh] overflow-auto'>
      {
        loadingFact ? <Loader/>
          :
          <>
            <FactibilidadMonitorDataTable columns={FactiblidadMonitorColumns} data={factibilidad} />
          </>
      }
    </div>
  </div>
  );
};
