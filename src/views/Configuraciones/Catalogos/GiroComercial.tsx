import GiroComercialForm from '../../../components/Forms/GiroComercialForm.tsx';
import GiroComercialTable from '../../../components/Tables/Components/GiroComercialTable.tsx';
import { ContextProvider } from '../../../contexts/ContextGiroComercial.tsx';
import { useStateContext } from '../../../contexts/ContextGiroComercial.tsx';

export default function GiroComercial() {

  //ESTA ES LA VISTA PRINCIPAL DEL CATALOGO QUE CONTIENE LOS COMPONENTES DE LA TABLA Y
  //FORMULARIO DE ANOMALIAS


  return (
    <ContextProvider>
      <div className='w-full max-h-[75vh] '>
        {/*Contenedor principal*/}
        <div className='flex gap-2 '>

          {/*Datatable*/}
          <div className='w-[35%] rounded-md border border-border p-4 overflow-auto h-[75vh]'>
            <GiroComercialTable />
          </div>

          {/*Formulario*/}
            <GiroComercialFormEdit />

        </div>
      </div>
    </ContextProvider>

  );
}


const GiroComercialFormEdit = () => {

  const { accion } = useStateContext();

  return (
    <>
        {/*AQUI SE MANDA A LLAMAR EL FORMULARIO PERO CON LA VALIDACION SI ES EDITAR SE CAMBIE DE COLOR GG*/}
      {accion == "editar" ? (<div className='w-[65%] rounded-md border border-primary h-[75vh] p-4 overflow-auto'>
            <GiroComercialForm />
          </div>) : (<div className='w-[65%] rounded-md border border-border h-[75vh] p-4 overflow-auto'>
            <GiroComercialForm />
          </div>)}
    </>
  );
};