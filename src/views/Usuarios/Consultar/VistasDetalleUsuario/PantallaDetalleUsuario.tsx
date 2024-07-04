import React, { useEffect, useState } from 'react'
import { useStateContext, ContextProvider } from "../../../../contexts/ContextDetalleUsuario"

const PantallaDetalleUsuario = () => {

    const { pantalla } = useStateContext();
    const [mostrarPantalla, setMostrarPantalla] = useState();

    useEffect(()=>{
      setMostrarPantalla(pantalla)
      console.log(pantalla);
    },[pantalla])

    return (
        <div className='w-full'>{mostrarPantalla}</div>
    )
}

export default PantallaDetalleUsuario