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
import { constanciaSchema } from './validaciones.ts';
import { ModeToggle } from '../../components/ui/mode-toggle.tsx';
import axiosClient from '../../axios-client.ts';
import Loader from "../../components/ui/Loader.tsx";
import Error from "../../components/ui/Error.tsx";
import { Textarea } from "../ui/textarea.tsx";
import { useStateContext } from "../../contexts/ContextConstancias.tsx";
import { useEffect } from "react";
import { TrashIcon, Pencil2Icon, PlusCircledIcon } from '@radix-ui/react-icons';
import IconButton from "../ui/IconButton.tsx";
import { ComboBoxActivoInactivo } from "../ui/ComboBox.tsx";
import Modal from "../ui/Modal.tsx";
import ModalReactivacion from "../ui/ModalReactivación.tsx";
import { useToast } from "@/components/ui/use-toast"; //IMPORTACIONES TOAST
import { ToastAction } from "@/components/ui/toast"; //IMPORTACIONES TOAST
import { Switch } from "../ui/switch.tsx";

const ConstanciaForm = () => {
    const { toast } = useToast()
    const { constancia, setConstancia, loadingTable, setLoadingTable, setConstancias, setAccion, accion } = useStateContext();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [abrirInput, setAbrirInput] = useState(false);
    const [IdParaRestaurar, setIdParaRestaurar] = useState(null);
    const [ModalReactivacionOpen, setModalReactivacionOpen] = useState(false);
    const [valorObtenidoBool, setValorObtenidoBool] = useState(false);
    const [control, setControl] = useState(false);
//#region SUCCESSTOAST
function successToastCreado() {
    toast({
        title: "¡Éxito!",
        description: "La constancia se ha creado correctamente",
        variant: "success",

    })
}
function successToastEditado() {
    toast({
        title: "¡Éxito!",
        description: "La constancia se ha editado correctamente",
        variant: "success",

    })
}
function successToastEliminado() {
    toast({
        title: "¡Éxito!",
        description: "La constancia se ha eliminado correctamente",
        variant: "success",

    })
}
function successToastRestaurado() {
    toast({
        title: "¡Éxito!",
        description: "La constancia se ha restaurado correctamente",
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
        description: "La constancia ya existe.",
        action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
    })
}



    const form = useForm<z.infer<typeof constanciaSchema>>({
        resolver: zodResolver(constanciaSchema),
        defaultValues: {
            id: constancia.id,
            nombre: constancia.nombre,
            descripcion: constancia.descripcion,
            estado: constancia.estado
        },
    })

    function onSubmit(values: z.infer<typeof constanciaSchema>) {
        console.log(values);
        setLoading(true);
        const boolConvetido = constancia.estado ? "activo" : "inactivo"

        let values2 = {...values, estado: boolConvetido}
        console.log("valores ingresados", values2);
        if (accion == "crear") {
            axiosClient.post(`/ConstanciasCatalogo/create`, values2)
                .then((response) => {
                    const data = response.data;
                    if(data.restore)
                    {
                        setIdParaRestaurar(data.constancia_id);
                        setModalReactivacionOpen(true);
                    }
                    else if (data.restore == false) {
                        errorYaExisteToast();
                        setLoading(false);
                    }
                    else{
                        successToastCreado();
                        setAccion("creado");
                        setLoading(false);
                        setConstancia({
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
                        getConstancias();
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
            const boolConvetido = values.estado == true ? "activo" : "inactivo"

            let values2 = {...values, estado: boolConvetido}
            axiosClient.put(`/ConstanciasCatalogo/update/${constancia.id}`, values2)
                .then((data) => {
                    setLoading(false);
                    //alert("anomalia creada");
                    setAbrirInput(false);
                    setAccion("");
                    getConstancias();
                    setConstancia(data.data);
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
    const getConstancias = async () => {
        setLoadingTable(true);
        try {
            const response = await axiosClient.get("/ConstanciasCatalogo");
            setLoadingTable(false);
            setConstancias(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            setLoadingTable(false);
            errorToast();
            console.error("Failed to fetch constancias:", error);
        }
    };

    //elimianar anomalia
    const onDelete = async () => {
        try {
            await axiosClient.delete(`/ConstanciasCatalogo/log_delete/${constancia.id}`);
            getConstancias();
            setAccion("eliminar");
            successToastEliminado();
        } catch (error) {
            errorToast();
            console.error("Failed to delete anomalia:", error);
        }
    };

    const restaurarDato = (IdParaRestaurar: any) => {
        axiosClient.put(`/ConstanciasCatalogo/restaurar/${IdParaRestaurar}`)
            .then(() => {
                setLoading(false);
                setAbrirInput(false);
                setAccion("crear");
                setConstancia({
                    id: 0,
                    nombre: "",
                    descripcion: "ninguna",
                    estado: "activo"
                });
                getConstancias();
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
            setControl(false);
            form.reset({
                id: 0,
                nombre: "",
                descripcion: "ninguna",
                estado: false

            });
            setConstancia({});
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
            setConstancia({
                id: 0,
                nombre: "",
                descripcion: "ninguna",
                estado: false

            })
        }
        if (accion == "creado") {
            setControl(false);
            setAbrirInput(true);
            setErrors({});
            form.reset({
                id: 0,
                nombre: "",
                descripcion: "ninguna",
                estado: false

            });
            setConstancia({
                id: 0,
                nombre: "",
                descripcion: "ninguna",
                estado: false

            })
        }
        if (accion == "ver") {
            setControl(false);
            const valorDesdeBaseDeDatos: string = constancia.estado as unknown as string; 
            const valorBooleano: boolean = valorDesdeBaseDeDatos === 'activo';
            setValorObtenidoBool(valorBooleano);
            setAbrirInput(false);
            setErrors({});
            setAccion("");
            form.reset({
                id: constancia.id,
                nombre: constancia.nombre,
                descripcion: constancia.descripcion,
                estado: valorObtenidoBool

            });
        }
        if (accion == "editar") {
            setAbrirInput(true);
            setControl(true);
            setErrors({});
        }
        console.log(accion);
    }, [accion]);

    useEffect(() => 
    {
        form.reset({
            id: constancia.id,
            nombre: constancia.nombre,
            descripcion: constancia.descripcion,
            estado: valorObtenidoBool

        });
    },[valorObtenidoBool])

    return (
        <div className="overflow-auto">

            <div className='flex h-[40px] items-center mb-[10px] bg-card rounded-sm'>
                <div className='h-[20px] w-full flex items-center justify-end'>
                    <div className="mb-[10px] h-full w-full mx-4">
                        {accion == "crear" && <p className="text-muted-foreground text-[20px]">Creando nueva constancia</p>}
                        {constancia.nombre != "" && <p className="text-muted-foreground text-[20px]">{constancia.nombre}</p>}
                    </div>
                    {(constancia.nombre != null && constancia.nombre != "") &&
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
                                        <Input readOnly={!abrirInput} placeholder="Escribe el nombre de la constancia" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        El nombre de la constancia.
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
                                            placeholder="Descripción de la constancia"
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
                                        {
                                            control ?
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
                                    Aquí puedes cambiar el estado de la constancia.

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

export default ConstanciaForm
