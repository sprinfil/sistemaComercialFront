import React, {useState} from 'react'
import MarcoForm from '../../../components/ui/MarcoForm'
import MarcoFormDetalleContrato from '../../../components/ui/MarcoFormDetalleContrato'
import { Button } from '../../../components/ui/button'
import { ZustandFiltrosContratacion } from '../../../contexts/ZustandFiltrosContratacion'
import { useToast } from "@/components/ui/use-toast"; //IMPORTACIONES TOAST
import { ToastAction } from "@/components/ui/toast"; //IMPORTACIONES TOAST
import axiosClient from '../../../axios-client'
import { Checkbox } from '../../../components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import IconButton from '../../../components/ui/IconButton'
import { MdOutlineDeleteForever } from "react-icons/md";
import ModalSubirArchivosContratacion from '../../../components/ui/ModalSubirArchivosContratacion'

export const DetalleInformacionContrato = () => {
  const { toast } = useToast()



  const {contrato, direccion_notificaciones, libroToma, idGiroComercial,giroComercial, calleSeleccionada, coloniaSeleccionada, entreCalle1Seleccionada, 
    entreCalle2Seleccionada,servicioContratado,servicioContratado2, tipoDeToma,tomaPreContratada,setIsCheckInspeccion, 
    isCheckInspeccion, setBooleanModalSubirArchivosContratacion, idContrato, setIdContrato} = ZustandFiltrosContratacion();

  console.log(contrato);
  console.log(direccion_notificaciones);




  console.log(idContrato);

 



  const generarSolicitud = async () => {



    const values = {
      contrato: contrato,
      solicitud_factibilidad: isCheckInspeccion,
      toma: {
        id_libro: libroToma,
        id_giro_comercial: idGiroComercial,
        direccion_notificaciones: direccion_notificaciones
      }
    }

    console.log(values);

    try{
        const response = await axiosClient.post("contratos/create", values);
        console.log(response.data.contrato[0]?.id);
        setIdContrato(response.data.contrato[0]?.id)
        toast({
          title: "¡Éxito!",
          description: "El contrato se ha creado correctamente",
          variant: "success",

      })
      setBooleanModalSubirArchivosContratacion(true);

    }
    catch(response)
    {
      console.log(response);
      
      toast({
        variant: "destructive",
        title: "Oh, no. Error",
        description: "Algo salio mal",
        action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
    })
    }
  }










  return (
    <div className=''>
     <div className="flex items-center justify-start bg-muted ">
     
    </div>

    <div className="border border-border rounded shadow-lg p-6 w-[200vh] mx-auto mt-5 h-auto">

      <h1 className="text-3xl mb-[7vh]">
       Detalle de la contratación
        </h1>
        
        <div className='mt-5'>
        <h2 className="text-2xl mb-4">
       Datos del usuario
        </h2>
        <Table className="mt-3">
        <TableCaption></TableCaption>
      <TableHeader className="bg-muted">
        <TableRow>
          <TableHead>Nombre del contrato</TableHead>
      

        </TableRow>
      </TableHeader>
      <TableBody>
          <TableRow key={""}>
            <TableCell className="font-medium">{contrato.nombre_contrato}</TableCell>
        
          </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
        </TableRow>
      </TableFooter>
    </Table>
          </div>

          <div className='mt-10 p-2'>
          <h2 className="text-2xl mb-4">
          Datos de la toma
        </h2>
          <Table className="mt-3">
      <TableCaption></TableCaption>
      <TableHeader className="bg-muted">
        <TableRow>
          <TableHead>Clave catastral</TableHead>
          <TableHead>Direccion</TableHead>
          <TableHead>Localidad</TableHead>
          <TableHead>Giro comercial</TableHead>
          <TableHead>Municipio</TableHead>
          <TableHead>Servicios contratados</TableHead>
          <TableHead>Tipo de contratación</TableHead>
          <TableHead>Tipo de toma</TableHead>

        </TableRow>
      </TableHeader>
      <TableBody>
          <TableRow key={""}>
            <TableCell className="font-medium"> {contrato.clave_catastral}</TableCell>
            <TableCell className="font-medium"> 
              {"Calle " + calleSeleccionada + " " + contrato.num_casa + ", Colonia " + coloniaSeleccionada + ", Entre calles " + entreCalle1Seleccionada + ", " + 
              entreCalle2Seleccionada + ", Codigo postal " + contrato.codigo_postal}
              </TableCell>
              <TableCell className="font-medium">{contrato.localidad}</TableCell>
            <TableCell className="font-medium">{giroComercial}</TableCell>
            <TableCell className="font-medium">{contrato.municipio}</TableCell>
            <TableCell className="font-medium">{servicioContratado + ", " + servicioContratado2}</TableCell>
            <TableCell className="font-medium">{contrato.tipo_contratacion}</TableCell>
            <TableCell className="font-medium">{tipoDeToma}</TableCell>

          </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
        </TableRow>
      </TableFooter>
    </Table>
          </div>
         
         
            
          
          <div className='mt-10 p-2'>
          <h2 className="text-2xl  mb-4">
          Dirección de las notificaciones
        </h2>
        <Table className="mt-3">

      <TableCaption></TableCaption>
      <TableHeader className="bg-muted">
        <TableRow>
          <TableHead>Dirección notificaciones</TableHead>
      

        </TableRow>
      </TableHeader>
      <TableBody>
          <TableRow key={""}>
            <TableCell className="font-medium">{direccion_notificaciones}</TableCell>
        
          </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
        </TableRow>
      </TableFooter>
    </Table>
         
          </div>
           
   
           
           
          

      


        <div className='flex space-x-2 mt-[3vh]'>
          <div className='text-xl'>
            Generar inspección:
            </div>
              <div className='w-[5vh] h-[5vh] mt-1'>
              <Checkbox className='w-[2.5vh] h-[2.5vh]'
                checked={isCheckInspeccion}
                onCheckedChange={setIsCheckInspeccion}/>

              </div>

        </div>

        
       


        <div className='flex justify-end'>
        <Button className='mt-10' onClick={generarSolicitud}>Crear nuevo contrato</Button>
        </div>


          <ModalSubirArchivosContratacion/>

      </div>




      <div>
      </div>

    </div>
  )
}
