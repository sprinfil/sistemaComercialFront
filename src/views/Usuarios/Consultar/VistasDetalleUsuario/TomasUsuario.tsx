import React from 'react'
import InformacionGeneralForm from '../../../../components/Forms/InformacionGeneralForm.tsx'
import TomaPorUsuarioTable from '../../../../components/Tables/Components/TomaPorUsuarioTable.tsx'

const TomasUsuario = ({idUsuario}) => {
  return (
    <div>
        <div className='w-full rounded-md border border-border h-[88vh] p-4 overflow-auto'>
        {/*Formulario*/}
        <p>Selecciona una toma</p>
        <TomaPorUsuarioTable idUsuario={idUsuario}/>


    </div>
    </div>
  )
}

export default TomasUsuario