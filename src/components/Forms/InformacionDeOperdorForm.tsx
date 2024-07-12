import { useState } from "react";
import logo from '../../img/logo.png';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { string, z } from "zod";
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
import { Calendar } from "../ui/calendar.tsx";
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "../../lib/utils.ts";
import { Popover, PopoverContent, PopoverTrigger, } from "@radix-ui/react-popover";
import { operadorSchema } from './OperadorValidaciones.ts';
import { ModeToggle } from '../../components/ui/mode-toggle.tsx';
import axiosClient from '../../axios-client.ts';
import Loader from "../../components/ui/Loader.tsx";
import Error from "../../components/ui/Error.tsx";
import { Textarea } from "../ui/textarea.tsx";
import { useStateContext } from "../../contexts/ContextOperador.tsx";
import { useEffect } from "react";
import { TrashIcon, Pencil2Icon, PlusCircledIcon } from '@radix-ui/react-icons';
import IconButton from "../ui/IconButton.tsx";
import { ComboBoxActivoInactivo } from "../ui/ComboBox.tsx";
import Modal from "../ui/Modal.tsx";
import { strict } from "assert";


const OperadorForm = () => {
    const { operador, setOperador, loadingTable, setLoadingTable, setOperadores, setAccion, accion } = useStateContext();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [abrirInput, setAbrirInput] = useState(false);




    const form = useForm<z.infer<typeof operadorSchema>>({
        resolver: zodResolver(operadorSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            codigo_empleado: "",
            nombre: "",
            apellido_paterno: "",
            apellido_materno: "",
            CURP: "",
            fecha_nacimiento: undefined,
        },
    })



    function onSubmit(values: z.infer<typeof operadorSchema>) {
        setLoading(true);
        console.log(values);

        function formatDate(date: Date): string {
            return date.toISOString().split('T')[0];
        }

        if (accion == "crear") {
            if (values.fecha_nacimiento) {
                values.fecha_nacimiento = formatDate(new Date(values.fecha_nacimiento));
            }
          
            axiosClient.post(`/Operador/create`, values)
                .then(() => {
                    setLoading(false);
                    setOperador({
                        id: 0,
                        name: "",
                        email: "",
                        password: "",
                        password_confirmation: "",
                        codigo_empleado: "",
                        nombre: "",
                        apellido_paterno: "",
                        apellido_materno: "",
                        CURP: "",
                        fecha_nacimiento: new Date().toISOString().split('T')[0],
                    });
                    form.reset({
                        name: "",
                        email: "",
                        password: "",
                        password_confirmation: "",
                        codigo_empleado: "",
                        nombre: "",
                        apellido_paterno: "",
                        apellido_materno: "",
                        CURP: "",
                        fecha_nacimiento: undefined,
                    });
                    getOperadores();
                    console.log(values);
                    //setNotification("usuario creado");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                    setLoading(false);
                })
            console.log(abrirInput);
        }
        if (accion == "editar") {
            axiosClient.put(`/Operador/update/${operador.id}`, values)
                .then((data) => {
                    setLoading(false);
                    //alert("anomalia creada");
                    setAbrirInput(false);
                    setAccion("");
                    getOperadores();
                    setOperador(data.data);
                    //setNotification("usuario creado");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                    setLoading(false);
                })
        }

    }

    //con este metodo obtienes las anomalias de la bd

    const getOperadores = async () => {
        setLoadingTable(true);
        try {
            const response = await axiosClient.get("/Operador");
            setLoadingTable(false);
            setOperadores(response.data);
            console.log(response.data);
        } catch (error) {
            setLoadingTable(false);
            console.error("Failed to fetch Operador:", error);
        }
    };

    const onDelete = async () => {
        try {
            await axiosClient.delete(`/Operador/log_delete/${operador.id}`);
            getOperadores();
            setAccion("eliminar");
        } catch (error) {
            console.error("Failed to delete rol:", error);
        }
    };

    //este metodo es para cuando actualizar el formulario cuando limpias las variables de la anomalia
    useEffect(() => {
        if (accion == "eliminar") {
            form.reset({
                codigo_empleado: "",
                nombre: "",
                apellido_paterno: "",
                apellido_materno: "",
                CURP: "",
                fecha_nacimiento: undefined,
            });
            setOperador({});
            setAbrirInput(false);
        }
        if (accion == "crear") {
            setAbrirInput(true);
            setErrors({});
            form.reset({
                codigo_empleado: "",
                nombre: "",
                apellido_paterno: "",
                apellido_materno: "",
                CURP: "",
                fecha_nacimiento: undefined,
            });
            setOperador({
                id: 0,
                codigo_empleado: "",
                nombre: "",
                apellido_paterno: "",
                apellido_materno: "",
                CURP: "",
                fecha_nacimiento: undefined,
            })
        }
        if (accion == "ver") {
            setAbrirInput(false);
            setErrors({});
            setAccion("");
            form.reset({
                codigo_empleado: operador.codigo_empleado,
                nombre: operador.nombre,
                apellido_paterno: operador.apellido_paterno,
                apellido_materno: operador.apellido_materno,
                CURP: operador.CURP,
                fecha_nacimiento: operador.fecha_nacimiento,
            });
        }
        if (accion == "editar") {
            setAbrirInput(true);
            setErrors({});
        }
    }, [accion]);

    return (
        <div className="overflow-auto">
            <div className='flex h-[40px] items-center mb-[10px] rounded-sm  bg-muted'>
                <div className='h-[20px] w-full flex items-center justify-end'>
                    <div className="mb-[10px] h-full w-full mx-4 ">
                        {accion == "crear" && <p className="text-muted-foreground text-[20px]">Creando nuevo operador</p>}
                        {operador.nombre != "" && <p className="text-muted-foreground text-[20px]">{operador.nombre}</p>}
                    </div>
                    {(operador.nombre != null && operador.nombre != "") &&
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
                        <div className="py-[40px] px-[10px] grid grid-cols-1 xl:grid-cols-3 gap-2 w-full mb-5 rounded-md border border-border  relative">
                            <span className="absolute -top-3 left-2 bg-background px-2 text-gray-500 text-xs">Información de Inicio de Sesión</span>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Login</FormLabel>
                                        <FormControl>
                                            <Input readOnly={!abrirInput} placeholder="Login" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Contraseña</FormLabel>
                                        <FormControl>
                                            <Input type="password" readOnly={!abrirInput} placeholder="Contraseña" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password_confirmation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirmar Contraseña</FormLabel>
                                        <FormControl>
                                            <Input type="password" readOnly={!abrirInput} placeholder="Confirmar Contraseña" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email (no es requerido)</FormLabel>
                                        <FormControl>
                                            <Input type="email" readOnly={!abrirInput} placeholder="Email" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="py-[40px] px-[10px] grid grid-cols-1 xl:grid-cols-3 gap-2 w-full mb-5 rounded-md border border-border  relative">
                            <span className="absolute -top-3 left-2 bg-background px-2 text-gray-500 text-xs">Información del Operador</span>
                            <FormField
                                control={form.control}
                                name="nombre"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nombre</FormLabel>
                                        <FormControl>
                                            <Input readOnly={!abrirInput} placeholder="Escribe el nombre del operador" {...field} />
                                        </FormControl>
                                        <FormDescription>

                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="apellido_paterno"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Apellido paterno</FormLabel>
                                        <FormControl>
                                            <Input readOnly={!abrirInput} placeholder="Escribe el Apellido Paterno del operador" {...field} />
                                        </FormControl>
                                        <FormDescription>

                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="apellido_materno"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Apellido materno</FormLabel>
                                        <FormControl>
                                            <Input readOnly={!abrirInput} placeholder="Escribe el Apellido Materno del operador" {...field} />
                                        </FormControl>
                                        <FormDescription>

                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="CURP"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>CURP</FormLabel>
                                        <FormControl>
                                            <Input readOnly={!abrirInput} placeholder="Escribe el CURP operador" {...field} />
                                        </FormControl>
                                        <FormDescription>

                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="fecha_nacimiento"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Fecha de nacimiento</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground "
                                                        )}
                                                        disabled={!abrirInput}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Seleccionar fecha</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0 bg-gray-50 rounded-sm border" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date > new Date() || date < new Date("1900-01-01")
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormDescription>

                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="codigo_empleado"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Código de empleado</FormLabel>
                                        <FormControl>
                                            <Input readOnly={!abrirInput} placeholder="Escriba el código de empleado" {...field} />
                                        </FormControl>
                                        <FormDescription>

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
    )
}

export default OperadorForm