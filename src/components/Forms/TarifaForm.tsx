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
import { tarifaSchema } from './validaciones.ts';
import { ModeToggle } from '../ui/mode-toggle.tsx';
import axiosClient from '../../axios-client.ts';
import Loader from "../ui/Loader.tsx";
import Error from "../ui/Error.tsx";
import { Textarea } from "../ui/textarea.tsx";
import { useStateContext } from "../../contexts/ContextTarifa.tsx";
import { useEffect } from "react";
import { TrashIcon, Pencil2Icon, PlusCircledIcon } from '@radix-ui/react-icons';
import IconButton from "../ui/IconButton.tsx";
import { ComboBoxActivoInactivo } from "../ui/ComboBox.tsx";
import Modal from "../ui/Modal.tsx";
import ModalReactivacion from "../ui/ModalReactivación.tsx"; //MODAL PARA REACTIVAR UN DATO QUE HAYA SIDO ELIMINADO
import { useToast } from "@/components/ui/use-toast"; //IMPORTACIONES TOAST
import { ToastAction } from "@/components/ui/toast"; //IMPORTACIONES TOAST

const TarifaForm = ({ setActiveTab }) => {
    const { toast } = useToast()
    const { tarifa, setTarifa, loadingTable, setLoadingTable, setTarifas, setAccion, accion } = useStateContext();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [abrirInput, setAbrirInput] = useState(false);
    const [indiceTarifa, setIndiceTarifa] = useState(0);

    const getCurrentDate = () => new Date().toISOString().split("T")[0];

    const form = useForm<z.infer<typeof tarifaSchema>>({
        resolver: zodResolver(tarifaSchema),
        defaultValues: {
            id: tarifa.id,
            nombre: tarifa.nombre,
            descripcion: tarifa.descripcion,
            fecha: getCurrentDate(), // Establece la fecha por defecto como la fecha actual
            estado: "activo",
        },
    })


    //OPCIONES QUE EXISTEN DEL TAP
    const opcionesTabs = ["Tarifa", "Servicios", "Conceptos"];
    //METODO PARA TENER CONTROL DEL TAP
    const nextTab = () => {

        const currentIndex = opcionesTabs.indexOf("Tarifa");
        const indiceTarifa = (currentIndex + 1) % opcionesTabs.length;
        setActiveTab(opcionesTabs[indiceTarifa]);

    };

    //#region SUCCESSTOAST
    function successToastCreado() {
        toast({
            title: "¡Éxito!",
            description: "La tarifa se ha creado correctamente",
            variant: "success",

        })
    }
    function successToastEditado() {
        toast({
            title: "¡Éxito!",
            description: "La tarifa  se ha editado correctamente",
            variant: "success",

        })
    }
    function successToastEliminado() {
        toast({
            title: "¡Éxito!",
            description: "La tarifa se ha eliminado correctamente",
            variant: "success",

        })
    }
    function successToastRestaurado() {
        toast({
            title: "¡Éxito!",
            description: "La tarifa se ha restaurado correctamente",
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




    function onSubmit(values: z.infer<typeof tarifaSchema>) {
        console.log("submit");
        setLoading(true);
        if (accion == "crear") {
            axiosClient.post(`/tarifa/create`, values)
                .then((response) => {
                    const data = response.data;
                    setLoading(false);
                    setTarifa({
                        id: 0,
                        nombre: "",
                        descripcion: "ninguna",
                        fecha: getCurrentDate(),
                        estado: "activo",

                    });
                    form.reset({
                        id: 0,
                        nombre: "",
                        descripcion: "ninguna",
                        fecha: getCurrentDate(),
                        estado: "activo",
                    });
                    getTarifas();
                    successToastCreado();
                    setAccion("creado");

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
            axiosClient.put(`/tarifa/update/${tarifa.id}`, values)
                .then((data) => {
                    setLoading(false);
                    //alert("anomalia creada");
                    setAbrirInput(false);
                    setAccion("");
                    getTarifas();
                    setTarifa(data.data);
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
    const getTarifas = async () => {
        setLoadingTable(true);
        try {
            const response = await axiosClient.get("/tarifa");
            setLoadingTable(false);
            setTarifas(response.data.data);
        } catch (error) {
            setLoading(false);
            errorToast();
            console.error("Failed to fetch constancias:", error);
        }
    };

    //elimianar anomalia
    const onDelete = async () => {
        try {
            await axiosClient.delete(`/tarifa/log_delete/${tarifa.id}`);
            getTarifas();
            setAccion("eliminar");
            successToastEliminado();
        } catch (error) {
            errorToast();
            console.error("Failed to delete Giro Comercial:", error);
        }
    };

    //este metodo es para cuando actualizar el formulario cuando limpias las variables de la anomalia
    useEffect(() => {
        if (accion === "eliminar") {
            form.reset({
                id: 0,
                nombre: "",
                descripcion: "ninguna",
                fecha: getCurrentDate(),
                estado: "activo",
            });
            setTarifa({});
            setAbrirInput(false);
        }
        if (accion === "creado") {
            form.reset({
                id: 0,
                nombre: "",
                descripcion: "ninguna",
                fecha: getCurrentDate(),
                estado: "activo",
            });
            setTarifa({});
            setAbrirInput(false);
        }
        if (accion === "crear") {
            console.log("creando");
            setAbrirInput(true);
            setErrors({});
            form.reset({
                id: 0,
                nombre: "",
                descripcion: "ninguna",
                fecha: getCurrentDate(),
                estado: "activo",
            });
            setTarifa({
                id: 0,
                nombre: "",
                descripcion: "ninguna",
                fecha: getCurrentDate(),
                estado: "activo",
            });
        }
        if (accion === "ver") {
            setAbrirInput(false);
            setErrors({});
            setAccion("");
            form.reset({
                id: tarifa.id,
                nombre: tarifa.nombre,
                descripcion: tarifa.descripcion,
                fecha: tarifa.fecha,
                estado: tarifa.estado,
            });
        }
        if (accion === "editar") {
            setAbrirInput(true);
            setErrors({});
        }
        console.log(accion);
    }, [accion]);

    return (
        <div className="overflow-auto">
            <div className='flex h-[40px] items-center mb-[10px] bg-muted rounded-sm'>
                <div className='h-[20px] w-full flex items-center justify-end'>
                    <div className="mb-[10px] h-full w-full mx-4">
                        {accion == "crear" && <p className="text-muted-foreground text-[20px]">Creando nueva tarifa</p>}
                        {tarifa.nombre != "" && <p className="text-muted-foreground text-[20px]">{tarifa.nombre}</p>}
                    </div>
                    {(tarifa.nombre != null && tarifa.nombre != "") &&
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
                                        <Input readOnly={!abrirInput} placeholder="Escribe el nombre de la tarifa" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        El nombre de la tarifa.
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
                                            placeholder="Descripcion de la tarifa"
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
                        {abrirInput && <Button type="submit">Siguiente</Button>}

                    </form>
                </Form>
            </div>

        </div>
    )
}

export default TarifaForm
