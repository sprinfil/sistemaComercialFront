import React from 'react'
import AsignarOrdenDeTrabajoTable from '../../components/Tables/Components/AsignarOrdenDeTrabajoTable'
import FiltrosAsignarOTMasiva from './FiltrosAsignarOTMasiva'
import { OtMasivaForm } from './OtMasivaForm'
export const AsignarOTMasiva = () => {
  return (
    <div>
      <div className='border boder-boder rounded-sm ml-10 p-5 mr-10 mt-5 shadow-sm'>

      <p className="text-muted-foreground text-[20px]">Asignar ordenes de trabajo masivas</p>
      <p className="text-gray-500 text-[20px] mt-5">Selecciona a quien deseas asignar.</p>
      <AsignarOrdenDeTrabajoTable/>

      </div>
     

    </div>
  )
}
