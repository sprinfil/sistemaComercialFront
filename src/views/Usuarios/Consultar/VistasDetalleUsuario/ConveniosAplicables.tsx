import React from 'react'
import ConceptoAplicableTable from '../../../../components/Tables/Components/ConvenioAplicableTable.tsx';
import { ContextProvider } from "../../../../contexts/ContextConvenioAplicable.tsx"
import { useStateContext } from "../../../../contexts/ContextConvenioAplicable.tsx";
import { OcultarTable } from '../../../../components/Tables/Components/OcultarTable.tsx';

const ConveniosAplicables = () => {
  return (

    <ContextProvider>
    <div className='w-full max-h-[75vh] '>

      {/*Contenedor principal*/}
      <div className='flex gap-2 '>

        {/*Datatable*/}
          <MostrarTable />

        {/*Formulario*/}
          <ConveniosFormEdit />

      </div>
    </div>
  </ContextProvider>
  )
}

export default ConveniosAplicables


const ConveniosFormEdit = () => {

  const { accion } = useStateContext();

  return (
    <>
        {/*AQUI SE MANDA A LLAMAR EL FORMULARIO PERO CON LA VALIDACION SI ES EDITAR SE CAMBIE DE COLOR GG*/}
      {accion == "editar" ? (<div className='w-full rounded-md border border-primary h-[77vh] p-4'>
            
          </div>) : (<div className='w-full rounded-md border border-border h-[77vh] p-4 overflow-auto'>
            
          </div>)}
    </>
  );
};

const MostrarTable = () => {

  const { accion } = useStateContext();

  return(
    <>
        {/*Datatable*/}

      <OcultarTable accion={accion}>
      <ConceptoAplicableTable />
      </OcultarTable>
      
    </>
  )


};