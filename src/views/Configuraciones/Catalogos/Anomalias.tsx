import AnomaliaForm from '../../../components/Forms/AnomaliaForm.tsx';
import AnomaliaTable from '../../../components/Tables/Components/AnomaliaTable.tsx';
import { ContextProvider } from '../../../contexts/ContextAnomalias.tsx';
import { useStateContext } from '../../../contexts/ContextAnomalias.tsx';

export default function Anomalias() {

  //ESTA ES LA VISTA PRINCIPAL DEL CATALOGO QUE CONTIENE LOS COMPONENTES DE LA TABLA Y 
  //FORMULARIO DE ANOMALIAS


  return (
    <ContextProvider>
      <div className='w-full max-h-[75vh] '>
        {/*Contenedor principal*/}
        <div className='flex gap-2 '>

          {/*Datatable*/}
          <div className='w-[35%] rounded-md border border-border p-4 overflow-auto h-[75vh]'>
            <AnomaliaTable />
          </div>

          {/*Formulario*/}
          <div className='w-[65%] rounded-md border border-border h-[75vh] p-4 overflow-auto'>
            <AnomaliaForm />
          </div>

        </div>
      </div>
    </ContextProvider>

  );
}