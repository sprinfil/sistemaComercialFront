import DescuentoForm from '../../../components/Forms/DescuentoForm.tsx';
import DescuentoTable from '../../../components/Tables/Components/DescuentoTable.tsx';
import { ContextProvider } from '../../../contexts/ContextDescuentos.tsx';
import { useStateContext } from '../../../contexts/ContextDescuentos.tsx';
import { OcultarTable } from '../../../components/Tables/Components/OcultarTable.tsx';
export default function Descuentos() {

  //ESTA ES LA VISTA PRINCIPAL DEL CATALOGO QUE CONTIENE LOS COMPONENTES DE LA TABLA Y
  //FORMULARIO DE ANOMALIAS


  return (
    <ContextProvider>
      <div className='w-full max-h-[77vh] '>
        {/*Contenedor principal*/}
        <div className='flex gap-2 '>

          {/*Datatable*/}
         
         <MostrarTable/>
          {/*Formulario*/}
            <DescuentoFormEdit />
          

        </div>
      </div>
    </ContextProvider>

  );
}


const DescuentoFormEdit = () => {

  const { accion } = useStateContext();

  return (
    <>
        {/*AQUI SE MANDA A LLAMAR EL FORMULARIO PERO CON LA VALIDACION SI ES EDITAR SE CAMBIE DE COLOR G*/}
      {accion == "editar" ? (<div className='w-full rounded-md border border-primary h-[77vh] p-4 overflow-auto'>
            <DescuentoForm />
          </div>) : (<div className='w-full rounded-md border border-border h-[77vh] p-4 overflow-auto'>
            <DescuentoForm />
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
      <DescuentoTable />
      </OcultarTable>
      
    </>
  )


};