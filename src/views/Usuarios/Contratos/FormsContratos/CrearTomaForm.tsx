import React,{useState} from 'react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form.tsx";
import { Input } from '../../../../components/ui/input.tsx';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodBigInt } from "zod";
import { crearTomaSchema } from '../validacionesContratacion.ts';
import { CallesComboBox } from '../../../../components/ui/CallesComboBox.tsx';
import { ColoniaComboBox } from '../../../../components/ui/ColoniaComboBox.tsx';
import { Button } from '../../../../components/ui/button.tsx';
import { Navigate, useNavigate } from 'react-router-dom';




const CrearTomaForm = () => {
  const [errors, setErrors] = useState({});
  const [calleSeleccionada, setCalleSeleccionada] = useState<string | null>(null);
  const [entreCalle1Seleccionada, setEntreCalle1Seleccionada] = useState<string | null>(null);
  const [entreCalle2Seleccionada, setEntreCalle2Seleccionada] = useState<string | null>(null);
  const [coloniaSeleccionada, setColoniaSeleccionada] = useState<string | null>(null);

 const navigate = useNavigate();
  const form = useForm<z.infer<typeof crearTomaSchema>>({
    resolver: zodResolver(crearTomaSchema),
    defaultValues: {
        giro_comercial: "",
        colonia:"",
        localidad:"",
        calle_notificaciones:"",

    },
});

const handleNavigationMapaToma = () => {
    navigate("/mapa/toma");
};

const onSubmit = (values: z.infer<typeof crearTomaSchema>) => {
  // Handle form submission
};



  return (
    <div className="overflow-auto">
            <div className='flex h-[40px] items-center mb-[10px] bg-card rounded-sm'>
                <div className='h-[20px] w-full flex items-center justify-end '>
                    <div className="mb-[10px] h-full w-full mx-4">


                 <p className="text-[30px] font-medium ml-3">Toma</p>
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
                                        <FormLabel>Número de casa</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Escribe el número de casa" {...field} />
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
                                        <ColoniaComboBox form={form} field={field} name="colonia" setCargoSeleccionado={setColoniaSeleccionada}/>
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
                                        <CallesComboBox form={form} field={field} name="entre_calle_1" setCargoSeleccionado={setEntreCalle1Seleccionada}/>
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
                                        <CallesComboBox form={form} field={field} name="entre_calle_2" setCargoSeleccionado={setEntreCalle2Seleccionada}/>
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            
                           </div>
                        </div>
                        <div className="flex justify-end mt-[5vh]">
                        <Button type="button" className='flex justify-center items-center' onClick={handleNavigationMapaToma}>
                            Guardar
                        </Button>
                     </div>

                        </div>

                        </form>
                        </Form>
                        </div>
                        </div>  

                      )
                    }
export default CrearTomaForm;