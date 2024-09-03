import React, { useState } from 'react';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../../../components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { crearContratoSchema } from '../validacionesContratacion'; 
import { z } from "zod";
import { Input } from '../../../../components/ui/input.tsx';
import Loader from "../../../../components/ui/Loader.tsx";
import { Button } from '../../../../components/ui/button.tsx';
import { Switch } from '../../../../components/ui/switch.tsx';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
export const CrearContratoForm = () => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const form = useForm<z.infer<typeof crearContratoSchema>>({
        resolver: zodResolver(crearContratoSchema),
        defaultValues: {
            id_usuario: 1,
            id_giro_comercial: 1,
            id_libro: 1,
            codigo_toma: 1,
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

    const onSubmit = (values: z.infer<typeof crearContratoSchema>) => {
        // Handle form submission
    };

    return (
        <div className="overflow-auto">
            <div className='flex h-[40px] items-center mb-[10px] bg-card rounded-sm'>
                <div className='h-[20px] w-full flex items-center justify-end '>
                    <div className="mb-[10px] h-full w-full mx-4">
                        <p className="text-[20px] font-medium">Crear contrato</p>
                    </div>
                </div>
            </div>
            <div className="py-[20px] px-[10px]">
        {errors.general && <Error errors={errors.general} />}
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="rounded-md border border-border p-8">
                    <div className="w-[full]">
                        <FormField
                            control={form.control}
                            name="clave_catastral"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Clave catastral</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Escribe su clave catastral" {...field} />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        </div>
                        <div className='flex space-x-2'>
                            <div className='w-[120vh]'>
                            <FormField
                                control={form.control}
                                name="tipo_toma"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tipo de toma</FormLabel>
                                        <FormControl>
                                        <Select
                                        onValueChange={(value) => field.onChange(value === 'si')}
                                        defaultValue={field.value ? 'si' : 'no'}
                                        >
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona tipo de toma" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                        <SelectItem value="domestica">Domestica</SelectItem>
                                        <SelectItem value="comercial">Comercial</SelectItem>
                                        <SelectItem value="industrial">Industrial</SelectItem>
                                        
                                        </SelectContent>
                                    </Select>
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            </div>
                                <div className='w-[120vh]'>
                                <FormField
                                control={form.control}
                                name="tipo_toma"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Diametro de la toma</FormLabel>
                                        <FormControl>
                                        <Select
                                        onValueChange={(value) => field.onChange(value === 'si')}
                                        defaultValue={field.value ? 'si' : 'no'}
                                        >
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona el diametro de la toma" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                        <SelectItem value="2-pulgadas">2"</SelectItem>
                                        <SelectItem value="4-pulgadas">4"</SelectItem>
                                        
                                        </SelectContent>
                                    </Select>
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                                </div>
                            
                        </div>
                        
                        <div className='flex space-x-2'>
                        <div className='w-[160vh]'>
                            <FormField
                                control={form.control}
                                name="calle"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Calle</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Escribe la calle" {...field} />
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
                                        <FormLabel>Colonia</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Escribe la colonia" {...field} />
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
                                            <Input placeholder="Entre calle 1" {...field} />
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
                                            <Input placeholder="Entre calle 2" {...field} />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                           </div>
                        </div>
                        
                    
                    <div className='flex flex-col space-y-4'>
                        <FormField
                            control={form.control}
                            name="localidad"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Localidad</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Escribe el nombre de la localidad" {...field} />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='flex space-x-2'>

                    </div>
    <div className='mt-2'>Selecciona servicios a contratar</div>
    <div className='flex space-x-8 mt-2'>
    
    <div className='flex space-x-5 border rounded-md border-border p-5 w-[55vh]'>
        <FormField
            control={form.control}
            name="c_agua"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="items-center">Agua</FormLabel>
                    <FormControl className="ml-4">         
                        <Switch
                            checked={field.value}
                            onCheckedChange={(checked) => field.onChange(checked)}
                        />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="c_alc"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="items-center">Alcantarillado</FormLabel>
                    <FormControl className="ml-4">         
                        <Switch
                            checked={field.value}
                            onCheckedChange={(checked) => field.onChange(checked)}
                        />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="c_san"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="items-center">Saneamiento</FormLabel>
                    <FormControl className="ml-4">         
                        <Switch
                            checked={field.value}
                            onCheckedChange={(checked) => field.onChange(checked)}
                        />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                </FormItem>
            )}
        />
    </div>
    <div className='w-[30vh]'>
        <FormField
            control={form.control}
            name="tipo_contratacion"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Tipo de contratación</FormLabel>
                    <FormControl>
                        <Select
                            onValueChange={(value) => field.onChange(value)}
                            defaultValue={field.value || 'normal'}
                        >
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecciona el tipo de contratación" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="normal">Normal</SelectItem>
                                <SelectItem value="condicionado">Condicionado</SelectItem>
                                <SelectItem value="desarrollador">Desarrollador</SelectItem>
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                </FormItem>
            )}
        />
    </div>
</div>
                   
                        
                  
                    {loading && <Loader />}
                    <div className="w-full flex justify-normal mt-4">
                        <Button type="submit" className='ml-[195vh] '>Guardar</Button>
                    </div>
                </div>
            </form>
        </Form>
    </div>
        </div>
    );
};
