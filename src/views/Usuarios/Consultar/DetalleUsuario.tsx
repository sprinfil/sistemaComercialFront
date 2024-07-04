import React, { useEffect, useState } from 'react'
import MenuLateral from '../../../components/ui/MenuLateral'
import InformacionFiscal from './VistasDetalleUsuario/InformacionFiscal'
import { useStateContext, ContextProvider } from '../../../contexts/ContextDetalleUsuario'
import PantallaDetalleUsuario from './VistasDetalleUsuario/PantallaDetalleUsuario'
import InformacionPensionado from './VistasDetalleUsuario/InformacionPensionado'
import InformaciónGeneral from './VistasDetalleUsuario/InformaciónGeneral'

const DetalleUsuario = () => {

  const { pantalla } = useStateContext();

  const [mostrarPantalla, setMostrarPantalla] = useState();

  useEffect(()=>{
    setMostrarPantalla(pantalla)
    console.log(pantalla);
  },[pantalla]
)

  const options = [
    {
      titulo: "Principal",
      opciones: [
        {
          nombre: "Información Principal",
          pantalla:  <InformaciónGeneral />
        },
        {
          nombre: "Fiscal",
          pantalla:  <InformacionFiscal />
        },
        {
          nombre: "Pensionado",
          pantalla:  <InformacionPensionado />
        },
      ]
    }
  ]

  return (
    <>
      <ContextProvider>
        <div>
          <div className='flex gap-2'>
            <div className='w-[300px]'>
              <MenuLateral options={options} />
            </div>
            <div>
              <PantallaDetalleUsuario/>
            </div>
          </div>
        </div>
      </ContextProvider>

    </>

  )
}

export default DetalleUsuario
