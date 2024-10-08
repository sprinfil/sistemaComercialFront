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
import { FaChevronLeft } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
export const DetalleInformacionContrato = () => {
  const { toast } = useToast()


  const [mostrarBoton, setMostrarBoton] = useState();
  const navigate = useNavigate();

  const {contrato, direccion_notificaciones, libroToma, idGiroComercial,giroComercial, calleSeleccionada, coloniaSeleccionada, entreCalle1Seleccionada, 
    entreCalle2Seleccionada,servicioContratado,servicioContratado2, tipoDeToma,tomaPreContratada,setIsCheckInspeccion, boolPeticionContratacion,

    isCheckInspeccion, setBooleanModalSubirArchivosContratacion, idContrato, setIdContrato,nombreGiroComercial, esPreContratado,puntoTomaLatitudLongitudAPI,
    getCoordenadaString2, setTomaPreContratada, setBoolPeticionContratacion,contratoLocalStorage,
    nombreCalle, nombreEntreCalle1,nombreEntreCalle2,nombreColonia, nombreGiroComercial2, tipoTomaNombre
  ,servicioAguaNombre, servicioAlcSan, setContratoLocalStorage, setNombreGiroComercial, setNombreGiroComercial2} = ZustandFiltrosContratacion();

    console.log(servicioAguaNombre);

    
    console.log(localStorage.getItem("contrato"));
    console.log(localStorage.getItem("libro"));
    console.log(localStorage.getItem("notificaciones"));
    const contratoConvertido = JSON.parse(localStorage.getItem("contrato"));
    console.log(contratoConvertido);
    console.log(giroComercial);

      //contratacion obtenemos y despues lo parseamos 
      const contratacionLocalStorage = localStorage.getItem("contrato");
      const contratacionConvertido = JSON.parse(contratacionLocalStorage); 

      const [verMapa, setVerMapa] = useState<boolean>(false);


    const libroLocalStorage = localStorage.getItem("libro");
    const NotificacionesLocalStorage = localStorage.getItem("notificaciones");




  const generarSolicitud = async () => {

    const coordenadaString = getCoordenadaString2();

    if(esPreContratado)
    {
      const values = {
        contrato: contratacionConvertido,
        solicitud_factibilidad: isCheckInspeccion,
      }
  
      console.log(values);
  
      try{
          const response = await axiosClient.post("contratos/create", values);
          console.log(response.data.contrato[0]?.id);
          setIdContrato(response.data.contrato[0]?.id_toma)
          toast({
            title: "¡Éxito!",
            description: "El contrato se ha creado correctamente",
            variant: "success",
  
        })
        setBooleanModalSubirArchivosContratacion(true);
          console.log(response);
      }
      catch(err)
      {
        console.log(err);
        const message = err.response.data.message;
        toast({
          variant: "destructive",
          title: "Oh, no. Error",
          description: message,
          action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
      })
      }
    }
    else
    {
      const values = {
        contrato: contratacionConvertido,
        solicitud_factibilidad: isCheckInspeccion,
        toma: {
          id_libro: libroLocalStorage,
          id_giro_comercial: contrato.id_giro_comercial,
          direccion_notificacion: NotificacionesLocalStorage,
        }
      }
  
      console.log(values);
  
      try{
          const response = await axiosClient.post("contratos/create", values);
          console.log(response.data.contrato[0]?.id);
          setIdContrato(response.data.contrato[0]?.id_toma)
          toast({
            title: "¡Éxito!",
            description: "El contrato se ha creado correctamente",
            variant: "success",
  
        })
        setBooleanModalSubirArchivosContratacion(true);
        setMostrarBoton(true);
          console.log(response);
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

    //ELIMINACION DEL CONTRATO DEL LOCAL STORAGE
    localStorage.removeItem("contrato");
    localStorage.removeItem("libro");
    localStorage.removeItem("notificaciones");

  }




  console.log(servicioContratado);

  const regresarCrearContratoForm = () => {
    navigate("/Contrato/Usuario");
    setContratoLocalStorage(true);
};

//PARA PODER MOSTRAR EL MAPA
const apiKey = 'AIzaSyAnqFPxn8eq_QFwi9HES_LbnyuNmnhf2rA'; //API KEY
const lat = contratacionConvertido?.coordenada[0]; //LATITUD
const lng = contratacionConvertido?.coordenada[1];  //LONGITUD
const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&zoom=19&q=${lat},${lng}`;

console.log(verMapa);
  return (
    <div className=''>
      {!mostrarBoton &&
             <div className=' flex space-x-1 w-[4.5vh] h-[4.5vh] ml-2 mt-4'>
              
             <div>
             <IconButton onClick={regresarCrearContratoForm}>
             <FaChevronLeft className='w-[3vh] h-[3vh]'/>
           
             </IconButton>
             </div>
          
             <div className='text-lg mt-1'>
                 Regresar
             </div>
             </div>
      }

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

    {boolPeticionContratacion ?
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
           <TableCell className="font-medium">{nombreGiroComercial}</TableCell>
           <TableCell className="font-medium">{contrato.municipio}</TableCell>
                   <TableCell className="font-medium">

                   {servicioContratado + ", " + servicioContratado2}
    
       </TableCell>
          
         
           <TableCell className="font-medium">{contrato.tipo_contratacion}</TableCell>
           <TableCell className="font-medium">{tipoDeToma}</TableCell>

         </TableRow>
     </TableBody>
     <TableFooter>
       <TableRow>
       </TableRow>
     </TableFooter>
   </Table>
     :

     !tomaPreContratada ?
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
           <TableCell className="font-medium">{nombreGiroComercial}</TableCell>
           <TableCell className="font-medium">{contrato.municipio}</TableCell>
           <TableCell className="font-medium">
           {(servicioContratado|| "") + ("," + servicioContratado2 || "")}
           
          </TableCell>
       
           <TableCell className="font-medium">{contrato.tipo_contratacion}</TableCell>
           <TableCell className="font-medium">{tipoDeToma}</TableCell>

         </TableRow>
     </TableBody>
     <TableFooter>
       <TableRow>
       </TableRow>
     </TableFooter>
   </Table>
   :
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
           {"Calle " + nombreCalle + " " + contrato.num_casa + ", Colonia " + nombreColonia + ", Entre calles " + (nombreEntreCalle1 || "") + ", " + 
           (nombreEntreCalle2 || "") + ", Codigo postal " + contrato.codigo_postal}
           </TableCell>
           <TableCell className="font-medium">{contrato.localidad}</TableCell>
         <TableCell className="font-medium">{nombreGiroComercial2}</TableCell>
         <TableCell className="font-medium">{contrato.municipio}</TableCell>
         <TableCell className="font-medium">
         {(servicioContratado|| "") + (servicioContratado2 || "")}
         {servicioAguaNombre == "0" && "Agua"}
         {servicioAlcSan == "0" && ",Alcantarillado y Saneamiento"}

        </TableCell>
     
         <TableCell className="font-medium">{contrato.tipo_contratacion}</TableCell>
         <TableCell className="font-medium">{tipoTomaNombre}</TableCell>

       </TableRow>
   </TableBody>
   <TableFooter>
     <TableRow>
     </TableRow>
   </TableFooter>
 </Table>
    }
       
          
          </div>
         
         
            
          
          <div className='mt-10 p-2'>
          <h2 className="text-2xl  mb-4">
          Dirección alternativa de notificaciones
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
           
   
           
           
          

      

          {/**CHECK PARA LA INSPECCIÓN */}

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

            { !mostrarBoton &&
              <div className='flex space-x-2 mt-[3vh]'>
              <div className='text-xl'>
                Ver ubicación de la toma:
                </div>
                  <div className='w-[5vh] h-[5vh] mt-1'>
                  <Checkbox className='w-[2.5vh] h-[2.5vh]'
                    checked={verMapa}
                    onCheckedChange={(checked) => setVerMapa(checked === true)}/>
                  </div>

            </div>}
     

          {/**AQUI MUESTRA EL MAPA */}

            {
              verMapa && !mostrarBoton &&
              <div>
                <iframe
                  className='w-full'
                  height="450"
                  src={mapSrc}
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>

                  </div>

            }
     


        <div className='flex justify-end'>
          {!mostrarBoton &&          
          <Button className='mt-8' onClick={generarSolicitud}>Crear solicitud de contrato</Button>
          }
        </div>


          <ModalSubirArchivosContratacion/>

      </div>




      <div>
      </div>

    </div>
  )
}
