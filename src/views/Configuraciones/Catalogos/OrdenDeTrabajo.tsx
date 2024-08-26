import React, {useState} from  'react'
import { ContextProvider } from "../../../contexts/ContextOrdenDeTrabajo.tsx";
import { useStateContext } from "../../../contexts/ContextOrdenDeTrabajo.tsx";
import { OcultarTable } from '../../../components/Tables/Components/OcultarTable.tsx';
import OrdenDeTrabajoTable from '../../../components/Tables/Components/OrdenDeTrabajoTable.tsx';
import OrdenDeTrabajoForm from '../../../components/Forms/OrdenDeTrabajoForm.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import OrdenDeTrabajoAccionesForm from '../OrdenDeTrabajo/OrdenDeTrabajoAccionesForm.tsx';
import CargosDeLaOrdenDeTrabajoForm from '../OrdenDeTrabajo/CargosDeLaOrdenDeTrabajoForm.tsx';
import DisparaOtraOrdenDeTrabajoForm from '../OrdenDeTrabajo/DisparaOtraOrdenDeTrabajoForm.tsx';


const OrdenDeTrabajo = () => {
  
  const { accion } = useStateContext();

  
  const [activeTab, setActiveTab] = useState("Detalles");

  const opciones = [
    {
      titulo: "Detalles",
      componente: <OrdenDeTrabajoformEdit/>
    },
    {
      titulo: "Acciones",
      componente: <OrdenDeTrabajoAccionesForm />
    },
    {
      titulo: "Cargos de la orden de trabajo",
      componente: <CargosDeLaOrdenDeTrabajoForm />
    },
    {
      titulo: "Dispara otra orden de trabajo",
      componente: <DisparaOtraOrdenDeTrabajoForm />
    },
  ]



  return (
    <ContextProvider>
      <div className='w-full max-h-[50vh] mt-[15px]'>
        {/*Contenedor principal*/}
        <div className='flex gap-2 '>


            <MostrarTable />
          {/*Datatable*/}

          {/*Formulario*/}
          <div className='w-full rounded-md border border-border h-[80vh] p-4 overflow-auto'>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                {opciones.map((opcion, index) => (
                  <>
                    <TabsTrigger value={opcion.titulo} key={index}>{opcion.titulo}</TabsTrigger>
                  </>
                ))}
              </TabsList>
              {opciones.map((opcion, index) => (
                <>
                  <TabsContent value={opcion.titulo} key={index}>{opcion.componente}</TabsContent>
                </>
              ))}
            </Tabs>
          </div>

        </div>
      </div>
    </ContextProvider>
  )
}

const OrdenDeTrabajoformEdit = () => {

  const { accion } = useStateContext();

  return (
    <>
        {/*AQUI SE MANDA A LLAMAR EL FORMULARIO PERO CON LA VALIDACION SI ES EDITAR SE CAMBIE DE COLOR GG*/}
      {accion == "editar" ? (<div className='w-full rounded-md border border-primary h-full p-4'>
            <OrdenDeTrabajoForm />
          </div>) : (<div className='w-full rounded-md border border-border h-full p-4'>
            <OrdenDeTrabajoForm />
          </div>)}
    </>
  );
};

export default OrdenDeTrabajo

const MostrarTable = () => {

  const { accion } = useStateContext();

  return(
    <>
        {/*Datatable*/}

      <OcultarTable accion={accion}>
      <OrdenDeTrabajoTable />
      </OcultarTable>
      
    </>
  )


};