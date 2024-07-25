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
import { useToast } from "../../../../components/ui/use-toast.ts"; //IMPORTACIONES TOAST
import { ToastAction } from "../../../../components/ui/toast.tsx"; //IMPORTACIONES TOAST
import ContratoConsultaUsuarioTable from "../../../../components/Tables/Components/ContratoConsultaUsuarioTable.tsx";
import { useStateContext } from "../../../../contexts/ContextContratos.tsx";
import { ContextProvider } from "../../../../contexts/ContextContratos.tsx";


interface BuscarUsuarioProps
{
    navegacion: string;
    botonCrearUsuario: boolean;
    tipoAccion:string;
}

export const BuscarUsuarioForm = ({navegacion, botonCrearUsuario = true, tipoAccion}: BuscarUsuarioProps) => {

    const { toast } = useToast()
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [mostrarTabla, setMostrarTabla] = useState(false);
    const {usuariosEncontrados, setusuariosEncontrados, accion, setAccion} = useStateContext();
    const [nombreBuscado, setNombreBuscado] = useState<string>('');
   
    console.log("este es la accion pare " + accion);
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
        setusuariosEncontrados([]);
    
        const criterio = values.nombre.trim();
    
        // Define los endpoints para las diferentes consultas
        const endpoints = [
            `/usuarios/consultaCorreo/${criterio}`,
            `/usuarios/consultaRFC/${criterio}`,
            `/usuarios/consulta/${criterio}`,
            `/usuarios/consultaCodigo/${criterio}`,
            `/usuarios/consultaCURP/${criterio}`,

        ];
    
        // Ejecuta todas las consultas en paralelo
        Promise.all(endpoints.map(endpoint =>
            axiosClient.get(endpoint)
                .then(response => response.data.data)
                
                .catch(err => {
                    setErrors(err);
                    return []; // Devuelve un array vacío en caso de error
                })
        ))
        .then(results => {
          // Combina los resultados de todas las consultas
        const combinedResults = results.flat();

        // Actualiza el estado con todos los resultados combinados
        if (combinedResults.length > 0) {
            setNombreBuscado(values.nombre); // O usa otro valor si es necesario
            setusuariosEncontrados(combinedResults);
            if (combinedResults.length === 1) {
                if (tipoAccion === "verUsuarioDetalle") {
                    navigate("/usuario", { state: { contratoBuscarUsuario: combinedResults[0] } });
                } else if (tipoAccion === "crearContratacionUsuario") {
                    navigate("/Crear/Contrato/Usuario", { state: { contratoBuscarUsuario: combinedResults[0] } });
                }
            } else {
                setMostrarTabla(true);
            }

        } else {
            console.log("No users found");
            setMostrarTabla(false);
        }
                
        setAccion(tipoAccion);
        })
        .catch(err => {
            setErrors(err);
        })
        .finally(() => {
            setLoading(false);
        });
    }
    
   

    useEffect(() => {
        
        const numObject = usuariosEncontrados.length;
        console.log("Número de usuarios encontrados:", numObject);
        if (numObject > 1) {
            setMostrarTabla(true);
        } else if (numObject === 1) {
            setMostrarTabla(false);
        } else {
            setMostrarTabla(false); 
        }


    }, [usuariosEncontrados, navigate, navegacion]);


function handleNavigationCrearUsuario ()
    {

        navigate('/CrearUsuario');
    }

    return (
        <ContextProvider>
            <div>
            <div className='mt-5 ml-5 max-w-md mx-0 rounded-md border border-border p-4 h-[43vh] '>
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
                        {
                            botonCrearUsuario && <Button type="button" onClick={handleNavigationCrearUsuario}>Crear usuario</Button>
                        }
                    </div>
                </form>
            </Form>
        </div>

        {mostrarTabla&&<h1 className="mt-10 ml-6">Selecciona un usuario</h1>}

        {

        mostrarTabla && <ContratoConsultaUsuarioTable accion2 = {tipoAccion} nombreBuscado={nombreBuscado}/>
        }
            
        </div>
        </ContextProvider>


    );
}
