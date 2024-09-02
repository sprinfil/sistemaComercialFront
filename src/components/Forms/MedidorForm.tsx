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
import { medidorSchema } from './validaciones.ts';
import { ModeToggle } from '../ui/mode-toggle.tsx';
import axiosClient from '../../axios-client.ts';
import Loader from "../ui/Loader.tsx";
import Error from "../ui/Error.tsx";
import { Textarea } from "../ui/textarea.tsx";
import { useStateContext } from "../../contexts/ContextMedidores.tsx";
import { useEffect } from "react";
import { TrashIcon, Pencil2Icon, PlusCircledIcon } from '@radix-ui/react-icons';
import IconButton from "../ui/IconButton.tsx";
import { ComboBoxActivoInactivo } from "../ui/ComboBox.tsx";
import Modal from "../ui/Modal.tsx";
import ModalText from "../ui/ModalText.tsx";
import ModalReactivacion from "../ui/ModalReactivación.tsx"; //MODAL PARA REACTIVAR UN DATO QUE HAYA SIDO ELIMINADO
import { useToast } from "@/components/ui/use-toast"; //IMPORTACIONES TOAST
import { ToastAction } from "@/components/ui/toast"; //IMPORTACIONES TOAST
import { Switch } from "../ui/switch.tsx";



const MedidorForm = () => {
    const { toast } = useToast()
    const { medidor, setMedidor, loadingTable, setLoadingTable, setMedidores, setAccion, accion } = useStateContext();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [abrirInput, setAbrirInput] = useState(false);
    const [indiceMedidor, setIndiceMedidor] = useState(0);
    const [bloquear, setBloquear] = useState(false);
    const [abrirModal, setAbrirModal] = useState(false);

    const getCurrentDate = () => new Date().toISOString().split("T")[0];

    const form = useForm<z.infer<typeof medidorSchema>>({
        resolver: zodResolver(medidorSchema),
        defaultValues: {
            id: medidor != null ? medidor.id : 0,
            numeroSerie: medidor != null ? medidor.numeroSerie : "",
            marca: medidor != null ? medidor.marca : "",
            diametro: medidor != null ? medidor.diametro : "",
            tipo: medidor != null ? medidor.tipo : "",
            estado: false,
        },
    })


    //OPCIONES QUE EXISTEN DEL TAP
    const opcionesTabs = ["Medidor"];
    //METODO PARA TENER CONTROL DEL TAP
    const nextTab = () => {

        const currentIndex = opcionesTabs.indexOf("Medidor");
        const indiceMedidor = (currentIndex + 1) % opcionesTabs.length;
        setActiveTab(opcionesTabs[indiceMedidor]);

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
    function successToastActivo() {
        toast({
            title: "¡Éxito!",
            description: "La tarifa se ha activado correctamente",
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

       //Funcion de errores para el Toast
       function errorToastMensaje(mensaje) {
        toast({
            variant: "destructive",
            title: mensaje,
            action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
        })
    }




    function onSubmit(values: z.infer<typeof medidorSchema>) {
        console.log("submit");
        const estadoConvertido = values.estado ? 'activo' : 'inactivo';

            const datosAEnviar = {
                ...values,
                estado: estadoConvertido,
            };


        setLoading(true);
        if (accion == "crear") {
            axiosClient.post(`/tarifa/create`, datosAEnviar)
                .then((response) => {
                    const data = response.data;
                    setLoading(false);
                    setMedidor({
                        id: 0,
                        numeroSerie:"",
                        marca: "",
                        diametro: "",
                        tipo: "",
                        estado: false,
                    });
                    form.reset({
                        id: 0,
                        numeroSerie:"",
                        marca: "",
                        diametro: "",
                        tipo: "",
                        estado: false,
                    });
                    getMedidores();
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
            axiosClient.put(`/tarifa/update/${medidor.id}`, datosAEnviar)
                .then((response) => {
                    const data = response.data;
                    if (response.data.confirmUpdate) {
                        setAbrirModal(true);
                    } else {
                        setLoading(false);
                        //alert("anomalia creada");
                        setAbrirInput(false);
                        setAccion("");
                        getMedidores();
                        setMedidor(data);
                        successToastEditado();
                        //setNotification("usuario creado");
                    }
            
                })
                .catch((err) => {
                    const response = err.response;
                    errorToast();
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
    const handleConfirmUpdate = async () => {
        try {
            const response = await axiosClient.put('/actualizar-tarifa', { confirmUpdate: true, medidor_id:medidor.id});
            setAbrirModal(false);
            setLoading(false);
            getMedidores();
            setAccion("");
            setAbrirInput(false);
            successToastActivo();
        } catch (error) {
            console.error('Error en la actualización:', error);
        }
    };

    //con este metodo obtienes las anomalias de la bd
    const getMedidores = async () => {
        setLoadingTable(true);
        try {
            const response = await axiosClient.get("/tarifa");
            setLoadingTable(false);
            setMedidores(response.data.data);
        } catch (error) {
            setLoading(false);
            errorToast();
            console.error("Failed to fetch constancias:", error);
        }
    };

    //elimianar anomalia
    const onDelete = async () => {
        try {
            await axiosClient.delete(`/tarifa/log_delete/${medidor.id}`);
            getMedidores();
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
            setBloquear(false);
            form.reset({
                id: 0,
                numeroSerie: "",
                marca: "",
                diametro: "",
                tipo: "",
                estado: false,
            });
            setMedidor({});
            setAbrirInput(false);
        }
        if (accion === "creado") {
            setBloquear(false);
            form.reset({
                id: 0,
                numeroSerie: "",
                marca: "",
                diametro: "",
                tipo: "",
                estado: false,
            });
            setMedidor({});
            setAbrirInput(false);
        }
        if (accion === "crear") {
            console.log("creando");
            setAbrirInput(true);
            setBloquear(false);
            console.log("ASJASJASJAAJS")
            setErrors({});
            form.reset({
                id: 0,
                numeroSerie: "",
                marca: "",
                diametro: "",
                tipo: "",
                estado: false,
            });
            setMedidor({
                id: 0,
                numeroSerie: "",
                marca: "",
                diametro: "",
                tipo: "",
                estado: false,
            });
        }
        if (accion === "ver") {
            setAbrirInput(false);
            setErrors({});
            setAccion("");
            setBloquear(true);
            form.reset({
                id: medidor.id,
                numeroSerie: medidor.numeroSerie,
                marca: medidor.marca,
                diametro: medidor.diametro,
                tipo: medidor.tipo,
                estado: medidor.estado === "activo" // Convertir "activo" a true y "inactivo" a false
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
            if (accion === "crear") {
                setBloquear(false);
            }
        }
    );


    useEffect(() => {
        form.reset({
            id: medidor.id,
            numeroSerie: medidor.numeroSerie,
            marca: medidor.marca,
            diametro: medidor.diametro,
            tipo: medidor.tipo,
            estado: medidor.estado === "activo"  // 
        });
    },[])
    
    

    return (
        <div className="overflow-auto">
            <div className='flex h-[40px] items-center mb-[10px] bg-muted rounded-sm'>
                <div className='h-[20px] w-full flex items-center justify-end'>
                    <div className="mb-[10px] h-full w-full mx-4">
                        {accion == "crear" && <p className="text-muted-foreground text-[20px]">Creando nuevo medidor</p>}
                        {medidor.numeroSerie != "" && <p className="text-muted-foreground text-[20px]">{medidor.numeroSerie}</p>}
                    </div>
                    {(medidor.numeroSerie != null && medidor.numeroSerie != "") &&
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
                            name="numeroSerie"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Numero de serie</FormLabel>
                                    <FormControl>
                                        <Input readOnly={!abrirInput} placeholder="Escribe el numero de serie" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        El numero de serie del medidor.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="marca"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Marca</FormLabel>
                                    <FormControl>
                                        <Input readOnly={!abrirInput} placeholder="Escribe la marca del medidor" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        La marca del medidor.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="diametro"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Diametro</FormLabel>
                                    <FormControl>
                                        <Input readOnly={!abrirInput} placeholder="Escribe diametro del medidor" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        El diametro del medidor.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="tipo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tipo</FormLabel>
                                    <FormControl>
                                        <Input readOnly={!abrirInput} placeholder="Escribe tipo de medidor" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        El tipo de medidor.
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
                                    <FormLabel className="items-center">Estatus</FormLabel>
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
                                        Aquí puedes activar el medidor.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {loading && <Loader />}
                        {abrirInput && <Button type="submit">Siguiente</Button>}
                        <ModalText 
                            isOpen={abrirModal}
                            setIsOpen={setAbrirModal}
                            method={() => handleConfirmUpdate()}
                            text = {"Si activas esta tarifa se desactivarán todas las demás, ¿Deseas continuar?"}
                        />
                    </form>
                </Form>
            </div>

        </div>
    )
}

export default MedidorForm
