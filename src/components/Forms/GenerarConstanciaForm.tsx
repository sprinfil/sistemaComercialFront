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
import { ZustandGeneralUsuario } from "../../contexts/ZustandGeneralUsuario.tsx";



const GenerarConstanciaForm = () => {
    const { toast } = useToast()
    const { constancia, setConstancia, loadingTable, setLoadingTable, setConstancias, setAccion, accion } = useStateContext();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [abrirInput, setAbrirInput] = useState(false);
    const [IdParaRestaurar, setIdParaRestaurar] = useState(null);
    const [ModalReactivacionOpen, setModalReactivacionOpen] = useState(false);
    const [valorObtenidoBool, setValorObtenidoBool] = useState(false);
    const [control, setControl] = useState(false);
    const [constanciasRegistradas, setConstanciasRegistradas] = useState([]);
    const [constanciasCatalogo, setConstanciasCatalogo] = useState([]);
    const { usuariosEncontrados } = ZustandGeneralUsuario();
    const [cargos, setCargos] = useState<any[]>([]);
    const [cargosPendientes, setCargosPendientes] = useState(false);

    //#region SUCCESSTOAST
    function successToastCreado() {
        toast({
            title: "¡Éxito!",
            description: "La constancia se ha creado correctamente",
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

    


    const form = useForm<z.infer<typeof constanciaSchema>>({
        resolver: zodResolver(constanciaSchema),
        defaultValues: {
            id: constancia.id,
            nombre: constancia.nombre,
            descripcion: constancia.descripcion,
           
        },
    })

    const buscarRegistroConstancia = async () => {
        setLoading(true);
        try {
            const payload = {
                id_dueno: usuariosEncontrados[0].tomas[0].id,
                modelo_dueno: "toma"
            };
            const response = await axiosClient.get("/Constancia/buscarRegistroConstancia", {
                params: payload
            });
            setConstanciasRegistradas(response.data);
            console.log(response.data)
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("Error al buscar constancias:", error);
           
        }
    };

    const getConstanciasCatalogo = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get("/ConstanciasCatalogo");
            setConstanciasCatalogo(response.data.data);
            console.log(response.data.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("Failed to fetch constancias catalogo:", error);
        }
    };

    useEffect(() => {
        buscarRegistroConstancia();
        getConstanciasCatalogo();
        console.log(constanciasRegistradas)
    }, []);

    
    // Función para manejar la generación de constancia
    const generarConstancia = async (data: any) => {
        setLoading(true);

        try {
            // Datos que se van a enviar a la API
            const payload = {
                id_catalogo_constancia: data.id,   // o el ID del catálogo adecuado
                id_dueno: usuariosEncontrados[0].tomas[0].id,                       // Puedes reemplazarlo por el valor adecuado
                modelo_dueno: "toma"               // Reemplaza según sea necesario
            };

            // Enviar solicitud a la API
            const response = await axiosClient.post("/Constancia/store", payload);
            
            setLoading(false);
            successToastCreado(); // Mostrar mensaje de éxito
            console.log("Respuesta del servidor:", response.data);

            

        } catch (error) {
            setLoading(false);
            errorToast(); // Mostrar mensaje de error
            console.log(constanciaSchema)
            console.error("Error al generar constancia:", error);
        }
    };

    

    useEffect(() => {
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
            });
        }
        
        console.log(accion);
    }, [accion]);

      // Función para manejar la descarga de la constancia
    const descargarConstancia = async () => {
        setLoading(true);
        try {
            const payload = {
                id: constanciasRegistradas.find(c => c.id_catalogo_constancia === constancia.id).id,
            };

            const response = await axiosClient.get("/Constancia/EntregarConstancia", {
                params: payload,
                responseType: "blob", // Importante: Indica que esperamos un blob como respuesta
            });
            console.log(response.data)

            // Crear un enlace de descarga
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'constancia_pago.pdf'); // Nombre del archivo a descargar
            document.body.appendChild(link);
            link.click(); // Simula el clic para iniciar la descarga
            link.parentNode.removeChild(link); // Elimina el enlace del DOM

            toast({
                title: "Descarga exitosa",
                description: "La constancia se ha descargado correctamente.",
                variant: "success",
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "No se pudo descargar la constancia.",
            });
            console.error("Error al descargar constancia:", error);
        } finally {
            setLoading(false);
        }
    };

    
    
    

    return (
        <div className="">
            <Form {...form}>
                <form className="space-y-8" onSubmit={form.handleSubmit(generarConstancia)}>
                    <div className="flex justify-end">
                        <Button className="mr-4" type="submit">Generar constancia</Button>
                    </div>
    
                    {/* Mostrar lista de constancias disponibles */}
                    {constanciasRegistradas.length > 0 ? (
                        <div>
                            <h3 className="font-semibold mb-2">Constancias Disponibles:</h3>
                            <ul>
                                {constanciasRegistradas.map((constancia, index) => (
                                    <li key={index} className="mb-2">
                                        <a
                                            href={`http://localhost:8001/storage/${constancia.archivo.url}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline"
                                        >
                                            Constancia #{index + 1} - {constancia.archivo.url || 'Sin Nombre'}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div>No hay constancias disponibles.</div>
                    )}
    
                    {abrirInput && <Button type="submit">Guardar</Button>}
                </form>
            </Form>
        </div>
    );
    
    
}

export default GenerarConstanciaForm
