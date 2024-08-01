import React from 'react'
import InformacionGeneralForm from '../../../../components/Forms/InformacionGeneralForm.tsx'

const InformaciónGeneral = () => {
  return (
    <div>
        <div className='w-full rounded-md border border-border h-[81vh] p-4 overflow-auto'>
        {/*Formulario*/}
        <InformacionGeneralForm/>
    </div>
    </div>
  )
}

export default InformaciónGeneral