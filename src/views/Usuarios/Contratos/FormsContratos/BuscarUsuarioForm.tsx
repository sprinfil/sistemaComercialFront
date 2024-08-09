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
import { BuscarUsuarioComboBox } from "../../../../components/ui/BuscarUsuarioComboBox.tsx";
import { Import } from "lucide-react";
import { ZustandGeneralUsuario } from "../../../../contexts/ZustandGeneralUsuario.tsx";
import ContratoConsultaTomaTable from "../../../../components/Tables/Components/ContratoConsultaTomaTable.tsx";
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
    const [mostrarTablaUsuario, setmostrarTablaUsuario] = useState(false);
    const [mostrarTablaTomaUsuario, setMostrarTablaTomaUsuario] = useState(false);

    const [filtroSeleccionado, setFiltroSeleccionado] = useState("");

    //variables globales del zustand
    const {nombreBuscado, setNombreBuscado, 
        nombreSeleccionado, setNombreSeleccionado, 
        usuariosEncontrados, setUsuariosEncontrados, 
        accion, setAccion, setFindUserOrToma, findUserOrToma
    
    } = ZustandGeneralUsuario(); //obtener la ruta del componente breadCrumb

    console.log("este es la accion pare " + accion);
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof BuscarContratacionSchema>>({
        resolver: zodResolver(BuscarContratacionSchema),
        defaultValues: {
            nombre: "",
            filtro: "",
        },
    })

 //#region TOAST(MENSAJES)   

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
    function noUsuarioEncontrado() {

        toast({
            variant: "destructive",
            title: "Oh, no. Algo salió mal.",
            description: "No se encontró ningún usuario",
            action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
        })
    }
//#endregion

    function onSubmit(values: z.infer<typeof BuscarContratacionSchema>) {
        console.log(values);
        setLoading(true);
        setUsuariosEncontrados([]);
        
        const criterio = values.nombre.trim();

        let endpoint = "";

        switch (values.filtro) {
            case "1":
                endpoint = `/usuarios/consulta/${criterio}`;
                setFiltroSeleccionado("1");
                setFindUserOrToma(false);
                break;
            case "2":
                endpoint = `/usuarios/consultaCodigo/${criterio}`;
                setFiltroSeleccionado("2");
                setFindUserOrToma(false);
                break;
            case "3":
                endpoint = `/usuarios/consultaCorreo/${criterio}`;
                setFiltroSeleccionado("3");
                setFindUserOrToma(false);
                break;
                case "4":
                    endpoint = `/usuarios/consultaDireccion/${criterio}`;
                    setFiltroSeleccionado("4");
                    setMostrarTablaTomaUsuario(true);
                    setmostrarTablaUsuario(false);
                    setFindUserOrToma(true);
                    break;
                    case "5":
                    endpoint = `/Toma/codigo/${criterio}`;
                    setFiltroSeleccionado("5");
                    setMostrarTablaTomaUsuario(true);
                    setmostrarTablaUsuario(false);
                    setFindUserOrToma(true);
                    break;
            default:
                setLoading(false);
                console.log("Filtro no válido");
                return;
        }

        
                    
                // PARA EJECUTAR LA CONSULTA
                axiosClient.get(endpoint)
                    .then(response => {
                        const results = response.data.data;
                        setUsuariosEncontrados(response.data.data);
                        console.log(results);
                        if (results.length > 0) {
                            setNombreBuscado(values.nombre);
                            setUsuariosEncontrados(results);
                            if (results.length === 1) {
                                if (tipoAccion === "verUsuarioDetalle") {
                                    navigate("/usuario", { state: { contratoBuscarUsuario: results[0] } });
                                } else if (tipoAccion === "crearContratacionUsuario") {
                                    navigate("/Crear/Contrato/Usuario", { state: { contratoBuscarUsuario: results[0] } });
                                }
                            } else {
                                setmostrarTablaUsuario(true);
                            }
                        } else {
                            noUsuarioEncontrado();
                            setmostrarTablaUsuario(false);
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
        
        const numObject = usuariosEncontrados != null ? usuariosEncontrados.length: 0;
        console.log("Número de usuarios encontrados:", numObject);
        if (numObject > 1) {
            setmostrarTablaUsuario(true);
        } else if (numObject === 1) {
            setmostrarTablaUsuario(false);
        } else {
            setmostrarTablaUsuario(false); 
        }


    }, [usuariosEncontrados, navigate, navegacion]);


function handleNavigationCrearUsuario ()
    {

        navigate('/CrearUsuario');
    }

    return (
        <ContextProvider>
            <div>
            <div className='mt-5 w-full rounded-md border border-border p-4 h-[55vh] '>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div style={{ color: 'grey' }}>Consultar al usuario</div>
                
                    <FormField
                        control={form.control}
                        name="filtro"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Filtrar por:</FormLabel>
                                <BuscarUsuarioComboBox form={form} field={field} name="filtro" setCargoSeleccionado={setNombreSeleccionado}/>
                                <FormDescription>
                                {/* AQUI PUEDE IR DESCRIPCIÓN DEBAJO DEL INPUT EN EL FORM */}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="nombre"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    {nombreSeleccionado === "Nombre" && "Escribe el nombre del usuario"}
                                    {nombreSeleccionado === "Codigo usuario" && "Escribe el código del usuario"}
                                    {nombreSeleccionado === "Correo" && "Escribe el correo del usuario"}
                                    {nombreSeleccionado === "Dirección" && "Escribe la dirección de la toma"}
                                    {nombreSeleccionado === "Codigo toma" && "Escribe el codigo de la toma"}

                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="Escribe la información requerida" {...field} />
                                </FormControl>
                                <FormDescription>
                                {/* AQUI PUEDE IR DESCRIPCIÓN DEBAJO DEL INPUT EN EL FORM */}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
            
            <div className="flex justify-end items-end gap-2 mt-10px">
                        <Button type="submit">Aceptar</Button>
                        {
                            botonCrearUsuario && <Button type="button" onClick={handleNavigationCrearUsuario}>Crear usuario</Button>
                        }
                    </div>
                </form>
            </Form>
        </div>

        {mostrarTablaUsuario&&filtroSeleccionado == "1" && <h1 className="mt-10 ml-6">Selecciona un usuario.</h1>}
        {mostrarTablaUsuario&&filtroSeleccionado == "2" && <h1 className="mt-10 ml-6">Selecciona un usuario.</h1>}
        {mostrarTablaUsuario&&filtroSeleccionado == "3" && <h1 className="mt-10 ml-6">Selecciona un usuario.</h1>}
        {mostrarTablaTomaUsuario&&filtroSeleccionado == "4"&&<h1 className="mt-10 ml-6">Selecciona la toma del usuario.</h1>}
        {mostrarTablaTomaUsuario&&filtroSeleccionado == "5"&&<h1 className="mt-10 ml-6">Selecciona el codigo de la toma.</h1>}

        {
            
        mostrarTablaUsuario &&  filtroSeleccionado == "1" && <ContratoConsultaUsuarioTable accion2 = {tipoAccion} nombreBuscado={nombreBuscado} filtroSeleccionado = {filtroSeleccionado}/>
        }
        {

        mostrarTablaUsuario &&  filtroSeleccionado == "2" && <ContratoConsultaUsuarioTable accion2 = {tipoAccion} nombreBuscado={nombreBuscado} filtroSeleccionado = {filtroSeleccionado}/>
        }
        {

        mostrarTablaUsuario &&  filtroSeleccionado == "3" && <ContratoConsultaUsuarioTable accion2 = {tipoAccion} nombreBuscado={nombreBuscado} filtroSeleccionado = {filtroSeleccionado}/>
        }

        {
        mostrarTablaTomaUsuario && filtroSeleccionado == "4" && <ContratoConsultaTomaTable accion2 = {tipoAccion} nombreBuscado={nombreBuscado} filtroSeleccionado = {filtroSeleccionado}/>
        }
         {
        mostrarTablaTomaUsuario && filtroSeleccionado == "5" && <ContratoConsultaTomaTable accion2 = {tipoAccion} nombreBuscado={nombreBuscado} filtroSeleccionado = {filtroSeleccionado}/>
        }
            
        </div>
        </ContextProvider>


    );
}
