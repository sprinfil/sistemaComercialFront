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

type OrdenDeTrabajo = {
    nombre: string;
    aplicacion: string;
};

const OrdenDeTrabajoCargosSchema = z.object({
    orden_trabajo_cargos: z.array(
        z.object({
            id: z.number().min(0),
            id_concepto_catalogo: z.string().min(1, "El concepto es requerido"),
        })
    ),
});

type OrdenDeTrabajoCargos = z.infer<typeof OrdenDeTrabajoCargosSchema>;

const CargosDeLaOrdenDeTrabajoForm = () => {
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
    const [totalAccionesComponente, setTotalAccionesComponente] = useState([{ id: 0, id_concepto_catalogo: "0", id_orden_trabajo_catalogo: "0" }]);
    const [conceptoSeleccionado, setConceptoSeleccionado] = useState<string | null>(null);
    const {idSeleccionadoConfiguracionOrdenDeTrabajo} = ZustandGeneralUsuario();

    const handleAddComponent = () => {
        setTotalAccionesComponente(prevAcciones => [
            ...prevAcciones,
            { id: aumentarAcciones, id_concepto_catalogo: "0", id_orden_trabajo_catalogo: "0" }
        ]);
        setAumentarAcciones(aumentarAcciones + 1);
    };

    const handleRemoveComponent = (idToRemove: number) => {
        setTotalAccionesComponente(prevAcciones =>
            prevAcciones.filter(({ id }) => id !== idToRemove)
        );
    };

    function successToastCreado() {
        toast({
            title: "¡Éxito!",
            description: "La orden de trabajo se ha creado correctamente",
            variant: "success",
        });
    }

    function successToastEditado() {
        toast({
            title: "¡Éxito!",
            description: "La orden de trabajo se ha editado correctamente",
            variant: "success",
        });
    }

    function successToastEliminado() {
        toast({
            title: "¡Éxito!",
            description: "La orden de trabajo se ha eliminado correctamente",
            variant: "success",
        });
    }

    function successToastRestaurado() {
        toast({
            title: "¡Éxito!",
            description: "La orden de trabajo se ha restaurado correctamente",
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

    const form = useForm<OrdenDeTrabajoCargos>({
        resolver: zodResolver(OrdenDeTrabajoCargosSchema),
        defaultValues: {
            orden_trabajo_cargos: totalAccionesComponente.map((item) => ({
                id: 0,
                id_concepto_catalogo: ""

            })),
        },
    });

    const onSubmit = async (values: OrdenDeTrabajoCargos) => {
        console.log(values);

        const cargos = (values.orden_trabajo_cargos || []).map((item) => ({
            id: item.id,
            id_concepto_catalogo: conceptoSeleccionado,
            id_orden_trabajo_catalogo: idSeleccionadoConfiguracionOrdenDeTrabajo
        }));
        console.log("Cargos:", cargos);
            

        const orden_trabajo_cargos = {
            orden_trabajo_cargos: cargos
        }

        console.log("valores enviados objeto",orden_trabajo_cargos );
        

        if (accion === "editar") {
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
                    setOrdenDeTrabajo({
                        id: 0,
                        nombre: "",
                        descripcion: "ninguna",
                    });
                    form.reset({
                        orden_trabajo_cargos: totalAccionesComponente,
                    });
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

        if (accion === "hola") {
            try {
                const response = await axiosClient.put(`/TipoToma/update/${idSeleccionadoConfiguracionOrdenDeTrabajo}`, values);
                setLoading(false);
                setAbrirInput(false);
                setAccion("");
                getAnomalias();
                setOrdenDeTrabajo(response.data);
                successToastEditado();
            } catch (err) {
                errorToast();
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
        if (accion === "editar") {
            form.setValue("orden_trabajo_cargos", totalAccionesComponente);
        }

        if (accion === "ver") {
            setAbrirInput(false);
            setErrors({});
            setAccion("");
        
    
            // COMO ES OBJECTO LO PASAMOS A UN ARRAY Y ACCEDEMOS AL OBJETO DENTRO DEL OBJETO PARA QUE NOS MUESTRE
            //SUS PROPIEDADDES
            const ordenTrabajoCargos= Array.isArray(ordenDeTrabajo.orden_trabajo_cargos) ?
              ordenDeTrabajo.orden_trabajo_cargos.map(item => ({
                
                id: item.id,
                id_concepto_catalogo: item.id_concepto_catalogo
               
              })) : [];
          
            console.log(ordenTrabajoCargos);
            //setTotalAccionesComponente(ordenTrabajoCargos)
            //setLongitudAcciones(ordenTrabajoAcciones.length);
            console.log("Valores del formulario después del reset:", form.getValues());
          }
    }, [totalAccionesComponente, accion]);


    const borderColor = accion == "editar" ? 'border-green-500' : 'border-gray-200';

    

    return (
        <div>
            <div className="overflow-auto">
        <div className='flex h-[40px] items-center mb-[10px] bg-card rounded-sm'>
          <div className='h-[20px] w-full flex items-center justify-end'>
            <div className="mb-[10px] h-full w-full mx-4">
              {accion === "crear" && <p className="text-muted-foreground text-[20px]">Creando nueva orden de trabajo</p>}
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
                  accion == "editar" &&
                  <div onClick={handleAddComponent}>
                  <a title="Agregar nueva acción">
                    <IconButton>
                      <PlusCircledIcon className='w-[20px] h-[20px]' />
                    </IconButton>
                  </a>
                </div>
                }
                
                <div onClick={() => setAccion("editar")}>
                  <a title="Editar">
                    <IconButton>
                      <Pencil2Icon className="w-[20px] h-[20px]" />
                    </IconButton>
                  </a>
                </div>
              </>
            )}
          </div>
        </div>

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {totalAccionesComponente.map((accion, index) => (
                  <div key={accion.id}  className={`p-4 border ${borderColor} rounded-md`}>

                        <div className="flex items-center space-x-2">
                           
                           <div className="w-full">
                           <Controller
                                name={`orden_trabajo_cargos.${index.id}.id_concepto_catalogo`}
                                control={form.control}
                                render={({ field }) => (
                                    <ConceptosOrdenDeTrabajoComboBox form={form} field={field} name={`orden_trabajo_cargos.${index.id}.id_concepto_catalogo`} setCargoSeleccionado={setConceptoSeleccionado}/>

                                )}
                            />
                           </div>
                           
                            <FormMessage />
                            <Button type="button" onClick={() => handleRemoveComponent(accion.id)} variant="outline">
                                <TrashIcon className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                ))}
                <div className="flex justify-end">
                <Button type="submit">Guardar</Button>

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

export default CargosDeLaOrdenDeTrabajoForm;
