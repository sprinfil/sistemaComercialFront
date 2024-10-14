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
import { crearUsuarioMoralSchema } from './crearusuarioValidaciones.ts';
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
import { useToast } from "@/components/ui/use-toast"; //IMPORTACIONES TOAST
import { ToastAction } from "@/components/ui/toast"; //IMPORTACIONES TOAST
import { ZustandFiltrosContratacion } from "../../contexts/ZustandFiltrosContratacion.tsx";
import { useNavigate } from "react-router-dom";


const CrearUsuarioMoralForm = () => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [abrirInput, setAbrirInput] = useState(false);
    const { toast } = useToast()

    const {boolCrearUsuarioProcesoContratacion, setObtenerIdUsuarioRecienCreado, setObtenerNombreUsuario, setBoolCrearUsuarioProcesoContratacion} =  ZustandFiltrosContratacion();

    function successToastCreado() {
        toast({
            title: "¡Éxito!",
            description: "El usuario se ha creado correctamente",
            variant: "success",
    
        })
    }
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof crearUsuarioMoralSchema>>({
        resolver: zodResolver(crearUsuarioMoralSchema),
        defaultValues: {
            id: 0,
            nombre: "",
            nombre_contacto: "",
            telefono: "",
            rfc: "",
            correo: "",
        },
    });

    
    const handleNavegarProcesoContratacion = () => 
        {
            navigate("/Crear/Contrato/Usuario");
        }

        console.log(boolCrearUsuarioProcesoContratacion);


    async function onSubmit(values: z.infer<typeof crearUsuarioMoralSchema>) {
        setLoading(true);
        setErrors({});
        console.log('Valores enviados:', values);

        try {
            const response = await axiosClient.post('/usuarios/createmoral', values);
            console.log('Usuario creado:', response.data);
            form.reset(); // Limpiar el formulario
            console.log('Usuario creado:', response);
            const idUsuario = response.data.id
            const nombre = response.data.nombre;
           if(boolCrearUsuarioProcesoContratacion)
            {
                setObtenerIdUsuarioRecienCreado(idUsuario);
                setObtenerNombreUsuario(nombre);
                successToastCreado();
                handleNavegarProcesoContratacion();
            }
            else
            {
                successToastCreado();

            }
            // Aquí puedes realizar alguna acción adicional, como redirigir al usuario o mostrar un mensaje de éxito
        } catch (response) {
            console.log(response.response.data.message);

            if (response.response.data.message == "The rfc has already been taken.") {
                toast({
                    title: "Error",
                    description: "La RFC ya existe.",
                    variant: "destructive",
                    action: <ToastAction altText="Try again">Aceptar</ToastAction>,
                })
            }
            if (response.response.data.message === "The correo has already been taken.")
                toast({
                    title: "Error",
                    description: "El correo ya existe.",
                    variant: "destructive",
                    action: <ToastAction altText="Try again">Aceptar</ToastAction>,
                })

        } finally {
            setLoading(false);
        }
        setBoolCrearUsuarioProcesoContratacion(false);

    }

    return (

        <div className="overflow-auto">
            <div className=''>
                <div className=''>
                  
                </div>
            </div>
            <div className="py-[20px] px-[10px] ">
                {errors.general && <Error errors={errors.general} />}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        
                    <div className="border p-9 overflow-auto">
                    <h1 className="text-3xl mb-[7vh]">
                                Crear nuevo usuario moral
                            </h1>
                            <div className="w-full">
                                <div className="">
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
                                </div>
                                <div className="mt-5">
                                <FormField
                                    control={form.control}
                                    name="nombre_contacto"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nombre de contacto</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Escribe el nombre de contacto" {...field} />
                                            </FormControl>
                                            <FormDescription>

                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                </div>
                          

                                <div className="mt-5">
                                <FormField
                                    control={form.control}
                                    name="rfc"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>RFC</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Escribe el RFC" {...field} />
                                            </FormControl>
                                            <FormDescription>

                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                </div>

                               <div className="mt-5">
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
                               </div>
                          <div className="mt-5">
                          <FormField
                                    control={form.control}
                                    name="correo"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Correo electronico</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Escribe el correo electronico" {...field} type='email' />
                                            </FormControl>
                                            <FormDescription>

                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                          </div>
                          

                            </div>

                            {loading && <Loader />}
                            <div className="flex justify-end mt-10">
                            <Button type="submit" className="w-[20vh]">Guardar</Button>

                                </div>

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
