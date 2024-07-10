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
import { ajusteSchema } from './validaciones.ts';
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
import { useStateContext } from "../../contexts/ContextAjuste.tsx";
import ModalReactivacion from "../ui/ModalReactivación.tsx"; //MODAL PARA REACTIVAR UN DATO QUE HAYA SIDO ELIMINADO
import { useToast } from "@/components/ui/use-toast"; //IMPORTACIONES TOAST
import { ToastAction } from "@/components/ui/toast"; //IMPORTACIONES TOAST

const AjusteForm = () => {
    const { toast } = useToast()
    const { ajuste, setAjuste, loadingTable, setLoadingTable, setAjustes, setAccion, accion } = useStateContext();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [abrirInput, setAbrirInput] = useState(false);
    const [IdParaRestaurar, setIdParaRestaurar] = useState(null);
    const [ModalReactivacionOpen, setModalReactivacionOpen] = useState(false);

    //#region SUCCESSTOAST
    function successToastCreado() {
        toast({
            title: "¡Éxito!",
            description: "El ajuste se ha creado correctamente",
            variant: "success",

        })
    }
    function successToastEditado() {
        toast({
            title: "¡Éxito!",
            description: "El ajuste se ha editado correctamente",
            variant: "success",

        })
    }
    function successToastEliminado() {
        toast({
            title: "¡Éxito!",
            description: "El ajuste se ha eliminado correctamente",
            variant: "success",

        })
    }
    function successToastRestaurado() {
        toast({
            title: "¡Éxito!",
            description: "El ajuste se ha restaurado correctamente",
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
    function errorYaExisteToast() {

        toast({
            variant: "destructive",
            title: "Oh, no. Error",
            description: "El concepto ya existe.",
            action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
        })
    }


    const form = useForm<z.infer<typeof ajusteSchema>>({
        resolver: zodResolver(ajusteSchema),
        defaultValues: {
            id: ajuste.id,
            nombre: ajuste.nombre,
            descripcion: ajuste.descripcion,
            estado: ajuste.estado,
        },
    })



    function onSubmit(values: z.infer<typeof ajusteSchema>) {
        setLoading(true);
        if (accion == "crear") {
            axiosClient.post(`/AjustesCatalogo/create`, values)
                .then((response) => {
                    const data = response.data;
                    if(data.restore)
                    {
                        setIdParaRestaurar(data.ajuste_id);
                        setModalReactivacionOpen(true);
                    }
                    else if (data.restore == false) {
                        errorYaExisteToast();
                        setLoading(false);
                    }
                    else
                    {
                        successToastCreado();
                    setLoading(false);
                    //SIEMPRE CHECAR LOS DATOS COINCIDAN CON EL MODELO
                    setAjuste({
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
                    getAjustes();
                    console.log(values);
                    //setNotification("usuario creado");
                    }
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
        if (accion == "editar") {
            axiosClient.put(`/AjustesCatalogo/update/${ajuste.id}`, values)
                .then((data) => {
                    successToastEditado();
                    setLoading(false);
                    //alert("anomalia creada");
                    setAbrirInput(false);
                    setAccion("");
                    getAjustes();
                    setAjuste(data.data);
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
    const getAjustes = async () => {
        setLoadingTable(true);
        try {
            const response = await axiosClient.get("/AjustesCatalogo");
            setLoadingTable(false);
            setAjustes(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            setLoadingTable(false);
            errorToast();
            console.error("Failed to fetch anomalias:", error);
        }
    };

    //elimianar anomalia
    const onDelete = async () => {
        try {
            await axiosClient.delete(`/AjustesCatalogo/log_delete/${ajuste.id}`);
            getAjustes();
            setAccion("eliminar");
            successToastEliminado();
        } catch (error) {
            errorToast();
            console.error("Failed to delete ajuste:", error);
        }
    };

     //Metodo para estaurar el dato que se encuentra eliminado(soft-delete)
    const restaurarDato = (IdParaRestaurar: any) => {
        axiosClient.put(`/AjustesCatalogo/restaurar/${IdParaRestaurar}`)
            .then(() => {
                setLoading(false);
                setAbrirInput(false);
                setAccion("crear");
                setAjuste({
                    id: 0,
                    nombre: "",
                    descripcion: "ninguna",
                    estado: "activo"
                });
                getAjustes();
                successToastRestaurado();
                setModalReactivacionOpen(false);
            })
            .catch((err) => {
                errorToast();
                setLoading(false);
            });
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
            setAjuste({});
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
            setAjuste({
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
                id: ajuste.id,
                nombre: ajuste.nombre,
                descripcion: ajuste.descripcion,
                estado: ajuste.estado
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
                        {accion == "crear" && <p className="text-muted-foreground text-[20px]">Creando nuevo ajuste</p>}
                        {ajuste.nombre != "" && <p className="text-muted-foreground text-[20px]">{ajuste.nombre}</p>}
                    </div>
                    {(ajuste.nombre != null && ajuste.nombre != "") &&
                        <>
                            <Modal
                                method={onDelete}
                                button={
                                    <a title = "Eliminar">
                                    <IconButton>
                                <TrashIcon className="w-[20px] h-[20px]"/>
                                    </IconButton>
                                    </a>}
                            />
                            <div onClick={() => setAccion("editar")}>
                            <a title = "Editar">
                                <IconButton>
                                    <Pencil2Icon className="w-[20px] h-[20px]" />
                                </IconButton>
                                </a>
                            </div>
                        </>
                    }
                    {// ESTE ES EL MODAL DE REACTIVACIÓN
                        //ES UNA VALIDACIÓN POR SI LO QUE ESTA ELIMINADO(SOFT DELETE) LO ENCUENTRA
                        //SE ABRE EL MODAL Y SE RESTAURA EL DATO.
                    }
                    {ModalReactivacionOpen &&
                        <ModalReactivacion
                            isOpen={ModalReactivacionOpen}
                            setIsOpen={setModalReactivacionOpen}
                            method={() => restaurarDato(IdParaRestaurar)}
                        />
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
                                        <Input readOnly={!abrirInput} placeholder="Escribe el nombre del ajuste" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        El nombre del ajuste.
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
                                            placeholder="Descripcion del ajuste"
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

export default AjusteForm