import React from 'react'
import { ContextProvider } from "../../../contexts/ContextConcepto.tsx";
import ConceptoTable from '../../../components/Tables/Components/ConceptoTable'
import ConceptoForm from '../../../components/Forms/ConceptoForm'

const Conceptos = () => {
  return (
    <ContextProvider>
      <div className='w-full max-h-[75vh] '>
        {/*Contenedor principal*/}
        <div className='flex gap-2 '>

          {/*Datatable*/}
          <div className='w-[35%] rounded-md border border-border p-4 overflow-auto h-[75vh]'>
            <ConceptoTable />
          </div>

          {/*Formulario*/}
          <div className='w-[65%] rounded-md border border-border h-[75vh] p-4 overflow-auto'>
            <ConceptoForm />
          </div>

        </div>
      </div>
    </ContextProvider>
  )
}

export default Conceptos
