import React, { useEffect, useState } from 'react'
import { useStateContextPermisos } from '../../../contexts/ContextDetallePermisos';
import ConfiguracionPermisos from './VistaIndividualPermiso/ConfiguracionPermisos';

export const PantallaPermiso = () => {
    const { pantalla, setPantalla } = useStateContextPermisos();
    const [mostrarPantalla, setMostrarPantalla] = useState();

    //setPantalla(<ConfiguracionPermisos/>);

    useEffect(()=>{
      setMostrarPantalla(pantalla)
      console.log(pantalla);
    },[pantalla])

    return (
        <div className='w-full'>{mostrarPantalla}</div>
    )
}
