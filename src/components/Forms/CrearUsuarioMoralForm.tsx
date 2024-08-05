import { useState } from "react";
import logo from '../../img/logo.png';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from '../ui/button.tsx';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form.tsx";
import { Input } from '../ui/input.tsx';
import { crearusuarionuevoSchema } from './crearusuarioValidaciones.ts';
import { ModeToggle } from '../ui/mode-toggle.tsx';
import axiosClient from '../../axios-client.ts';
import Loader from "../ui/Loader.tsx";
import Error from "../ui/Error.tsx";
import { Textarea } from "../ui/textarea.tsx";
import { useEffect } from "react";
import { TrashIcon, Pencil2Icon, PlusCircledIcon } from '@radix-ui/react-icons';
import IconButton from "../ui/IconButton.tsx";
import { ComboBoxActivoInactivo } from "../ui/ComboBox.tsx";
import Modal from "../ui/Modal.tsx";

const CrearUsuarioMoralForm = () => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [abrirInput, setAbrirInput] = useState(false);

    const form = useForm<z.infer<typeof crearusuarionuevoSchema>>({
        resolver: zodResolver(crearusuarionuevoSchema),
        defaultValues: {
            id: 0,
            nombre: "",
            apellido_paterno:"",
            apellido_materno:"",
            telefono:"",
            curp: "",
            rfc: "",
            correo: "",
        },
    });

    async function onSubmit(values: z.infer<typeof crearusuarionuevoSchema>) {
        setLoading(true);
        setErrors({});
        console.log('Valores enviados:', values);
    
        try {
            const response = await axiosClient.post('/usuarios/create', values);
            console.log('Usuario creado:', response.data);
            form.reset(); // Limpiar el formulario
            // Aquí puedes realizar alguna acción adicional, como redirigir al usuario o mostrar un mensaje de éxito
        } catch (error) {
            if (error.response && error.response.data) {
                console.error('Errores de validación:', error.response.data);
                setErrors(error.response.data);
            } else {
                console.error('Error general:', error);
                setErrors({ general: 'Ocurrió un error al crear el usuario' });
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        
        <div className="overflow-auto">
            <div className='flex h-[40px] items-center mb-[10px] bg-card rounded-sm'>
                <div className='h-[20px] w-full flex items-center justify-end '>
                    <div className="mb-[10px] h-full w-full mx-4">
                        <p className="text-[20px] font-medium">Crear nuevo usuario moral</p>
                    </div>
                </div>
            </div>
            <div className="py-[20px] px-[10px] ">
                {errors.general && <Error errors={errors.general} />}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="py-[40px] px-[10px]  w-full mb-5 rounded-md border border-border  relative">
                            <div className="w-full p-5">
                                <FormField
                                    control={form.control}
                                    name="nombre"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nombre</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Escribe el nombre del usuario" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            
                               
                               
                                <FormField
                                    control={form.control}
                                    name="rfc"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>RFC</FormLabel>
                                            <FormControl>
                                                <Input  placeholder="Escribe el RFC" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                 <FormField
                                    control={form.control}
                                    name="telefono"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Telefono</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Escribe telefono del usuario" {...field} type='number' />
                                            </FormControl>
                                            <FormDescription>
                                                
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="correo"
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
                            <Button type="submit" className="ml-[187vh] w-[20vh]">Guardar</Button>

                        </div>
                        <div className=" w-full flex justify-normal mt-4">
                        </div>   
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default CrearUsuarioMoralForm;
