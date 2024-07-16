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
import ModalReactivacion from "../ui/ModalReactivación.tsx";
import { useToast } from "@/components/ui/use-toast"; //IMPORTACIONES TOAST
import { ToastAction } from "@/components/ui/toast"; //IMPORTACIONES TOAST
import { Concepto } from "../Tables/Columns/ConceptosColumns.tsx";





const ConceptoForm = () => {
    const { toast } = useToast()
    const { concepto, setConcepto, loadingTable, setLoadingTable, setConceptos, setAccion, accion } = useStateContext();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [abrirInput, setAbrirInput] = useState(false);
    const [conceptoIdParaRestaurar, setConceptoIdParaRestaurar] = useState(null);
    const [ModalReactivacionOpen, setModalReactivacionOpen] = useState(false);



    //#region SUCCESSTOAST
    function successToastCreado() {
        toast({
            title: "¡Éxito!",
            description: "El concepto se ha creado correctamente",
            variant: "success",

        })
    }
    function successToastEditado() {
        toast({
            title: "¡Éxito!",
            description: "El concepto se ha editado correctamente",
            variant: "success",

        })
    }
    function successToastEliminado() {
        toast({
            title: "¡Éxito!",
            description: "El concepto se ha eliminado correctamente",
            variant: "success",

        })
    }
    function successToastRestaurado() {
        toast({
            title: "¡Éxito!",
            description: "El concepto se ha restaurado correctamente",
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








    const form = useForm<z.infer<typeof conceptoSchema>>({
        resolver: zodResolver(conceptoSchema),
        defaultValues: {
            id: concepto.id,
            nombre: concepto.nombre,
            descripcion: concepto.descripcion,
            prioridad_abono: concepto.prioridad_abono,
        },
    })



    function onSubmit(values: z.infer<typeof conceptoSchema>) {
        setLoading(true);
        if (accion == "crear") {
            axiosClient.post(`/Concepto/create`, values)
                .then((response) => {
                    const data = response.data;
                    if (data.restore) {
                        setConceptoIdParaRestaurar(data.concepto_id);
                        setModalReactivacionOpen(true);

                    }
                    else if (data.restore == false) {
                        errorYaExisteToast();
                        setLoading(false);
                    }
                    else {
                        setModalReactivacionOpen(false);
                        setLoading(false);
                        setConcepto({
                            id: 0,
                            nombre: "",
                            descripcion: "ninguna",
                            prioridad_abono: 1,
                        });
                        form.reset({
                            id: 0,
                            nombre: "",
                            descripcion: "ninguna",
                            prioridad_abono: 1,

                        });
                        setAccion("creado")
                        getConcepto();
                        successToastCreado();
                    }
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
                    console.log("entro al metodo para editar")
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



    //Metodo para estaurar el dato que se encuentra eliminado(soft-delete)
    const restaurarDato = (concepto_id: any) => {
        axiosClient.put(`/Concepto/restaurar/${concepto_id}`)
            .then(() => {
                setLoading(false);
                setAbrirInput(false);
                setAccion("crear");
                setConcepto({
                    id: 0,
                    nombre: "",
                    descripcion: "ninguna",
                    prioridad_abono: 1,

                });
                getConcepto();
                successToastRestaurado();
                setAccion("creado");
                setModalReactivacionOpen(false);
            })
            .catch((err) => {
                errorToast();
                setLoading(false);
            });
    };

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
                prioridad_abono: 1,
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
                prioridad_abono: 1,

            });
            setConcepto({
                id: 0,
                nombre: "",
                descripcion: "ninguna",
                prioridad_abono: 1,

            })
        }
        if (accion == "creado") {
            form.reset({
                id: 0,
                nombre: "",
                descripcion: "ninguna",
            });
            setConcepto({});
            setAbrirInput(false);
        }
        if (accion == "ver") {
            setAbrirInput(false);
            setErrors({});
            setAccion("");
            form.reset({
                id: concepto.id,
                nombre: concepto.nombre,
                descripcion: concepto.descripcion,
                prioridad_abono: concepto.prioridad_abono,

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
                        {accion == "crear" && <p className="text-muted-foreground text-[20px]">Creando nuevo concepto</p>}
                        {concepto.nombre != "" && <p className="text-muted-foreground text-[20px]">{concepto.nombre}</p>}
                    </div>
                    {(concepto.nombre != null && concepto.nombre != "") &&
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
                                        <Input readOnly={!abrirInput} placeholder="Escribe el nombre del concepto" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        El nombre del concepto.
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
                                            placeholder="Descripcion del concepto"
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
                            name="prioridad_abono"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Prioridad</FormLabel>
                                    <FormControl>
                                    <Input
                                    id="number"
                                    type="number"
                                    defaultValue={1}
                                    min = {1}
                                    max = {10}
                                    readOnly = {!abrirInput}
                                    {...field}
                                    />
                                    </FormControl>
                                    <FormDescription>
                                        Agrega su prioridad.
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
