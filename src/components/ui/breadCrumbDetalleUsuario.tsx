import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useBreadcrumbStore } from "../../contexts/ZustandGeneralUsuario";
import { ZustandGeneralUsuario } from "../../contexts/ZustandGeneralUsuario";
import { ChevronRight } from "lucide-react";
import { Usuario, BuscarTomaUsuario } from "../Tables/Columns/ContratoConsultaTomaColumns";

export function BreadCrumbDetalleUsuario() {
  const { mostrarSiguiente, setMostrarSiguiente } = useBreadcrumbStore();
  const { usuariosEncontrados, tomaUsuariosEncontrados, findUserOrToma, findUserMapaGeo, toma, booleanCodigoDeToma } = ZustandGeneralUsuario();
  
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [tomaSeleccionada, setTomaSeleccionada] = useState<BuscarTomaUsuario | null>(null);
  const [consultaNombreToma, setConsultaNombreToma] = useState<Usuario| null>(null);

  type Usuario = {
    id: number
    nombre: string
    apellido_paterno: string
    apellido_materno: string
    telefono: string
    correo: string
    curp: string
    tomas: tomas;
  }

  type tomas = {
    id: number
    calle: string
    
  }



  
    //console.log("esto llego al breadcrumb jeje",usuariosEncontrados);

  useEffect(() => {
    if (usuariosEncontrados.length > 0) {
      setUsuario(usuariosEncontrados[0]);
      setConsultaNombreToma(usuariosEncontrados[0]);
    }
  }, [usuariosEncontrados]);

  useEffect(() => {
    if (toma && !Array.isArray(toma)) {
      setTomaSeleccionada(toma);
    } else if (Array.isArray(tomaUsuariosEncontrados) && tomaUsuariosEncontrados.length > 0) {
      setTomaSeleccionada(tomaUsuariosEncontrados[0]);
      setConsultaNombreToma(tomaUsuariosEncontrados[0]);
    }
  }, [toma, tomaUsuariosEncontrados]);

  const handleClick = () => {
    setMostrarSiguiente(false);
  };

  //console.log(consultaNombreToma?.tomas[0]?.calle);

  return (
    <nav className="ml-3 my-1">
      {findUserOrToma ? (
        <ol style={{ listStyle: 'none', display: 'flex', padding: 0 }}>
          <li>
            <Link to="/usuario" onClick={handleClick}>
              <p className="transition-all hover:text-[18px]  duration-200">
                {tomaSeleccionada?.usuario?.nombre || 'Nombre no disponible'}
              </p>
            </Link>
          </li>
          {mostrarSiguiente && (
            <>
              <li className="w-[8px] h-[8px]"><ChevronRight /></li>
              <li>
                <Link to="/usuario/toma">
                  <p className="transition-all hover:text-[18px] duration-200 ml-4">
                    {findUserMapaGeo
                      ? tomaSeleccionada?.calle || 'Nombre no disponible'
                      : tomaSeleccionada?.calle || 'Nombre no disponible'}
                  </p>
                </Link>
              </li>
            </>
          )}
        </ol>
      ) : (
        <ol style={{ listStyle: 'none', display: 'flex', padding: 0 }}>
          <li>
            <Link to="/usuario" onClick={handleClick}>
              <p className="transition-all hover:text-[18px] duration-200">
                {consultaNombreToma?.nombre || 'Nombre no disponible'}
              </p>
            </Link>
          </li>
          {mostrarSiguiente && (
            <>
              <li className="w-[8px] h-[8px]"><ChevronRight /></li>
              <li>
                <Link to="/usuario/toma">
                  <p className="transition-all hover:text-[18px] duration-200 ml-4">
                    Toma: {consultaNombreToma?.tomas[0]?.codigo_toma|| 'Nombre no disponible'}
                  </p>
                </Link>
              </li>
            </>
          )}
        </ol>
      )}
      
      
    </nav>
  );
}
