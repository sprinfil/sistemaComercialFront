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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ZustandGeneralUsuario } from "../../contexts/ZustandGeneralUsuario.tsx";
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
    const { idSeleccionadoConfiguracionOrdenDeTrabajo, accionGeneradaEntreTabs, setAccionGeneradaEntreTabs} = ZustandGeneralUsuario();


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
            id: 0,
            nombre: "",
            descripcion: "",
            vigencias: "",
            momento_cargo: "0",
            genera_masiva: false
        },
    })
  
    function onSubmit(values: z.infer<typeof OrdenDeTrabajoCrearSchema>) {
        setLoading(true);
    
        // Definición del tipo Orden_trabajo_catalogo
         type Orden_trabajo_catalogo = {
            nombre: string;
            descripcion: string;
            vigencias: string;
            momento_cargo: string;
            genera_masiva: boolean;
        };
    
        // Creación del objeto orden_trabajo_catalogo
        let orden_trabajo_catalogo: Orden_trabajo_catalogo = {
            nombre: values.nombre,
            descripcion: values.descripcion,
            vigencias: values.vigencias,
            momento_cargo: values.momento_cargo,
            genera_masiva: values.genera_masiva
        };

        let data = {orden_trabajo_catalogo};
    
        console.log(data);
    
        // Acción de crear
        if (accionGeneradaEntreTabs === "crear") {
            axiosClient.put(`/OrdenTrabajoCatalogo/create`,  data)
                .then((response) => {
                    const data = response.data;
    
                    if (data.restore) {
                        setIdParaRestaurar(data.tipoToma_id);
                        setModalReactivacionOpen(true);
                    } else if (data.restore === false) {
                        errorYaExisteToast();
                        setLoading(false);
                    } else {
                        setLoading(false);
                        setOrdenDeTrabajo({
                            id: 0,
                            nombre: "",
                            descripcion: "ninguna",
                            vigencias: "",
                            momento_cargo: "",
                            genera_masiva: false
                        });
                        form.reset({
                            id: 0,
                            nombre: "",
                            descripcion: "ninguna",
                            vigencias: "",
                            momento_cargo: "",
                            genera_masiva: false
                        });
                        setAccion("creado");
                        getAnomalias();
                        successToastCreado();
                        console.log(values);
                    }
                })
                .catch((err) => {
                    const response = err.response;
                    console.log(err);
                    errorToast();
    
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
    
                    setLoading(false);
                });
        }
    
        // Acción de editar
        if (accionGeneradaEntreTabs === "editar") {

          

            axiosClient.put(`/TipoToma/update/${ordenDeTrabajo.id}`, values)
                .then((data) => {
                    setLoading(false);
                    setAbrirInput(false);
                    setAccion("");
                    getAnomalias();
                    setOrdenDeTrabajo(data.data);
                    successToastEditado();
                })
                .catch((err) => {
                    const response = err.response;
                    errorToast();
    
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
    
                    setLoading(false);
                });
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
                    vigencias: "",
                    momento_cargo: "",
                    genera_masiva: false
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
        if (accionGeneradaEntreTabs == "eliminar") {
            setBloquear(false);
            form.reset({
                id: 0,
                nombre: "",
                descripcion: "ninguna",
            });
            setOrdenDeTrabajo({});
            setAbrirInput(false);
        }
        if (accionGeneradaEntreTabs == "crear") {
            setAbrirInput(true);
            setBloquear(true);
            setErrors({});
            form.reset({
                id: 0,
                nombre: "",
                descripcion: "ninguna",
                vigencias: "",
                momento_cargo: "",
                genera_masiva: false,
            });
            setOrdenDeTrabajo({
                id: 0,
                nombre: "",
                descripcion: "ninguna",
                vigencias: "",
                momento_cargo: "",
                genera_masiva: false
            })
        }
        if (accionGeneradaEntreTabs == "creado") {
            setAbrirInput(true);
            setBloquear(false);
            setErrors({});
            form.reset({
                id: 0,
                nombre: "",
                descripcion: "ninguna",
                vigencias: "",
                momento_cargo: "",
                genera_masiva: false
            });
            setOrdenDeTrabajo({
                id: 0,
                nombre: "",
                descripcion: "ninguna",
                vigencias: "",
                momento_cargo: "",
                genera_masiva: false
            })
        }
        if (accionGeneradaEntreTabs == "ver") {
            setBloquear(false);

            


            setAbrirInput(false);
            setErrors({});
            setAccion("");
            setCargosAgregados([]);
            form.reset({
                id: ordenDeTrabajo.id,
                nombre: ordenDeTrabajo.nombre,
                descripcion: ordenDeTrabajo.descripcion,
                vigencias: String(ordenDeTrabajo.vigencias),
                momento_cargo: ordenDeTrabajo.momento_cargo,
                genera_masiva: ordenDeTrabajo.genera_masiva
              
            });
        }
        if (accion == "editar") {
            setAbrirInput(true);
            setBloquear(true);
            setErrors({});
        }
    }, [accion]);




    useEffect(() => {
        form.reset({
            id: ordenDeTrabajo.id,
            nombre: ordenDeTrabajo.nombre,
            descripcion: ordenDeTrabajo.descripcion,
            vigencias: ordenDeTrabajo.vigencias,
            momento_cargo: ordenDeTrabajo.momento_cargo,
            genera_masiva: ordenDeTrabajo.genera_masiva
          
        });
    },[ordenDeTrabajo.id])


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
                <div className='flex h-[40px] items-center mb-[10px] bg-card rounded-sm '>
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
                                <div onClick={() => setAccionGeneradaEntreTabs("editar")}>
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
                <div className="py-[20px] px-[10px]">

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
                                name="descripcion"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Descripción</FormLabel>
                                        <FormControl>
                                            <Input readOnly={!abrirInput} placeholder="Escribe la descripción de la orden de trabajo." {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            La descripción de la orden de trabajo.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="vigencias"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Vigencia</FormLabel>
                                        <FormControl>
                                            <Input
                                                readOnly={!abrirInput}
                                                placeholder="Escribe la vigencia en dias de la orden de trabajo."
                                                type="number"
                                                {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            La vigencia de la orden de trabajo.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="momento_cargo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Momento del cargo</FormLabel>
                                        <Select
                                            onValueChange={(value) => field.onChange(String(value))}
                                            value={String(field.value)}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona el momento del cargo" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="generar">Generar</SelectItem>
                                                <SelectItem value="asignar">Asignar</SelectItem>
                                                <SelectItem value="concluir">Concluir</SelectItem>
                                                <SelectItem value="no genera">No genera</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            Selecciona el momento del cargo.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />



                            <FormField
                                control={form.control}
                                name="genera_masiva"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="items-center">¿Genera carga masiva?</FormLabel>
                                        <FormControl className="ml-4">
                                            {
                                                bloquear ? <Switch
                                                    checked={field.value}
                                                    onCheckedChange={(checked) => field.onChange(checked)

                                                    }
                                                    
                                                /> :
                                                    <Switch
                                                    disabled
                                                        checked={field.value}
                                                        onCheckedChange={(checked) => field.onChange(checked)

                                                        }

                                                    />
                                            }

                                        </FormControl>
                                        <FormDescription>
                                            Aquí puedes activar si tiene carga masiva.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/*accion == "crear" && <OrdenDeTrabajoCargosTable cargos={cargosAgregados}/>*/}
                            {/*accion == "editar" && <OrdenDeTrabajoCargosTable cargos={cargosAgregados}/>*/}

                            {loading && <Loader />}
                            <div className="flex justify-end">
                                {abrirInput && <Button type="submit" className="w-[20vh] h-[6vh]">Guardar</Button>}

                            </div>

                        </form>
                    </Form>
                </div>

            </div>
        </>
    )
}

export default OrdenDeTrabajoForm
