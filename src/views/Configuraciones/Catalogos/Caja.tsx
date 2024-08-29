import CajaForm from '../../../components/Forms/CajaForm.tsx';
import CajaTable from '../../../components/Tables/Components/CajaTable.tsx';
import { ContextProvider } from '../../../contexts/ContextCaja.tsx';
import { useStateContext } from '../../../contexts/ContextCaja.tsx';
import IconButton from '../../../components/ui/IconButton.tsx';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { Icon } from 'lucide-react';
import { OcultarTable } from '../../../components/Tables/Components/OcultarTable.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CajaOperadoresForm from '../../../components/Forms/CajaOperadoresForm.tsx';
import { ZustandGeneralUsuario } from '../../../contexts/ZustandGeneralUsuario.tsx';
export default function Caja() {

  const [activeTab, setActiveTab] = useState("Caja");
  const opciones = [
    {
      titulo: "Caja",
      componente: <CajaFormEdit/>
    },
    {
      titulo: "Operadores",
      componente: <CajaOperadoresForm/>,
    },
    
  ]

  return (
    <ContextProvider>

      <div className='w-full max-h-[75vh] '>
        {/*Contenedor principal*/}
        <div className='flex gap-2 '>
          {/*Datatable*/}

          <MostrarTable />


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

  );
}

const CajaFormEdit = () => {

  const { accion } = useStateContext();
  const {accionGeneradaEntreTabs} = ZustandGeneralUsuario();

  return (
    <>
      {/*AQUI SE MANDA A LLAMAR EL FORMULARIO PERO CON LA VALIDACION SI ES EDITAR SE CAMBIE DE COLOR GG*/}
      {accionGeneradaEntreTabs == "editar" ? (<div className='w-full rounded-md border border-primary h-[81vh] p-4 overflow-auto'>
        <CajaForm />
      </div>) : (<div className='w-full rounded-md border border-border h-[81vh] p-4 overflow-auto '>
        <CajaForm />
      </div>)}
    </>
  );
};

const MostrarTable = () => {

  const { accion } = useStateContext();
  const {accionGeneradaEntreTabs} = ZustandGeneralUsuario();

  return (
    <>
      {/*Datatable*/}

      <OcultarTable accion={accionGeneradaEntreTabs}>
        <CajaTable />
      </OcultarTable>

    </>
  )


};