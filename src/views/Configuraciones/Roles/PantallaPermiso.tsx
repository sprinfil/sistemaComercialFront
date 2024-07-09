import React, { useEffect, useState } from 'react'
import { useStateContextPermisos } from '../../../contexts/ContextDetallePermisos';

export const PantallaPermiso = () => {
    const { pantalla } = useStateContextPermisos();
    const [mostrarPantalla, setMostrarPantalla] = useState();

    useEffect(()=>{
      setMostrarPantalla(pantalla)
      console.log(pantalla);
    },[pantalla])

    return (
        <div className='w-full'>{mostrarPantalla}</div>
    )
}
