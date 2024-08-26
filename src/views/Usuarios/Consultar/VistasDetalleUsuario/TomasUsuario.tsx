import React from 'react'
import InformacionGeneralForm from '../../../../components/Forms/InformacionGeneralForm.tsx'
import TomaPorUsuarioTable from '../../../../components/Tables/Components/TomaPorUsuarioTable.tsx'

const TomasUsuario = () => {
  return (
    <div>
        <div className=''>
        {/*Formulario*/}
        <p>Selecciona una toma</p>
        <TomaPorUsuarioTable/>


    </div>
    </div>
  )
}

export default TomasUsuario