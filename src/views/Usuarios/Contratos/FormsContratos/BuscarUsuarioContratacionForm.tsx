import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from '../../../../components/ui/button.tsx';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../../../components/ui/form.tsx";
import { Input } from "../../../../components/ui/input.tsx";
import { BuscarContratacionSchema } from "../validacionesContratacion.ts";
import { useNavigate } from 'react-router-dom';
import axiosClient from "../../../../axios-client.ts";
import { useToast } from "../../../../components/ui/use-toast"; //IMPORTACIONES TOAST
import { ToastAction } from "../../../../components/ui/toast"; //IMPORTACIONES TOAST
import ContratoConsultaUsuarioTable from "../Table/ContratoConsultaUsuarioTable.tsx";
import { useStateContext } from "../ContextContratos.tsx";
import { ContextProvider } from "../ContextContratos.tsx";

export const BuscarUsuarioContratacion = () => {

    const { toast } = useToast()
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [mostrarTabla, setMostrarTabla] = useState(false);
    const {usuariosEncontrados, setusuariosEncontrados} = useStateContext();
    const [nombreBuscado, setNombreBuscado] = useState<string>('');

    const navigate = useNavigate();

    const form = useForm<z.infer<typeof BuscarContratacionSchema>>({
        resolver: zodResolver(BuscarContratacionSchema),
        defaultValues: {
            nombre: "",
        },
    })

    //Funcion de errores para el Toast
    function errorToast() {

        toast({
            variant: "destructive",
            title: "Oh, no. Error",
            description: "Algo salió mal.",
            action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
        })
    }

    function onSubmit(values: z.infer<typeof BuscarContratacionSchema>) {
        console.log(values);
        setLoading(true);
        axiosClient.get(`/usuarios/consulta/${values.nombre}`)
        .then((response) => 
        {
            setNombreBuscado(values.nombre);
            setusuariosEncontrados(response.data.data);
        })
        .catch((err) =>{
            const response = err.response;
            errorToast();
            if (response && response.status === 422) {
                setErrors(response.data.errors);
            }
            setLoading(false);
        })
    }

    useEffect(() => {

        const numObject = usuariosEncontrados.length;
        console.log("Número de usuarios encontrados:", numObject);

        if (numObject > 1) {
            setMostrarTabla(true);
        } else if (numObject === 1) {
            setMostrarTabla(false);
            navigate('/CrearUsuario');
        } else {
            setMostrarTabla(false); 
        }
    }, [usuariosEncontrados, navigate]);

    

function handleNavigationCrearUsuario ()
    {
        navigate('/CrearUsuario');
    }

    return (
        <ContextProvider>
            <div>
            <div className='mt-5 max-w-md mx-0 rounded-md border border-border p-4 h-[43vh] '>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div style={{ color: 'grey' }}>Consultar al usuario</div>
                    <FormField
                        control={form.control}
                        name="nombre"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre del usuario o la toma</FormLabel>
                                <FormControl>
                                    <Input placeholder="Escribe el nombre del usuario o numero de toma" {...field} />
                                </FormControl>
                                <FormDescription>
                                {/* AQUI PUEDE IR DESCRIPCIÓN DEBAJO DEL INPUT EN EL FORM */}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end items-end mt-9 gap-2">
                        <Button type="submit">Aceptar</Button>
                        <Button type="button" onClick={handleNavigationCrearUsuario}>Crear usuario</Button>
                    </div>
                </form>
            </Form>
        </div>

        {mostrarTabla&&<h1 className="mt-10">Selecciona un usuario</h1>}

        {

        mostrarTabla && <ContratoConsultaUsuarioTable nombreBuscado={nombreBuscado}/>
        }
            
        </div>
        </ContextProvider>


    );
}
