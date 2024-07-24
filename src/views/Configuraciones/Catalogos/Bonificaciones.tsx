import BonificacionForm from '../../../components/Forms/BonificacionForm.tsx';
import BonificacionTable from '../../../components/Tables/Components/BonificacionTable.tsx';
import { ContextProvider } from '../../../contexts/ContextBonificaciones.tsx';
import { useStateContext } from "../../../contexts/ContextBonificaciones.tsx";
import { OcultarTable } from '../../../components/Tables/Components/OcultarTable.tsx';
export default function Bonificaciones() {

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
            <BonificacionesFormEdit />

        </div>
    </div>
    </ContextProvider>

  );
}


const BonificacionesFormEdit = () => {

    const { accion } = useStateContext();
  
    return (
      <>
          {/*AQUI SE MANDA A LLAMAR EL FORMULARIO PERO CON LA VALIDACION SI ES EDITAR SE CAMBIE DE COLORa GG*/}
        {accion == "editar" ? (<div className='w-full rounded-md border border-primary h-[81vh] p-4'>
              <BonificacionForm />
            </div>) : (<div className='w-full rounded-md border border-border h-[81vh] p-4'>
              <BonificacionForm />
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
        <BonificacionTable />
        </OcultarTable>
        
      </>
    )
  
  
  };