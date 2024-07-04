import React from 'react'
import { ContextProvider } from "../../../contexts/ContextConcepto.tsx";
import ConceptoTable from '../../../components/Tables/Components/ConceptoTable'
import ConceptoForm from '../../../components/Forms/ConceptoForm'
import { useStateContext } from "../../../contexts/ContextConcepto.tsx";

const Conceptos = () => {
  
  const { accion } = useStateContext();

  return (
    <ContextProvider>
      <div className='w-full max-h-[75vh] '>
        {/*Contenedor principal*/}
        <div className='flex gap-2 '>

          {/*Datatable*/}
          <div className='w-[35%] rounded-md border border-border p-4 overflow-auto h-[75vh]'>
            <ConceptoTable />
          </div>

          {/*Formulario edit, */}
          <ConceptoFormEdit/>
        </div>
      </div>
    </ContextProvider>
  )
}

const ConceptoFormEdit = () => {

  const { accion } = useStateContext();

  return (
    <>
        {/*AQUI SE MANDA A LLAMAR EL FORMULARIO PERO CON LA VALIDACION SI ES EDITAR SE CAMBIE DE COLOR*/}
      {accion == "editar" ? (<div className='w-[65%] rounded-md border border-primary h-[75vh] p-4 overflow-auto'>
            <ConceptoForm />
          </div>) : (<div className='w-[65%] rounded-md border border-border h-[75vh] p-4 overflow-auto'>
            <ConceptoForm />
          </div>)}
    </>
  );
};

export default Conceptos
