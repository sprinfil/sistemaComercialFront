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
import { OrdenDeTrabajoCrearSchema } from './OrdenDeTrabajoValidaciones.ts';
import { ModeToggle } from '../../components/ui/mode-toggle.tsx';
import axiosClient from '../../axios-client.ts';
import Loader from "../../components/ui/Loader.tsx";
import Error from "../../components/ui/Error.tsx";
import { Textarea } from "../ui/textarea.tsx";
import { useStateContext } from "../../contexts/ContextOrdenDeTrabajo.tsx";
import { useEffect } from "react";
import { TrashIcon, Pencil2Icon, PlusCircledIcon } from '@radix-ui/react-icons';
import IconButton from "../ui/IconButton.tsx";
import { ComboBoxActivoInactivo } from "../ui/ComboBox.tsx";
import Modal from "../ui/Modal.tsx";
import ModalReactivacion from "../ui/ModalReactivación.tsx"; //MODAL PARA REACTIVAR UN DATO QUE HAYA SIDO ELIMINADO
import { useToast } from "@/components/ui/use-toast"; //IMPORTACIONES TOAST
import { ToastAction } from "@/components/ui/toast"; //IMPORTACIONES TOAST
import { Switch } from "../ui/switch.tsx";
import { ConceptosComboBoxNew } from "../ui/ConceptosComboBoxNew.tsx";
import OrdenDeTrabajoCargosTable from "../Tables/Components/OrdenDeTrabajoCargosTable.tsx";
import { OrdenDeTrabajoAplicacionComboBox } from "../ui/OrdenDeTrabajoAplicacionComboBox.tsx";
import { CuentasContablesComboBox } from "../ui/CuentasContablesComboBox.tsx";
type OrdenDeTrabajo = {
    nombre: string;
    aplicacion: string;
    // Otras propiedades relevantes
  };
  
const OrdenDeTrabajoForm = () => {
    const { toast } = useToast()
    const { ordenDeTrabajo, setOrdenDeTrabajo, loadingTable, setLoadingTable, setOrdenDeTrabajos, setAccion, accion } = useStateContext();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [abrirInput, setAbrirInput] = useState(false);
    const [IdParaRestaurar, setIdParaRestaurar] = useState(null);
    const [ModalReactivacionOpen, setModalReactivacionOpen] = useState(false);
    const [bloquear, setBloquear] = useState(false);
    const [cargoSeleccionado, setCargoSeleccionado] = useState();
    const [nombreSeleccionado, setNombreSeleccionado] = useState<string | null>(null);
    const [aplicacionSeleccionada, setAplicacionSeleccionada] = useState<string | null>(null);
    const [cargosAgregados, setCargosAgregados] = useState<OrdenDeTrabajo[]>([]);
     //#region SUCCESSTOAST
    function successToastCreado() {
        toast({
            title: "¡Éxito!",
            description: "La orden de trabajo se ha creado correctamente",
            variant: "success",

        })
    }
    function successToastEditado() {
        toast({
            title: "¡Éxito!",
            description: "La orden de trabajo se ha editado correctamente",
            variant: "success",

        })
    }
    function successToastEliminado() {
        toast({
            title: "¡Éxito!",
            description: "La orden de trabajo se ha eliminado correctamente",
            variant: "success",

        })
    }
    function successToastRestaurado() {
        toast({
            title: "¡Éxito!",
            description: "La orden de trabajo se ha restaurado correctamente",
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
            description: "El tipo de toma ya existe.",
            action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
        })
    }


    const form = useForm<z.infer<typeof OrdenDeTrabajoCrearSchema>>({
        resolver: zodResolver(OrdenDeTrabajoCrearSchema),
        defaultValues: {
            id: ordenDeTrabajo.id,
            nombre: ordenDeTrabajo.nombre,
            estado: ordenDeTrabajo.estado,
            cargos: ordenDeTrabajo.cargos,
            momento: ordenDeTrabajo.momento
        },
    })



    function onSubmit(values: z.infer<typeof OrdenDeTrabajoCrearSchema>) {
        setLoading(true);

        const transformedData = {
            id: values.id,
            nombre: values.nombre,
            orden_trabajo_conf: {
                id: 1, // Si necesitas un ID fijo o estático, puedes usar un valor por defecto
                id_orden_trabajo_catalogo: values.id_orden_trabajo_catalogo || 5, // Usa un valor por defecto o extrae el valor correctamente
                id_concepto_catalogo: values.id_concepto_catalogo || 1, // Usa un valor por defecto o extrae el valor correctamente
                accion: values.accion || "modificar",
                momento: values.aplicacion || "generar",
                atributo: values.estado || "estatus",
                valor: values.valor || "baja temporal",
            },
        };
        if (accion == "crear") {
            axiosClient.post(`/OrdenTrabajoCatalogo/create`, transformedData )
                .then((response) => {
                    const data = response.data;
                    if(data.restore)
                    {
                        setIdParaRestaurar(data.tipoToma_id);
                        setModalReactivacionOpen(true);
                    }
                    else if (data.restore == false) {
                        errorYaExisteToast();
                        setLoading(false);
                    }
                    else
                    {
                    setLoading(false);
                    setOrdenDeTrabajo({
                        id: 0,
                        nombre: "",
                        descripcion: "ninguna",
                    });
                    form.reset({
                        id: 0,
                        nombre: "",
                        descripcion: "ninguna",
                    });
                    setAccion("creado");
                    getAnomalias();
                    successToastCreado();
                    console.log(values);
                    //setNotification("usuario creado");
        }})
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
            axiosClient.put(`/TipoToma/update/${ordenDeTrabajo.id}`, values)
                .then((data) => {
                    setLoading(false);
                    //alert("anomalia creada");
                    setAbrirInput(false);
                    setAccion("");
                    getAnomalias();
                    setOrdenDeTrabajo(data.data);
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
            const response = await axiosClient.get("/OrdenTrabajoCatalogo");
            setLoadingTable(false);
            setOrdenDeTrabajos(response.data.data);
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
            await axiosClient.delete(`/TipoToma/log_delete/${ordenDeTrabajo.id}`);
            getAnomalias();
            setAccion("eliminar");
            successToastEliminado();
        } catch (error) {
            errorToast();
            console.error("Failed to delete anomalia:", error);
        }
    };
     //Metodo para estaurar el dato que se encuentra eliminado(soft-delete)
     const restaurarDato = (IdParaRestaurar: any) => {
        axiosClient.put(`/TipoToma/restore/${IdParaRestaurar}`)
            .then(() => {
                setLoading(false);
                setAbrirInput(false);
                setAccion("crear");
                setOrdenDeTrabajo({
                    id: 0,
                    nombre: "",
                    descripcion: "ninguna",
                    estado: "activo"
                });
                getAnomalias();
                setAccion("creado");
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
            setOrdenDeTrabajo({});
            setAbrirInput(false);
        }
        if (accion == "crear") {
            setAbrirInput(true);
            setErrors({});
            form.reset({
                id: 0,
                nombre: "",
                descripcion: "ninguna",
            });
            setOrdenDeTrabajo({
                id: 0,
                nombre: "",
                descripcion: "ninguna",
            })
        }
        if (accion == "creado") {
            setAbrirInput(true);
            setErrors({});
            form.reset({
                id: 0,
                nombre: "",
                descripcion: "ninguna",
            });
            setOrdenDeTrabajo({
                id: 0,
                nombre: "",
                descripcion: "ninguna",
                
            })
        }
        if (accion == "ver") {
            setAbrirInput(false);
            setErrors({});
            setAccion("");
            setCargosAgregados([]);
            form.reset({
                id: ordenDeTrabajo.id,
                nombre: ordenDeTrabajo.nombre,
                cargos: ordenDeTrabajo.cargos,
                aplicacion: ordenDeTrabajo.aplicacion,
            });
        }
        if (accion == "editar") {
            setAbrirInput(true);
            setErrors({});
        }
    }, [accion]);

    const handleAgregarCargo = () => {
        if (nombreSeleccionado && aplicacionSeleccionada) {
            const nuevoCargo: OrdenDeTrabajo = {
                nombre: nombreSeleccionado,
                aplicacion: aplicacionSeleccionada,
            };
    
            setCargosAgregados((prev) => [...prev, nuevoCargo]);
            setNombreSeleccionado(null);
            setAplicacionSeleccionada(null);
        } else {
            console.log("Nombre o aplicación no seleccionados");
        }
    };

    return (
        <>
            <div className="overflow-auto">
                <div className='flex h-[40px] items-center mb-[10px] bg-card rounded-sm'>
                    <div className='h-[20px] w-full flex items-center justify-end'>
                        <div className="mb-[10px] h-full w-full mx-4">
                            {accion == "crear" && <p className="text-muted-foreground text-[20px]">Creando nueva orden de trabajo</p>}
                            {ordenDeTrabajo.nombre != "" && <p className="text-muted-foreground text-[20px]">{ordenDeTrabajo.nombre}</p>}
                        </div>
                        {(ordenDeTrabajo.nombre != null && ordenDeTrabajo.nombre != "") &&
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
                                            <Input readOnly={!abrirInput} placeholder="Escribe el nombre de la orden de trabajo" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            El nombre de la orden de trabajo.
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
                                    <FormLabel className="items-center">Activo</FormLabel>
                                    <FormControl className="ml-4">
                                        {
                                            bloquear ? <Switch
                                            checked={field.value}
                                            onCheckedChange={(checked) => field.onChange(checked)
                                            
                                            }
                                            disabled
                                            /> :
                                            <Switch
                                            checked={field.value}
                                            onCheckedChange={(checked) => field.onChange(checked)
                                            
                                            }
                                            
                                            />
                                        }
                                    
                                    </FormControl>
                                    <FormDescription>
                                        Aquí puedes activar la orden de trabajo.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                        control={form.control}
                        name="cargos"
                        render={({ field }) => (
                            <div className="flex items-center space-x-4">
                                <FormItem className="flex items-center justify-center">
                                    <FormLabel className="mr-4">Cargos</FormLabel>
                                    <FormControl>
                                        <CuentasContablesComboBox form={form} field={field} name="cargos" setCargoSeleccionado={setNombreSeleccionado}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </div>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="aplicacion"
                        render={({ field }) => (
                            <div className="flex items-center space-x-4">
                                <FormItem className="flex items-center justify-center">
                                    <FormLabel className="mr-4">Accion a realizar de la OT</FormLabel>
                                    <FormControl>
                                        <OrdenDeTrabajoAplicacionComboBox form={form} field={field} name="aplicacion" setCargoSeleccionado={setAplicacionSeleccionada}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                {/*<Button type="button" className="flex-shrink-0" onClick={handleAgregarCargo}>Agregar cargo</Button>*/}
                            </div>
                        )}
                        />
                       
                        {/*accion == "crear" && <OrdenDeTrabajoCargosTable cargos={cargosAgregados}/>*/}
                        {/*accion == "editar" && <OrdenDeTrabajoCargosTable cargos={cargosAgregados}/>*/}

                            {loading && <Loader />}
                            {abrirInput && <Button type="submit">Guardar</Button>}

                        </form>
                    </Form>
                </div>

            </div>
        </>
    )
}

export default OrdenDeTrabajoForm
