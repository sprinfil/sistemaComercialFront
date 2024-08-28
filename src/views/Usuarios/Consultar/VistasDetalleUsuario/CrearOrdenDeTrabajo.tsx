import React, { useState } from 'react'
import { Button } from '../../../../components/ui/button'
import ModalGenerarOrdenDeTrabajo from '../../../../components/ui/ModalGenerarOrdenDeTrabajo'
import OrdenDeTrabajoUsuarioTable from '../../../../components/Tables/Components/OrdenDeTrabajoUsuarioTable'
import { ZustandGeneralUsuario } from '../../../../contexts/ZustandGeneralUsuario'
import { MdOutlinePostAdd } from "react-icons/md";
import IconButton from '../../../../components/ui/IconButton'

const CrearOrdenDeTrabajo = () => {

  const [abrirModal, setAbrirModal] = useState(false);

  const {usuariosEncontrados, setUsuariosEncontrados} = ZustandGeneralUsuario();

  //console.log(JSON.stringify(usuariosEncontrados));
  function handleGenerarOrdenDeTrabajo()
  {
      setAbrirModal(true);
  }




 
  return (
    <div>
        <div className=''>
        {/*Formulario*/}

        <div className='flex space-x-2 w-full'>
          <div className='w-full'>
          <p className="text-[20px] font-medium mt-4">Ordenes de trabajo</p>
          </div>
        <div className='flex justify-end ml-[80vh]'>
        <IconButton onClick={handleGenerarOrdenDeTrabajo}><MdOutlinePostAdd className='w-[5vh] h-[5vh]'/></IconButton>
          </div>
        </div>
        
        <h2 className='mt-5 text-gray-500'>Ordenes de trabajo de la toma.</h2>
        <div className='mt-10'>
        
        <OrdenDeTrabajoUsuarioTable/>
        </div>
       
        </div>
        <ModalGenerarOrdenDeTrabajo
          isOpen={abrirModal}
          setIsOpen={setAbrirModal}
          method={""}
          tipoOperacion={"indidual"}
        />
    
    </div>
  )
}

export default CrearOrdenDeTrabajo