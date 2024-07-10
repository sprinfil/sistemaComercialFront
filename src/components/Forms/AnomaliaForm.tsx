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
import { anomaliaSchema } from './validaciones.ts';
import { ModeToggle } from '../../components/ui/mode-toggle.tsx';
import axiosClient from '../../axios-client.ts';
import Loader from "../../components/ui/Loader.tsx";
import Error from "../../components/ui/Error.tsx";
import { Textarea } from "../ui/textarea.tsx";
import { useStateContext } from "../../contexts/ContextAnomalias.tsx";
import { useEffect } from "react";
import { TrashIcon, Pencil2Icon, PlusCircledIcon } from '@radix-ui/react-icons';
import IconButton from "../ui/IconButton.tsx";
import { ComboBoxActivoInactivo } from "../ui/ComboBox.tsx";
import Modal from "../ui/Modal.tsx";
import ModalReactivacion from "../ui/ModalReactivación.tsx"; //MODAL PARA REACTIVAR UN DATO QUE HAYA SIDO ELIMINADO
import { useToast } from "@/components/ui/use-toast"; //IMPORTACIONES TOAST
import { ToastAction } from "@/components/ui/toast"; //IMPORTACIONES TOAST


const AnomaliaForm = () => {
    const { toast } = useToast()
    const { anomalia, setAnomalia, loadingTable, setLoadingTable, setAnomalias, setAccion, accion } = useStateContext();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [abrirInput, setAbrirInput] = useState(false);
    const [anomaliaIdParaRestaurar, setAnomaliaIdParaRestaurar] = useState(null);
    const [ModalReactivacionOpen, setModalReactivacionOpen] = useState(false);

     //#region SUCCESSTOAST
    function successToastCreado() {
        toast({
            title: "¡Éxito!",
            description: "La anomalía se ha creado correctamente",
            variant: "success",

        })
    }
    function successToastEditado() {
        toast({
            title: "¡Éxito!",
            description: "La anomalía  se ha editado correctamente",
            variant: "success",

        })
    }
    function successToastEliminado() {
        toast({
            title: "¡Éxito!",
            description: "La anomalía  se ha eliminado correctamente",
            variant: "success",

        })
    }
    function successToastRestaurado() {
        toast({
            title: "¡Éxito!",
            description: "La anomalía  se ha restaurado correctamente",
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



    const form = useForm<z.infer<typeof anomaliaSchema>>({
        resolver: zodResolver(anomaliaSchema),
        defaultValues: {
            id: anomalia.id,
            nombre: anomalia.nombre,
            descripcion: anomalia.descripcion,
        },
    })



    function onSubmit(values: z.infer<typeof anomaliaSchema>) {
        setLoading(true);
        if (accion == "crear") {
            axiosClient.post(`/AnomaliasCatalogo/create`, values)
                .then((response) => {
                    const data = response.data;
                    if (data.restore) {
                        setAnomaliaIdParaRestaurar(data.anomalia_id);
                        setModalReactivacionOpen(true);
                    }
                    else if (data.restore == false) {
                        errorYaExisteToast();
                        setLoading(false);
                    }
                    else{
                        setLoading(false);
                        setAnomalia({
                            id: 0,
                            nombre: "",
                            descripcion: "ninguna",
                        });
                        form.reset({
                            id: 0,
                            nombre: "",
                            descripcion: "ninguna",
                        });
                        getAnomalias();
                        successToastCreado();
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
        }
        if (accion == "editar") {
            axiosClient.put(`/AnomaliasCatalogo/update/${anomalia.id}`, values)
                .then((data) => {
                    setLoading(false);
                    //alert("anomalia creada");
                    setAbrirInput(false);
                    setAccion("");
                    getAnomalias();
                    setAnomalia(data.data);
                    //setNotification("usuario creado");
                    successToastEditado();
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
    const getAnomalias = async () => {
        setLoadingTable(true);
        try {
            const response = await axiosClient.get("/AnomaliasCatalogo");
            setLoadingTable(false);
            setAnomalias(response.data.data);
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
            await axiosClient.delete(`/AnomaliasCatalogo/log_delete/${anomalia.id}`);
            getAnomalias();
            setAccion("eliminar");
            successToastEliminado();
        } catch (error) {
            errorToast();
            console.error("Failed to delete anomalia:", error);
        }
    };

     //Metodo para estaurar el dato que se encuentra eliminado(soft-delete)
    const restaurarDato = (anomalia_id: any) => {
        axiosClient.put(`/AnomaliasCatalogo/restaurar/${anomalia_id}`)
            .then(() => {
                setLoading(false);
                setAbrirInput(false);
                setAccion("crear");
                setAnomalia({
                    id: 0,
                    nombre: "",
                    descripcion: "ninguna",
                    estado: "activo"
                });
                getAnomalias();
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
            setAnomalia({});
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
            setAnomalia({
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
                id: anomalia.id,
                nombre: anomalia.nombre,
                descripcion: anomalia.descripcion,
            });
        }
        if (accion == "editar") {
            setAbrirInput(true);
            setErrors({});
        }
    }, [accion]);

    return (
        <>
            <div className="overflow-auto">
                <div className='flex h-[40px] items-center mb-[10px] bg-card rounded-sm'>
                    <div className='h-[20px] w-full flex items-center justify-end'>
                        <div className="mb-[10px] h-full w-full mx-4">
                            {accion == "crear" && <p className="text-muted-foreground text-[20px]">Creando nueva anomalia</p>}
                            {anomalia.nombre != "" && <p className="text-muted-foreground text-[20px]">{anomalia.nombre}</p>}
                        </div>
                        {(anomalia.nombre != null && anomalia.nombre != "") &&
                            <>
                                <Modal
                                    method={onDelete}
                                    button={
                                        <a title="Eliminar">
                                            <IconButton>
                                                <TrashIcon className="w-[20px] h-[20px]" />
                                            </IconButton>
                                        </a>}
                                />
                                <div onClick={() => setAccion("editar")}>
                                    <a title="Editar">
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
                            method={() => restaurarDato(anomaliaIdParaRestaurar)}
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
                                            <Input readOnly={!abrirInput} placeholder="Escribe el nombre de la anomalia" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            El nombre de la anomalia.
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
                                                placeholder="Descripcion de la anomalia"
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
        </>
    )
}

export default AnomaliaForm
