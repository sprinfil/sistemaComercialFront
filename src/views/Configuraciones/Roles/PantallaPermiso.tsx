import React, { useEffect, useState } from 'react'
import { useStateContext } from '../../../contexts/ContextDetalleUsuario';

export const PantallaPermiso = () => {
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
