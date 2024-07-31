import React, {useEffect} from 'react'
import { BreadCrumbDetalleUsuario } from '../../../components/ui/breadCrumbDetalleUsuario'
import { ZustandGeneralUsuario } from '../../../contexts/ZustandGeneralUsuario.tsx'


export const TomaUsuarioDetalle = () => {

  const {tomasRuta, usuariosEncontrados}= ZustandGeneralUsuario()
  
  useEffect(() => {
    console.log("ESTE USUARIO LLEGA A LA TOMA DETALLE:", usuariosEncontrados); 
  }, [usuariosEncontrados]);

  return (
    <div className='mt-2 px-2'>
    <BreadCrumbDetalleUsuario mostrarSiguiente ={tomasRuta}/>
  </div>
  )
}
