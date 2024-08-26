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
import { cajaOperadorCatalogoSchema } from "./validaciones.ts";
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
import { CajaComboBox } from "../ui/CajaComboBox.tsx";
import { ZustandGeneralUsuario } from "../../contexts/ZustandGeneralUsuario.tsx";


const CajaOperadoresForm = () => {
    const { toast } = useToast()
    const { caja, setCaja, loadingTable, setLoadingTable, setCajas, setAccion, accion } = useStateContext();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [abrirInput, setAbrirInput] = useState(false);
    const [anomaliaIdParaRestaurar, setAnomaliaIdParaRestaurar] = useState(null);
    const [ModalReactivacionOpen, setModalReactivacionOpen] = useState(false);
    const [operadorSeleccionado, setOperadorSeleccionado] = useState<string | null>(null);
    const [nuevoOperador, setNuevoOperador] = useState<{ id: number, id_operador: number, }[]>([{ id: 0, id_operador: 0,}]);
    const {setIdSeleccionadoConfiguracionOrdenDeTrabajo, idSeleccionadoConfiguracionOrdenDeTrabajo} = ZustandGeneralUsuario();
    type CajaOperadorCatalogoArray = z.infer<typeof cajaOperadorCatalogoArraySchema>;



    function dinamicoOperador() {
        // Determinar el nuevo valor a agregar
        var nuevoValor = 1;
        nuevoValor = nuevoOperador.length > 0 ? nuevoOperador[nuevoOperador.length - 1] + 1 : 1;

        // Actualizar el estado con el nuevo arreglo
        setNuevoOperador([...nuevoOperador, nuevoValor]);

        console.log(nuevoOperador);
    }

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
            description: "La caja  se ha editado correctamente",
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
            description: "La anomalía ya existe.",
            action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
        })
    }



    const form = useForm<z.infer<typeof cajaOperadorCatalogoSchema>>({
        resolver: zodResolver(cajaOperadorCatalogoSchema),
        defaultValues: {
            operadorSeleccionado: []
          } 
    })



    function onSubmit(values: z.infer<typeof cajaOperadorCatalogoSchema>) {
        setLoading(true);
        console.log("valor de formulario 1", values);
        
        const values2 = {
            ...values, id_caja_catalogo: idSeleccionadoConfiguracionOrdenDeTrabajo
        }

        console.log("valores enviado al back", values2);
        if (accion == "crear") {
            axiosClient.post(`/cajas/asignarOperador`, values2)
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
                    else {
                        setLoading(false);
                        setCaja({
                            id: 0,
                            id_operador: 0,
                            descripcion: "ninguna",
                        });
                        form.reset({
                            id: 0,
                            nombre: "",
                            descripcion: "ninguna",
                        });
                        getAnomalias();
                        successToastCreado();
                        setAccion("creado");
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
            axiosClient.put(`/AnomaliasCatalogo/update/${caja.id}`, values)
                .then((response) => {
                    const data = response.data;
                    if (data.confirmUpdate) {
                        setModalReactivacionOpen(true);
                    } else {
                        setLoading(false);
                        //alert("anomalia creada");
                        setAbrirInput(false);
                        setAccion("");
                        getAnomalias();
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
    const getAnomalias = async () => {
        setLoadingTable(true);
        try {
            const response = await axiosClient.get("/AnomaliasCatalogo");
            setLoadingTable(false);
            setCajas(response.data.data);
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
            await axiosClient.delete(`/AnomaliasCatalogo/log_delete/${caja.id}`);
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
                setCaja({
                    id: 0,
                    nombre: "",
                    descripcion: "ninguna",
                    estado: "activo"
                });
                getAnomalias();
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
                nombre: "",
                descripcion: "ninguna",
            });
            setCaja({});
            setAbrirInput(false);
        }
        if (accion == "creado") {
            form.reset({
                id: 0,
                nombre: "",
                descripcion: "ninguna",
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
                nombre: "",
                descripcion: "ninguna",
            });
            setCaja({
                id: 0,
                nombre: "",
                descripcion: "ninguna",
            })
        }
        if (accion === "ver") {
            setAbrirInput(false);
            setErrors({});
            setAccion("");
            
            const operadorAsignado = Array.isArray(caja.operadorAsignado) 
                ? caja.operadorAsignado.map(item => ({
                    id: item.id,
                    id_operador: item.id_operador
                }))
                
                : [];
        
            // Resetea el formulario con los operadores asignados
            form.reset({
                operadorSeleccionado: operadorAsignado,
            });
            console.log(caja.operadorAsignado);
            console.log("Formulario después del reset:", form.getValues());
            setNuevoOperador(operadorAsignado);

        }
        if (accion == "editar") {
            setAbrirInput(true);
            setErrors({});
        }
    }, [accion]);


    return (
        <>
            <div className="overflow-auto max-w-full max-h-full">
                <div className='flex h-[40px] items-center mb-[10px] bg-card rounded-sm'>
                    <div className='h-[20px] w-full flex items-center justify-end'>
                        <div className="mb-[10px] h-full w-full mx-4">
                            {accion == "crear" && <p className="text-muted-foreground text-[20px]">Creando nueva anomalía</p>}
                            {caja.nombre_caja != "" && <p className="text-muted-foreground text-[20px]">{caja.nombre_caja}</p>}
                        </div>
                        {
                        accion == "editar" &&
                        <div onClick={dinamicoOperador}>
                            <a title="Agregar nueva acción">
                            <IconButton>
                                <PlusCircledIcon className='w-[20px] h-[20px]' />
                            </IconButton>
                            </a>
                        </div>
                        }
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
                            {
                                nuevoOperador.map((operador, index) => (
                                    <FormField
                                        control={form.control}
                                        name={`operadorSeleccionado.${index}.id_operador`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Operador</FormLabel>
                                                <CajaComboBox form={form} field={field} name={`operadorSeleccionado.${index}.id_operador`} setCargoSeleccionado={setOperadorSeleccionado} />
                                                <FormDescription>
                                                    Asigna un operador a la caja.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )
                                )}
                            {loading && <Loader />}
                            <div className="flex space-x-2 justify-end">
                                {abrirInput && <Button type="submit">Guardar</Button>}
                            </div>



                        </form>
                    </Form>
                </div>

            </div>
        </>
    )
}

export default CajaOperadoresForm
