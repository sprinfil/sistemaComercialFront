import React from 'react'
import { ContextProvider } from "../../../contexts/ContextOrdenDeTrabajo.tsx";
import { useStateContext } from "../../../contexts/ContextOrdenDeTrabajo.tsx";
import { OcultarTable } from '../../../components/Tables/Components/OcultarTable.tsx';
import OrdenDeTrabajoTable from '../../../components/Tables/Components/OrdenDeTrabajoTable.tsx';
import OrdenDeTrabajoForm from '../../../components/Forms/OrdenDeTrabajoForm.tsx';
const OrdenDeTrabajo = () => {
  
  const { accion } = useStateContext();

  return (
    <ContextProvider>
        {/*Contenedor principal*/}
        <div className='flex gap-2 '>

          {/*Datatable*/}
            <MostrarTable />

          {/*Formulario edit, */}
          <div className='w-full h-full'>
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
      {accion == "editar" ? (<div className='w-full rounded-md border border-primary h-[77vh] p-4'>
            <OrdenDeTrabajoForm />
          </div>) : (<div className='w-full rounded-md border border-border h-[77vh] p-4'>
            <OrdenDeTrabajoForm />
          </div>)}
    </>
  );
};

export default OrdenDeTrabajo

const MostrarTable = () => {

  const { accion } = useStateContext();

  return(
    <>
        {/*Datatable*/}

      <OcultarTable accion={accion}>
      <OrdenDeTrabajoTable />
      </OcultarTable>
      
    </>
  )


};