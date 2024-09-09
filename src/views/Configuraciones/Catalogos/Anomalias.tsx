import AnomaliaForm from '../../../components/Forms/AnomaliaForm.tsx';
import AnomaliaTable from '../../../components/Tables/Components/AnomaliaTable.tsx';
import { ContextProvider } from '../../../contexts/ContextAnomalias.tsx';
import { useStateContext } from '../../../contexts/ContextAnomalias.tsx';
import IconButton from '../../../components/ui/IconButton.tsx';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { Icon } from 'lucide-react';
import { OcultarTable } from '../../../components/Tables/Components/OcultarTable.tsx'

export default function Anomalias() {

  //ESTA ES LA VISTA PRINCIPAL DEL CATALOGO QUE CONTIENE LOS COMPONENTES DE LA TABLA Y 
  //FORMULARIO DE ANOMALIAS

  return (
    <ContextProvider>

      <div className='w-full max-h-[77vh]'>
        {/*Contenedor principal*/}
        <div className='flex gap-2 '>
          {/*Datatable*/}

          <MostrarTable />


          {/*Formulario*/}
          <AnomaliasFormEdit />

        </div>
      </div>
    </ContextProvider>

  );
}

const AnomaliasFormEdit = () => {

  const { accion } = useStateContext();

  return (
    <>
      {/*AQUI SE MANDA A LLAMAR EL FORMULARIO PERO CON LA VALIDACION SI ES EDITAR SE CAMBIE DE COLOR GG*/}
      {accion == "editar" ? (<div className='w-full rounded-md border border-primary h-[77vh] p-4 overflow-auto'>
        <AnomaliaForm />
      </div>) : (<div className='w-full rounded-md border border-border h-[77vh] p-4 overflow-auto '>
        <AnomaliaForm />
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
        <AnomaliaTable />
      </OcultarTable>

    </>
  )


};