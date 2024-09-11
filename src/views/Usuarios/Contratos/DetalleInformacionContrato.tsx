import React from 'react'
import MarcoForm from '../../../components/ui/MarcoForm'
import MarcoFormDetalleContrato from '../../../components/ui/MarcoFormDetalleContrato'
import { Button } from '../../../components/ui/button'
import { ZustandFiltrosContratacion } from '../../../contexts/ZustandFiltrosContratacion'
import { useToast } from "@/components/ui/use-toast"; //IMPORTACIONES TOAST
import { ToastAction } from "@/components/ui/toast"; //IMPORTACIONES TOAST
import axiosClient from '../../../axios-client'
export const DetalleInformacionContrato = () => {
  const { toast } = useToast()



  const {contrato, direccion_notificaciones} = ZustandFiltrosContratacion();

  console.log(contrato);
  console.log(direccion_notificaciones);




  const generarSolicitud = async () => {

    const values = {
      contrato: contrato,
      toma: direccion_notificaciones
    }

    try{
        const response = await axiosClient.post("contratos/create", values);
        console.log(response);
        toast({
          title: "¡Éxito!",
          description: "La anomalía se ha creado correctamente",
          variant: "success",

      })
    }
    catch(response)
    {
      console.log(response);
      const mensaje = response.data.errors;
      
      toast({
        variant: "destructive",
        title: "Oh, no. Error",
        description: mensaje,
        action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
    })
    }
  }










  return (
    <div className=''>
      <div className='text-2xl ml-5'>
      Detalle de contratación
      </div>

      <div className="border border-border rounded shadow-lg p-6 w-[210vh] ml-[9vh] mt-5 h-[80vh]">
        <div className='mt-5'>
        <MarcoFormDetalleContrato title={"Información del usuario"}>
          Nombre del contrato: {contrato.nombre_contrato}

        </MarcoFormDetalleContrato>

          </div>
        <div className='mt-[5vh]'>
        <MarcoFormDetalleContrato title={"Información de la toma"}>
          <div className='flex flex-col'>
            <div className='flex-1'>
            Clave catastral:  {contrato.clave_catastral}
            </div>
            <div className='flex-1'>
            Calle: {contrato.calle}
            </div>
            <div className='flex-1'>
            Numero de casa: {contrato.num_casa}
            </div>
            <div className='flex-1'>
            Colonia: {contrato.colonia}
            </div>
            <div className='flex-1'>
            Entre calle 1: {contrato.entre_calle_1}
            </div>
            <div className='flex-1'>
            Entre calle 2: {contrato.entre_calle_2}
            </div>
            <div className='flex-1'>
            Codigo postal: {contrato.codigo_postal}
            </div>
            <div className='flex-1'>
            Giro comercial: {contrato.id_giro_comercial}
            </div>
            <div className='flex-1'>
            Localidad: {contrato.localidad}
            </div>
            <div className='flex-1'>
            Municipio: {contrato.municipio}
            </div>
            <div className='flex-1'>
            Servicios contratados: {contrato.servicio_contratados}
            </div>
            <div className='flex-1'>
            Tipo de contratación: {contrato.tipo_contratacion}
            </div>
            <div className='flex-1'>
            Tipo de toma: {contrato.tipo_toma}
            </div>

          </div>
         

        </MarcoFormDetalleContrato>

        <MarcoFormDetalleContrato title={"Dirección de notificaciones"}>
         Direccion: {direccion_notificaciones}

        </MarcoFormDetalleContrato>


        </div>
       


        <div className='flex justify-end'>
        <Button className='mt-10' onClick={generarSolicitud}>Crear nuevo contrato</Button>
        </div>




      </div>




      <div>
      </div>

    </div>
  )
}
