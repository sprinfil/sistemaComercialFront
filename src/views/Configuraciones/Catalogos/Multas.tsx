import AnomaliaForm from '../../../components/Forms/AnomaliaForm.tsx';
import AnomaliaTable from '../../../components/Tables/Components/AnomaliaTable.tsx';
import { ContextProvider } from '../../../contexts/ContextAnomalias.tsx';
import { useStateContext } from '../../../contexts/ContextAnomalias.tsx';
import IconButton from '../../../components/ui/IconButton.tsx';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { Icon } from 'lucide-react';
import { OcultarTable } from '../../../components/Tables/Components/OcultarTable.tsx'
import MultasForm from '../../../components/Forms/MultasForm.tsx';
import { DataTableMultas } from '../../../components/ui/DataTableMultas.tsx';
import { getMultas } from '../../../lib/MultasService.ts';
import { ZustandMultas } from '../../../contexts/ZustandMultas.tsx';
import { DataTableMultasCatalogo } from '../../../components/ui/DataTableMultasCatalogo.tsx';

export default function Multas() {

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
          <MultasFormEdit />

        </div>
      </div>
    </ContextProvider>

  );
}

const MultasFormEdit = () => {

  const { accion } = useStateContext();
  const {accionMulta} = ZustandMultas();
  return (
    <>
      {/*AQUI SE MANDA A LLAMAR EL FORMULARIO PERO CON LA VALIDACION SI ES EDITAR SE CAMBIE DE COLOR GG*/}
      {accionMulta == "editar" ? (<div className='w-full rounded-md border border-primary h-[77vh] p-4 overflow-auto'>
        < MultasForm />
      </div>) : (<div className='w-full rounded-md border border-border h-[77vh] p-4 overflow-auto '>
        <MultasForm />
      </div>)}
    </>
  );
};

const MostrarTable = () => {

  const {multasTabla, setMultasTabla, accionMulta} = ZustandMultas();
  const {setMultas} = getMultas(setMultasTabla);

  console.log(multasTabla);
  return (
    <>
      {/*Datatable*/}

      <OcultarTable accion={accionMulta}>
        <DataTableMultasCatalogo data={multasTabla}/>
      </OcultarTable>

    </>
  )


};