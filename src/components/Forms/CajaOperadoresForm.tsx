import { useState, useEffect } from "react";
import logo from '../../img/logo.png';
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button.tsx";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form.tsx";
import { Input } from '../ui/input.tsx';
import { OrdenDeTrabajoCrearSchema } from "../../../components/Forms/OrdenDeTrabajoValidaciones.ts";
import { ModeToggle } from '../ui/mode-toggle.tsx';
import axiosClient from "../../axios-client.ts";
import Loader from "../ui/Loader.tsx";
import Error from "../ui/Error.tsx";
import { Textarea } from "../ui/textarea.tsx";
import { useStateContext } from "../../contexts/ContextCaja.tsx";
import { TrashIcon, Pencil2Icon, PlusCircledIcon } from '@radix-ui/react-icons';
import IconButton from "../ui/IconButton.tsx";
import { ComboBoxActivoInactivo } from "../../../components/ui/ComboBox.tsx";
import Modal from "../ui/Modal.tsx";
import ModalReactivacion from "../ui/ModalReactivación.tsx";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { Switch } from "../ui/switch.tsx";
import { ConceptosComboBoxNew } from "../ui/ConceptosComboBoxNew.tsx";
import OrdenDeTrabajoCargosTable from "../../../components/Tables/Components/OrdenDeTrabajoCargosTable.tsx";
import { OrdenDeTrabajoAplicacionComboBox } from "../../../components/ui/OrdenDeTrabajoAplicacionComboBox.tsx";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { ConceptosComboBox } from "../ui/ConceptosComboBox.tsx";
import { ZustandGeneralUsuario } from "../../contexts/ZustandGeneralUsuario.tsx";
import { ConceptosOrdenDeTrabajoComboBox } from "../../../components/ui/ConceptosOrdenDeTrabajoComboBox.tsx";
import { DisparaOtraOTComboBox } from "../ui/DisparaOtraOTComboBox.tsx";
import { Caja } from "../Tables/Columns/CajaColumns.tsx";
import { CajaComboBox } from "../ui/CajaComboBox.tsx";


const CajaOperadoresSchema = z.object({
    operadores_asignados: z.array(
        z.object({
            id_operador: z.number(),
        })
    ),
});

type CajaOperadores = z.infer<typeof CajaOperadoresSchema>;

const CajaOperadoresForm = () => {
    const { toast } = useToast();
    const { caja, setCaja, loadingTable, setLoadingTable, setCajas, setAccion, accion } = useStateContext();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [abrirInput, setAbrirInput] = useState(false);
    const [IdParaRestaurar, setIdParaRestaurar] = useState<number | null>(null);
    const [ModalReactivacionOpen, setModalReactivacionOpen] = useState(false);
    const [bloquear, setBloquear] = useState(false);
    const [cargoSeleccionado, setCargoSeleccionado] = useState<string | null>(null);
    const [nombreSeleccionado, setNombreSeleccionado] = useState<string | null>(null);
    const [aplicacionSeleccionada, setAplicacionSeleccionada] = useState<string | null>(null);
    const [cargosAgregados, setCargosAgregados] = useState<Caja[]>([]);
    const [aumentarAcciones, setAumentarAcciones] = useState(1);
    const [totalAccionesComponente, setTotalAccionesComponente] = useState<{id:number, id_operador:number}[]>([{ id: 0, id_operador: 0}]);
    const [conceptoSeleccionado, setConceptoSeleccionado] = useState<string | null>(null);
    const { idSeleccionadoConfiguracionOrdenDeTrabajo, accionGeneradaEntreTabs, setAccionGeneradaEntreTabs} = ZustandGeneralUsuario();
    const [control, setControl] = useState(false);
    const [nombreOperador, setNombreOperador] = useState([]);



    const handleAddComponent = () => {
        const newId = totalAccionesComponente.length > 0 
            ? Math.max(...totalAccionesComponente.map(({ id }) => id)) + 1 
            : 1;
    
        setTotalAccionesComponente(prevAcciones => [
            ...prevAcciones,
            { id: newId, id_operador: 0 }
        ]);
    };
    const handleRemoveComponent = (idToRemove: number) => {
        console.log("Eliminar cargo con ID:", idToRemove); // Verifica el ID
        setTotalAccionesComponente(prevAcciones => {
            const nuevasAcciones = prevAcciones.filter(({ id }) => id !== idToRemove);
            
            // Obtener los valores actuales del formulario
            const currentValues = form.getValues('operadores_asignados');
    
            // Filtrar y mapear solo los valores que no han sido eliminados
            const updatedValues = nuevasAcciones.map(item => {
                const existingValue = currentValues.find(value => value.id === item.id);
                return {
                    id: item.id,
                    id_operador: existingValue ? existingValue.id_operador : 0, // Mantiene el valor existente o establece 0
                };
            });
    
            // Resetea el formulario después de eliminar el componente
            form.setValue('operadores_asignados', updatedValues);
    
            return nuevasAcciones; // Devuelve el nuevo estado
        });
    };
    
    function successToastCreado() {
        toast({
            title: "¡Éxito!",
            description: "Se ha actualizado correctamente",
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


   

    
  const form = useForm<CajaOperadores>({
    resolver: zodResolver(CajaOperadoresSchema),
    defaultValues: {
        operadores_asignados: totalAccionesComponente.map(item => ({
        id_operador: item.id_operador || 0,
      })),
    },
  });
  useEffect(() => {
    if (accionGeneradaEntreTabs === "editar") {
        const valoresActuales = form.getValues('operadores_asignados');

        const nuevosValores = totalAccionesComponente.map(item => ({
            id_operador: item.id_operador || 0, // O el valor predeterminado adecuado
        }));



        // Combina los valores existentes con los nuevos
        const todosLosValores = [...valoresActuales, ...nuevosValores];

        console.log(todosLosValores);

        // Resetea el formulario con todos los valores
        form.reset({ operadores_asignados: todosLosValores });
    }
}, [totalAccionesComponente, accionGeneradaEntreTabs]);



    const onSubmit = async (values: CajaOperadores) => {
        console.log(values);

        
        const operadoresaEnviar = values.operadores_asignados.filter(item => item.id_operador !== 0).map(item => ({
            id_caja_catalogo: idSeleccionadoConfiguracionOrdenDeTrabajo,
            id_operador: item.id_operador
        }));

  
        console.log("Cargos:", operadoresaEnviar);


        const operadores_asignados = {
            operadores_asignados: operadoresaEnviar
        }

        

        console.log("valores enviados objeto", operadores_asignados);


        if (accionGeneradaEntreTabs === "editar") {
            try {
                const response = await axiosClient.post(`/cajas/asignarOperador`, operadores_asignados);
                const data = response.data;
                if (data.restore) {
                    setIdParaRestaurar(data.tipoToma_id);
                    setModalReactivacionOpen(true);
                } else if (data.restore === false) {
                    errorToast();
                    setLoading(false);
                } else {
                    setLoading(false);
                 
                    console.log(response);
                    getAnomalias();
                   
                    setAccionGeneradaEntreTabs("ver");
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
            const response = await axiosClient.get("/cajas/consultarCajas");
            setLoadingTable(false);
            setCajas(response.data);
            console.log(response.data);
        } catch (error) {
            setLoadingTable(false);
            errorToast();
            console.error("Failed to fetch anomalias:", error);
        }
    };

    const onDelete = async () => {
        try {
            await axiosClient.delete(`/TipoToma/log_delete/${caja.id}`);
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

        const verOperadores = Array.isArray(caja.operadorAsignado)
        ? caja?.operadorAsignado?.map(item => ({
            id: item.id,
            id_operador: item.id_operador,
        }))
        : [];
        
        console.log(verOperadores);
 
        const nombreOperadores = caja?.operadorAsignado?.map(operador => operador?.operador?.nombre);

        console.log(nombreOperadores);
            setNombreOperador(nombreOperadores);
        if (accionGeneradaEntreTabs === "eliminar") {
            setAbrirInput(false);
            setControl(false);

            return;
        }
    
        if (accionGeneradaEntreTabs === "crear" || accionGeneradaEntreTabs === "creado") {
            setAbrirInput(true);
            setControl(false);
            setErrors({});
           


        }
    
        if (accionGeneradaEntreTabs === "ver" || accionGeneradaEntreTabs === "editar") {
            setAbrirInput(true);
            setErrors({});
    
            // Transformación de datos para el formulario
            const verOperadores = Array.isArray(caja.operadorAsignado) ?
                caja.operadorAsignado.map(item => ({
                    id: item.id,
                    id_operador: item.id_operador,
                })) : [];
    
            // Manejo de la acción "ver"
            if (accionGeneradaEntreTabs === "ver") {
                setControl(true);
                form.reset({
                    operadores_asignados: verOperadores
                });
            }
    
            // Manejo de la acción "editar"
            if (accionGeneradaEntreTabs === "editar") {
                setControl(false);
                form.reset({
                    operadores_asignados: verOperadores
                });
            }
    
            // Actualización del estado si los datos cambiaron
            if (JSON.stringify(verOperadores) !== JSON.stringify(totalAccionesComponente)) {
                setTotalAccionesComponente(verOperadores);
            }
    
            console.log("Estos son los operadores:", verOperadores);
            console.log("Valores del formulario después del reset:", form.getValues());
        }
    }, [accionGeneradaEntreTabs, caja, idSeleccionadoConfiguracionOrdenDeTrabajo,form]);
    
    


    const borderColor = accionGeneradaEntreTabs == "editar" ? 'border-green-500' : 'border-border';

    console.log("a ver que datos manda el form", form.getValues());
    console.log(totalAccionesComponente);

    return (
        <div>
            <div className="overflow-auto">
                <div className='flex h-[40px] items-center mb-[10px] bg-muted rounded-sm'>
                    <div className='h-[20px] w-full flex items-center justify-end'>
                        <div className="mb-[10px] h-full w-full mx-4">
                            {caja?.nombre_caja && <p className="text-muted-foreground text-[20px]">{caja?.nombre_caja}</p>}
                        </div>
                        {caja?.nombre_caja && (
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
                                        <a title="Agregar nuevo operador">
                                            <IconButton>
                                                <PlusCircledIcon className='w-[20px] h-[20px]' />
                                            </IconButton>
                                        </a>
                                    </div>
                                }

                                <div onClick={() => setAccionGeneradaEntreTabs("editar")}>
                                    <a title="Actualizar operadores">
                                        <IconButton>
                                            <Pencil2Icon className="w-[20px] h-[20px]" />
                                        </IconButton>
                                    </a>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                {totalAccionesComponente?.length < 1 
                && 
                <div className="flex justify-center mt-[20vh]">
                     {accionGeneradaEntreTabs == "editar" ? <p className="text-muted-foreground text-[20px]">Agrega uno o más operadores.</p> : 
              <p className="text-muted-foreground text-[20px]">Sin operadores.</p>
             }

                    </div>
                }



                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {totalAccionesComponente.map((accion, index) => {
                                console.log(totalAccionesComponente);
                            return (
                                <div key={accion.id} className={`p-4 border ${borderColor} rounded-md`}>
                                     <div className="text-sm font-medium mb-3">
                                        Selecciona un operador
                                        </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-full">
                                         {accionGeneradaEntreTabs == "editar" ? 
                                           <Controller
                                           name={`operadores_asignados.${index}.id_operador`}
                                           control={form.control}
                                           render={({ field }) => (

                                       
                                               <CajaComboBox form={form} field={field} name={`operadores_asignados.${index}.id_operador`} setCargoSeleccionado={setConceptoSeleccionado} disabled={control}/>
                                           )}
                                       />
                                        
                                        :
                                        
                                        <Controller
                                        name={`operadores_asignados.${index}.id_operador`}
                                        control={form.control}
                                        render={({ field: { value, ...rest } }) => ( // Desestructuramos field
                                          <Input
                                            readOnly
                                            placeholder=""
                                            value={nombreOperador[index] || ""} // Usa el nombre del concepto aquí
                                            {...rest} // Pasa el resto de las props sin incluir value
                                          />
                                        )}
                                      />

                                        }
                                          
                                        </div>
                                        <FormMessage />
                                        {accionGeneradaEntreTabs == "editar"
                                        &&
                                        <Button type="button" onClick={() => handleRemoveComponent(accion.id)} variant="outline">
                                        <TrashIcon className="w-4 h-4" />
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

export default CajaOperadoresForm;
