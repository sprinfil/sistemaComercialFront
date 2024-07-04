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
import { girocomercialSchema } from './validaciones.ts';
import { ModeToggle } from '../ui/mode-toggle.tsx';
import axiosClient from '../../axios-client.ts';
import Loader from "../ui/Loader.tsx";
import Error from "../ui/Error.tsx";
import { Textarea } from "../ui/textarea.tsx";
import { useStateContext } from "../../contexts/ContextGiroComercial.tsx";
import { useEffect } from "react";
import { TrashIcon, Pencil2Icon, PlusCircledIcon } from '@radix-ui/react-icons';
import IconButton from "../ui/IconButton.tsx";
import { ComboBoxActivoInactivo } from "../ui/ComboBox.tsx";
import Modal from "../ui/Modal.tsx";
import ModalReactivacion from "../ui/ModalReactivación.tsx"; //MODAL PARA REACTIVAR UN DATO QUE HAYA SIDO ELIMINADO
import { useToast } from "@/components/ui/use-toast"; //IMPORTACIONES TOAST
import { ToastAction } from "@/components/ui/toast"; //IMPORTACIONES TOAST

const GiroComercialForm = () => {
    const { toast } = useToast()
    const { girocomercial, setGiroComercial, loadingTable, setLoadingTable, setGirosComerciales, setAccion, accion } = useStateContext();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [abrirInput, setAbrirInput] = useState(false);


    const form = useForm<z.infer<typeof girocomercialSchema>>({
        resolver: zodResolver(girocomercialSchema),
        defaultValues: {
            id: girocomercial.id,
            nombre: girocomercial.nombre,
            descripcion: girocomercial.descripcion,
            estado: girocomercial.estado,
        },
    })

    //#region SUCCESSTOAST
    function successToastCreado() {
        toast({
            title: "¡Éxito!",
            description: "La constancia se ha creado correctamente",
            variant: "success",

        })
    }
    function successToastEditado() {
        toast({
            title: "¡Éxito!",
            description: "La constancia se ha editado correctamente",
            variant: "success",

        })
    }
    function successToastEliminado() {
        toast({
            title: "¡Éxito!",
            description: "La constancia se ha eliminado correctamente",
            variant: "success",

        })
    }
    function successToastRestaurado() {
        toast({
            title: "¡Éxito!",
            description: "La constancia se ha restaurado correctamente",
            variant: "success",

        })
    }
    //#endregion


    //Funcion de errores para el Toast
    function errorToast() {

        toast({
            variant: "destructive",
            title: "Oh, no. Error",
            description: "Algo salió mal.",
            action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
        })


    }


    function onSubmit(values: z.infer<typeof girocomercialSchema>) {
        console.log("submit");
        setLoading(true);
        if (accion == "crear") {
            axiosClient.post(`/GirosComercialesCatalogo/create`, values)
                .then(() => {
                    successToastCreado();
                    setLoading(false);
                    setGiroComercial({
                        id: 0,
                        nombre: "",
                        descripcion: "ninguna",
                        estado: "activo"
                    });
                    form.reset({
                        id: 0,
                        nombre: "",
                        descripcion: "ninguna",
                        estado: "activo"
                    });
                    getGirosComerciales();
                    console.log(values);
                    //setNotification("usuario creado");
                })
                .catch((err) => {
                    const response = err.response;
                    errorToast();
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                    setLoading(false);
                })
                console.log(abrirInput);
        }
        if (accion == "editar") {
            axiosClient.put(`/GirosComercialesCatalogo/update/${girocomercial.id}`, values)
                .then((data) => {
                    setLoading(false);
                    //alert("anomalia creada");
                    setAbrirInput(false);
                    setAccion("");
                    getGirosComerciales();
                    setGiroComercial(data.data);
                    successToastEditado();
                    //setNotification("usuario creado");
                })
                .catch((err) => {
                    const response = err.response;
                    errorToast();
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                    setLoading(false);
                })
        }
    }

    //con este metodo obtienes las anomalias de la bd
    const getGirosComerciales = async () => {
        setLoadingTable(true);
        try {
            const response = await axiosClient.get("/GirosComercialesCatalogo");
            setLoadingTable(false);
            setGirosComerciales(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            setLoadingTable(false);
            errorToast();
            console.error("Failed to fetch constancias:", error);
        }
    };

    //elimianar anomalia
    const onDelete = async () => {
        try {
            await axiosClient.put(`/GirosComercialesCatalogo/log_delete/${girocomercial.id}`);
            getGirosComerciales();
            setAccion("eliminar");
            successToastEliminado();
        } catch (error) {
            errorToast();
            console.error("Failed to delete Giro Comercial:", error);
        }
    };

    //este metodo es para cuando actualizar el formulario cuando limpias las variables de la anomalia
    useEffect(() => {
        if (accion == "eliminar") {
            form.reset({
                id: 0,
                nombre: "",
                descripcion: "ninguna",
                estado: "activo"
            });
            setGiroComercial({});
            setAbrirInput(false);
        }
        if (accion == "crear") {
            console.log("creando");
            setAbrirInput(true);
            setErrors({});
            form.reset({
                id: 0,
                nombre: "",
                descripcion: "ninguna",
                estado: "activo"
            });
            setGiroComercial({
                id: 0,
                nombre: "",
                descripcion: "ninguna",
                estado: "activo"
            })
        }
        if (accion == "ver") {
            setAbrirInput(false);
            setErrors({});
            setAccion("");
            form.reset({
                id: girocomercial.id,
                nombre: girocomercial.nombre,
                descripcion: girocomercial.descripcion,
                estado: girocomercial.estado
            });
        }
        if (accion == "editar") {
            setAbrirInput(true);
            setErrors({});
        }
        console.log(accion);
    }, [accion]);

    return (
        <div className="overflow-auto">

            <div className='flex h-[40px] items-center mb-[10px] bg-card rounded-sm'>
                <div className='h-[20px] w-full flex items-center justify-end'>
                    <div className="mb-[10px] h-full w-full mx-4">
                        {accion == "crear" && <p className="text-muted-foreground text-[20px]">Creando Nuevo Giro Comercial</p>}
                        {girocomercial.nombre != "" && <p className="text-muted-foreground text-[20px]">{girocomercial.nombre}</p>}
                    </div>
                    <Modal
                        method={onDelete}
                        button={
                            <IconButton>
                                <TrashIcon className="w-[20px] h-[20px]" />
                            </IconButton>}
                    />
                    <div onClick={() => setAccion("editar")}>
                        <IconButton>
                            <Pencil2Icon className="w-[20px] h-[20px]" />
                        </IconButton>
                    </div>
                </div>
            </div>
            <div className="py-[20px] px-[10px] ">

                {errors && <Error errors={errors} />}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="nombre"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre</FormLabel>
                                    <FormControl>
                                        <Input readOnly={!abrirInput} placeholder="Escribe el nombre del giro comercial" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        El nombre del giro comercial.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="descripcion"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Descripción</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            readOnly={!abrirInput}
                                            placeholder="Descripcion del giro comercial"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Agrega una breve descripción.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {loading && <Loader />}
                        {abrirInput && <Button type="submit">Guardar</Button>}

                    </form>
                </Form>
            </div>

        </div>
    )
}

export default GiroComercialForm
