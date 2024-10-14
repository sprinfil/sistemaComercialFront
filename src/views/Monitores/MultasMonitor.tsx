import React from 'react'
import { OcultarTableMonitor } from '../../components/Tables/Components/OcultarTableMonitor';
import FiltrosMultasMonitor from '../OrdenesDeTrabajo/FiltrosMultasMonitor';

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
      

      
  return (
    <div>
        
        <MostrarFiltros/>
    </div>
  )
}
