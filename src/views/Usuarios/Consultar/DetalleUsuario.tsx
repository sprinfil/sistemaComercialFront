import React, { useEffect, useState } from 'react'
import MenuLateral from '../../../components/ui/MenuLateral'
import InformacionFiscal from './VistasDetalleUsuario/InformacionFiscal'
import { useStateContext, ContextProvider } from '../../../contexts/ContextDetalleUsuario'
import PantallaDetalleUsuario from './VistasDetalleUsuario/PantallaDetalleUsuario'
import InformacionPensionado from './VistasDetalleUsuario/InformacionPensionado'
import InformaciónGeneral from './VistasDetalleUsuario/InformaciónGeneral'
import { columns, ContratoBuscarUsuario } from "../../../components/Tables/Columns/ContratoConsultaUsuarioColumns";
import { useLocation } from 'react-router-dom';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { informaciongeneralSchema } from '../../../components/Forms/informacionGeneralValidaciones.ts'

const DetalleUsuario = () => {

  const { pantalla} = useStateContext();
  const location = useLocation();
  const contratoBuscarUsuario = location.state?.contratoBuscarUsuario || {};
  console.log("aver que dato pasa informacion fiscal =", JSON.stringify(contratoBuscarUsuario, null, 2)); //POR SI QUIERES CONVERGTIR UN OBJETO A JSON


  const form = useForm<z.infer<typeof informaciongeneralSchema>>({
    resolver: zodResolver(informaciongeneralSchema),
    defaultValues: {
      id: contratoBuscarUsuario.id || '', // Asegúrate de que el id tenga un valor predeterminado
      nombre: contratoBuscarUsuario.nombre || '',
      apellidopaterno: contratoBuscarUsuario.apellido_paterno || '',
      apellidomaterno: contratoBuscarUsuario.apellido_materno || '',
      telefono: contratoBuscarUsuario.telefono || '',
      curp: contratoBuscarUsuario.curp || '',
      rfc: contratoBuscarUsuario.rfc || '',
      correo: contratoBuscarUsuario.correo || '',
    },
  });


  const [mostrarPantalla, setMostrarPantalla] = useState();

  useEffect(()=>{
    setMostrarPantalla(pantalla)
    console.log(pantalla);
  },[pantalla]
)

  const options = [
    {
      titulo: "Principal",
      opciones: [
        {
          nombre: "Información Principal",
          pantalla:  <InformaciónGeneral />
        },
        {
          nombre: "Fiscal",
          pantalla:  <InformacionFiscal idUsuario={contratoBuscarUsuario.id}/>
        },
        {
          nombre: "Pensionado",
          pantalla:  <InformacionPensionado />
        },
      ]
    }
  ]

  return (
    <>
      <ContextProvider>
        <div>
          <div className='flex gap-2 mt-2'>
            <div className='w-[300px]'>
              <MenuLateral options={options}  context = {useStateContext}/>
            </div>
            <div className='w-full '>
              <PantallaDetalleUsuario/>
            </div>
          </div>
        </div>
      </ContextProvider>

    </>

  )
}

export default DetalleUsuario
