import React from 'react'
import { ContextProvider } from "../../../contexts/ContextTipoDeToma.tsx";
import TipoDeTomaTable from '../../../components/Tables/Components/TipoDeTomaTable.tsx'
import TipoDeTomaForm from '../../../components/Forms/TipoDeTomaForm.tsx'
import { useStateContext } from "../../../contexts/ContextTipoDeToma.tsx";
import { OcultarTable } from '../../../components/Tables/Components/OcultarTable.tsx';
const TipoDeToma = () => {
  
  const { accion } = useStateContext();

  return (
    <ContextProvider>
      <div className='w-full max-h-[75vh] '>
        {/*Contenedor principal*/}
        <div className='flex gap-2 '>

          {/*Datatable*/}
            <MostrarTable />

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
      {accion == "editar" ? (<div className='w-full rounded-md border border-primary h-[81vh] p-4'>
            <TipoDeTomaForm />
          </div>) : (<div className='w-full rounded-md border border-border h-[81vh] p-4'>
            <TipoDeTomaForm />
          </div>)}
    </>
  );
};

export default TipoDeToma

const MostrarTable = () => {

  const { accion } = useStateContext();

  return(
    <>
        {/*Datatable*/}

      <OcultarTable accion={accion}>
      <TipoDeTomaTable />
      </OcultarTable>
      
    </>
  )


};