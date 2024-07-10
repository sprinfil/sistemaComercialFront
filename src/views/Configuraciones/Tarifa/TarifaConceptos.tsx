import React from 'react'
import { ContextProvider } from "../../../contexts/ContextTarifa.tsx";
import TarifaConceptosTable from '../../../components/Tables/Components/TarifaConceptosTable.tsx'

export const TarifaConceptos = () => {
  return (
    <ContextProvider>
    <div className='w-full max-h-[75vh] '>
      {/*Contenedor principal*/}

        {/*Datatable*/}
        <div className='w-[100%] rounded-md border border-border p-4 overflow-auto h-[75vh]'>
          <TarifaConceptosTable />
        </div>

    </div>
  </ContextProvider>
  )
}
