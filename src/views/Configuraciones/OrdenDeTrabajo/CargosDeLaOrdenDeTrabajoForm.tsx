import { useState, useEffect } from "react";
import logo from '../../img/logo.png';
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from '../../../components/ui/button.tsx';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../../components/ui/form.tsx";
import { Input } from '../../../components/ui/input.tsx';
import { OrdenDeTrabajoCrearSchema } from "../../../components/Forms/OrdenDeTrabajoValidaciones.ts";
import { ModeToggle } from '../../../components/ui/mode-toggle.tsx';
import axiosClient from "../../../axios-client.ts";
import Loader from "../../../components/ui/Loader.tsx";
import Error from "../../../components/ui/Error.tsx";
import { Textarea } from "../../../components/ui/textarea.tsx";
import { useStateContext } from "../../../contexts/ContextOrdenDeTrabajo.tsx";
import { TrashIcon, Pencil2Icon, PlusCircledIcon } from '@radix-ui/react-icons';
import IconButton from "../../../components/ui/IconButton.tsx";
import { ComboBoxActivoInactivo } from "../../../components/ui/ComboBox.tsx";
import Modal from "../../../components/ui/Modal.tsx";
import ModalReactivacion from "../../../components/ui/ModalReactivación.tsx";
import { useToast } from "../../../components/ui/use-toast";
import { ToastAction } from "../../../components/ui/toast";
import { Switch } from "../../../components/ui/switch.tsx";
import { ConceptosComboBoxNew } from "../../../components/ui/ConceptosComboBoxNew.tsx";
import OrdenDeTrabajoCargosTable from "../../../components/Tables/Components/OrdenDeTrabajoCargosTable.tsx";
import { OrdenDeTrabajoAplicacionComboBox } from "../../../components/ui/OrdenDeTrabajoAplicacionComboBox.tsx";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ConceptosComboBox } from "../../../components/ui/ConceptosComboBox.tsx";
import { ZustandGeneralUsuario } from "../../../contexts/ZustandGeneralUsuario.tsx";
import { ConceptosOrdenDeTrabajoComboBox } from "../../../components/ui/ConceptosOrdenDeTrabajoComboBox.tsx";
import { DisparaOtraOTComboBox } from "../../../components/ui/DisparaOtraOTComboBox.tsx";

type OrdenDeTrabajo = {
    nombre: string;
    aplicacion: string;
};

const OrdenTrabajoCargosSchema = z.object({
    orden_trabajo_cargos: z.array(
        z.object({
            id_concepto_catalogo: z.number(),
        })
    ),
});

type OrdenTrabajoCargo = z.infer<typeof OrdenTrabajoCargosSchema>;

const CargosDeLaOrdenTrabajoForm = () => {
    const { toast } = useToast();
    const { ordenDeTrabajo, setOrdenDeTrabajo, loadingTable, setLoadingTable, setOrdenDeTrabajos, setAccion, accion } = useStateContext();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [abrirInput, setAbrirInput] = useState(false);
    const [IdParaRestaurar, setIdParaRestaurar] = useState<number | null>(null);
    const [ModalReactivacionOpen, setModalReactivacionOpen] = useState(false);
    const [bloquear, setBloquear] = useState(false);
    const [cargoSeleccionado, setCargoSeleccionado] = useState<string | null>(null);
    const [nombreSeleccionado, setNombreSeleccionado] = useState<string | null>(null);
    const [aplicacionSeleccionada, setAplicacionSeleccionada] = useState<string | null>(null);
    const [cargosAgregados, setCargosAgregados] = useState<OrdenDeTrabajo[]>([]);
    const [aumentarAcciones, setAumentarAcciones] = useState(1);
    const [totalAccionesComponente, setTotalAccionesComponente] = useState<{ id: number, id_concepto_catalogo: number }[]>([{ id: 0, id_concepto_catalogo: 0 }]);
    const [conceptoSeleccionado, setConceptoSeleccionado] = useState<string | null>(null);
    const { idSeleccionadoConfiguracionOrdenDeTrabajo, accionGeneradaEntreTabs, setAccionGeneradaEntreTabs } = ZustandGeneralUsuario();
    const [control, setControl] = useState(false);
    const [nombreConcepto, setNombreConcepto] = useState([]);
    const [valoresPrevios, setValoresPrevios] = useState({});
    const [quitarEdicion, setQuitarEdicion] = useState('');

    console.log(idSeleccionadoConfiguracionOrdenDeTrabajo);

    const handleAddComponent = () => {
        const newId = totalAccionesComponente.length > 0
            ? Math.max(...totalAccionesComponente.map(({ id }) => id)) + 1
            : 1;

        setTotalAccionesComponente(prevAcciones => [
            ...prevAcciones,
            { id: newId, id_concepto_catalogo: 0 }
        ]);
    };
    const handleRemoveComponent = (idToRemove: number) => {
        console.log("Eliminar cargo con ID:", idToRemove); // Verifica el ID
        setTotalAccionesComponente(prevAcciones => {
            const nuevasAcciones = prevAcciones.filter(({ id }) => id !== idToRemove);
            
            // Obtener los valores actuales del formulario
            const currentValues = form.getValues('orden_trabajo_cargos');
    
            // Filtrar y mapear solo los valores que no han sido eliminados
            const updatedValues = nuevasAcciones.map(item => {
                const existingValue = currentValues.find(value => value.id === item.id);
                return {
                    id: item.id,
                    id_concepto_catalogo: existingValue ? existingValue.id_concepto_catalogo : 0, // Mantiene el valor existente o establece 0
                };
            });
    
            // Resetea el formulario después de eliminar el componente
            form.setValue('orden_trabajo_cargos', updatedValues);
    
            return nuevasAcciones; // Devuelve el nuevo estado
        });
    };
    
    

    function successToastCreado() {
        toast({
            title: "¡Éxito!",
            description: "El cargo o los cargos de la orden de trabajo se han creado correctamente",
            variant: "success",
        });
    }

    function successToastEditado() {
        toast({
            title: "¡Éxito!",
            description: "La orden de trabajo encadenada se ha editado correctamente",
            variant: "success",
        });
    }

    function successToastEliminado() {
        toast({
            title: "¡Éxito!",
            description: "La orden de trabajo encadenada se ha eliminado correctamente",
            variant: "success",
        });
    }

    function successToastRestaurado() {
        toast({
            title: "¡Éxito!",
            description: "La orden de trabajo encadenada se ha restaurado correctamente",
            variant: "success",
        });
    }

    function errorToast() {
        toast({
            variant: "destructive",
            title: "Oh, no. Error",
            description: "Algo salió mal.",
            action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
        });
    }

    function errorYaExisteToast() {
        toast({
            variant: "destructive",
            title: "Oh, no. Error",
            description: "El tipo de toma ya existe.",
            action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
        });
    }




    const form = useForm<OrdenTrabajoCargo>({
        resolver: zodResolver(OrdenTrabajoCargosSchema),
        defaultValues: {
            orden_trabajo_cargos: totalAccionesComponente.map(item => ({
                id_concepto_catalogo: 0,
            })),
        },
    });
    const [isInitialized, setIsInitialized] = useState(false); // Estado para verificar si ya se inicializó

    useEffect(() => {
        if (accionGeneradaEntreTabs === "editar") {
            const valoresActuales = form.getValues('orden_trabajo_cargos');
    
            const nuevosValores = totalAccionesComponente.map((item, index) => ({
                id: item.id,
                id_concepto_catalogo: 0,
            }));
    
            // Combina los valores existentes con los nuevos
            const todosLosValores = [...valoresActuales, ...nuevosValores];
    
            // Resetea el formulario con todos los valores
            form.reset({ orden_trabajo_cargos: todosLosValores });
        }
    }, [totalAccionesComponente, accionGeneradaEntreTabs]);
    

    const onSubmit = async (values: OrdenTrabajoCargo) => {
        console.log(values);

        // Filtrar los cargos para eliminar aquellos con id_concepto_catalogo igual a 0
        const filteredCargos = values.orden_trabajo_cargos.filter(
            (cargo) => cargo.id_concepto_catalogo !== 0
        );
    
        console.log(filteredCargos);
    
        // Crear un nuevo array en el formato deseado
        const cargos = filteredCargos.map((cargo) => ({
            id:0,
            id_orden_trabajo_catalogo: idSeleccionadoConfiguracionOrdenDeTrabajo,
            id_concepto_catalogo: cargo.id_concepto_catalogo // Solo guardar el id_concepto_catalogo
        }));
    
        // Formar el objeto final que deseas enviar
        const payload = {
            orden_trabajo_cargos: cargos
        };
    
        console.log("Cargos:", payload);
    


        const orden_trabajo_cargos = {
            orden_trabajo_cargos: cargos
        }

        console.log("valores enviados objeto", orden_trabajo_cargos);


        if (accionGeneradaEntreTabs === "editar") {
            try {
                const response = await axiosClient.put(`/OrdenTrabajoCatalogo/create/cargos`, orden_trabajo_cargos);
                const data = response.data;
                if (data.restore) {
                    setIdParaRestaurar(data.tipoToma_id);
                    setModalReactivacionOpen(true);
                } else if (data.restore === false) {
                    errorToast();
                    setLoading(false);
                } else {
                    setLoading(false);
                   
                    setValoresPrevios(values);
             
                    console.log(response);
                    setAccionGeneradaEntreTabs("recargar");
                    setQuitarEdicion("quitar")
                    getAnomalias();
                    successToastCreado();
                }
            } catch (err) {
                const message = err.response.data.message;
                toast({
                    variant: "destructive",
                    title: "Oh, no. Error",
                    description: message,
                    action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
                });
                setLoading(false);
            }
        }


    };

    const getAnomalias = async () => {
        setLoadingTable(true);
        try {
            const response = await axiosClient.get("/OrdenTrabajoCatalogo");
            setLoadingTable(false);
            setOrdenDeTrabajos(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            setLoadingTable(false);
            errorToast();
            console.error("Failed to fetch anomalias:", error);
        }
    };

    const onDelete = async () => {
        try {
            await axiosClient.delete(`/TipoToma/log_delete/${ordenDeTrabajo.id}`);
            getAnomalias();
            setAccion("eliminar");
            successToastEliminado();
        } catch (error) {
            errorToast();
            console.error("Failed to delete anomalia:", error);
        }
    };

    const restaurarDato = (IdParaRestaurar: number) => {
        axiosClient.put(`/TipoToma/restore/${IdParaRestaurar}`)
            .then(response => {
                successToastRestaurado();
                getAnomalias();
            })
            .catch(error => {
                errorToast();
                console.error("Failed to restore dato:", error);
            });
    };




    useEffect(() => {
   
        if (accionGeneradaEntreTabs && ordenDeTrabajo) {
            const ordenTrabajoCargos = Array.isArray(ordenDeTrabajo.ordenes_trabajo_cargos)
                ? ordenDeTrabajo.ordenes_trabajo_cargos.map(item => ({
                    id: item.id,
                    id_concepto_catalogo: item.id_concepto_catalogo,
                    conceptos: item.conceptos 

                }))
                : [];

                const nombresConceptos = ordenTrabajoCargos.map(cargo => cargo.conceptos?.nombre);
                setNombreConcepto(nombresConceptos);
                console.log(nombresConceptos);

               
    
            if (accionGeneradaEntreTabs === "ver") {
                form.reset({
                    orden_trabajo_cargos: ordenTrabajoCargos,
                });
                setControl(true);
                setAbrirInput(true);
            }
    
            if (accionGeneradaEntreTabs === "editar") {
                form.reset({
                    orden_trabajo_cargos: ordenTrabajoCargos,
                });
                setControl(false);
                setAbrirInput(true);
            }
    
          
            if (JSON.stringify(ordenTrabajoCargos) !== JSON.stringify(totalAccionesComponente)) {
                setTotalAccionesComponente(ordenTrabajoCargos);
            }
    
            console.log("Valores del cargo:", ordenTrabajoCargos);
            console.log("Valores del formulario después del reset:", form.getValues());
        }
    }, [accionGeneradaEntreTabs, ordenDeTrabajo]);

    useEffect(() => {
 
    
            setControl(false);
            setAbrirInput(true);
    

       
    }, [accionGeneradaEntreTabs, ordenDeTrabajo]);
 

    console.log(form.getValues());
    const borderColor = accionGeneradaEntreTabs == "editar" ? 'border-green-500' : 'border-gray-200';
    console.log(accionGeneradaEntreTabs);
    console.log(nombreConcepto);

    return (
        <div>
            <div className="overflow-auto">
                <div className='flex h-[40px] items-center mb-[10px] bg-card rounded-sm'>
                    <div className='h-[20px] w-full flex items-center justify-end'>
                        <div className="mb-[10px] h-full w-full mx-4">
                            {ordenDeTrabajo.nombre && <p className="text-muted-foreground text-[20px]">{ordenDeTrabajo.nombre}</p>}
                        </div>
                        {ordenDeTrabajo.nombre && (
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
                                    accionGeneradaEntreTabs == "editar" &&
                                    <div onClick={handleAddComponent}>
                                        <a title="Agregar nueva acción">
                                            <IconButton>
                                                <PlusCircledIcon className='w-[20px] h-[20px]' />
                                            </IconButton>
                                        </a>
                                    </div>
                                }

                                <div onClick={() => setAccionGeneradaEntreTabs("editar")}>
                                    <a title="Modificar ordenes">
                                        <IconButton>
                                            <Pencil2Icon className="w-[20px] h-[20px]" />
                                        </IconButton>
                                    </a>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                {totalAccionesComponente.length < 1
                    &&
                    <div className="flex justify-center mt-[20vh]">
                        {accionGeneradaEntreTabs == "editar" ? <p className="text-muted-foreground text-[20px]">Agrega uno o mas ordenes de trabajo.</p> :
                            <p className="text-muted-foreground text-[20px]">Sin cargos.</p>
                        }

                    </div>
                }



                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {totalAccionesComponente.map((accion, index) => {
                            console.log(accion.id);
                            return (
                                <div key={accion.id} className={`p-4 border ${borderColor} rounded-md`}>
                                    <div className="text-sm font-medium mb-3">
                                        Selecciona una orden de trabajo.
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-full">
                                        
                                        {
                                            accionGeneradaEntreTabs == "editar" ? 
                                            <Controller
                                            name={`orden_trabajo_cargos.${index}.id_concepto_catalogo`}
                                            control={form.control}
                                            render={({ field }) => (
                                       <ConceptosOrdenDeTrabajoComboBox form={form} field={field} name={`orden_trabajo_cargos.${index}.id_concepto_catalogo`} setCargoSeleccionado={setConceptoSeleccionado} disabled={control} />

                                            )}
                                        />
                                            :
                                            <Controller
                                            name={`orden_trabajo_cargos.${index}.id_concepto_catalogo`}
                                            control={form.control}
                                            render={({ field: { value, ...rest } }) => ( // Desestructuramos field
                                              <Input
                                                readOnly
                                                placeholder=""
                                                value={nombreConcepto[index] || ""} // Usa el nombre del concepto aquí
                                                {...rest} // Pasa el resto de las props sin incluir value
                                              />
                                            )}
                                          />

                                        }
                                          
                                        </div>
                                        <FormMessage />
                                        {
                                         accionGeneradaEntreTabs == "editar" &&
                                         <Button type="button" onClick={() => handleRemoveComponent(accion.id)} variant="outline">
                                           
                                         <a title="Eliminar">
                                         <TrashIcon className="w-4 h-4" />
                                         </a>
                                     </Button>
                                        }
                                       
                                    </div>
                                </div>
                            )
                        })}
                        <div className="flex justify-end">
                            {accionGeneradaEntreTabs == "editar" && <Button type="submit">Guardar</Button>}

                        </div>
                    </form>

                    {ModalReactivacionOpen && (
                        <Modal
                            open={ModalReactivacionOpen}
                            onOpenChange={setModalReactivacionOpen}
                        >
                            <ModalReactivacion
                                id={IdParaRestaurar}
                                onRestaurar={restaurarDato}
                            />
                        </Modal>
                    )}
                </Form>
            </div>
        </div>

    );
};

export default CargosDeLaOrdenTrabajoForm;
