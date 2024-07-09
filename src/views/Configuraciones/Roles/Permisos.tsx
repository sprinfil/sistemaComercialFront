import React from 'react'
import MenuLateral from '../../../components/ui/MenuLateral'
import { ConfiguracionPermisos } from './VistaIndividualPermiso/ConfiguracionPermisos'
import { ContextProvider } from '../../../contexts/ContextDetalleUsuario'
import { ContextProviderPermisos } from '../../../contexts/ContextDetallePermisos'
import { useStateContext } from '../../../contexts/ContextRol'
import { useStateContextPermisos } from '../../../contexts/ContextDetallePermisos'
import { PantallaPermiso } from './PantallaPermiso'

const Permisos = () => {

  const {rol} = useStateContext();

  const options = [
    {
      titulo: "Modulos",
      opciones: [
        {
          nombre: "Usuarios",
          pantalla: "",
        },
        {
          nombre: "Poligonos Geográficos",
          pantalla: "",
        },
        {
          nombre: "Ordenes de trabajo",
          pantalla: "",
        },
        {
          nombre: "Monitores",
          pantalla: "",
        },
        {
          nombre: "Cajas",
          pantalla: "",
        },
        {
          nombre: "Lectura y Facturación",
          pantalla: "",
        },
        {
          nombre: "Configuración",
          pantalla: <ConfiguracionPermisos />,
        },
      ]
    }
  ]

  return (
    <ContextProviderPermisos>
      <div className='w-full h-[30px] flex justify-center border-b mb-[10px] border-border'><p>{ rol.name != null && rol.name != "" ? rol.name : <p className="text-red-500">Selecciona Un Rol</p>}</p></div>
      <div className='max-h-[74vh]'>
        <div className='flex gap-2 h-full '>
          <div className='w-[300px] h-full'>
            <MenuLateral options={options} context={useStateContextPermisos} />
          </div>
          <div className='w-full  max-h-[65vh] h-[65vh] overflow-auto'>
            <PantallaPermiso />
          </div>
        </div>
      </div>
    </ContextProviderPermisos>
  )
}

export default Permisos