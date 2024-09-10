import React from 'react'
import InformacionGeneralForm from '../../../../components/Forms/InformacionGeneralForm.tsx'
import TomaPorUsuarioTable from '../../../../components/Tables/Components/TomaPorUsuarioTable.tsx'
import { Button } from '../../../../components/ui/button.tsx'
import ModalImportarTomas from '../../../../components/ui/ModalImportarTomas.tsx'

const TomasUsuario = () => {
  return (
    <div>
      <div className='w-full'>
        {/*Formulario*/}
        <div className='w-full flex justify-between items-center'>
          <p>Selecciona una toma</p>
          <ModalImportarTomas trigger={
            <Button>Importar Tomas</Button>
          } />
        </div>
        <TomaPorUsuarioTable />
      </div>
    </div>
  )
}

export default TomasUsuario