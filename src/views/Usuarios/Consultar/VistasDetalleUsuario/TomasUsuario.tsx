import React from 'react'
import InformacionGeneralForm from '../../../../components/Forms/InformacionGeneralForm.tsx'
import TomaPorUsuarioTable from '../../../../components/Tables/Components/TomaPorUsuarioTable.tsx'

const TomasUsuario = () => {
  return (
    <div>
        <div className='w-full rounded-md border border-border h-[81vh] p-4 overflow-auto'>
        {/*Formulario*/}
        <p>Selecciona una toma</p>
        <TomaPorUsuarioTable/>


    </div>
    </div>
  )
}

export default TomasUsuario