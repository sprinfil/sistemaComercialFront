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
import { conceptoSchema } from './validaciones.ts';
import { ModeToggle } from '../../components/ui/mode-toggle.tsx';
import axiosClient from '../../axios-client.ts';
import Loader from "../../components/ui/Loader.tsx";
import Error from "../../components/ui/Error.tsx";
import { Textarea } from "../ui/textarea.tsx";
import { useStateContext } from "../../contexts/ContextConcepto.tsx";
import { useEffect } from "react";
import { TrashIcon, Pencil2Icon, PlusCircledIcon, ColorWheelIcon } from '@radix-ui/react-icons';
import IconButton from "../ui/IconButton.tsx";
import { ComboBoxActivoInactivo } from "../ui/ComboBox.tsx";
import Modal from "../ui/Modal.tsx";
import { useToast } from "@/components/ui/use-toast"; //IMPORTACIONES TOAST
import { ToastAction } from "@/components/ui/toast"; //IMPORTACIONES TOAST





const ConceptoForm = () => {
    const { toast } = useToast()
    const { concepto, setConcepto, loadingTable, setLoadingTable, setConceptos, setAccion, accion } = useStateContext();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [abrirInput, setAbrirInput] = useState(false);



    //#region SUCCESSTOAST
    function successToastCreado() {
        toast({
            title: "¡Éxito!",
            description: "El convenio se ha creado correctamente",
            variant: "success",

        })
    }
    function successToastEditado() {
        toast({
            title: "¡Éxito!",
            description: "El convenio se ha editado correctamente",
            variant: "success",

        })
    }
    function successToastEliminado() {
        toast({
            title: "¡Éxito!",
            description: "El convenio se ha eliminado correctamente",
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






    const form = useForm<z.infer<typeof conceptoSchema>>({
        resolver: zodResolver(conceptoSchema),
        defaultValues: {
            id: concepto.id,
            nombre: concepto.nombre,
            descripcion: concepto.descripcion,
        },
    })



    function onSubmit(values: z.infer<typeof conceptoSchema>) {
        setLoading(true);
        if (accion == "crear") {
            axiosClient.post(`/Concepto/create`, values)
                .then(() => {
                    setLoading(false);
                    setConcepto({
                        id: 0,
                        nombre: "",
                        descripcion: "ninguna",
                    });
                    form.reset({
                        id: 0,
                        nombre: "",
                        descripcion: "ninguna",
                    });
                    getConcepto();
                    console.log(values);
                    successToastCreado();
                })
                .catch((err) => {
                    const response = err.response;
                    errorToast(); //errorToast
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                    setLoading(false);
                })
        }
        if (accion == "editar") {
            axiosClient.put(`/Concepto/update/${concepto.id}`, values)
                .then((data) => {
                    setLoading(false);
                    //alert("anomalia creada");
                    setAbrirInput(false);
                    setAccion("");
                    getConcepto();
                    setConcepto(data.data);
                    successToastEditado(); //toast editado
                })
                .catch((err) => {
                    const response = err.response;
                    errorToast(); //AQUI ESTA EL TOAST DE ERROR
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                    setLoading(false);
                })
        }
    }

    //obtener conceptos
    const getConcepto = async () => {
        setLoadingTable(true);
        try {
            const response = await axiosClient.get("/Concepto");
            setLoadingTable(false);
            setConceptos(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            setLoadingTable(false);
            console.error("Fallo la consulta del concepto:", error);
        }
    };

    //elimianar conceptos
    const onDelete = async () => {
        try {
            await axiosClient.put(`/Concepto/log_delete/${concepto.id}`, {
                data: { id: concepto.id }
            });
            getConcepto();
            setAccion("eliminar");
            successToastEliminado(); //toast eliminado
        } catch (error) {
            console.error("Fallo la eliminación:", error);
        }
    };

    //Actualizar el formulario
    useEffect(() => {
        if (accion == "eliminar") {
            form.reset({
                id: 0,
                nombre: "",
                descripcion: "ninguna",
            });
            setConcepto({});
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
            });
            setConcepto({
                id: 0,
                nombre: "",
                descripcion: "ninguna",
            })
        }
        if (accion == "ver") {
            setAbrirInput(false);
            setErrors({});
            setAccion("");
            form.reset({
                id: concepto.id,
                nombre: concepto.nombre,
                descripcion: concepto.descripcion,
            });
        }
        if (accion == "editar") {
            setAbrirInput(true);
            setErrors({});
        }
    }, [accion]);

    return (

        <div className="overflow-auto">

            <div className='flex h-[40px] items-center mb-[10px] bg-card rounded-sm'>
                <div className='h-[20px] w-full flex items-center justify-end'>
                    <div className="mb-[10px] h-full w-full mx-4">
                    {accion == "crear" && <p className="text-muted-foreground text-[20px]">Creando Nueva Anomalia</p>}
                    {concepto.nombre != "" && <p className="text-muted-foreground text-[20px]">{concepto.nombre}</p>}
                    </div>
                    { (concepto.nombre != null && concepto.nombre != "") &&
                        <>
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
                        </>
                    }
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
                                        <Input readOnly={!abrirInput} placeholder="Escribe el nombre del concepto" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                    Nombre del concepto.
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
                                            placeholder="Descripcion del nuevo concepto"
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

export default ConceptoForm
