import { useState, useRef } from "react";
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
import MarcoForm from "../ui/MarcoForm.tsx";
import { Switch } from "../ui/switch.tsx";
import { ComboBoxCeroUno } from "../ui/ComboBoxCeroUno.tsx";




const ConceptoForm = () => {
    const formTarifa = useRef(null);
    const { toast } = useToast()
    const { concepto, setConcepto, loadingTable, setLoadingTable, setConceptos, setAccion, accion } = useStateContext();
    const [loading, setLoading] = useState(false);
    const [loadingTipoTomas, setLoadingTipoTomas] = useState(false);
    const [errors, setErrors] = useState({});
    const [abrirInput, setAbrirInput] = useState(false);
    const [conceptoIdParaRestaurar, setConceptoIdParaRestaurar] = useState(null);
    const [ModalReactivacionOpen, setModalReactivacionOpen] = useState(false);
    const [tipoTomas, setTipoDeTomas] = useState([])
    const [tarifas, setTarifas] = useState([]);


    useEffect((() => {
        getTipoTomas();
    }), [])

    //con este metodo obtienes las anomalias de la bd
    const getTipoTomas = async () => {
        setLoadingTipoTomas(true);
        try {
            const response = await axiosClient.get("/TipoToma");
            setLoadingTipoTomas(false);
            setTipoDeTomas(response.data.data);
        } catch (error) {
            setLoadingTipoTomas(false);
            errorToast();
            console.error("Failed to fetch anomalias:", error);
        }
    };

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
            genera_iva: concepto.genera_iva,
        },
    })



    function onSubmit(values) {
        let values2 = { ...values, tarifas }
        console.log(tarifas);
        setLoading(true);
        if (accion == "crear") {
            axiosClient.post(`/Concepto/create`, values2)
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
                            genera_iva: "0",
                        });
                        form.reset({
                            id: 0,
                            nombre: "",
                            descripcion: "ninguna",
                            prioridad_abono: 1,
                            genera_iva: "0",
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
            console.log(values2);
            axiosClient.put(`/Concepto/update/${concepto.id}`, values2)
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

    function onSubmitTarifa() {
        const formData = new FormData(formTarifa.current);
        let values = {};
        for (let [name, value] of formData.entries()) {
            values[name] = value;
        }
        let tarifas_temp = []
        let ctr = 0;
        for (const key in values) {
            if (values.hasOwnProperty(key)) {
                tarifas_temp[ctr] = {
                    id_tipo_toma: key,
                    monto: values[key]
                }
                ctr = ctr + 1;
            }
        }
        setTarifas(tarifas_temp);
    }
    useEffect(()=>{ if(accion == "editar" || accion == "crear"){handleFormSubmit()}},[tarifas])

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
                    genera_iva: "0",
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
                genera_iva: "0",

            });
            setConcepto({
                id: 0,
                nombre: "",
                descripcion: "ninguna",
                prioridad_abono: 1,
                genera_iva: "0",
            })
        }
        if (accion == "creado") {
            form.reset({
                id: 0,
                nombre: "",
                descripcion: "ninguna",
                genera_iva: "0",
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
                genera_iva: String(concepto.genera_iva),
            });
        }
        if (accion == "editar") {
            setAbrirInput(true);
            setErrors({});
        }
    }, [accion]);

    const handleFormSubmit = () => {
        form.handleSubmit(onSubmit)();
    };

    const handleTarifaFormSubmit = () => {
        console.log("hola");
        onSubmitTarifa();
    };

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
            {errors && <Error errors={errors} />}
            <div className="py-[20px] px-[10px] ">

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <MarcoForm title={"Informacion del concepto"}>
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
                                name="prioridad_abono"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Prioridad</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="number"
                                                type="number"
                                                defaultValue={1}
                                                min={1}
                                                max={10}
                                                readOnly={!abrirInput}
                                                {...field}
                                                onChange={(e) => field.onChange(parseInt(e.target.value, 10))} //SE OCUPA CONVERTIR PARA QUE NO LO MARQUE STRING KIEN SABE XQ JEJE
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            El 1 es minima y el 10 es maxima prioridad
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
                                name="genera_iva"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Genera IVA</FormLabel>
                                        <FormControl>
                                            <ComboBoxCeroUno currentValue={String(concepto.genera_iva)} placeholder={"IVA"} form={form} name={"genera_iva"} readOnly={!abrirInput} />
                                        </FormControl>
                                        <FormDescription>

                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </MarcoForm>

                    </form>
                </Form>

                {
                    loadingTipoTomas &&
                    <Loader />
                }
                {
                    !loadingTipoTomas &&
                    <>
                        <form ref={formTarifa} onSubmit={onSubmitTarifa}>
                            <MarcoForm title={"Tarifa"}>
                                <>
                                    {
                                        tipoTomas.map((tipoToma, index) => {
                                            return (
                                                <div>
                                                    <p className="mb-[10px]">{tipoToma.nombre}</p>
                                                    <input readOnly={!abrirInput} type="number" placeholder={`Tarifa ${tipoToma.nombre}`} name={tipoToma.id} className="w-full bg-background border border-border p-2 rounded-md" />
                                                </div>
                                            )
                                        })
                                    }

                                </>
                            </MarcoForm>
                        </form>
                    </>
                }

                {loading && <Loader />}

                {abrirInput &&
                    <Button onClick={() => { handleTarifaFormSubmit(); }}>Guardar</Button>
                }
            </div>
        </div>
    )
}

export default ConceptoForm
