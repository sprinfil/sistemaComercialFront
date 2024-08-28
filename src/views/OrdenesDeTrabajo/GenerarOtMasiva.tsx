import React, { useState } from 'react'
import { Button } from '../../components/ui/button';
import ModalGenerarOrdenDeTrabajo from '../../components/ui/ModalGenerarOrdenDeTrabajo';
import { MdContentPasteSearch } from "react-icons/md";
import IconButton from '../../components/ui/IconButton';
import OrdenDeTrabajoCrearTomasTable from '../../components/Tables/Components/OrdenDeTrabajoCrearTomasTable';
export const GenerarOtMasiva = () => {

  const [abrirModal, setAbrirModal] = useState(false);

  function handleGenerarOrdenDeTrabajo()
  {
      setAbrirModal(true);
  }

  return (
    <div>

    <div className='ml-14 mt-5 border border-border rounded p-5 w-[210vh] mr-10 shadow-sm'>
    <p className="text-muted-foreground text-[20px]">Generar ordenes de trabajo masivas</p>
    <p className="text-gray-500 text-[20px] mt-5">Selecciona las tomas</p>

        <div className='ml-[195vh] w-[8.5vh] h-[8.5vh]'>
          
          <IconButton onClick={handleGenerarOrdenDeTrabajo}><MdContentPasteSearch className='w-[9vh] h-[9vh]'/></IconButton>
        </div>

        <div>
        <OrdenDeTrabajoCrearTomasTable/>
        </div>

        <ModalGenerarOrdenDeTrabajo
          isOpen={abrirModal}
          setIsOpen={setAbrirModal}
          method={""}
        />

          <div className='flex justify-end'>
          <Button className='mt-10'>Crear orden de trabajo masiva</Button>

          </div>

    </div>
  
    </div>
  )
}
