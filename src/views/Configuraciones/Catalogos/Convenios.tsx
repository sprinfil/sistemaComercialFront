import React from 'react'
import ConvenioTable from '../../../components/Tables/Components/ConvenioTable'
import ConvenioForm from '../../../components/Forms/ConvenioForm'
import { ContextProvider } from "../../../contexts/ContextConvenio.tsx";


const Convenios = () => {
  return (

    <ContextProvider>
    <div className='w-full max-h-[75vh] '>

      {/*Contenedor principal*/}
      <div className='flex gap-2 '>

        {/*Datatable*/}
        <div className='w-[35%] rounded-md border border-border p-4 overflow-auto h-[75vh]'>
          <ConvenioTable />
        </div>

        {/*Formulario*/}
        <div className='w-[65%] rounded-md border border-border h-[75vh] p-4 overflow-auto'>
          <ConvenioForm />
        </div>

      </div>
    </div>
  </ContextProvider>
  )
}

export default Convenios
