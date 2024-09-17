import React from 'react'
import { BuscarUsuarioForm } from './FormsContratos/BuscarUsuarioForm'
import { ContextProvider } from '../../../contexts/ContextContratos'


export const ContratacionBuscarUsuario = () => {


  return (
    <ContextProvider>
    <BuscarUsuarioForm navegacion={"/CrearUsuario"} botonCrearUsuario={true} tipoAccion={"crearContratacionUsuario"}/>
    </ContextProvider>
  )
}
