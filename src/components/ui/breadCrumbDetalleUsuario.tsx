import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useBreadcrumbStore } from "../../contexts/ZustandGeneralUsuario";
import { ZustandGeneralUsuario } from "../../contexts/ZustandGeneralUsuario";
import { ChevronRight } from "lucide-react";
import { Usuario } from "../Tables/Columns/ContratoConsultaTomaColumns";

export function BreadCrumbDetalleUsuario() {
  const { mostrarSiguiente, setMostrarSiguiente } = useBreadcrumbStore();
  const { usuariosEncontrados, tomaUsuariosEncontrados } = ZustandGeneralUsuario();
  const [usuario, setUsuario] = useState<{ id: number; nombre: string } | null>(null);
  const [tomaSeleccionada, setTomaSeleccionada] = useState<{ id: number; calle?: string; usuario?: Usuario } | null>(null);

  useEffect(() => {
    if (usuariosEncontrados.length > 0) {
      setUsuario(usuariosEncontrados[0]);
    } else {
      console.log("No hay usuarios encontrados");
    }
  }, [usuariosEncontrados]);

  useEffect(() => {
    if (tomaUsuariosEncontrados.length > 0) {
      setTomaSeleccionada(tomaUsuariosEncontrados[0]);
    } else {
      console.log("No hay tomas encontradas");
    }
  }, [tomaUsuariosEncontrados]);

  const handleClick = () => {
    setMostrarSiguiente(false);
  };
  const renderNombreUsuario = () => {
    if (tomaSeleccionada?.usuario?.nombre) {
      return tomaSeleccionada.usuario.nombre; // Mostrar nombre del usuario asociado a la toma
    }
    return usuario ? usuario.nombre : 'Nombre no disponible'; // Mostrar nombre del usuario por defecto
  };

  return (
    <nav className="ml-5 mt-5">
      <ol style={{ listStyle: 'none', display: 'flex', padding: 0 }}>
        <li>
          <Link to="/usuario" onClick={handleClick}>
            <p className="text-[15px] font-medium">
            {renderNombreUsuario()}
            </p>
          </Link>
        </li>
     
        {mostrarSiguiente && (  
          <>
            <li className="w-[8px] h-[8px]"><ChevronRight /></li>
            <li>
              <Link to="/usuario/toma">
                <p className="text-[15px] font-medium ml-4">
                  Toma: {tomaSeleccionada && tomaSeleccionada.calle ? tomaSeleccionada.calle : 'Nombre no disponible'}
                </p>
              </Link>
            </li>
          </>
        )}
      </ol>
    </nav>
  );
}
