import { useState } from "react";
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
import { conveniosSchema } from './validaciones.ts';
import axiosClient from '../../axios-client.ts';
import Loader from "../../components/ui/Loader.tsx";
import Error from "../../components/ui/Error.tsx";
import { Textarea } from "../ui/textarea.tsx";
import { useStateContext } from "../../contexts/ContextConvenio.tsx";
import { useEffect } from "react";
import { TrashIcon, Pencil2Icon } from '@radix-ui/react-icons';
import IconButton from "../ui/IconButton.tsx";
import { ComboBoxActivoInactivo } from "../ui/ComboBox.tsx";
import Modal from "../ui/Modal.tsx";
import { useToast } from "@/components/ui/use-toast"; //IMPORTACIONES TOAST
import { ToastAction } from "@/components/ui/toast"; //IMPORTACIONES TOAST
import ModalReactivacion from "../ui/ModalReactivación.tsx";
import { Switch } from "../ui/switch.tsx";





const ConceptoForm = () => {
    const { toast } = useToast()
    const { convenio, setConvenio, loadingTable, setLoadingTable, setConvenios, setAccion, accion } = useStateContext();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [abrirInput, setAbrirInput] = useState(false);
    const [conceptoIdParaRestaurar, setConceptoIdParaRestaurar] = useState(null);
    const [ModalReactivacionOpen, setModalReactivacionOpen] = useState(false);
    const [valorObtenidoBool, setValorObtenidoBool] = useState(false);
    const [control, setControl] = useState(false);




    const form = useForm<z.infer<typeof conveniosSchema>>({
        resolver: zodResolver(conveniosSchema),
        defaultValues: {
            id: convenio?.id || 0,
            nombre: convenio?.nombre || "",
            descripcion: convenio?.descripcion || "",
            estado: convenio?.estado ||  false
        },
    })

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
    function successToastRestaurado() {
        toast({
            title: "¡Éxito!",
            description: "El convenio se ha restaurado correctamente",
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
            description: "El convenio ya existe.",
            action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
        })
    }


    function onSubmit(values: z.infer<typeof conveniosSchema>) {
        setLoading(true);
        const boolConvetido = convenio.estado ? "activo" : "inactivo"

        let values2 = { ...values, estado: boolConvetido }
        if (accion == "crear") {
            axiosClient.post(`/Convenio/create`, values2)
                .then((response) => {
                    const data = response.data;
                    if (data.restore) {
                        setConceptoIdParaRestaurar(data.convenio_id);
                        setModalReactivacionOpen(true);
                    }
                    else if (data.restore == false) {
                        errorYaExisteToast();
                        setLoading(false);
                    }
                    else {
                        setLoading(false);
                        setConvenio({
                            id: 0,
                            nombre: "",
                            descripcion: "ninguna",
                            estado: false

                        });
                        form.reset({
                            id: 0,
                            nombre: "",
                            descripcion: "ninguna",
                            estado: false

                        });
                        getConvenios();
                        console.log(values);
                        successToastCreado();
                        setAccion("creado");
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

            const boolConvetido = values.estado == true ? "activo" : "inactivo"

            let values2 = { ...values, estado: boolConvetido }
            axiosClient.put(`/Convenio/update/${convenio.id}`, values2)
                .then((data) => {
                    setLoading(false);
                    //alert("anomalia creada");
                    setAbrirInput(false);
                    setAccion("");
                    getConvenios();
                    setConvenio(data.data);
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
    const getConvenios = async () => {
        setLoadingTable(true);
        try {
            const response = await axiosClient.get("/Convenio");
            setLoadingTable(false);
            setConvenios(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            setLoadingTable(false);
            errorToast();
            console.error("Failed to fetch anomalias:", error);
        }
    };

    //elimianar convenio
    const onDelete = async () => {
        try {
            await axiosClient.delete(`/Convenio/log_delete/${convenio.id}`);
            getConvenios();
            setAccion("eliminar");
            successToastEliminado();
        } catch (error) {
            console.error("Failed to delete anomalia:", error);
        }
    };

    //Metodo para estaurar el dato que se encuentra eliminado(soft-delete)
    const restaurarDato = (concepto_id: any) => {
        axiosClient.put(`/Convenio/restaurar/${concepto_id}`)
            .then(() => {
                setLoading(false);
                setAbrirInput(false);
                setAccion("crear");
                setConvenio({
                    id: 0,
                    nombre: "",
                    descripcion: "ninguna",
                    estado: "activo"
                });
                getConvenios();
                successToastRestaurado();
                setModalReactivacionOpen(false);
                setAccion("creado");
            })
            .catch((err) => {
                errorToast();
                setLoading(false);
            });
    };

    //este metodo es para cuando actualizar el formulario cuando limpias las variables de la anomalia
    useEffect(() => {
        if (accion == "eliminar") {
            setControl(false);
            form.reset({
                id: 0,
                nombre: "",
                descripcion: "ninguna",
                estado: false

            });
            setConvenio({});
            setAbrirInput(false);
        }
        if (accion == "creado") {
            setControl(false);
            form.reset({
                id: 0,
                nombre: "",
                descripcion: "ninguna",
                estado: false

            });
            setConvenio({});
            setAbrirInput(false);
        }
        if (accion == "crear") {
            setControl(true);
            setAbrirInput(true);
            setErrors({});
            form.reset({
                id: 0,
                nombre: "",
                descripcion: "ninguna",
                estado: false

            });
            setConvenio({
                id: 0,
                nombre: "",
                descripcion: "ninguna",
                estado: false

            })
        }
        if (accion == "ver") {
            setControl(false);



            const valorDesdeBaseDeDatos: string = convenio.estado as unknown as string;
            const valorBooleano: boolean = valorDesdeBaseDeDatos === 'activo';
            setValorObtenidoBool(valorBooleano);

            setAbrirInput(false);
            setErrors({});
            setAccion("");
            form.reset({
                id: convenio.id,
                nombre: convenio.nombre,
                descripcion: convenio.descripcion,
                estado: valorBooleano

            });
        }
        if (accion == "editar") {
            setAbrirInput(true);
            setControl(true);
            setErrors({});
        }
    }, [accion]);
    return (

        <div className="overflow-auto">
            <div className='flex h-[40px] items-center mb-[10px] rounded-sm'>
                <div className='h-[20px] w-full flex items-center justify-end'>
                    <div className="mb-[10px] h-full w-full mx-4">
                        {accion == "crear" && <p className="text-muted-foreground text-[20px]">Creando nuevo convenio</p>}
                        {convenio.nombre != "" && <p className="text-muted-foreground text-[20px]">{convenio.nombre}</p>}
                    </div>
                    {(convenio.nombre != null && convenio.nombre != "") &&
                        <>
                            <Modal
                                method={onDelete}
                                button={
                                    <a title="Eliminar">
                                        <IconButton>
                                            <TrashIcon className="w-[20px] h-[20px]" />
                                        </IconButton></a>}
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
                            method={() => restaurarDato(conceptoIdParaRestaurar)}
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
                                        <Input readOnly={!abrirInput} placeholder="Escribe el nombre del convenio" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        El nombre del convenio.
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
                                            placeholder="Descripción del convenio"
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
                        <FormField
                            control={form.control}
                            name="estado"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Estado</FormLabel>
                                    <FormControl>
                                        {control
                                            ?
                                            <Switch
                                                className="ml-3"
                                                checked={field.value}
                                                onCheckedChange={(checked) => field.onChange(checked)
                                                }
                                            />
                                            :
                                            <Switch
                                                disabled
                                                className="ml-3"
                                                checked={field.value}
                                                onCheckedChange={(checked) => field.onChange(checked)
                                                }
                                            />
                                        }

                                    </FormControl>
                                    <FormDescription>
                                    Aquí puedes cambiar el estado del convenio.

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
