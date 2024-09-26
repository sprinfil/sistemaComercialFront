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
import { crearTomaSchema } from './validacionesContratacion.ts'; 
import { CallesComboBox } from '../../../components/ui/CallesComboBox.tsx';
import { ColoniaComboBox } from '../../../components/ui/ColoniaComboBox.tsx';
import { Button } from '../../../components/ui/button.tsx';
import { Navigate, useNavigate } from 'react-router-dom';
import { ZustandFiltrosContratacion } from '../../../contexts/ZustandFiltrosContratacion.tsx';



const DireccionNotificaciones = () => {

  const [errors, setErrors] = useState({});
  const [calleSeleccionada, setCalleSeleccionada] = useState<string | null>(null);
  const [entreCalle1Seleccionada, setEntreCalle1Seleccionada] = useState<string | null>(null);
  const [entreCalle2Seleccionada, setEntreCalle2Seleccionada] = useState<string | null>(null);
  const [coloniaSeleccionada, setColoniaSeleccionada] = useState<string | null>(null);
const {direccion_notificaciones, setDireccion_Notificaciones} = ZustandFiltrosContratacion();



  
 const navigate = useNavigate();
  const form = useForm<z.infer<typeof crearTomaSchema>>({
    resolver: zodResolver(crearTomaSchema),
    defaultValues: {
        direccion: "",

    },
});

const detalleContratacion= () => 
    {
        navigate("/contrato/detalle");
    };

const onSubmit = (values: z.infer<typeof crearTomaSchema>) => {
    console.log(values);
    setDireccion_Notificaciones(values.direccion);
    localStorage.setItem("notificaciones", values.direccion); 
    detalleContratacion();
};

console.log(direccion_notificaciones);
  return (
    <div className="overflow-auto">
           
            <div className="py-[20px] px-[10px]">
        {errors.general && <Error errors={errors.general} />}
        <div>
                
                </div>
        <Form {...form}>
            
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex justify-center">
                <div className="rounded-md border border-border shadow-lg p-8 w-[200vh] ">
                <h1 className="text-3xl mb-[7vh]">
                Dirección para las notificaciones
                </h1>
                        <div className='flex space-x-2 mt-[5vh] items-center'>
                        <div className='w-full'>
                            <FormField
                                control={form.control}
                                name="direccion"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Dirección</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Escribe completa la dirección" {...field} />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        
                        <div className="flex justify-end">
                        <Button type="submit" className='flex justify-center items-center'>
                            Guardar
                        </Button>
                     </div>

                        </div>
                        
                    </div>
                      
                        </form>
                        </Form>
                        </div>
                        </div>  

                      )
                    }

                    
export default DireccionNotificaciones;