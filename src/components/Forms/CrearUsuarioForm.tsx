import { useState } from "react";
import logo from '../../img/logo.png';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from '../../components/ui/button.tsx';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../components/ui/form.tsx";
import { Input } from '../../components/ui/input.tsx';
import { crearusuarionuevoSchema } from './crearusuarioValidaciones.ts';
import { ModeToggle } from '../../components/ui/mode-toggle.tsx';
import axiosClient from '../../axios-client.ts';
import Loader from "../../components/ui/Loader.tsx";
import Error from "../../components/ui/Error.tsx";
import { Textarea } from "../ui/textarea.tsx";
import { useEffect } from "react";
import { TrashIcon, Pencil2Icon, PlusCircledIcon } from '@radix-ui/react-icons';
import IconButton from "../ui/IconButton.tsx";
import { ComboBoxActivoInactivo } from "../ui/ComboBox.tsx";
import Modal from "../ui/Modal.tsx";

const CrearUsuarioForm = () => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [abrirInput, setAbrirInput] = useState(false);

    const form = useForm<z.infer<typeof crearusuarionuevoSchema>>({
        resolver: zodResolver(crearusuarionuevoSchema),
        defaultValues: {
            id: 0,
            nombre: "",
            apellidopaterno:"",
            apellidomaterno:"",
            telefono:"",
            curp: "",
            rfc: "",
            correo: "",
        },
    });

    async function onSubmit(values: z.infer<typeof crearusuarionuevoSchema>) {
        setLoading(true);
        setErrors({});
        console.log(values)
        try {
            const response = await axiosClient.post('/ruta/del/api/crear-usuario', values);
            console.log('Usuario creado:', response.data);
            // Aquí puedes realizar alguna acción adicional, como redirigir al usuario o mostrar un mensaje de éxito
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors(error.response.data);
            } else {
                setErrors({ general: 'Ocurrió un error al crear el usuario' });
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="overflow-auto">
            <div className='flex h-[40px] items-center mb-[10px] bg-card rounded-sm'>
                <div className='h-[20px] w-full flex items-center justify-end'>
                    <div className="mb-[10px] h-full w-full mx-4">
                        <p className="text-[20px] font-medium">Crear usuario</p>
                    </div>
                </div>
            </div>
            <div className="py-[20px] px-[10px] ">
                {errors.general && <Error errors={errors.general} />}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                                        El nombre de la crear usuario.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="apellidopaterno"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Apellido paterno</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Escribe el apellido paterno" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        El apellido paterno.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="apellidomaterno"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Apellido materno</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Escribe el apellido materno" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        El apellido materno.
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
                                        El telefono del usuario.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="curp"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>CURP</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Escribe la CURP" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        La CURP del usuario.
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
                                        <Input  placeholder="Escribe la RFC" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        El RFC del usuario.
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
                                        El correo electronico del usuario.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {loading && <Loader />}
                        <Button type="submit">Guardar</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default CrearUsuarioForm;
