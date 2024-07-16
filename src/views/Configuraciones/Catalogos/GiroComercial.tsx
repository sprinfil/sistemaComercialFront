import GiroComercialForm from '../../../components/Forms/GiroComercialForm.tsx';
import GiroComercialTable from '../../../components/Tables/Components/GiroComercialTable.tsx';
import { ContextProvider } from '../../../contexts/ContextGiroComercial.tsx';
import { useStateContext } from '../../../contexts/ContextGiroComercial.tsx';
import { OcultarTable } from '../../../components/Tables/Components/OcultarTable.tsx';
export default function GiroComercial() {

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
      {accion == "editar" ? (<div className='w-full rounded-md border border-primary h-[75vh] p-4'>
            <GiroComercialForm />
          </div>) : (<div className='w-full rounded-md border border-border h-[75vh] p-4'>
            <GiroComercialForm />
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
      <GiroComercialTable />
      </OcultarTable>
      
    </>
  )


};