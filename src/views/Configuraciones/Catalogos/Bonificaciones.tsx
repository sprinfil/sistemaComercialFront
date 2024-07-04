import BonificacionForm from '../../../components/Forms/BonificacionForm.tsx';
import BonificacionTable from '../../../components/Tables/Components/BonificacionTable.tsx';
import { ContextProvider } from '../../../contexts/ContextBonificaciones.tsx';

export default function Bonificaciones() {

  //ESTA ES LA VISTA PRINCIPAL DEL CATALOGO QUE CONTIENE LOS COMPONENTES DE LA TABLA Y
  //FORMULARIO DE ANOMALIAS


return (
    <ContextProvider>
    <div className='w-full max-h-[75vh] '>
        {/*Contenedor principal*/}
    <div className='flex gap-2 '>

        {/*Datatable*/}
        <div className='w-[35%] rounded-md border border-border p-4 overflow-auto h-[75vh]'>
            <BonificacionTable />
        </div>

        {/*Formulario*/}
        <div className='w-[65%] rounded-md border border-border h-[75vh] p-4 overflow-auto'>
            <BonificacionForm />
        </div>

        </div>
    </div>
    </ContextProvider>

  );
}
