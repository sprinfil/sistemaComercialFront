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
import { coloniaSchema } from './validaciones.ts';
import { ModeToggle } from '../ui/mode-toggle.tsx';
import axiosClient from '../../axios-client.ts';
import Loader from "../ui/Loader.tsx";
import Error from "../ui/Error.tsx";
import { Textarea } from "../ui/textarea.tsx";
import { useStateContext } from "../../contexts/ContextColonia.tsx";
import { useEffect } from "react";
import { TrashIcon, Pencil2Icon, PlusCircledIcon } from '@radix-ui/react-icons';
import IconButton from "../ui/IconButton.tsx";
import { ComboBoxActivoInactivo } from "../ui/ComboBox.tsx";
import Modal from "../ui/Modal.tsx";
import ModalReactivacion from "../ui/ModalReactivación.tsx"; //MODAL PARA REACTIVAR UN DATO QUE HAYA SIDO ELIMINADO
import { useToast } from "@/components/ui/use-toast"; //IMPORTACIONES TOAST
import { ToastAction } from "@/components/ui/toast"; //IMPORTACIONES TOAST
import { Switch } from "../ui/switch.tsx";



const ColoniaForm = () => {
    const { toast } = useToast()
    const { colonia, setColonia, loadingTable, setLoadingTable, setColonias, setAccion, accion } = useStateContext();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [abrirInput, setAbrirInput] = useState(false);
    const [indiceTarifa, setIndiceTarifa] = useState(0);
    const [bloquear, setBloquear] = useState(false);
    const getCurrentDate = () => new Date().toISOString().split("T")[0];
    const [coloniaIdParaRestaurar, setColoniaIdParaRestaurar] = useState(null);
    const [ModalReactivacionOpen, setModalReactivacionOpen] = useState(false);

    const form = useForm<z.infer<typeof coloniaSchema>>({
        resolver: zodResolver(coloniaSchema),
        defaultValues: {
            nombre: colonia.nombre,
        },
    })


    //OPCIONES QUE EXISTEN DEL TAP
    const opcionesTabs = ["Colonia","Calles"];
    //METODO PARA TENER CONTROL DEL TAP
    const nextTab = () => {

        const currentIndex = opcionesTabs.indexOf("Colonia");
        const indiceTarifa = (currentIndex + 1) % opcionesTabs.length;
        setActiveTab(opcionesTabs[indiceTarifa]);

    };

    //#region SUCCESSTOAST
    function successToastCreado() {
        toast({
            title: "¡Éxito!",
            description: "La colonia se ha creado correctamente",
            variant: "success",

        })
    }
    function successToastEditado() {
        toast({
            title: "¡Éxito!",
            description: "La colonia  se ha editado correctamente",
            variant: "success",

        })
    }
    function successToastEliminado() {
        toast({
            title: "¡Éxito!",
            description: "La colonia se ha eliminado correctamente",
            variant: "success",

        })
    }
    function successToastRestaurado() {
        toast({
            title: "¡Éxito!",
            description: "La colonia se ha restaurado correctamente",
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

       //Funcion de errores para el Toast
       function errorToastMensaje(mensaje) {
        toast({
            variant: "destructive",
            title: mensaje,
            action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
        })
    }
    function errorYaExisteToast() {

        toast({
            variant: "destructive",
            title: "Oh, no. Error",
            description: "La colonia ya existe.",
            action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
        })
    }




    function onSubmit(values: z.infer<typeof coloniaSchema>) {
        console.log("submit");
        setLoading(true);
        if (accion == "crear") {
            axiosClient.post(`/colonia/store`, values)
                .then((response) => {
                    const data = response.data;
                    if(data.restore){
                        setColoniaIdParaRestaurar(data.colonia_id);
                        setModalReactivacionOpen(true);
                    }
                    else if (data.restore == false) {
                        errorYaExisteToast();
                        setLoading(false);
                    }else{
                        setLoading(false);
                        setColonia({
                            id: 0,
                            nombre: "",

                        });
                        form.reset({
                            id: 0,
                            nombre: "",
                        });
                        getColonias();
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
            console.log(colonia.id)
            axiosClient.put(`/colonia/update/${colonia.id}`, values)
                .then((data) => {
                    setLoading(false);
                    //alert("anomalia creada");
                    setAbrirInput(false);
                    setAccion("");
                    getColonias();
                    setColonia(data.data);
                    successToastEditado();
                    //setNotification("usuario creado");
                })
                .catch((err) => {
                    const response = err.response;
                    
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                    if (response && response.status === 400) {
                        errorToastMensaje(response.data.error)
                    }
                    setLoading(false);
                })
        }
    }

    const restaurarDato = (id_colonia: any) => {
        axiosClient.put(`/colonia/restore/${id_colonia}`)
            .then(() => {
                setLoading(false);
                setAbrirInput(false);
                setAccion("crear");
                setColonia({
                    id: 0,
                    nombre: "",
                });
                getColonias();
                successToastRestaurado();
                setAccion("creado");
                setModalReactivacionOpen(false);

            })
            .catch((err) => {
                errorToast();
                setLoading(false);
            });
    };

    //con este metodo obtienes las anomalias de la bd
    const getColonias = async () => {
        setLoadingTable(true);
        try {
            const response = await axiosClient.get("/colonia");
            setLoadingTable(false);
            setColonias(response.data);
        } catch (error) {
            setLoading(false);
            errorToast();
            console.error("Failed to fetch constancias:", error);
        }
    };

    //elimianar anomalia
    const onDelete = async () => {
        try {
            await axiosClient.delete(`/colonia/delete/${colonia.id}`);
            getColonias();
            setAccion("eliminar");
            successToastEliminado();
        } catch (error) {
            errorToast();
            console.error("Failed to delete colonias:", error);
        }
    };

    //este metodo es para cuando actualizar el formulario cuando limpias las variables de la anomalia
    useEffect(() => {
        if (accion === "eliminar") {
            setBloquear(false);
            form.reset({
                id: 0,
                nombre: "",
            });
            setColonia({});
            setAbrirInput(false);
        }
        if (accion === "creado") {
            setBloquear(false);
            form.reset({
                id: 0,
                nombre: "",
            });
            setColonia({});
            setAbrirInput(false);
        }
        if (accion === "crear") {
            console.log("creando");
            setAbrirInput(true);
            setBloquear(false);
            setErrors({});
            form.reset({
                id: 0,
                nombre: "",
            });
            setColonia({
                id: 0,
                nombre: "",
            });
        }
        if (accion === "ver") {
            console.log(colonia)
            setAbrirInput(false);
            setErrors({});
            setAccion("");
            setBloquear(true);
            form.reset({
                nombre: colonia.nombre,
            });
        }
        if (accion === "editar") {
            setAbrirInput(true);
            setBloquear(false);
            setErrors({});
        }
        console.log(accion);
    }, [accion]);

    useEffect(() =>
        {
            setBloquear(true); 
            if (accion === "editar") {
                setBloquear(false);
            }
        }
    );
    
    

    return (
        <div className="overflow-auto">
            <div className='flex h-[40px] items-center mb-[10px] bg-muted rounded-sm'>
                <div className='h-[20px] w-full flex items-center justify-end'>
                    <div className="mb-[10px] h-full w-full mx-4">
                        {accion == "crear" && <p className="text-muted-foreground text-[20px]">Añadir nueva colonia</p>}
                        {colonia.nombre != "" && <p className="text-muted-foreground text-[20px]">{colonia.nombre}</p>}
                    </div>
                    {(colonia.nombre != null && colonia.nombre != "") &&
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
                    {ModalReactivacionOpen &&
                        <ModalReactivacion
                            isOpen={ModalReactivacionOpen}
                            setIsOpen={setModalReactivacionOpen}
                            method={() => restaurarDato(coloniaIdParaRestaurar)}
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
                                        <Input readOnly={!abrirInput} placeholder="Escribe el nombre de la colonia" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        El nombre de la colonia.
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

export default ColoniaForm
