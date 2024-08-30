
import CorteCajaTable from '../../components/Tables/Components/CorteCajaTable.tsx';
import { ContextProvider } from '../../contexts/ContextCorteCaja.tsx';
import { useStateContext } from '../../contexts/ContextCorteCaja.tsx';
import IconButton from '../../../components/ui/IconButton.tsx';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { Icon } from 'lucide-react';
import { OcultarTable } from '../../components/Tables/Components/OcultarTable.tsx';

export default function CorteCaja() {

  //ESTA ES LA VISTA PRINCIPAL DEL CATALOGO QUE CONTIENE LOS COMPONENTES DE LA TABLA Y 
  //FORMULARIO DE ANOMALIAS

  return (
    <ContextProvider>

      <div className='w-full max-h-[85vh] '>
        {/*Contenedor principal*/}
        <div className='flex gap-2 '>
          {/*Datatable*/}

          <MostrarTable />


          {/*Formulario*/}
          <CorteCajaFormEdit />

        </div>
      </div>
    </ContextProvider>

  );
}

const CorteCajaFormEdit = () => {

  const { accion } = useStateContext();

  return (
    <>
      {/*AQUI SE MANDA A LLAMAR EL FORMULARIO PERO CON LA VALIDACION SI ES EDITAR SE CAMBIE DE COLOR GG*/}
      {accion == "editar" ? (<div className='w-full rounded-md border border-primary h-[85vh] p-4 overflow-auto'>
        
      </div>) : (<div className='w-full rounded-md border border-border h-[85vh] p-4 overflow-auto '>
        
      </div>)}
    </>
  );
};

const MostrarTable = () => {

  const { accion } = useStateContext();

  return (
    <>
      {/*Datatable*/}

      <OcultarTable accion={accion}>
        <CorteCajaTable />
      </OcultarTable>

    </>
  )


};