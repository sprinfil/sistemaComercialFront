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
import { ModeToggle } from '../../components/ui/mode-toggle.tsx';
import axiosClient from '../../axios-client.ts';
import Loader from "../../components/ui/Loader.tsx";
import Error from "../../components/ui/Error.tsx";
import { Textarea } from "../ui/textarea.tsx";
import { useStateContext } from "../../contexts/ContextAnomalias.tsx";
import { useEffect } from "react";
import { TrashIcon, Pencil2Icon, PlusCircledIcon } from '@radix-ui/react-icons';
import IconButton from "../ui/IconButton.tsx";
import { ComboBoxActivoInactivo } from "../ui/ComboBox.tsx";
import Modal from "../ui/Modal.tsx";
import ModalReactivacion from "../ui/ModalReactivación.tsx"; //MODAL PARA REACTIVAR UN DATO QUE HAYA SIDO ELIMINADO
import { useToast } from "@/components/ui/use-toast"; //IMPORTACIONES TOAST
import { ToastAction } from "@/components/ui/toast"; //IMPORTACIONES TOAST
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from "../ui/switch.tsx";
import { faGaugeSimpleMed } from "@fortawesome/free-solid-svg-icons";
import { ZustandMultas } from "../../contexts/ZustandMultas.tsx";
import { Multas } from "../ui/DataTableMultas.tsx";
export const multasSchema = z.object({
    id: z.number(),
    nombre: z.string().min(1, "El Nombre es requerido"),
    descripcion: z.string().min(1, "La descripción es requerida"),
    UMAS_min: z.string().min(1, "Minimo de UMAS es requerido"),
    UMAS_max: z.string().min(1, "Máximo de UMAS es requerido"),
    estatus: z.boolean(),
})

const MultasForm = () => {
    const { toast } = useToast()
    const { anomalia, setAnomalia, loadingTable, setLoadingTable, setAnomalias, setAccion, accion } = useStateContext();

    const { multas, accionMulta, setAccionMulta, setMultasTabla, multasTabla, setMultas} = ZustandMultas();
    console.log(accionMulta);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [abrirInput, setAbrirInput] = useState(false);
    const [anomaliaIdParaRestaurar, setAnomaliaIdParaRestaurar] = useState(null);
    const [ModalReactivacionOpen, setModalReactivacionOpen] = useState(false);
    const [valorObtenidoBool, setValorObtenidoBool] = useState(false);
    const [control, setControl] = useState(false);

    //#region SUCCESSTOAST
    function successToastCreado() {
        toast({
            title: "¡Éxito!",
            description: "La multa se ha creado correctamente",
            variant: "success",

        })
    }
    function successToastEditado() {
        toast({
            title: "¡Éxito!",
            description: "La multa se ha editado correctamente",
            variant: "success",

        })
    }
    function successToastEliminado() {
        toast({
            title: "¡Éxito!",
            description: "La anomalía  se ha eliminado correctamente",
            variant: "success",

        })
    }
    function successToastRestaurado() {
        toast({
            title: "¡Éxito!",
            description: "La anomalía  se ha restaurado correctamente",
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



    const form = useForm<z.infer<typeof multasSchema>>({
        resolver: zodResolver(multasSchema),
        defaultValues: {
            id: 0,
            nombre: "",
            descripcion: "",
            UMAS_min: "0",
            UMAS_max: "0",
            estatus: false,
        },
    })

    useEffect(() => {
        console.log(multasTabla);

    }, [multasTabla])

    function onSubmit(values: z.infer<typeof multasSchema>) {
        setLoading(true);

        const estadoConvertido = values.estatus == true ? "activo" : "inactivo"
        const values2 = {
            ...values, estatus: estadoConvertido
        }
        console.log("valores ingresados", values2);

        if (accionMulta == "crear") {
            axiosClient.post(`/catalogomulta/store`, values2)
                .then((response) => {
                    const data = response.data;
                    console.log(data);
                    const multaFormateada: Multas = {
                        id: data.id,
                        nombre: data.nombre,
                        descripcion: data.descripcion,
                        UMAS_min: data.UMAS_min,  // Asegúrate de convertir a número si UMAS_min es string
                        UMAS_max: data.UMAS_max,  // Asegúrate de convertir a número si UMAS_max es string
                        estatus: data.estatus === 'activo' ? true : false,  // Conviertes 'activo' a booleano
                    };
                    console.log(multaFormateada);

                    let prevTemp = multasTabla;

                    prevTemp = [multaFormateada, ...prevTemp];
                    setMultas(multaFormateada);

                    setMultasTabla(prevTemp);

                    console.log(multasTabla);

                    setLoading(false);
             
                    
                    successToastCreado();
                    setAccionMulta("ver");
                    setAccionMulta("creado");


                })
                .catch((err) => {
                    const response = err.response;
                    const mensaje = response.data.message;
                    console.log(response);
                    toast({
                        variant: "destructive",
                        title: "Oh, no. Error",
                        description: mensaje,
                        action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
                    })
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                    setLoading(false);
                })
            console.log(abrirInput);
        }
        if (accionMulta == "editar") {

            const estatusConvertido = values.estatus == true ? "activo" : "inactivo"
            const values2 = 
            {
                ...values, estatus:estatusConvertido
            }
            console.log(values2);


            axiosClient.put(`/catalogomulta/update/${multas?.id}`, values2)
                .then((response) => {
                    const data = response.data;
                    console.log(data);
                        setLoading(false);
                        setAbrirInput(false);

                        const multaFormateada: Multas = {
                            id: data.id,
                            nombre: data.nombre,
                            descripcion: data.descripcion,
                            UMAS_min: data.UMAS_min, 
                            UMAS_max: data.UMAS_max,  
                            estatus: data.estatus === 'activo' ? true : false,  // Conviertes 'activo' a booleano
                        };
                     let prevTemp = [...multasTabla];

                     const index = prevTemp.findIndex((multa) => multa.id === data.id)

                     if (index !== -1) {
                        // Si se encuentra la multa, reemplaza el elemento en esa posición
                        prevTemp[index] = multaFormateada;
                    } else {
                        // Si no se encuentra (por ejemplo, es una multa nueva), simplemente lo agregas al principio
                        prevTemp = [multaFormateada, ...prevTemp];
                    }
                    
                    // Actualiza el estado con la tabla modificada

                    
                    successToastEditado();
                    setAccionMulta("ver");
                    setAccionMulta("creado");
                    setMultasTabla(prevTemp);
                    setMultas(prevTemp);

                    

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
            setAnomalias(response.data.data);
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
            await axiosClient.delete(`/AnomaliasCatalogo/log_delete/${anomalia.id}`);
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
                setAnomalia({
                    id: 0,
                    nombre: "",
                    descripcion: "ninguna",
                    facturable: "",
                    estado: false
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
            setControl(false);
            form.reset({
                id: 0,
                nombre: "",
                UMAS_min: "0",
                UMAS_max: "0",
                estado: false,
            });
            setAnomalia({});
            setAbrirInput(false);
        }
      
        if (accion == "crear") {
            setControl(true);
            console.log("creando");
            setAbrirInput(true);
            setErrors({});
            form.reset({
                id: 0,
                nombre: "",
                UMAS_min: "0",
                UMAS_max: "0",
                estado: false,
            });
            setAnomalia({
                id: 0,
                nombre: "",
                UMAS_min: "0",
                UMAS_max: "0",
                estado: false,
            })
        }
        console.log({ accion });
       
      
    }, [accion]);

    useEffect(() => {

        if (accionMulta === "ver") {
            //console.log("entro");


            console.log(multas); 
            let estadoConvertido;// Verifica qué se está imprimiendo aquí
         
                if(multas?.estatus === "activo" || multas?.estatus == true)
                {
                    estadoConvertido = true;

                }
                else
                {
                    estadoConvertido = false;

                }
           
                
            
           
           //console.log(estadoConvertido);
            //console.log(multasTabla);

            const estadoConvertidoMultasTabla = multasTabla.estatus == "activo" ? true : false
            setControl(false);
            if (multas) {
                form.reset({
                    id: multas?.id || multasTabla?.id,
                    nombre: multas?.nombre ||  multasTabla?.nombre,
                    descripcion: multas?.descripcion ||  multasTabla?.descripcion,
                    UMAS_min: multas?.UMAS_min ||  multasTabla?.UMAS_min,
                    UMAS_max: multas?.UMAS_max ||  multasTabla?.UMAS_max,
                    estatus: estadoConvertido,
                });
                
            }

            
            
        }
        if (accionMulta === "verIndividual") {
            console.log("entro");
            console.log(multas); // Verifica qué se está imprimiendo aquí
            console.log(multasTabla); // Verifica qué se está imprimiendo aquí

            const estadoConvertido = multas?.estatus == "activo" ? true : false;
            setControl(false);
            if (multas) {
                form.reset({
                    id:  multasTabla?.id,
                    nombre: multasTabla?.nombre,
                    descripcion: multasTabla?.descripcion,
                    UMAS_min: multasTabla?.UMAS_min,
                    UMAS_max:  multasTabla?.UMAS_max,
                    estatus:  multasTabla?.estatus,
                });
                
            }

            
            
        }


        if (accionMulta == "crear") {
            setControl(true);
            console.log("creando");
            setAbrirInput(true);
            setErrors({});
          
            form.reset({
                id: 0,
                nombre: "",
                UMAS_min: "",
                UMAS_max: "",
                estatus: false,
            });
           
        }

        if (accionMulta == "creado") {
            setControl(false);
            setAbrirInput(false);
            console.log(multas);
        }  
        
        if (accionMulta == "editar") {
            setControl(true);
            if (!multas?.nombre) {
                return <div>Nombre no encontrado</div>;
            }
            form.reset({
                id: multas?.id || 0,
                nombre: multas?.nombre || '',
                descripcion: multas?.descripcion || '',
                UMAS_min: String(multas?.UMAS_min) || "",
                UMAS_max: String(multas?.UMAS_max) || "",
                estatus: Boolean(multas?.estatus) || false,
            });
            setAbrirInput(true);
            setErrors({});

        }
    }, [accionMulta, multas]); // Agrega 'multas' a la dependencia


    const [umaMin, setUmaMin] = useState('');
    const [umaMax, setUmaMax] = useState('');

    const handleChangeUmaMin = (event) => {
        setUmaMin(event.target.value);
    };

    const handleChangeUmaMax = (event) => {
        setUmaMax(event.target.value);
    };

    console.log(form.getValues());
    return (
        <>
            <div className="overflow-auto max-w-full max-h-full">
                <div className='flex h-[40px] items-center mb-[10px] bg-muted rounded-sm'>
                    <div className='h-[20px] w-full flex items-center justify-end'>
                        <div className="mb-[10px] h-full w-full mx-4">
                            {accionMulta == "crear" && <p className="text-muted-foreground text-[20px]">Creando nueva multa</p>}
                            {accionMulta == "ver" && multas?.nombre != "" && <p className="text-muted-foreground text-[20px]">{multas?.nombre}</p>}
                            {accionMulta == "creado" && multas?.nombre != "" && <p className="text-muted-foreground text-[20px]">{multas?.nombre}</p>}
                            {accionMulta == "editar" && multas?.nombre != "" && <p className="text-muted-foreground text-[20px]">{multas?.nombre}</p>}

                        </div>
                        {(multas?.nombre != null && multas?.nombre != "") &&
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
                                {
                                    accionMulta == "ver" &&
                                    <div onClick={() => setAccionMulta("editar")}>
                                    <a title="Editar">
                                        <IconButton>
                                            <Pencil2Icon className="w-[20px] h-[20px]" />
                                        </IconButton>
                                    </a>
                                </div>
                                }
                               
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
                                name="nombre"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nombre</FormLabel>
                                        <FormControl>
                                            <Input readOnly={!abrirInput} placeholder="Escribe el nombre de la multa" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            El nombre de la multa.
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
                                                placeholder="Descripcion de la multa"
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
                            <div className="mt-2">
                                <FormLabel className="text-xl">UMAS</FormLabel>

                            </div>
                            <div className="flex space-x-5 items-center">
                                <div className="text-sm font-medium mb-2">Minimo</div>
                                <div className="mb-5">
                                    {!control ? 
                                     <FormField
                                     control={form.control}
                                     name="UMAS_min"
                                     render={({ field }) => (
                                         <FormItem>
                                             <FormLabel></FormLabel>
                                             <FormControl>
                                                 <Input
                                                     id="min"
                                                     className="w-[8vh]"
                                                     type="number"
                                                     {...field}
                                                    disabled
                                                 />
                                             </FormControl>
                                             <FormDescription>
                                             </FormDescription>
                                             <FormMessage />
                                         </FormItem>
                                     )}
                                 />
                                    :
                                    <FormField
                                    control={form.control}
                                    name="UMAS_min"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel></FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="min"
                                                    className="w-[8vh]"
                                                    type="number"
                                                    {...field}

                                                />
                                            </FormControl>
                                            <FormDescription>
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                    }
                                   
                                </div>
                                <div className="text-sm font-medium mb-2">Maximo</div>
                                <div className="mb-5">

                                    {control ?
                                     <FormField
                                     control={form.control}
                                     name="UMAS_max"
                                     render={({ field }) => (
                                         <FormItem>
                                             <FormLabel></FormLabel>
                                             <FormControl>
                                                 <Input
                                                     id="max"
                                                     className="w-[8vh]"
                                                     type="number"
                                                     {...field}
 
                                                 />
                                             </FormControl>
                                             <FormDescription>
                                             </FormDescription>
                                             <FormMessage />
                                         </FormItem>
                                     )}
                                 />
                                :
                                <FormField
                                control={form.control}
                                name="UMAS_max"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel></FormLabel>
                                        <FormControl>
                                            <Input
                                                id="max"
                                                className="w-[8vh]"
                                                type="number"
                                                {...field}
                                                disabled

                                            />
                                        </FormControl>
                                        <FormDescription>
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                                }
                                   
                               
                                </div>


                            </div>
                            <FormField
                                control={form.control}
                                name="estatus"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Estado</FormLabel>

                                        <FormControl>
                                            {
                                                control
                                                    ?

                                                    <Switch
                                                        className="ml-3"
                                                        checked={field.value}
                                                        onCheckedChange={(checked) => field.onChange(checked)
                                                        }
                                                    />
                                                    :
                                                    <Switch
                                                        className="ml-3"
                                                        disabled
                                                        checked={field.value}
                                                        onCheckedChange={(checked) => field.onChange(checked)
                                                        }
                                                    />

                                            }

                                        </FormControl>
                                        <FormDescription>
                                            Aquí puedes cambiar el estado de la multa.
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
        </>
    )
}

export default MultasForm
