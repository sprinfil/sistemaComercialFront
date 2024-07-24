import ConstanciaForm from '../../../components/Forms/ConstanciaForm.tsx';
import ConstanciaTable from '../../../components/Tables/Components/ConstanciaTable.tsx';
import { ContextProvider } from '../../../contexts/ContextConstancias.tsx';
import { useStateContext } from '../../../contexts/ContextConstancias.tsx';
import { OcultarTable } from '../../../components/Tables/Components/OcultarTable.tsx';
export default function Constancias() {

  //ESTA ES LA VISTA PRINCIPAL DEL CATALOGO QUE CONTIENE LOS COMPONENTES DE LA TABLA Y
  //FORMULARIO DE ANOMALIAS


  return (
    <ContextProvider>
      <div className='w-full max-h-[75vh] '>
        {/*Contenedor principal*/}
        <div className='flex gap-2 '>

          {/*Datatable*/}
            <MostrarTable />

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
        {/*AQUI SE MANDA A LLAMAR EL FORMULARIO PERO CON LA VALIDACION SI ES EDITAR SE CAMBIE DE COLOR GG*/}
      {accion == "editar" ? (<div className='w-full rounded-md border border-primary h-[81vh] p-4 '>
            <ConstanciaForm />
          </div>) : (<div className='w-full rounded-md border border-border h-[81vh] p-4'>
            <ConstanciaForm />
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
      <ConstanciaTable />
      </OcultarTable>
      
    </>
  )


};