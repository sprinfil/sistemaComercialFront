import React from 'react'
import { ContextProvider } from "../../../contexts/ContextTarifa.tsx";
import TarifaConceptosTable from '../../../components/Tables/Components/TarifaConceptosTable.tsx'

export const TarifaConceptos = () => {
  return (
    <ContextProvider>
    <div className='w-full max-h-[75vh] '>
      {/*Contenedor principal*/}

        {/*Datatable*/}
        <div className=''>
          <TarifaConceptosTable />
        </div>

    </div>
  </ContextProvider>
  )
}
