import React, {useEffect, useState} from 'react'
import { BreadCrumbDetalleUsuario } from '../../../components/ui/breadCrumbDetalleUsuario'
import { ZustandGeneralUsuario } from '../../../contexts/ZustandGeneralUsuario.tsx'
import { useStateContext, ContextProvider } from '../../../contexts/ContextDetalleUsuario';
import { OcultarTableDetalleUsuario } from '../../../components/Tables/Components/OcultarTableDetalleUsuario';
import MenuLateral from '../../../components/ui/MenuLateral';
import PantallaDetalleUsuario from './VistasDetalleUsuario/PantallaDetalleUsuario';
import InformaciónGeneral from './VistasDetalleUsuario/InformaciónGeneral';
import InformacionFiscal from './VistasDetalleUsuario/InformacionFiscal';
import CrearOrdenDeTrabajo from './VistasDetalleUsuario/CrearOrdenDeTrabajo';
import TomasUsuario from './VistasDetalleUsuario/TomasUsuario';
import { BreadCrumbDetalleTomaUsuario } from '../../../components/ui/breadCrumbDetalleTomaUsuario.tsx';
import { useBreadcrumbStore } from '../../../contexts/ZustandGeneralUsuario';
export const TomaUsuarioDetalle = () => {

  const {tomasRuta, usuariosEncontrados, setUsuariosRecuperado, usuariosRecuperado, setTomaUsuariosEncontrados, tomaUsuariosEncontrados}= ZustandGeneralUsuario()
  const [accion, setAccion] = useState<string | undefined>();
  const { mostrarSiguiente, setMostrarSiguiente } = useBreadcrumbStore();

  useEffect(() => {
    console.log("ESTE USUARIO LLEGA A LA TOMA DETALLE:", tomaUsuariosEncontrados);

    if (usuariosEncontrados.length > 0) {
      // Establece el estado global solo si hay usuarios encontrados
      setUsuariosRecuperado(usuariosEncontrados); // Debe ser un arreglo de usuarios
      setMostrarSiguiente(true);
    }
    else
    {
      console.log("no hay longitud");
    }
  }, [usuariosEncontrados, setUsuariosRecuperado, tomaUsuariosEncontrados]);

  console.log("ESTE ES EL USUARIO RECUPERADO " + JSON.stringify(usuariosRecuperado));

  const options = [
    {
      titulo: "Principal",
      opciones: [
        {
          nombre: "Información Principal",
          pantalla: <InformaciónGeneral />
        },
        {
          nombre: "Fiscal",
          pantalla: <InformacionFiscal/>
        },
        {
          nombre: "Ordenes de trabajo",
          pantalla: <CrearOrdenDeTrabajo/>
        },
       
      ]
    }
  ];

  return (
    <>
      <ContextProvider>
        <div>
          {/* Breadcrumb en la parte superior */}
          <div className='mt-2 px-2'>
            <BreadCrumbDetalleUsuario/>
          </div>

          {/* Contenido principal */}
          <div className='flex gap-2 mt-2 px-2'>
            <div className='flex-shrink-0 mt-5 ml-5'>
              <OcultarTableDetalleUsuario accion={accion}>
                <MenuLateral options={options} context={useStateContext} />
              </OcultarTableDetalleUsuario>
            </div>
            <div className='w-full'>
              <PantallaDetalleUsuario />
            </div>
          </div>
        </div>
      </ContextProvider>
    </>
  )
}
