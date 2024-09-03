import React, { useEffect, useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"; //IMPORTACIONES TOAST
import { ToastAction } from "@/components/ui/toast"; //IMPORTACIONES TOAST
import EscogerOrdenDeTrabajoTable from '../Tables/Components/EscogerOrdenDeTrabajoTable';
import axiosClient from '../../axios-client';
import { ZustandGeneralUsuario } from '../../contexts/ZustandGeneralUsuario';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "../../components/ui/form.tsx";
import { OperadoresOtIndividualComboBox } from './OperadoresOtIndividualComboBox.tsx';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OrdenDeTrabajoAsignarIndividualSchema } from '../Forms/OrdenDeTrabajoValidaciones.ts';
import { z } from "zod";
import { Button } from './button.tsx';
import AsignarOrdenDeTrabajoTable from '../Tables/Components/AsignarOrdenDeTrabajoTable.tsx';
import { ZustandFiltrosOrdenTrabajo } from '../../contexts/ZustandFiltrosOt.tsx';
import AsignarOrdenDeTrabajoIndividualEnDetalleUsuarioTable from '../Tables/Components/AsignarOrdenDeTrabajoIndividualEnDetalleUsuarioTable.tsx';
const ModalAsignarOperadorTomaOT = ({ isOpen, setIsOpen, method, tipoOperacion }) => {
    
    const { toast } = useToast()

console.log(tipoOperacion);

    const {usuariosEncontrados, setUsuariosEncontrados, idSeleccionadoGenerarOrdenDETrabajoToma, arrwegl} = ZustandGeneralUsuario();
    const {arregloAsignarIndividualTomaAOperador} = ZustandFiltrosOrdenTrabajo();
   // console.log(JSON.stringify(usuariosEncontrados));
   //console.log(idSeleccionadoGenerarOrdenDETrabajoToma);

   const [operadorSeleccionado, setOperadorSeleccionado ] = useState("");


    const action = () => {
        method();
        setIsOpen(false);
    }

    const [consultaIdToma, setConsultaIdToma] = useState<Usuario| null>(null);
    const [idDeLaTomaParametro, setIdDeLaTomaParametro] = useState(0)

    //SE DECLARA EL OBJETO USUARIO Y TOMAS
    //USUARIO ES UN OBJETO PERO TOMAS ES UN ARRAY DENTRO DEL OBJETO XD
    type Usuario = {
      id: number
      nombre: string
      apellido_paterno: string
      apellido_materno: string
      telefono: string
      correo: string
      curp: string
      tomas?: tomas;
    }
  
    type tomas = {
      id: number
      codigo_toma: string
      
    }

    //SETEAMOS CADA QUE SE ENCUENTRE USUARIOS

    useEffect(() => {

          setConsultaIdToma(usuariosEncontrados[0]);
        
      }, [usuariosEncontrados]);

      //console.log("Tomas ID:", consultaIdToma?.tomas[0].codigo_toma); 



      const form = useForm<z.infer<typeof OrdenDeTrabajoAsignarIndividualSchema>>({
        resolver: zodResolver(OrdenDeTrabajoAsignarIndividualSchema),
        defaultValues: {
          id: 0,
          id_empleado_encargado: 0
        },
      })
    
      function onSubmit(values: z.infer<typeof OrdenDeTrabajoAsignarIndividualSchema>)
      { 
        
        const values2 = {
          id: arregloAsignarIndividualTomaAOperador[0]?.id,
          id_empleado_encargado: values.id_empleado_encargado
        }
    
        const ordenes_trabajo = {
          ordenes_trabajo: [values2]
        }
    
        console.log(ordenes_trabajo)
    
    
    
        try{
          const response = axiosClient.put('/OrdenTrabajo/update', ordenes_trabajo)
          console.log(response);
          toast({
            title: "¡Éxito!",
            description: "La orden de trabajo se ha asignado correctamente",
            variant: "success",
            
        })
        }
        catch(response){
          console.log(response);
          toast({
            variant: "destructive",
            title: "Oh, no. Error",
            description: "Algo salió mal.",
            action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
        })
        }
      };


    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent   className="max-w-[150vh] ">
                <AlertDialogHeader>

                   
                    <AlertDialogTitle>
                    
                        Asignar operador

                    </AlertDialogTitle>
                    
               
                    <AlertDialogTitle><div className='text-xs text-gray-600'>Asigna un operador a la toma.</div></AlertDialogTitle>
                    <AlertDialogDescription>

                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    <FormField
                        control={form.control}
                        name="id_empleado_encargado"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Selecciona el operador</FormLabel>
                            <div className='flex space-x-2'>
                              <div className='w-[112vh]'>
                              <OperadoresOtIndividualComboBox form={form} field={field} name="id_empleado_encargado" setCargoSeleccionado={setOperadorSeleccionado} />

                              </div>
                            <Button type='submit'>Asignar</Button>
                              </div>
                           
                            <FormDescription>
                            El nombre del operador.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <div className=''>
                    </div>

                    </form>
                </Form>


                <AsignarOrdenDeTrabajoIndividualEnDetalleUsuarioTable />


                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setIsOpen(false)}>Cancelar</AlertDialogCancel>
                </AlertDialogFooter>

            </AlertDialogContent>
        </AlertDialog>
    );
}

export default ModalAsignarOperadorTomaOT;
