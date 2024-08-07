import React,{useState} from 'react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form.tsx";
import { Input } from '../../../components/ui/input.tsx';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { crearContratoSchema } from './validacionesContratacion.ts'; 
import { CallesComboBox } from '../../../components/ui/CallesComboBox.tsx';
import { ColoniaComboBox } from '../../../components/ui/ColoniaComboBox.tsx';
import { Button } from '../../../components/ui/button.tsx';
import { Navigate, useNavigate } from 'react-router-dom';
const DireccionNotificaciones = () => {
  const [errors, setErrors] = useState({});
  const [calleSeleccionada, setCalleSeleccionada] = useState<string | null>(null);

 const navigate = useNavigate();
  const form = useForm<z.infer<typeof crearContratoSchema>>({
    resolver: zodResolver(crearContratoSchema),
    defaultValues: {
        id_usuario: 1,
        id_giro_comercial: 1,
        id_libro: 1,
        id_codigo_toma: 1,
        clave_catastral: "",
        calle:"",
        entre_calle_1: "",
        entre_calle_2:"",
        colonia: "",
        codigo_postal:"",
        localidad: "",
        diametro_toma:"" ,
        calle_notificaciones:"" ,
        entre_calle_notificaciones_2:"" ,
        tipo_servicio: "",
        tipo_toma: "",
        tipo_contratacion:"" ,
        c_agua: false,
        c_alc: false,
        c_san: false,

    },
});

const handleNavigationMapaToma = () => {
    navigate("/mapa/toma");
};

const onSubmit = (values: z.infer<typeof crearContratoSchema>) => {
  // Handle form submission
};



  return (
    <div className="overflow-auto">
            <div className='flex h-[40px] items-center mb-[10px] bg-card rounded-sm'>
                <div className='h-[20px] w-full flex items-center justify-end '>
                    <div className="mb-[10px] h-full w-full mx-4">


                    <div className="flex items-center space-x-[150vh] mt-[2vh]">
                        <div className="text-[20px] font-medium text-primary ml-[6vh]">
                            Domicilio para notificaciones
                        </div>
                        <div className="text-[17px] font-medium">
                            Usuario: 
                            <p className="text-slate-500 mb-[5vh] inline"> Miguel</p>
                        </div>
                    </div>

                        
                    </div>
                     </div>
            </div>
            <div className="py-[20px] px-[10px] mt-[5vh]">
        {errors.general && <Error errors={errors.general} />}
    
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex justify-center">
                <div className="rounded-md border border-border p-8 w-[210vh] ">
                    <div className="text-[20px] font-medium">Toma:</div>
                        <div className='flex space-x-2 mt-[5vh] items-center'>
                        <div className='w-[160vh]'>
                            <FormField
                                control={form.control}
                                name="calle"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Calle</FormLabel>
                                        <FormControl>
                                        <CallesComboBox form={form} field={field} name="calle" setCargoSeleccionado={setCalleSeleccionada}/>
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='w-[60vh]'>
                            <FormField
                                control={form.control}
                                name="numero_casa"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Numero de casa</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Escribe el numero de casa" {...field} />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        
                            
                        </div>
                        <div className='flex space-x-4'>
                        <div className="w-[160vh]">
                            <FormField
                                control={form.control}
                                name="colonia"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Colonia o fraccionamiento</FormLabel>
                                        <FormControl>
                                        <ColoniaComboBox form={form} field={field} name="colonia" setCargoSeleccionado={setCalleSeleccionada}/>
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="w-[60vh]">
                            <FormField
                                control={form.control}
                                name="codigo_postal"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Código postal</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Escribe el código postal" {...field} />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                        <div className='flex space-x-2'>
                        <div className='w-[110vh]'>
                        <FormField
                                control={form.control}
                                name="entre_calle_1"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Entre calle 1</FormLabel>
                                        <FormControl>
                                        <CallesComboBox form={form} field={field} name="entre_calle_1" setCargoSeleccionado={setCalleSeleccionada}/>
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='w-[110vh]'>
                           <FormField
                                control={form.control}
                                name="entre_calle_2"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Entre calle 2</FormLabel>
                                        <FormControl>
                                        <CallesComboBox form={form} field={field} name="entre_calle_2" setCargoSeleccionado={setCalleSeleccionada}/>
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                           </div>
                        </div>
                        <Button type="button" className='flex justify-center items-center mt-[5vh]' onClick={handleNavigationMapaToma}>Guardar</Button>

                        </div>

                        </form>
                        </Form>
                        </div>
                        </div>  

                      )
                    }
export default DireccionNotificaciones;