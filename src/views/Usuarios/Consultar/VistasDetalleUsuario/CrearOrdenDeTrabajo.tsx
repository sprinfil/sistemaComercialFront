import React, { useState } from 'react'
import { Button } from '../../../../components/ui/button'
import ModalGenerarOrdenDeTrabajo from '../../../../components/ui/ModalGenerarOrdenDeTrabajo'
import OrdenDeTrabajoUsuarioTable from '../../../../components/Tables/Components/OrdenDeTrabajoUsuarioTable'
import { ZustandGeneralUsuario } from '../../../../contexts/ZustandGeneralUsuario'
import { MdOutlinePostAdd } from "react-icons/md";
import IconButton from '../../../../components/ui/IconButton'
import { RiUserSearchLine } from "react-icons/ri";
import { OperadoresOtIndividualComboBox } from '../../../../components/ui/OperadoresOtIndividualComboBox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form.tsx";
import { z } from "zod";
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { OrdenDeTrabajoAsignarIndividualSchema } from '../../../../components/Forms/OrdenDeTrabajoValidaciones'
import { zodResolver } from '@hookform/resolvers/zod';
import axiosClient from '../../../../axios-client.ts'
import ModalAsignarOperadorTomaOT from '../../../../components/ui/ModalAsignarOperadorTomaOT.tsx'
const CrearOrdenDeTrabajo = () => {

  const [abrirModal, setAbrirModal] = useState(false);
  const [abrirModal2, setAbrirModal2] = useState(false);

  const {usuariosEncontrados, setUsuariosEncontrados} = ZustandGeneralUsuario();

  //console.log(JSON.stringify(usuariosEncontrados));
  function handleGenerarOrdenDeTrabajo()
  {
      setAbrirModal(true);
  }

  function handleGenerarOrdenDeTrabajo2()
  {
    setAbrirModal2(true);
  }

 



 




 
  return (
    <div>
        <div className=''>
        {/*Formulario*/}

        <div className='flex space-x-2 w-full'>
          <div className='w-full'>
          <p className="text-[20px] font-medium mt-4">Ordenes de trabajo</p>
          </div>
        <div className='flex justify-end ml-[80vh] space-x-2'>
          <div title='Crear orden de trabajo'>
          <IconButton onClick={handleGenerarOrdenDeTrabajo}><MdOutlinePostAdd className='w-[5vh] h-[5vh]'/></IconButton>
          </div>
          </div>
          <IconButton onClick={handleGenerarOrdenDeTrabajo2}><RiUserSearchLine className='w-[4vh] h-[4vh]'/></IconButton>
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
        
        <ModalAsignarOperadorTomaOT
        isOpen={abrirModal2}
        setIsOpen={setAbrirModal2}
        method={""}
        tipoOperacion={"indidual"}
      />
    </div>
  )
}

export default CrearOrdenDeTrabajo