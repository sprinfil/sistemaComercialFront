import React from 'react'
import { BuscarUsuarioForm } from '../Contratos/FormsContratos/BuscarUsuarioForm'
import { ContextProvider } from '../../../contexts/ContextContratos'

const BuscarUsuario = () => {
  return (
    
   
    <ContextProvider>
    <div>
      <BuscarUsuarioForm navegacion={"/usuario"} botonCrearUsuario={false}  tipoAccion={"verUsuarioDetalle"}/>
    </div>    
    </ContextProvider>

  )
}

export default BuscarUsuario