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
import { cajaCatalogoSchema } from './validaciones.ts';
import { ModeToggle } from '../../components/ui/mode-toggle.tsx';
import axiosClient from '../../axios-client.ts';
import Loader from "../../components/ui/Loader.tsx";
import Error from "../../components/ui/Error.tsx";
import { Textarea } from "../ui/textarea.tsx";
import { useStateContext } from "../../contexts/ContextCaja.tsx";
import { useEffect } from "react";
import { TrashIcon, Pencil2Icon, PlusCircledIcon } from '@radix-ui/react-icons';
import IconButton from "../ui/IconButton.tsx";
import { ComboBoxActivoInactivo } from "../ui/ComboBox.tsx";
import Modal from "../ui/Modal.tsx";
import ModalReactivacion from "../ui/ModalReactivación.tsx"; //MODAL PARA REACTIVAR UN DATO QUE HAYA SIDO ELIMINADO
import { useToast } from "@/components/ui/use-toast"; //IMPORTACIONES TOAST
import { ToastAction } from "@/components/ui/toast"; //IMPORTACIONES TOAST
import { CuentasContablesComboBox } from "../ui/CuentasContablesComboBox.tsx";


const CajaForm = () => {
    const { toast } = useToast()
    const { caja, setCaja, loadingTable, setLoadingTable, setCajas, setAccion, accion } = useStateContext();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [abrirInput, setAbrirInput] = useState(false);
    const [anomaliaIdParaRestaurar, setAnomaliaIdParaRestaurar] = useState(null);
    const [ModalReactivacionOpen, setModalReactivacionOpen] = useState(false);
    const [cuentaContableSeleccionada, setCuentaContableSeleccionada] = useState("");
     //#region SUCCESSTOAST
    function successToastCreado() {
        toast({
            title: "¡Éxito!",
            description: "La caja se ha creado correctamente",
            variant: "success",

        })
    }
    function successToastEditado() {
        toast({
            title: "¡Éxito!",
            description: "La caja se ha editado correctamente",
            variant: "success",

        })
    }
    function successToastEliminado() {
        toast({
            title: "¡Éxito!",
            description: "La caja se ha eliminado correctamente",
            variant: "success",

        })
    }
    function successToastRestaurado() {
        toast({
            title: "¡Éxito!",
            description: "La caja se ha restaurado correctamente",
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
            description: "La caja ya existe.",
            action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
        })
    }



    const form = useForm<z.infer<typeof cajaCatalogoSchema>>({
        resolver: zodResolver(cajaCatalogoSchema),
        defaultValues: {
            id: 0,
            id_cuenta_contable: 0,
            nombre_caja:"",
            hora_apertura: "",
            hora_cierre: ""

        },
    })



    function onSubmit(values: z.infer<typeof cajaCatalogoSchema>) {
        setLoading(true);
       
        const formattedTime = formatTimeToHIS(values.hora_apertura);
        const formattedTime2 = formatTimeToHIS(values.hora_cierre);

        const values2 = {
            ...values,
            hora_apertura: formattedTime,
            hora_cierre: formattedTime2,
        }


        if (accion == "crear") {
            axiosClient.post(`/cajas/guardarCajaCatalogo`, values2)
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
                        setCaja({
                            id: 0,
                            nombre: "",
                            descripcion: "ninguna",
                        });
                        form.reset({
                            id: 0,
                            nombre: "",
                            descripcion: "ninguna",
                        });
                        getCajas();
                        successToastCreado();
                        setAccion("creado");
                    }
                
                })
                .catch((err) => {
                    const response = err.response;
                    console.log(response);
                    errorToast();
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                    setLoading(false);
                })
            console.log(abrirInput);
        }
        if (accion == "editar") {
            axiosClient.put(`/cajas/modificarCajaCatalogo/${caja.id}`, values)
                .then((response) => {
                    const data = response.data;
                    if (data.confirmUpdate) {
                        setModalReactivacionOpen(true);
                    } else {
                    setLoading(false);
                    //alert("anomalia creada");
                    setAbrirInput(false);
                    setAccion("");
                    getCajas();
                    setCaja(data.data);
                    //setNotification("usuario creado");
                    successToastEditado();
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
    }
    const handleConfirmUpdate = async () => {
        try {
            const response = await axiosClient.post('/actualizar-tarifa', { confirmUpdate: true });
            setModalReactivacionOpen(true);
        } catch (error) {
            console.error('Error en la actualización:', error);
        }
    };

    //con este metodo obtienes las anomalias de la bd
    const getCajas = async () => {
        setLoadingTable(true);
        try {
            const response = await axiosClient.get("/cajas/consultarCajas");
            setLoadingTable(false);
            setCajas(response.data);
            console.log(response.data);
        } catch (error) {
            setLoadingTable(false);
            errorToast();
            console.error("Failed to fetch anomalias:", error);
        }
    };

    //elimianar anomalia
    const onDelete = async () => {
        try {
            await axiosClient.delete(`/AnomaliasCatalogo/log_delete/${caja.id}`);
            getCajas();
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
                setCaja({
                    id: 0,
                    id_cuenta_contable: 0,
                    nombre_caja: "",
                    hora_apertura: "0",
                    hora_cierre: "0",
                });
                getCajas();
                successToastRestaurado();
                setAccion("creado");
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
                id_cuenta_contable: 0,
                nombre_caja: "",
                hora_apertura: "0",
                hora_cierre: "0",
            });
            setCaja({});
            setAbrirInput(false);
        }
        if (accion == "creado") {
            form.reset({
                id: 0,
                id_cuenta_contable: 0,
                nombre_caja: "",
                hora_apertura: "0",
                hora_cierre: "0",
            });
            setCaja({});
            setAbrirInput(false);
        }
        if (accion == "crear") {
            console.log("creando");
            setAbrirInput(true);
            setErrors({});
            form.reset({
                id: 0,
                id_cuenta_contable: 0,
                nombre_caja: "",
                hora_apertura: "0",
                hora_cierre: "0",
            });
            setCaja({
                id: 0,
                id_cuenta_contable: 0,
                nombre_caja: "",
                hora_apertura: "0",
                hora_cierre: "0",
            })
        }
        if (accion == "ver") {
            setAbrirInput(false);
            setErrors({});
            setAccion("");
            form.reset({
                id: 0,
                id_cuenta_contable: caja.id_cuenta_contable,
                nombre_caja: caja.nombre_caja,
                hora_apertura: caja.hora_apertura,
                hora_cierre: caja.hora_cierre,
            });
        }
        if (accion == "editar") {
            setAbrirInput(true);
            setErrors({});
        }
    }, [accion]);


    //METODO PARA CONVERTIR DE H:i al formato que pide H:i:s
    
    const formatTimeToHIS = (time) => {
        return `${time}:00`;
      };

     
    return (
        <>
            <div className="overflow-auto max-w-full max-h-full">
                <div className='flex h-[40px] items-center mb-[10px] bg-card rounded-sm'>
                    <div className='h-[20px] w-full flex items-center justify-end'>
                        <div className="mb-[10px] h-full w-full mx-4">
                            {accion == "crear" && <p className="text-muted-foreground text-[20px]">Creando nueva caja</p>}
                            {caja.nombre_caja != "" && <p className="text-muted-foreground text-[20px]">{caja.nombre_caja}</p>}
                        </div>
                        {(caja.nombre_caja != null && caja.nombre_caja != "") &&
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
                                name="nombre_caja"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nombre</FormLabel>
                                        <FormControl>
                                            <Input readOnly={!abrirInput} placeholder="Escribe el nombre de la caja" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            El nombre de la caja.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="id_cuenta_contable"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cuenta contable</FormLabel>
                                        <FormControl>
                                        <CuentasContablesComboBox form={form} field={field} name="id_cuenta_contable" setCargoSeleccionado={setCuentaContableSeleccionada}/>
                                        </FormControl>
                                        <FormDescription>
                                            Selecciona una cuenta contable.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="w-[18.9vh]">
                            <FormField
                                control={form.control}
                                name="hora_apertura"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Apertura</FormLabel>
                                        <FormControl>
                                        <input {...field} readOnly={!abrirInput} type="time" name="hora_apertura" 
                                          className="border border-border w-full rounded-md p-[4px] bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring disabled:opacity-50 disabled:cursor-not-allowed"/>
                                        </FormControl>
                                        <FormDescription>
                                            Escoge el horario de apertura.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            </div>
                            <div className="w-[18.9vh]">
                            <FormField
                                control={form.control}
                                name="hora_cierre"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cierre</FormLabel>
                                        <FormControl>
                                        <input {...field} 
                                        readOnly={!abrirInput} 
                                        type="time" name="hora_cierre" 
                                     
                                          className="border border-border w-full rounded-md p-[4px] bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring disabled:opacity-50 disabled:cursor-not-allowed"/>
                                        </FormControl>
                                        <FormDescription>
                                            Escoge el horario de cierre.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            </div>
                             
                            {loading && <Loader />}
                            {abrirInput && <Button type="submit">Guardar</Button>}

                        </form>
                    </Form>
                </div>

            </div>
        </>
    )
}

export default CajaForm
