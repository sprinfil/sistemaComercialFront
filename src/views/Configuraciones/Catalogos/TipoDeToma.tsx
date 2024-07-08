import React from 'react'
import { ContextProvider } from "../../../contexts/ContextTipoDeToma.tsx";
import TipoDeTomaTable from '../../../components/Tables/Components/TipoDeTomaTable.tsx'
import TipoDeTomaForm from '../../../components/Forms/TipoDeTomaForm.tsx'
import { useStateContext } from "../../../contexts/ContextTipoDeToma.tsx";

const TipoDeToma = () => {
  
  const { accion } = useStateContext();

  return (
    <ContextProvider>
      <div className='w-full max-h-[75vh] '>
        {/*Contenedor principal*/}
        <div className='flex gap-2 '>

          {/*Datatable*/}
          <div className='w-[35%] rounded-md border border-border p-4 overflow-auto h-[75vh]'>
            <TipoDeTomaTable />
          </div>

          {/*Formulario edit, */}
          <TipoDeTomaFormEdit/>
        </div>
      </div>
    </ContextProvider>
  )
}

const TipoDeTomaFormEdit = () => {

  const { accion } = useStateContext();

  return (
    <>
        {/*AQUI SE MANDA A LLAMAR EL FORMULARIO PERO CON LA VALIDACION SI ES EDITAR SE CAMBIE DE COLOR GG*/}
      {accion == "editar" ? (<div className='w-[65%] rounded-md border border-primary h-[75vh] p-4 overflow-auto'>
            <TipoDeTomaForm />
          </div>) : (<div className='w-[65%] rounded-md border border-border h-[75vh] p-4 overflow-auto'>
            <TipoDeTomaForm />
          </div>)}
    </>
  );
};

export default TipoDeToma
