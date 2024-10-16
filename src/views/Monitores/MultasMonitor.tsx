import React from 'react'
import { OcultarTableMonitor } from '../../components/Tables/Components/OcultarTableMonitor';
import FiltrosMultasMonitor from '../OrdenesDeTrabajo/FiltrosMultasMonitor';

import { ZustandMultas } from '../../contexts/ZustandMultas';
import { getMultas } from '../../lib/MultasService';
import { OcultarTable } from '../../components/Tables/Components/OcultarTable';
import { DataTableMonitorMultas } from '../../components/ui/DataTableMonitorMultas';
import Loader from '../../components/ui/Loader';
export const MultasMonitor = () => {

    const MostrarFiltros = () => {

        //const { accion } = useStateContext();
        // const {accionGeneradaEntreTabs} = ZustandGeneralUsuario();
      
        return (
          <>
            {/*Datatable*/}
      
            <OcultarTableMonitor accion={""}>
              <FiltrosMultasMonitor />
            </OcultarTableMonitor>
      
          </>
        )
      
      
      };
      

  const {multasTabla, setMultasTabla, accionMulta} = ZustandMultas();
  const {setMultas,loadingMultas} = getMultas(setMultasTabla);

  console.log(multasTabla);


  return (
    <div>
      <div className='flex space-x-2'>
        <MostrarFiltros/>

        <div className='w-full'>
          {loadingMultas ? <Loader/>
          :
          <DataTableMonitorMultas data={multasTabla}/>
          }
            
        </div>
      </div>
        
    </div>
  )
}
