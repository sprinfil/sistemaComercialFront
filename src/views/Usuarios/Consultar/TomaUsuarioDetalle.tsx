import React, { useEffect, useState } from "react";
import { BreadCrumbDetalleUsuario } from "../../../components/ui/breadCrumbDetalleUsuario";
import { ZustandGeneralUsuario } from "../../../contexts/ZustandGeneralUsuario.tsx";
import {
  useStateContext,
  ContextProvider,
} from "../../../contexts/ContextDetalleUsuario";
import { OcultarTableDetalleUsuario } from "../../../components/Tables/Components/OcultarTableDetalleUsuario";
import MenuLateral from "../../../components/ui/MenuLateral";
import PantallaDetalleUsuario from "./VistasDetalleUsuario/PantallaDetalleUsuario";
import InformaciónGeneral from "./VistasDetalleUsuario/InformaciónGeneral";
import InformacionFiscal from "./VistasDetalleUsuario/InformacionFiscal";
import CrearOrdenDeTrabajo from "./VistasDetalleUsuario/CrearOrdenDeTrabajo";
import { GestionMedidores } from "./VistasDetalleUsuario/GestionMedidores.tsx";
import CargosUsuario from "./VistasDetalleUsuario/CargosUsuario.tsx";
import TomasUsuario from "./VistasDetalleUsuario/TomasUsuario";
import { BreadCrumbDetalleTomaUsuario } from "../../../components/ui/breadCrumbDetalleTomaUsuario.tsx";
import { useBreadcrumbStore } from "../../../contexts/ZustandGeneralUsuario";
import { GestionDescuentos } from "./VistasDetalleUsuario/GestionDescuentos.tsx";
import { GestionConstancias } from "./VistasDetalleUsuario/GestionConstancias.tsx";

import { MultasUsuario } from "./VistasDetalleUsuario/MultasUsuario.tsx";
import { FacturacionesToma } from "./VistasDetalleUsuario/FacturacionesToma.tsx";
import { DoubleContainer, Seccion1, Seccion2 } from "../../../components/ui/DoubleContainer.tsx";
export const TomaUsuarioDetalle = () => {
  const {
    toma,
    setToma,
    tomasRuta,
    usuariosEncontrados,
    setUsuariosRecuperado,
    usuariosRecuperado,
    setTomaUsuariosEncontrados,
    tomaUsuariosEncontrados,
  } = ZustandGeneralUsuario();
  const [accion, setAccion] = useState<string | undefined>();
  const { mostrarSiguiente, setMostrarSiguiente } = useBreadcrumbStore();

  useEffect(() => {
    //console.log("ESTE USUARIO LLEGA A LA TOMA DETALLE:", tomaUsuariosEncontrados[0]?.usuario);

    if (usuariosEncontrados.length > 0) {
      // Establece el estado global solo si hay usuarios encontrados
      setUsuariosRecuperado(usuariosEncontrados); // Debe ser un arreglo de usuarios
      setMostrarSiguiente(true);
    } else {
      console.log("no hay longitud");
    }
  }, [usuariosEncontrados, setUsuariosRecuperado, tomaUsuariosEncontrados]);

  //console.log("ESTE ES EL USUARIO RECUPERADO " + JSON.stringify(usuariosRecuperado));
  console.log(usuariosEncontrados[0]);
  const options = [
    {
      titulo: "Principal",
      opciones: [
        {
          nombre: "Información Principal",
          pantalla: <InformaciónGeneral />,
        },
        {
          nombre: "Fiscal",
          pantalla: <InformacionFiscal />,
        },
        {
          nombre: "Ordenes de trabajo",
          pantalla: <CrearOrdenDeTrabajo />,
        },
        {
          nombre: "Medidores",
          pantalla: <GestionMedidores />,
        },
        {
          nombre: "Cargos",
          pantalla: <CargosUsuario />,
        },
        {
          nombre: "Descuentos",
          pantalla: <GestionDescuentos />,
        },
        {
          nombre: "Constancias",
          pantalla: <GestionConstancias />,
        },
        {
          nombre: "Multas",
          pantalla: <MultasUsuario />,
        },
        {
          nombre: "Facturaciones",
          pantalla: <FacturacionesToma />,
        },
      ],
    },
  ];

  return (
    <>
      <ContextProvider>
        <div className="h-full">
          {/* Breadcrumb en la parte superior */}
          <div className="">
            <BreadCrumbDetalleUsuario />
          </div>

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
