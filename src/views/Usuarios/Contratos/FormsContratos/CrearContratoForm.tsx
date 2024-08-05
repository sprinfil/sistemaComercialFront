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

export const CrearContratoForm = () => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

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
            <div className="py-[20px] px-[10px] ">
                {errors.general && <Error errors={errors.general} />}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="py-[40px] px-[10px] flex gap-2 w-full mb-5 rounded-md border border-border  relative">
                            <div className="w-[50%]">
                                <FormField
                                    control={form.control}
                                    name="clave_catastral"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Clave catastral</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Escribe su clave catastral" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="calle"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Cuenta</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Escribe el apellido paterno" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="entre_calle_1"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tarifa</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Escribe el apellido materno" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                    
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="entre_calle_2"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Telefono</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Diametro" {...field} type='number' />
                                            </FormControl>
                                            <FormDescription>
                                                
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="w-[50%]">
                                <FormField
                                    control={form.control}
                                    name="colonia"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>CURP</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Escribe la CURP" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="codigo_postal"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>RFC</FormLabel>
                                            <FormControl>
                                                <Input  placeholder="Escribe la RFC" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="localidad"
                                    render={({ field }) => (
                                        <FormItem>  
                                            <FormLabel>Correo electronico</FormLabel>
                                            <FormControl>
                                                <Input  placeholder="Escribe el correo electronico" {...field} type='email'/>
                                            </FormControl>
                                            <FormDescription>
                                
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            {loading && <Loader />}
                        </div>
                        <div className=" w-full flex justify-normal mt-4">
                            <Button type="submit">Guardar</Button>
                        </div>   
                    </form>
                </Form>
            </div>
        </div>
    );
};
