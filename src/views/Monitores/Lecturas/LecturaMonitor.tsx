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
import { IoMdAdd } from "react-icons/io";
import IconButton from '../../../components/ui/IconButton';
import ModalAgregarLectura from '../../../components/ui/ModalAgregarLectura';


export const LecturasMonitor = () => {
  const [factibilidad, setFactibilidad] = useState([]);
  const [loadingLecturas, setLoadingLecturas] = useState(false);
  const { set_lecturas, lecturas } = ZustandMonitorLectura();
  const [lecturas_temp, set_lecturas_temp] = useState([]);
  const [openModal, setOpenModal] = useState(false);

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

  const handleAbrirModalLectura = () => 
  {
    setOpenModal(true);
  }

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
            <>
          <div className='w-full flex justify-end mb-4 mt-2'>
          <div className='flex justify-end mr-10 mt-2'>
            <IconButton onClick={handleAbrirModalLectura}>
              <IoMdAdd className='mr-1' />Agregar lectura
            </IconButton>
          </div>
        </div>
  

                        <LecturaMonitorDataTable columns={LecturaMonitorColumns} data={lecturas_temp} />

                        <ModalAgregarLectura
                        open={openModal}
                        setOpen={setOpenModal}/>

            </>
        }
      </div>
    </div>
  );
};
