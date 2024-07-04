import React from 'react'
import { ContextProvider } from "../../../contexts/ContextAjuste.tsx";
import AjusteTable from '../../../components/Tables/Components/AjusteTable.tsx';
import AjusteForm from '../../../components/Forms/AjusteForm.tsx';

const Ajustes = () => {
  return (
    <ContextProvider>
      <div className='w-full max-h-[75vh] '>
        {/*Contenedor principal*/}
        <div className='flex gap-2 '>

          {/*Datatable*/}
          <div className='w-[35%] rounded-md border border-border p-4 overflow-auto h-[75vh]'>
            <AjusteTable />
          </div>

          {/*Formulario*/}
          <div className='w-[65%] rounded-md border border-border h-[75vh] p-4 overflow-auto'>
            <AjusteForm />
          </div>

        </div>
      </div>
    </ContextProvider>

  );
}

export default Ajustes