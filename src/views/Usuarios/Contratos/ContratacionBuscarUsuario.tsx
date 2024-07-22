import React from 'react'
import { BuscarUsuarioContratacion } from './FormsContratos/BuscarUsuarioContratacionForm'
import { ContextProvider } from './ContextContratos'


export const ContratacionBuscarUsuario = () => {


  return (
    <ContextProvider>
    <BuscarUsuarioContratacion/>
    </ContextProvider>
  )
}
