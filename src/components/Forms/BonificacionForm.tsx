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
import { bonificacionesSchema } from './validaciones.ts';
import axiosClient from '../../axios-client.ts';
import Loader from "../../components/ui/Loader.tsx";
import Error from "../../components/ui/Error.tsx";
import { Textarea } from "../ui/textarea.tsx";
import { useStateContext } from "../../contexts/ContextBonificaciones.tsx";
import { useEffect } from "react";
import { TrashIcon, Pencil2Icon} from '@radix-ui/react-icons';
import IconButton from "../ui/IconButton.tsx";
import Modal from "../ui/Modal.tsx";
import ModalReactivacion from "../ui/ModalReactivación.tsx"; //MODAL PARA REACTIVAR UN DATO QUE HAYA SIDO ELIMINADO
import { useToast } from "@/components/ui/use-toast"; //IMPORTACIONES TOAST
import { ToastAction } from "@/components/ui/toast"; //IMPORTACIONES TOAST

const BonificacionForm = () => {
    const { toast } = useToast()
    const { bonificacion, setBonificacion, loadingTable, setLoadingTable, setBonificaciones, setAccion, accion } = useStateContext();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [abrirInput, setAbrirInput] = useState(false);
    const [bonificacionIdParaRestaurar, setBonificacionIdParaRestaurar] = useState(null);
    const [ModalReactivacionOpen, setModalReactivacionOpen] = useState(false);

    //#region SUCCESSTOAST
    function successToastCreado() {
        toast({
            title: "¡Éxito!",
            description: "La bonificacion se ha creado correctamente",
            variant: "success",

        })
    }
    function successToastEditado() {
        toast({
            title: "¡Éxito!",
            description: "La bonificacion se ha editado correctamente",
            variant: "success",

        })
    }
    function successToastEliminado() {
        toast({
            title: "¡Éxito!",
            description: "La bonificacion se ha eliminado correctamente",
            variant: "success",

        })
    }
    function successToastRestaurado() {
        toast({
            title: "¡Éxito!",
            description: "La bonificacion se ha restaurado correctamente",
            variant: "success",

        })
    }

    function errorYaExisteToast() {

        toast({
            variant: "destructive",
            title: "Error",
            description: "La bonificación ya existe.",
            action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
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

    const form = useForm<z.infer<typeof bonificacionesSchema>>({
        resolver: zodResolver(bonificacionesSchema),
        defaultValues: {
            id: bonificacion.id,
            nombre: bonificacion.nombre,
            descripcion: bonificacion.descripcion,
        },
    })



    function onSubmit(values: z.infer<typeof bonificacionesSchema>) {
        setLoading(true);
        if (accion == "crear") {
            axiosClient.post(`/bonificacionesCatalogo/create`, values)
                .then((response) => {
                    const data = response.data;
                    if (data.restore == true) {
                        setBonificacionIdParaRestaurar(data.bonificacion_id);
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
                    setBonificacion({
                        id: 0,
                        nombre: "",
                        descripcion: "ninguna",
                    });
                    form.reset({
                        id: 0,
                        nombre: "",
                        descripcion: "ninguna",
                    });
                    getBonificacion();
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
            console.log(abrirInput);
            console.log("este es mi modal " +  ModalReactivacionOpen);
        }
        if (accion == "editar") {
            axiosClient.put(`/BonificacionesCatalogo/update/${bonificacion.id}`, values)
                .then((data) => {
                    setLoading(false);
                    //alert("anomalia creada");
                    setAbrirInput(false);
                    setAccion("");
                    getBonificacion();
                    successToastEditado();
                    setBonificacion(data.data);
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

    //con este metodo obtienes las bonificaciones de la bd
    const getBonificacion = async () => {
        setLoadingTable(true);
        try {
            const response = await axiosClient.get("/bonificacionesCatalogo");
            setLoadingTable(false);
            setBonificaciones(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            errorToast();
            setLoadingTable(false);
            console.error("Failed to fetch bonificaciones:", error);
        }
    };

    //elimianar anomalia
    const onDelete = async () => {
        try {
            await axiosClient.delete(`/BonificacionesCatalogo/log_delete/${bonificacion.id}`);
            getBonificacion();
            setAccion("eliminar");
            successToastEliminado();
        } catch (error) {
            errorToast();
            console.error("Failed to delete anomalia:", error);
        }
    };

    //Metodo para estaurar el dato que se encuentra eliminado(soft-delete)
    const restaurarDato = (bonificacion_id: any) => {
        axiosClient.put(`/bonificacionesCatalogo/restaurar/${bonificacion_id}`)
            .then(() => {
                setLoading(false);
                setAbrirInput(false);
                setAccion("crear");
                setBonificacion({
                    id: 0,
                    nombre: "",
                    descripcion: "ninguna",
                    estado: "activo"
                });
                getBonificacion();
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
            });
            setBonificacion({});
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
            setBonificacion({
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
                id: bonificacion.id,
                nombre: bonificacion.nombre,
                descripcion: bonificacion.descripcion,
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
                        {accion == "crear" && <p className="text-muted-foreground text-[20px]">Creando nueva bonificación</p>}
                        {bonificacion.nombre != "" && <p className="text-muted-foreground text-[20px]">{bonificacion.nombre}</p>}
                    </div>
                    { (bonificacion.nombre != null && bonificacion.nombre != "") &&
                        <>
                            <Modal
                                method={onDelete}
                                button={
                                    <a title = "Eliminar">
                                    <IconButton>
                                        <TrashIcon className="w-[20px] h-[20px]" />
                                    </IconButton></a>}
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
                            method={() => restaurarDato(bonificacionIdParaRestaurar)}
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
                                        <Input readOnly={!abrirInput} placeholder="Escribe el nombre de la bonificación" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        El nombre de la bonificación.
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
                                            placeholder="Descripcion de la bonificación"
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

export default BonificacionForm
