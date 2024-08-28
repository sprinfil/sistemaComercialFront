import React, { useState } from 'react'
import { Button } from '../../../../components/ui/button'
import ModalGenerarOrdenDeTrabajo from '../../../../components/ui/ModalGenerarOrdenDeTrabajo'
import OrdenDeTrabajoUsuarioTable from '../../../../components/Tables/Components/OrdenDeTrabajoUsuarioTable'
import { ZustandGeneralUsuario } from '../../../../contexts/ZustandGeneralUsuario'

const CrearOrdenDeTrabajo = () => {

  const [abrirModal, setAbrirModal] = useState(false);

  const {usuariosEncontrados, setUsuariosEncontrados} = ZustandGeneralUsuario();


  function handleGenerarOrdenDeTrabajo()
  {
      setAbrirModal(true);
  }
 
  return (
    <div>
        <div className=' w-full rounded-md border border-border h-[81vh] p-4 overflow-auto'>
        {/*Formulario*/}

        <p className="text-[20px] font-medium mx-4">Ordenes de trabajo</p>
        
        <br></br>

        <h2 className='ml-4 mt-14 text-gray-500'>Ordenes de trabajo de la toma.</h2>
        <div className='mt-10'>

        <OrdenDeTrabajoUsuarioTable/>
        </div>
          <Button onClick={handleGenerarOrdenDeTrabajo}>Generar orden de trabajo</Button>
        </div>
        <ModalGenerarOrdenDeTrabajo
          isOpen={abrirModal}
          setIsOpen={setAbrirModal}
          method={""}
        />
    
    </div>
  )
}

export default CrearOrdenDeTrabajo