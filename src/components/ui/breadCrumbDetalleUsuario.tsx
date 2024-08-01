import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import React from "react";
import { useBreadcrumbStore } from "../../contexts/ZustandGeneralUsuario";
import { ZustandGeneralUsuario } from "../../contexts/ZustandGeneralUsuario";
import { ChevronRight } from "lucide-react";

export function BreadCrumbDetalleUsuario() {
  const { mostrarSiguiente, setMostrarSiguiente } = useBreadcrumbStore();
  const {usuariosRecuperado, usuariosEncontrados, setUsuariosEncontrados, tomas} = ZustandGeneralUsuario();
  const [usuario, setUsuario] = useState<{ id: number; nombre: string } | null>(null);
  const [tomaSeleccionada, setTomaSeleccionada] = useState<{ id: number; calle: string } | null>(null);


  console.log("USUARIO RECUPERADO DESDE EL CRUMB" + JSON.stringify(usuariosEncontrados));
  console.log("TOMADESDE EL CRUMB" + JSON.stringify(tomas));


  useEffect(() => {
    console.log("ESTE FUE EL USUARIO DEL DUMBBBBS", JSON.stringify(usuariosEncontrados));
    if(usuariosEncontrados.length > 0)
    {
      setUsuario(usuariosEncontrados[0]);

    }
    if(tomas.length > 0)
      {
        setTomaSeleccionada(tomas[0]);
  
      }
  }, [usuariosEncontrados,setUsuariosEncontrados, tomas, setTomaSeleccionada]);


  const handleClick = () => {
    // Lógica adicional si es necesario
    setMostrarSiguiente(false);
  };

  

  return (
    <nav className="ml-5 mt-5">
      <ol style={{ listStyle: 'none', display: 'flex', padding: 0 }}>
        <li>
          <Link to="/usuario" onClick={handleClick} className="text-white">
          <p className="text-[15px] font-medium">{usuario ? usuario.nombre : 'Nombre no disponible'}

          </p>
          </Link>
        </li>
        {mostrarSiguiente && (
          <>
            <li className="w-[8px] h-[8px]"><ChevronRight/></li>
            <li>
              <Link to="/usuario/toma" >
              <p className="text-[15px] font-medium ml-4">Toma: {tomaSeleccionada ? tomaSeleccionada.calle : 'Nombre no disponible'}</p>

              </Link>
            </li>
          </>
        )}
      </ol>
    </nav>
  );
}
