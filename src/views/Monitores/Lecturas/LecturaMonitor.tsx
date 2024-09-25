import React, { useEffect, useState } from 'react';
import { OcultarTableFactibilidadMonitor } from '../../components/Tables/Components/OcultarTableFactibilidadMonitor';
import FiltrosFactibilidadesMonitor from './Factibilidades/FiltrosFactibilidadesMonitor';
import { LecturaMonitorDataTable } from '../../../components/ui/LecturaMonitorDataTable';
import { LecturaMonitorColumns } from '../../../components/Tables/Columns/LecturaMonitorColumns';
import lecturasService from '../../../lib/LecturaService';
import { Skeleton } from '../../components/ui/skeleton';
import Loader from '../../../components/ui/Loader';
import ModalVerAjusteMonitor from '../../../components/ui/ModalVerAjusteMonitor';
import ZustandMonitorLectura from '../../../contexts/ZustandMonitorLectura';


export const LecturasMonitor = () => {
  const [factibilidad, setFactibilidad] = useState([]);
  const [loadingLecturas, setLoadingLecturas] = useState(false);
  const { set_lecturas, lecturas } = ZustandMonitorLectura();
  const [lecturas_temp, set_lecturas_temp] = useState([]);

  useEffect(() => {
    fetchFact();
  }, []);

  const fetchFact = async () => {
    setLoadingLecturas(true);
    let lecturasTemp = await lecturasService.get_all();
    setLoadingLecturas(false);
    set_lecturas(lecturasTemp);
  };

  useEffect(() => {
    set_lecturas_temp(lecturas)
  }, [lecturas])

  return (
    <div className='flex gap-2 px-2'>
      {/* <OcultarTableFactibilidadMonitor accion={""}>
      <FiltrosFactibilidadesMonitor />
    </OcultarTableFactibilidadMonitor> */}
      <div className='w-full border rounded-md max-h-[75vh] overflow-auto'>
        {
          loadingLecturas ?
            <>
              <div className='h-[60vh] w-full'>
                <Loader/>
              </div>

            </>
            :
            <LecturaMonitorDataTable columns={LecturaMonitorColumns} data={lecturas_temp} />
        }
      </div>
    </div>
  );
};
