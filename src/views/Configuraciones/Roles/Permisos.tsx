import React from 'react'
import MenuLateral from '../../../components/ui/MenuLateral'
import { LecturaFacturacionPermisos } from './VistaIndividualPermiso/LecturaFacturacionPermisos'
import { useStateContext, ContextProvider } from '../../../contexts/ContextDetalleUsuario'
import { PantallaPermiso } from './PantallaPermiso'

const Permisos = () => {

  const options = [
    {
      titulo: "Catalogos",
      opciones: [
        {
          nombre: "Lectura y Facturación",
          pantalla: <LecturaFacturacionPermisos />,
        },
        {
          nombre: "Atención a Usuarios",
          pantalla: "",
        },
      ]
    }
  ]

  return (
    <ContextProvider>
      <div className='max-h-[74vh]'>
        <div className='flex gap-2 h-full '>
          <div className='w-[300px] h-full'>
            <MenuLateral options={options} context={useStateContext} />
          </div>
          <div className='w-full  max-h-[74vh] h-[74vh] overflow-auto'>
            <PantallaPermiso />
          </div>
        </div>
      </div>
    </ContextProvider>
  )
}

export default Permisos