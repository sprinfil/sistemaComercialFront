import DescuentoForm from '../../../components/Forms/DescuentoForm.tsx';
import DescuentoTable from '../../../components/Tables/Components/DescuentoTable.tsx';
import { ContextProvider } from '../../../contexts/ContextDescuentos.tsx';
import { useStateContext } from '../../../contexts/ContextDescuentos.tsx';

export default function Descuentos() {

  //ESTA ES LA VISTA PRINCIPAL DEL CATALOGO QUE CONTIENE LOS COMPONENTES DE LA TABLA Y
  //FORMULARIO DE ANOMALIAS


  return (
    <ContextProvider>
      <div className='w-full max-h-[75vh] '>
        {/*Contenedor principal*/}
        <div className='flex gap-2 '>

          {/*Datatable*/}
          <div className='w-[35%] rounded-md border border-border p-4 overflow-auto h-[75vh]'>
            <DescuentoTable />
          </div>

          {/*Formulario*/}
          <div className='w-[65%] rounded-md border border-border h-[75vh] p-4 overflow-auto'>
            <DescuentoForm />
          </div>

        </div>
      </div>
    </ContextProvider>

  );
}
