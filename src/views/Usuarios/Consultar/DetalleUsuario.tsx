import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MenuLateral from '../../../components/ui/MenuLateral';
import PantallaDetalleUsuario from './VistasDetalleUsuario/PantallaDetalleUsuario';
import InformaciónGeneral from './VistasDetalleUsuario/InformaciónGeneral';
import InformacionFiscal from './VistasDetalleUsuario/InformacionFiscal';
import CrearOrdenDeTrabajo from './VistasDetalleUsuario/CrearOrdenDeTrabajo';
import TomasUsuario from './VistasDetalleUsuario/TomasUsuario';
import { useStateContext, ContextProvider } from '../../../contexts/ContextDetalleUsuario';
import { OcultarTableDetalleUsuario } from '../../../components/Tables/Components/OcultarTableDetalleUsuario';
import { BreadCrumbDetalleUsuario } from '../../../components/ui/breadCrumbDetalleUsuario';
import { ZustandTomasPorUsuario } from '../../../contexts/ZustandTomasPorUsuario';
import { ZustandGeneralUsuario } from '../../../contexts/ZustandGeneralUsuario';
import Loader from '../../../components/ui/Loader';

const DetalleUsuario: React.FC = () => {
  const { pantalla } = useStateContext();
  const location = useLocation();
  const { tomasRuta } = ZustandTomasPorUsuario(); // obtener la ruta del componente breadCrumb
  const { usuarioObtenido, setUsuarioObtenido, setUsuariosEncontrados, usuariosEncontrados } = ZustandGeneralUsuario(); // obtener la ruta del componente breadCrumb



  useEffect(() => {
    console.log("USUARIOS ENCONTRADOS:", usuariosEncontrados); 
  }, [setUsuariosEncontrados]);



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
          pantalla: <InformacionFiscal/>
        },
        {
          nombre: "Ordenes de trabajo",
          pantalla: <CrearOrdenDeTrabajo/>
        },
        {
          nombre: "Tomas",
          pantalla: <TomasUsuario/>
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
            <BreadCrumbDetalleUsuario mostrarSiguiente={tomasRuta} />
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
  );
};

export default DetalleUsuario;
