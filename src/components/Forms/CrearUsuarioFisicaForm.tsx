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
import { ToastComponentGreen } from "../ui/toastComponent.tsx";
import { useToast } from "@/components/ui/use-toast"; //IMPORTACIONES TOAST
import { ToastAction } from "@/components/ui/toast"; //IMPORTACIONES TOAST



const CrearUsuarioFisicaForm = () => {
    const { toast } = useToast()

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [abrirInput, setAbrirInput] = useState(false);

   //#region SUCCESSTOAST
   function successToastCreado() {
    toast({
        title: "¡Éxito!",
        description: "El usuario se ha creado correctamente",
        variant: "success",

    })
}
 //Funcion de errores para el Toast
 function errorToast() {

    toast({
        variant: "destructive",
        title: "Oh, no. Error",
        description: "Algo salió mal.",
        action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
    })


}

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
            nombre_contacto: "",
        },
    });

    async function onSubmit(values: z.infer<typeof crearusuarionuevoSchema>) {
        setLoading(true);
        setErrors({});
        console.log('Valores enviados:', values);
    
        try {
            const response = await axiosClient.post('/usuarios/create', values);
            console.log('Usuario creado:', response);
            successToastCreado();
        } catch (response) {
            console.log(response.response.data.message);
            if(response.response.data.message === "The curp has already been taken.")
                toast({
                    title: "Error",
                    description: "La CURP ya existe.",
                    variant: "destructive",
                    action: <ToastAction altText="Try again">Aceptar</ToastAction>,
                })
                if(response.response.data.message === "The rfc has already been taken.")
                    toast({
                        title: "Error",
                        description: "El RFC ya existe.",
                        variant: "destructive",
                        action: <ToastAction altText="Try again">Aceptar</ToastAction>,
                    })
                    if(response.response.data.message === "The correo has already been taken.")
                        toast({
                            title: "Error",
                            description: "El correo ya existe.",
                            variant: "destructive",
                            action: <ToastAction altText="Try again">Aceptar</ToastAction>,
                        })
              

        } finally {
            setLoading(false);
        }
    }

    return (
        
        <div className="overflow-auto ">
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
                                Crear nuevo usuario fisico
                            </h1>
                            <div className="">
                            <div className="flex space-x-5 w-[100%]  items-center justify-normal">
                                <div className="w-[68vh]">
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
                                <div className="w-[68vh]">
                                <FormField
                                    control={form.control}
                                    name="apellido_paterno"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Apellido paterno</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Escribe el apellido paterno" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                </div>
                                <div className="w-[68vh]">
                                <FormField
                                    control={form.control}
                                    name="apellido_materno"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Apellido materno</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Escribe el apellido materno" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                               
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                </div>
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
                               
                               
                            </div>
                            <div className="w-full mt-5">
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
                                                
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="mt-5">
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
                                </div>
                               
                                <div className="flex space-x-5 w-[120vh]">
                                    <div className="flex-1 mt-5">
                                        <FormField
                                    control={form.control}
                                    name="telefono"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Telefono</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Escribe telefono del usuario" {...field} type='number' 
                                                 className="w-[103vh]" />
                                            </FormControl>
                                            <FormDescription>
                                                
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                    </div>
                                <div className="flex-1 mt-5">
                                <FormField
                                    control={form.control}
                                    name="correo"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Correo electronico</FormLabel>
                                            <FormControl>
                                                <Input  placeholder="Escribe el correo electronico" {...field} type='email'
                                                 className="w-[102vh]" />
                                            </FormControl>
                                            <FormDescription>
                                    
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                </div>
                                
                                </div>
                                
                            </div>
                            {loading && <Loader />}
                            <div className="flex justify-end">
                            <Button type="submit" className="mt-[5vh] w-[20vh]">Guardar</Button>

                            </div>
                        </div>
                
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default CrearUsuarioFisicaForm;
