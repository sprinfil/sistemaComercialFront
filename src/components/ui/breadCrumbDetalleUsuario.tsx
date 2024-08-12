import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useBreadcrumbStore } from "../../contexts/ZustandGeneralUsuario";
import { ZustandGeneralUsuario } from "../../contexts/ZustandGeneralUsuario";
import { ChevronRight } from "lucide-react";
import { Usuario, BuscarTomaUsuario } from "../Tables/Columns/ContratoConsultaTomaColumns";

export function BreadCrumbDetalleUsuario() {
  const { mostrarSiguiente, setMostrarSiguiente } = useBreadcrumbStore();
  const { usuariosEncontrados, tomaUsuariosEncontrados, findUserOrToma, findUserMapaGeo, toma, booleanCodigoDeToma } = ZustandGeneralUsuario();
  
  // Usa tipos explícitos para el estado
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [tomaSeleccionada, setTomaSeleccionada] = useState<BuscarTomaUsuario | null>(null);

  // Debug logs
  console.log("Usuarios encontrados:", usuariosEncontrados);
  console.log("Tomas encontradas:", tomaUsuariosEncontrados);
  console.log("Toma seleccionada:", tomaSeleccionada);
  console.log("findUserOrToma:", findUserOrToma);
  console.log("findUserMapaGeo:", findUserMapaGeo);

  useEffect(() => {
    if (Array.isArray(usuariosEncontrados) && usuariosEncontrados.length > 0) {
      setUsuario(usuariosEncontrados[0]);
    } else {
      console.log("No hay usuarios encontrados");
    }
  }, [usuariosEncontrados]);

  useEffect(() => {
    if (toma && !Array.isArray(toma)) {
      setTomaSeleccionada(toma);  // Suponiendo que `toma` es un objeto y no un array
    } else if (Array.isArray(tomaUsuariosEncontrados) && tomaUsuariosEncontrados.length > 0) {
      setTomaSeleccionada(tomaUsuariosEncontrados[0]);
    } else {
      console.log("No hay tomas encontradas");
    }
  }, [toma, tomaUsuariosEncontrados]);

  const handleClick = () => {
    setMostrarSiguiente(false);
  };

  return (
    <nav className="ml-5 mt-5">
      {findUserOrToma ? (
        <ol style={{ listStyle: 'none', display: 'flex', padding: 0 }}>
          <li>
            <Link to="/usuario" onClick={handleClick}>
              <p className="text-[15px] font-medium">
                {tomaSeleccionada?.usuario?.nombre || 'Nombre no disponible'}
              </p>
            </Link>
          </li>
          {mostrarSiguiente && (
            <>
              <li className="w-[8px] h-[8px]"><ChevronRight /></li>
              <li>
                <Link to="/usuario/toma">
                  <p className="text-[15px] font-medium ml-4">
                    {findUserMapaGeo
                      ? tomaSeleccionada?.entre_calle_1 || 'Nombre no disponible'
                      : tomaSeleccionada?.entre_calle_1 || 'Nombre no disponible'}
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
              <p className="text-[15px] font-medium">
                {usuario?.nombre || 'Nombre no disponible'}
              </p>
            </Link>
          </li>
          {mostrarSiguiente && (
            <>
              <li className="w-[8px] h-[8px]"><ChevronRight /></li>
              <li>
                <Link to="/usuario/toma">
                  <p className="text-[15px] font-medium ml-4">
                    Toma: {tomaSeleccionada?.entre_calle_1 || 'Nombre no disponible'}
                  </p>
                </Link>
              </li>
            </>
          )}
        </ol>
      )}
      
      {booleanCodigoDeToma && (
        <ol style={{ listStyle: 'none', display: 'flex', padding: 0 }}>
          <li>
            <Link to="/usuario" onClick={handleClick}>
              <p className="text-[15px] font-medium">
                {tomaSeleccionada?.usuario?.nombre || 'Nombre no disponible'}
              </p>
            </Link>
          </li>
          {mostrarSiguiente && (
            <>
              <li className="w-[8px] h-[8px]"><ChevronRight /></li>
              <li>
                <Link to="/usuario/toma">
                  <p className="text-[15px] font-medium ml-4">
                    Toma: {tomaSeleccionada?.entre_calle_1 || 'Nombre no disponible'}
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
