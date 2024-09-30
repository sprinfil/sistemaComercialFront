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

const OrdenDeTrabajoEncadenadasSchema = z.object({
    orden_trabajo_encadenadas: z.array(
        z.object({
            id_OT_Catalogo_encadenada: z.number().min(1, "La OT es requerida"),
        })
    ),
});

type OrdenDeTrabajoEncadenadas = z.infer<typeof OrdenDeTrabajoEncadenadasSchema>;

const DisparaOtraOrdenDeTrabajoForm = () => {
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
    const [totalAccionesComponente, setTotalAccionesComponente] = useState<{id:number, id_OT_Catalogo_encadenada:number}[]>([{ id: 0, id_OT_Catalogo_encadenada: 0}]);
    const [conceptoSeleccionado, setConceptoSeleccionado] = useState<string | null>(null);
    const { idSeleccionadoConfiguracionOrdenDeTrabajo, accionGeneradaEntreTabs, setAccionGeneradaEntreTabs} = ZustandGeneralUsuario();
    const [control, setControl] = useState(false);

    const [nombreConcepto, setNombreConcepto] = useState([]);


    console.log(control);








    const handleAddComponent = () => {
        const newId = totalAccionesComponente.length > 0 
            ? Math.max(...totalAccionesComponente.map(({ id }) => id)) + 1 
            : 1;
    
        // Asegúrate de que el nuevo objeto tenga la estructura adecuada
        setTotalAccionesComponente(prevAcciones => [
            ...prevAcciones,
            { id: newId, id_OT_Catalogo_encadenada: '' } // Usa '' si necesitas un string vacío
        ]);
    };

    const handleRemoveComponent = (idToRemove: number) => {
        setTotalAccionesComponente(prevAcciones =>
            prevAcciones.filter(({ id }) => id !== idToRemove)
        );
    };

    function successToastCreado() {
        toast({
            title: "¡Éxito!",
            description: "La orden de trabajo encadenada se ha creado correctamente",
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

   

    
  const form = useForm<OrdenDeTrabajoEncadenadas>({
    resolver: zodResolver(OrdenDeTrabajoEncadenadasSchema),
    defaultValues: {
        orden_trabajo_encadenadas: totalAccionesComponente.map(item => ({
        id_OT_Catalogo_encadenada: 0,
      })),
    },
  });

  useEffect(() => {
    if (accionGeneradaEntreTabs === "editar") {
        const valoresActuales = form.getValues('orden_trabajo_encadenadas');

        
        const nuevosValores = totalAccionesComponente.map(item => ({
            id_OT_Catalogo_encadenada: 0, 
        }));

        const todosLosValores = [...valoresActuales, ...nuevosValores];

        const valoresFiltrados = todosLosValores.filter(cargo => cargo.id_OT_Catalogo_encadenada !== 0);

        form.reset({ orden_trabajo_encadenadas: valoresFiltrados });
    }
}, [totalAccionesComponente, accionGeneradaEntreTabs]);


console.log(form.getValues());
    const onSubmit = async (values: OrdenDeTrabajoEncadenadas) => {
        console.log(values);

        const encadenadas = values.orden_trabajo_encadenadas.map((item) => ({
            id: item.id,
            id_OT_Catalogo_padre: idSeleccionadoConfiguracionOrdenDeTrabajo,
            id_OT_Catalogo_encadenada: item.id_OT_Catalogo_encadenada
        }));
        console.log("Cargos:", encadenadas);


        const orden_trabajo_encadenadas = {
            orden_trabajo_encadenadas: encadenadas
        }

        console.log("valores enviados objeto", orden_trabajo_encadenadas);


        if (accionGeneradaEntreTabs === "editar") {
            try {
                const response = await axiosClient.put(`/OrdenTrabajoCatalogo/create/encadenadas`, orden_trabajo_encadenadas);
                const data = response.data;
                if (data.restore) {
                    setIdParaRestaurar(data.tipoToma_id);
                    setModalReactivacionOpen(true);
                } else if (data.restore === false) {
                    errorToast();
                    setLoading(false);
                } else {
                    setLoading(false);
                    setOrdenDeTrabajo({
                        id: 0,
                        nombre: "",
                        descripcion: "ninguna",
                    });
                    form.reset({
                        orden_trabajo_encadenadas: totalAccionesComponente,
                    });
                    console.log(response);
                    setAccion("creado");
                    getAnomalias();
                    successToastCreado();
                }
            } catch (response) {
                errorToast();
                console.log(response);
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
        if (accionGeneradaEntreTabs === "eliminar") {
            setAbrirInput(false);
        }
    
        if (accionGeneradaEntreTabs === "crear" || accionGeneradaEntreTabs === "creado") {
            setAbrirInput(true);
            setErrors({});
            setOrdenDeTrabajo({
                id: 0,
                nombre: "",
                descripcion: "ninguna",
            });
        }
    
        if (accionGeneradaEntreTabs === "ver" || accionGeneradaEntreTabs === "editar") {
            setAbrirInput(true);
            setErrors({});
    
            // Transformación de datos para el formulario
            const ordenTrabajoEncadenadas = Array.isArray(ordenDeTrabajo.ordenes_trabajo_encadenadas) ?
                ordenDeTrabajo.ordenes_trabajo_encadenadas.map(item => ({
                    id: item.id,
                    id_OT_Catalogo_encadenada: item.id_OT_Catalogo_encadenada,
                    OT_Encadenada: item.OT_Encadenada.nombre
                })) : [];
    
              // Obtener nombres de conceptos
                    const nombresConceptos = ordenTrabajoEncadenadas.map(encadenada => encadenada.OT_Encadenada || 'Nombre no disponible');

                    setNombreConcepto(nombresConceptos);

            // Manejo de la acción "ver"
            if (accionGeneradaEntreTabs === "ver") {
                setControl(true);
                form.reset({
                    orden_trabajo_encadenadas: ordenTrabajoEncadenadas,
                });
            }
    
            // Manejo de la acción "editar"
            if (accionGeneradaEntreTabs === "editar") {
                setControl(false);
                form.reset({
                    orden_trabajo_encadenadas: ordenTrabajoEncadenadas,
                });
            }
    
            // Actualización del estado si los datos cambiaron
            if (JSON.stringify(ordenTrabajoEncadenadas) !== JSON.stringify(totalAccionesComponente)) {
                setTotalAccionesComponente(ordenTrabajoEncadenadas);
            }
    
            console.log("Valores del cargo:", ordenTrabajoEncadenadas);
            console.log("Valores del formulario después del reset:", form.getValues());
        }
    }, [accionGeneradaEntreTabs, ordenDeTrabajo, idSeleccionadoConfiguracionOrdenDeTrabajo]);


    const borderColor = accionGeneradaEntreTabs == "editar" ? 'border-green-500' : 'border-gray-200';

    //console.log("a ver que datos manda el form", form.getValues());

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
              <p className="text-muted-foreground text-[20px]">Sin ordenes de trabajo encadenadas.</p>
             }

                    </div>
                }



                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {totalAccionesComponente.map((accion, index) => {
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
                                            name={`orden_trabajo_encadenadas.${index}.id_OT_Catalogo_encadenada`}
                                            control={form.control}
                                            render={({ field }) => (
                                                <DisparaOtraOTComboBox form={form} field={field} name={`orden_trabajo_encadenadas.${index}.id_OT_Catalogo_encadenada`} 
                                                setCargoSeleccionado={setConceptoSeleccionado} 
                                                disabled={control}
                                                defaultValue={`orden_trabajo_encadenadas.${index}.id_OT_Catalogo_encadenada`} />

                                            )}
                                        />

                                            :

                                            <Controller
                                            name={`orden_trabajo_encadenadas.${index}.id_OT_Catalogo_encadenada`}
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
                                        {accionGeneradaEntreTabs == "editar" &&  <Button type="button" onClick={() => handleRemoveComponent(accion.id)} variant="outline">
                                            <TrashIcon className="w-4 h-4" />
                                        </Button>}
                                       
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

export default DisparaOtraOrdenDeTrabajoForm;
