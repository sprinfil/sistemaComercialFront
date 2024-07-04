import BonificacionForm from '../../../components/Forms/BonificacionForm.tsx';
import BonificacionTable from '../../../components/Tables/Components/BonificacionTable.tsx';
import { ContextProvider } from '../../../contexts/ContextBonificaciones.tsx';
import { useStateContext } from "../../../contexts/ContextBonificaciones.tsx";

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
            <BonificacionFormEdit />
        </div>

        </div>
    </div>
    </ContextProvider>

  );
}


const BonificacionFormEdit = () => {

    const { accion } = useStateContext();
  
    return (
      <>
          {/*AQUI SE MANDA A LLAMAR EL FORMULARIO PERO CON LA VALIDACION SI ES EDITAR SE CAMBIE DE COLOR*/}
        {accion == "editar" ? (<div className='w-[65%] rounded-md border border-primary h-[75vh] p-4 overflow-auto'>
              <BonificacionForm />
            </div>) : (<div className='w-[65%] rounded-md border border-border h-[75vh] p-4 overflow-auto'>
              <BonificacionForm />
            </div>)}
      </>
    );
  };