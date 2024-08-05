import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useBreadcrumbStore } from "../../contexts/ZustandGeneralUsuario";
import { ZustandGeneralUsuario } from "../../contexts/ZustandGeneralUsuario";
import { ChevronRight } from "lucide-react";
import { Usuario } from "../Tables/Columns/ContratoConsultaTomaColumns";

export function BreadCrumbDetalleUsuario() {
  const { mostrarSiguiente, setMostrarSiguiente } = useBreadcrumbStore();
  const { usuariosEncontrados, tomaUsuariosEncontrados,findUserOrToma} = ZustandGeneralUsuario();
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


  return (
   
    <nav className="ml-5 mt-5">
       {findUserOrToma ? 
       <ol style={{ listStyle: 'none', display: 'flex', padding: 0 }}>
        <li>
          <Link to="/usuario" onClick={handleClick}>
            <p className="text-[15px] font-medium">
            {tomaSeleccionada?.usuario?.nombre ? tomaSeleccionada?.usuario?.nombre : 'Nombre no disponible'}

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
      </ol> :       
      <ol style={{ listStyle: 'none', display: 'flex', padding: 0 }}>
        <li>
          <Link to="/usuario" onClick={handleClick}>
            <p className="text-[15px] font-medium">
            {usuario ? usuario.nombre : 'Nombre no disponible'}
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
      </ol> }
      
    </nav>
  );
}
