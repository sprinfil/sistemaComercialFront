import React from 'react'
import MarcoForm from '../../../components/ui/MarcoForm'
import MarcoFormDetalleContrato from '../../../components/ui/MarcoFormDetalleContrato'
import { Button } from '../../../components/ui/button'

export const DetalleInformacionContrato = () => {
  return (
    <div className=''>
      <div className='text-2xl ml-5'>
      Detalle de contratación
      </div>

      <div className="border border-border rounded shadow-lg p-6 w-[210vh] ml-[9vh] mt-5 h-[80vh]">
        <div className='mt-5'>
        <MarcoFormDetalleContrato title={"Información del usuario"}>
          Nombre:

        </MarcoFormDetalleContrato>

          </div>
        <div className='mt-[5vh]'>
        <MarcoFormDetalleContrato title={"Información de la toma"}>
          Nombre:
          
        </MarcoFormDetalleContrato>

        </div>
       


        <div className='flex justify-end'>
        <Button className='mt-10'>Crear nuevo contrato</Button>
        </div>




      </div>




      <div>
      </div>

    </div>
  )
}
