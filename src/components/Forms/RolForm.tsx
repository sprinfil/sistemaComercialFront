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
import { rolSchema } from './RolValidaciones.ts';
import { ModeToggle } from '../../components/ui/mode-toggle.tsx';
import axiosClient from '../../axios-client.ts';
import Loader from "../../components/ui/Loader.tsx";
import Error from "../../components/ui/Error.tsx";
import { Textarea } from "../ui/textarea.tsx";
import { useStateContext } from "../../contexts/ContextRol.tsx";
import { useEffect } from "react";
import { TrashIcon, Pencil2Icon, PlusCircledIcon } from '@radix-ui/react-icons';
import IconButton from "../ui/IconButton.tsx";
import { ComboBoxActivoInactivo } from "../ui/ComboBox.tsx";
import Modal from "../ui/Modal.tsx";
import { Switch } from "@radix-ui/react-switch";

const RolForm = () => {
    const { rol, setRol, loadingTable, setLoadingTable, setRoles, setAccion, accion } = useStateContext();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [abrirInput, setAbrirInput] = useState(false);


    const form = useForm<z.infer<typeof rolSchema>>({
        resolver: zodResolver(rolSchema),
        defaultValues: {
            name: rol.name,
         },
    })



    function onSubmit(values: z.infer<typeof rolSchema>) {
        setLoading(true);
        
        if (accion == "crear") {
            axiosClient.post(`/Rol/create`, values)
                .then(() => {
                    setLoading(false);
                    setRol({
                        id: 0,
                        name: "",
                    });
                    form.reset({
                        name: "",
                    });
                    getRoles();
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
            axiosClient.put(`/Rol/update/${rol.id}`, values)
                .then((data) => {
                    setLoading(false);
                    //alert("anomalia creada");
                    setAbrirInput(false);
                    setAccion("");
                    getRoles();
                    setRol(data.data);
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
  
    const getRoles = async () => {
        setLoadingTable(true);
        try {
            const response = await axiosClient.get("/Rol");
            setLoadingTable(false);
            setRoles(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            setLoadingTable(false);
            console.error("Failed to fetch anomalias:", error);
        }
    };
    
    const onDelete = async () => {
        try {
            await axiosClient.put(`/Rol/log_delete/${rol.id}`);
            getRoles();
            setAccion("eliminar");
        } catch (error) {
            console.error("Failed to delete rol:", error);
        }
    };

    //este metodo es para cuando actualizar el formulario cuando limpias las variables de la anomalia
    useEffect(() => {
        if (accion == "eliminar") {
            form.reset({
                name: "",
            });
            setRol({});
            setAbrirInput(false);
        }
        if (accion == "crear") {
            setAbrirInput(true);
            setErrors({});
            form.reset({
                name: "",
            });
            setRol({
                id: 0,
                name: "",
            })
        }
        if (accion == "ver") {
            setAbrirInput(false);
            setErrors({});
            setAccion("");
            form.reset({
                name: rol.name,
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
                        {accion == "crear" && <p className="text-muted-foreground text-[20px]">Creando Nuevo Rol</p>}
                        {rol.name != "" && <p className="text-muted-foreground text-[20px]">{rol.name}</p>}
                    </div>
                    { (rol.name != null && rol.name != "") &&
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
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre</FormLabel>
                                    <FormControl>
                                        <Input readOnly={!abrirInput} placeholder="Escribe el nombre del rol" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        El nombre del Rol.
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

export default RolForm
