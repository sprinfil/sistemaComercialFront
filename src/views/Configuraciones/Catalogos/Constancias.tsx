import ConstanciaForm from '../../../components/Forms/ConstanciaForm.tsx';
import ConstanciaTable from '../../../components/Tables/Components/ConstanciaTable.tsx';
import { ContextProvider } from '../../../contexts/ContextConstancias.tsx';
import { useStateContext } from '../../../contexts/ContextConstancias.tsx';

export default function Constancias() {

  //ESTA ES LA VISTA PRINCIPAL DEL CATALOGO QUE CONTIENE LOS COMPONENTES DE LA TABLA Y
  //FORMULARIO DE ANOMALIAS


  return (
    <ContextProvider>
      <div className='w-full max-h-[75vh] '>
        {/*Contenedor principal*/}
        <div className='flex gap-2 '>

          {/*Datatable*/}
          <div className='w-[35%] rounded-md border border-border p-4 overflow-auto h-[75vh]'>
            <ConstanciaTable />
          </div>

          {/*Formulario*/}
            <ConstanciasFormEdit />

        </div>
      </div>
    </ContextProvider>

  );
}



const ConstanciasFormEdit = () => {

  const { accion } = useStateContext();

  return (
    <>
        {/*AQUI SE MANDA A LLAMAR EL FORMULARIO PERO CON LA VALIDACION SI ES EDITAR SE CAMBIE DE COLOR a*/}
      {accion == "editar" ? (<div className='w-[65%] rounded-md border border-primary h-[75vh] p-4 overflow-auto'>
            <ConstanciaForm />
          </div>) : (<div className='w-[65%] rounded-md border border-border h-[75vh] p-4 overflow-auto'>
            <ConstanciaForm />
          </div>)}
    </>
  );
};