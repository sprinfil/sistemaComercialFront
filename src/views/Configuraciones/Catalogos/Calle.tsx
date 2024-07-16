import CalleForm from '../../../components/Forms/CalleForm.tsx';
import CalleTable from '../../../components/Tables/Components/CalleTable.tsx';
import { ContextProvider } from '../../../contexts/ContextCalle.tsx';
import { useStateContext } from '../../../contexts/ContextCalle.tsx';
import IconButton from '../../../components/ui/IconButton.tsx';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { Icon } from 'lucide-react';
import { OcultarTable } from '../../../components/Tables/Components/OcultarTable.tsx';

export default function Calle() {

  //ESTA ES LA VISTA PRINCIPAL DEL CATALOGO QUE CONTIENE LOS COMPONENTES DE LA TABLA Y 
  //FORMULARIO DE ANOMALIAS

  return (
    <ContextProvider>
      
      <div className='w-full max-h-[75vh] '>
        {/*Contenedor principal*/}
        <div className='flex gap-2 '>
          {/*Datatable*/}

        <MostrarTable/>
      
            
          {/*Formulario*/}
        <CallesFormEdit/>

        </div>
      </div>
    </ContextProvider>

  );
}

const CallesFormEdit = () => {

  const { accion } = useStateContext();

  return (
    <>
        {/*AQUI SE MANDA A LLAMAR EL FORMULARIO PERO CON LA VALIDACION SI ES EDITAR SE CAMBIE DE COLOR GG*/}
      {accion == "editar" ? (<div className='w-full rounded-md border border-primary h-[75vh] p-4 overflow-auto'>
            <CalleForm />
          </div>) : (<div className='w-full rounded-md border border-border h-[75vh] p-4 overflow-auto'>
            <CalleForm />
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
      <CalleTable />
      </OcultarTable>
      
    </>
  )


};