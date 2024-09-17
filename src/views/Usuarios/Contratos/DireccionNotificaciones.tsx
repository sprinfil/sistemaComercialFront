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
const DireccionNotificaciones = () => {
  const [errors, setErrors] = useState({});
  const [calleSeleccionada, setCalleSeleccionada] = useState<string | null>(null);
  const [entreCalle1Seleccionada, setEntreCalle1Seleccionada] = useState<string | null>(null);
  const [entreCalle2Seleccionada, setEntreCalle2Seleccionada] = useState<string | null>(null);
  const [coloniaSeleccionada, setColoniaSeleccionada] = useState<string | null>(null);

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
    detalleContratacion();
};



  return (
    <div className="overflow-auto">
            <div className='flex h-[40px] items-center mb-[10px] bg-card rounded-sm'>
                <div className='h-[20px] w-full flex items-center justify-end '>
                    <div className="mb-[10px] h-full w-full mx-4">


                 <p className="text-[30px] font-medium ml-3">Direccion para notificaciones</p>
                        <div className="text-[20px] font-medium mt-10 ml-5">Usuario:</div>

                        
                    </div>
                     </div>
            </div>
            <div className="py-[20px] px-[10px] mt-[5vh]">
        {errors.general && <Error errors={errors.general} />}
        <div>
                
                </div>
        <Form {...form}>
            
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex justify-center mt-10 mb-[15vh]">
                <div className="rounded-md border border-border shadow-lg p-8 w-[215vh] ">
                    <div className="text-[20px] font-medium">Toma:</div>
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
                        
                        <div className="flex justify-end mt-[3vh]">
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