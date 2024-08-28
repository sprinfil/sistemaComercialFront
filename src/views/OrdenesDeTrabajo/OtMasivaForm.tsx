import React, { useState } from 'react'
import IconButton from '../../components/ui/IconButton'
import { MdContentPasteSearch } from 'react-icons/md'
import OrdenDeTrabajoCrearTomasTable from '../../components/Tables/Components/OrdenDeTrabajoCrearTomasTable'
import ModalGenerarOrdenDeTrabajo from '../../components/ui/ModalGenerarOrdenDeTrabajo'
import { Button } from '../../components/ui/button'

export const OtMasivaForm = () => {
    const [abrirModal, setAbrirModal] = useState(false);
    function handleGenerarOrdenDeTrabajo()
    {
        setAbrirModal(true);
    }
  return (
    <div className='w-full'>

    <div className='ml-2 mt-5 border border-border rounded p-5  mr-10 shadow-sm'>
      <div className='flex space-x-2'>
      <p className="text-muted-foreground text-[20px] mr-[100vh]">Generar ordenes de trabajo masivas</p>
        <div className='flex items-center ml-[2vh]'>
            
            <IconButton onClick={handleGenerarOrdenDeTrabajo}><MdContentPasteSearch className='w-[5vh] h-[5vh]'/></IconButton>
            </div>
      </div>
      
        <p className="text-gray-500 text-[20px] mt-5">Selecciona las tomas</p>

         
            <div>
            <OrdenDeTrabajoCrearTomasTable/>
            </div>

            <ModalGenerarOrdenDeTrabajo
            isOpen={abrirModal}
            setIsOpen={setAbrirModal}
            method={""}
            tipoOperacion={"masiva"}
            />

            <div className='flex justify-end'>
            <Button className='mt-10'>Crear orden de trabajo masiva</Button>

            </div>

        </div>

    </div>
  )
}
