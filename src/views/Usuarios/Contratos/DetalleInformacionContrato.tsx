import React, {useState} from 'react'
import MarcoForm from '../../../components/ui/MarcoForm'
import MarcoFormDetalleContrato from '../../../components/ui/MarcoFormDetalleContrato'
import { Button } from '../../../components/ui/button'
import { ZustandFiltrosContratacion } from '../../../contexts/ZustandFiltrosContratacion'
import { useToast } from "@/components/ui/use-toast"; //IMPORTACIONES TOAST
import { ToastAction } from "@/components/ui/toast"; //IMPORTACIONES TOAST
import axiosClient from '../../../axios-client'
import { Checkbox } from '../../../components/ui/checkbox'
export const DetalleInformacionContrato = () => {
  const { toast } = useToast()



  const {contrato, direccion_notificaciones, libroToma, idGiroComercial,giroComercial, calleSeleccionada, coloniaSeleccionada, entreCalle1Seleccionada, 
    entreCalle2Seleccionada,servicioContratado,servicioContratado2, tipoDeToma} = ZustandFiltrosContratacion();

  console.log(contrato);
  console.log(direccion_notificaciones);


  const [files, setFiles] = useState<FileList | null>(null);



  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(event.target.files);
    }
  };


  const generarSolicitud = async () => {


    if (files) {
      // Aquí puedes procesar los archivos, por ejemplo, subirlos a un servidor
      Array.from(files).forEach(file => {
        console.log(file.name);
      });
    }


    const values = {
      contrato: contrato,
      toma: {
        id_libro: libroToma,
        id_giro_comercial: idGiroComercial,
        direccion_notificaciones: direccion_notificaciones
      }
    }

    console.log(values);

    try{
        const response = await axiosClient.post("contratos/create", values);
        console.log(response);
        toast({
          title: "¡Éxito!",
          description: "El contrato se ha creado correctamente",
          variant: "success",

      })
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
      <div className='text-2xl ml-5'>
      Detalle de contratación
      </div>

      <div className="border border-border rounded shadow-lg p-6 w-[210vh] ml-[9vh] mt-5 h-[120vh]">
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
            Calle: {calleSeleccionada}
            </div>
            <div className='flex-1'>
            Numero de casa: {contrato.num_casa}
            </div>
            <div className='flex-1'>
            Colonia: {coloniaSeleccionada}
            </div>
            <div className='flex-1'>
            Entre calle 1: {entreCalle1Seleccionada}
            </div>
            <div className='flex-1'>
            Entre calle 2: {entreCalle2Seleccionada}
            </div>
            <div className='flex-1'>
            Codigo postal: {contrato.codigo_postal}
            </div>
            <div className='flex-1'>
            Giro comercial: {giroComercial}
            </div>
            <div className='flex-1'>
            Localidad: {contrato.localidad}
            </div>
            <div className='flex-1'>
            Municipio: {contrato.municipio}
            </div>
            <div className='flex-1'>
            Servicios contratados: {servicioContratado + ", " + servicioContratado2}
            </div>
            <div className='flex-1'>
            Tipo de contratación: {contrato.tipo_contratacion}
            </div>
            <div className='flex-1'>
            Tipo de toma: {tipoDeToma}
            </div>

          </div>
         

        </MarcoFormDetalleContrato>

        <MarcoFormDetalleContrato title={"Dirección de notificaciones"}>
         Direccion: {direccion_notificaciones}

        </MarcoFormDetalleContrato>


        </div>
        <div className='flex space-x-2 mb-[5vh]'>
          <div className='text-xl'>
            Generar inspección:
            </div>
              <div className='w-[5vh] h-[5vh] mt-1'>
              <Checkbox className='w-[2.5vh] h-[2.5vh]'/>

              </div>

        </div>

        
        <input 
        type="file" 
        name="archivo" 
        id="archivo" 
        multiple 
        onChange={handleFileChange} 
      />
        <div className='flex justify-end'>
        <Button className='mt-10' onClick={generarSolicitud}>Crear nuevo contrato</Button>
        </div>




      </div>




      <div>
      </div>

    </div>
  )
}
