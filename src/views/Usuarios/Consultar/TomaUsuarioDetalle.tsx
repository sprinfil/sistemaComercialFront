import React from 'react'
import { BreadCrumbDetalleUsuario } from '../../../components/ui/breadCrumbDetalleUsuario'
import { ZustandTomasPorUsuario } from '../../../contexts/ZustandTomasPorUsuario'

export const TomaUsuarioDetalle = () => {

  const {tomasRuta}= ZustandTomasPorUsuario()

  
  return (
    <div className='mt-2 px-2'>
    <BreadCrumbDetalleUsuario mostrarSiguiente ={tomasRuta}/>
  </div>
  )
}
