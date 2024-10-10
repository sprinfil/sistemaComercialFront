import React, { useState, useEffect } from 'react';
import { ContextProvider, useStateContext } from "../../../../contexts/ContextConstancias.tsx";
import GenerarConstanciaForm from '../../../../components/Forms/GenerarConstanciaForm.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OcultarTable } from '../../../../components/Tables/Components/OcultarTable.tsx';
import { ZustandGeneralUsuario } from '../../../../contexts/ZustandGeneralUsuario.tsx';
import { useBreadcrumbStore } from '../../../../contexts/ZustandGeneralUsuario.tsx';
import ConstanciaTable from '../../../../components/Tables/Components/ConstanciaTable.tsx';
export const GestionConstancias = () => { // Recibir idToma como prop

  const { toma, setToma, tomasRuta, usuariosEncontrados, setUsuariosRecuperado, usuariosRecuperado, setTomaUsuariosEncontrados, tomaUsuariosEncontrados } = ZustandGeneralUsuario()
  const [accion, setAccion] = useState<string | undefined>();
  const { mostrarSiguiente, setMostrarSiguiente } = useBreadcrumbStore();
  const [activeTab, setActiveTab] = useState("Detalles");

  useEffect(() => {
    //console.log("ESTE USUARIO LLEGA A LA TOMA DETALLE:", tomaUsuariosEncontrados[0]?.usuario);

    if (usuariosEncontrados.length > 0) {
      // Establece el estado global solo si hay usuarios encontrados
      setUsuariosRecuperado(usuariosEncontrados); // Debe ser un arreglo de usuarios
      setMostrarSiguiente(true);
    }
    else {
      console.log("no hay longitud");
    }
  }, [usuariosEncontrados, setUsuariosRecuperado, tomaUsuariosEncontrados]);

  console.log(usuariosEncontrados)
  return (
    <ContextProvider>
      <div className='w-full max-h-[50vh] mt-[15px]'>
        <div className='flex gap-2'>
          <MostrarTable/> {/* Pasar el idToma */}
          <div className='w-full rounded-md h-[70vh] p-4 overflow-auto'>
            <ConstanciaFormEdit />
          </div>
        </div>
      </div>
    </ContextProvider>
  )
}


const MostrarTable = () => { // Recibir idToma como prop

  const { accion } = useStateContext();

  return (
    <div className='min-w-[30%]'>
      <ConstanciaTable /> {/* Pasar el idToma */}
    </div>
  )
};


const ConstanciaFormEdit = () => {
  const { accion } = useStateContext();

  return (
    <>
      {accion == "editar" ? (
        <div className='w-full rounded-md border border-primary h-[60vh] p-4 overflow-auto '>
          <GenerarConstanciaForm />
        </div>
      ) : (
        <div className=' rounded-md  h-[60vh] p-4 overflow-auto '>
          <GenerarConstanciaForm />
        </div>
      )}
    </>
  );
};
