import React, {useState}from 'react';
import Prueba from './Prueba.tsx';
import CrearUsuarioFisicaForm from '../../../components/Forms/CrearUsuarioFisicaForm.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CrearUsuarioMoralForm from '../../../components/Forms/CrearUsuarioMoralForm.tsx';
export default function CrearUsuarioNuevo() {

  //ESTA ES LA VISTA PRINCIPAL DEL CATALOGO QUE CONTIENE LOS COMPONENTES DE LA TABLA Y
  //FORMULARIO DE ANOMALIAS
  const [activeTab, setActiveTab] = useState("Fisica");

  const opciones = [
    {
      titulo: "Fisica",
      componente: <CrearUsuarioFisicaForm/>
    },
    {
      titulo: "Moral",
      componente: <CrearUsuarioMoralForm/>
    },
  ]

  return (
    <div className='w-full max-h-[50vh] mt-[15px]'>
    {/*Contenedor principal*/}
    <div className='flex gap-2 '>


      {/*Formulario*/}
      <div className='w-full rounded-md border border-border h-[84vh] p-4 overflow-auto'>
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
  );
};
