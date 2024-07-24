import React from 'react'
import { ContextProvider } from "../../../contexts/ContextAjuste.tsx";
import AjusteTable from '../../../components/Tables/Components/AjusteTable.tsx';
import AjusteForm from '../../../components/Forms/AjusteForm.tsx';
import { useStateContext } from "../../../contexts/ContextAjuste.tsx";
import { OcultarTable } from '../../../components/Tables/Components/OcultarTable.tsx';
const Ajustes = () => {
  return (
    <ContextProvider>
      <div className='w-full max-h-[75vh] '>
        {/*Contenedor principal*/}
        <div className='flex gap-2 '>

          {/*Datatable*/}
            <MostrarTable />

          {/*Formulario*/}
          <AjusteFormEdit />

        </div>
      </div>
    </ContextProvider>

  );
}

const AjusteFormEdit = () => {

  const { accion } = useStateContext();

  return (
    <>
        {/*AQUI SE MANDA A LLAMAR EL FORMULARIO PERO CON LA VALIDACION SI ES EDITAR SE CAMBIE DE COLOR GG*/}
      {accion == "editar" ? (<div className='w-full rounded-md border border-primary h-[81vh] p-4'>
            <AjusteForm />
          </div>) : (<div className='w-full rounded-md border border-border h-[81vh] p-4'>
            <AjusteForm />
          </div>)}
    </>
  );
};

export default Ajustes

const MostrarTable = () => {

  const { accion } = useStateContext();

  return(
    <>
        {/*Datatable*/}

      <OcultarTable accion={accion}>
      <AjusteTable />
      </OcultarTable>
      
    </>
  )


};