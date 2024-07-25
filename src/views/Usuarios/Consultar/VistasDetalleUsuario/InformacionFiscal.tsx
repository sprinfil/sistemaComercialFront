import React from 'react'
import InformacionFiscalForm from '../../../../components/Forms/InformacionFiscalForm'

const InformaciónFiscal = ({idUsuario}) => {
  return (
    <div>
        <div className=' w-full rounded-md border border-border h-[88vh] p-4 overflow-auto'>
        {/*Formulario*/}
        <InformacionFiscalForm userId = {idUsuario}/>
    </div>
    </div>
  )
}

export default InformaciónFiscal