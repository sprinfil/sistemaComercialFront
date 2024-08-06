import React from 'react'
import InformacionFiscalForm from '../../../../components/Forms/InformacionFiscalForm'

const InformaciónFiscal = () => {
  return (
    <div>
        <div className=' w-full rounded-md border border-border h-[77vh] p-4 overflow-auto'>
        {/*Formulario*/}
        <InformacionFiscalForm/>
    </div>
    </div>
  )
}

export default InformaciónFiscal