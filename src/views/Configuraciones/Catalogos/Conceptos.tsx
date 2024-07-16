import React from 'react'
import { ContextProvider } from "../../../contexts/ContextConcepto.tsx";
import ConceptoTable from '../../../components/Tables/Components/ConceptoTable'
import ConceptoForm from '../../../components/Forms/ConceptoForm'
import { useStateContext } from "../../../contexts/ContextConcepto.tsx";
import { OcultarTable } from '../../../components/Tables/Components/OcultarTable.tsx';
const Conceptos = () => {
  
  const { accion } = useStateContext();

  return (
    <ContextProvider>
      <div className='w-full max-h-[75vh] '>
        {/*Contenedor principal*/}
        <div className='flex gap-2 '>

          {/*Datatable*/}
        < MostrarTable />
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
        {/*AQUI SE MANDA A LLAMAR EL FORMULARIO PERO CON LA VALIDACION SI ES EDITAR SE CAMBIE DE COLOR GG*/}
      {accion == "editar" ? (<div className='w-full rounded-md border border-primary h-[75vh] p-4 overflow-auto '>
            <ConceptoForm />
          </div>) : (<div className='w-full rounded-md border border-border h-[75vh] p-4 overflow-auto'>
            <ConceptoForm />
          </div>)}
    </>
  );
};
export default Conceptos

//COMP PARA OCULTAR LA TABLA
const MostrarTable = () => {


  const { accion} = useStateContext();
  
 
  return(
    <>
        {/*Datatable*/}

      <OcultarTable accion={accion}>
      <ConceptoTable />
      </OcultarTable>
      
    </>
  )


};
