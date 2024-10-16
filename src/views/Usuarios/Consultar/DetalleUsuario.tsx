import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MenuLateral from '../../../components/ui/MenuLateral';
import PantallaDetalleUsuario from './VistasDetalleUsuario/PantallaDetalleUsuario';
import InformaciónGeneral from './VistasDetalleUsuario/InformaciónGeneral';
import InformacionFiscal from './VistasDetalleUsuario/InformacionFiscal';
import CrearOrdenDeTrabajo from './VistasDetalleUsuario/CrearOrdenDeTrabajo';
import TomasUsuario from './VistasDetalleUsuario/TomasUsuario';
import Convenio from './VistasDetalleUsuario/CargosUsuario';
import { useStateContext, ContextProvider } from '../../../contexts/ContextDetalleUsuario';
import { OcultarTableDetalleUsuario } from '../../../components/Tables/Components/OcultarTableDetalleUsuario';
import { BreadCrumbDetalleUsuario } from '../../../components/ui/breadCrumbDetalleUsuario';
import { useBreadcrumbStore } from '../../../contexts/ZustandGeneralUsuario';
import { ZustandGeneralUsuario } from '../../../contexts/ZustandGeneralUsuario';
import Loader from '../../../components/ui/Loader';
import { MultasUsuario } from './VistasDetalleUsuario/MultasUsuario';
import { DoubleContainer, Seccion1, Seccion2 } from '../../../components/ui/DoubleContainer';

const DetalleUsuario: React.FC = () => {
  const { pantalla } = useStateContext();
  const location = useLocation();
  const { usuarioObtenido, setUsuarioObtenido, setUsuariosEncontrados, usuariosEncontrados, tomasRuta, usuariosRecuperado } = ZustandGeneralUsuario(); // obtener la ruta del componente breadCrumb
  const { mostrarSiguiente, setMostrarSiguiente } = useBreadcrumbStore();



  useEffect(() => {
    console.log("USUARIOS ENCONTRADOS: PP", usuariosEncontrados);
    console.log("ESTE FUE EL USUARIO RECUPERADO", usuariosRecuperado);
    setMostrarSiguiente(false);
  }, [usuariosRecuperado, usuariosEncontrados]);



  const [mostrarPantalla, setMostrarPantalla] = useState(pantalla);
  const [accion, setAccion] = useState<string | undefined>();

  useEffect(() => {
    setMostrarPantalla(pantalla);
    console.log(pantalla);
  }, [pantalla]);

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
          pantalla: <InformacionFiscal />
        },
        {
          nombre: "Ordenes de trabajo",
          pantalla: <CrearOrdenDeTrabajo />
        },
        {
          nombre: "Tomas",
          pantalla: <TomasUsuario />
        },
        {
          nombre: "Convenio",
          pantalla: <Convenio />
        },
        {
          nombre: "Multas",
          pantalla: <MultasUsuario />
        },

      ]
    }
  ];

  return (
    <>
      <ContextProvider>
        <div className='h-full'>
          {/* Breadcrumb en la parte superior */}
          <div className=''>
            <BreadCrumbDetalleUsuario />
          </div>

          {/* <div className='flex gap-2 px-2'>
            <div className='flex-shrink-0'>
              <OcultarTableDetalleUsuario accion={accion}>
                <MenuLateral options={options} context={useStateContext} />
              </OcultarTableDetalleUsuario>
            </div>
            <div className='w-full'>
              <PantallaDetalleUsuario />
            </div>
          </div> */}

          <DoubleContainer>
            <Seccion1 size={"sm"}>
              <MenuLateral options={options} context={useStateContext} />
            </Seccion1>
            <Seccion2>
              <PantallaDetalleUsuario />
            </Seccion2>
          </DoubleContainer>
        </div>
      </ContextProvider>
    </>
  );
};

export default DetalleUsuario;
