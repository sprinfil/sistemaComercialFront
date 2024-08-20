import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axiosClient from "../../../axios-client.ts";
import { Button } from '../../../components/ui/button.tsx';
import { Input } from '../../../components/ui/input.tsx';
import { useStateContext } from "../../../contexts/ContextOrdenDeTrabajo.tsx";
import { useToast } from "../../../components/ui/use-toast"; 
import Modal from "../../../components/ui/Modal.tsx";
import ModalReactivacion from "../../../components/ui/ModalReactivación.tsx";
import Error from "../../../components/ui/Error.tsx";
import { TrashIcon, Pencil2Icon, PlusCircledIcon } from '@radix-ui/react-icons';
import IconButton from "../../../components/ui/IconButton.tsx";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import MarcoForm from "../../../components/ui/MarcoForm.tsx";
import { ToastAction } from "@/components/ui/toast"; //IMPORTACIONES TOAST
import MarcoAccionesForm from "../../../components/ui/MarcoAccionesForm.tsx";

import { ZustandGeneralUsuario } from "../../../contexts/ZustandGeneralUsuario.tsx";

const OrdenDeTrabajoAccionesSchema = z.object({
  acciones: z.array(
    z.object({
      id: z.number().min(0),
      id_orden_trabajo_catalogo:  z.string(),
      accion: z.string().nonempty("Acción es requerida"),
      modelo: z.string().nonempty("Modelo es requerido"),
      campo: z.string().nonempty("Campo es requerido"),
    })
  ),
});

type OrdenDeTrabajoAcciones = z.infer<typeof OrdenDeTrabajoAccionesSchema>;

const OrdenDeTrabajoAccionesForm = () => {
  const { toast } = useToast();
  const { ordenDeTrabajo, setOrdenDeTrabajo, loadingTable, setLoadingTable, setOrdenDeTrabajos, setAccion, accion } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [abrirInput, setAbrirInput] = useState(false);
  const [IdParaRestaurar, setIdParaRestaurar] = useState<number | null>(null);
  const [ModalReactivacionOpen, setModalReactivacionOpen] = useState(false);
  const [totalAccionesComponente, setTotalAccionesComponente] = useState<{ id: number }[]>([{ id: 0 }]);
  const [aumentarAcciones, setAumentarAcciones] = useState(1);
  const [control2, setControl2] = useState(false);
  const {idSeleccionadoConfiguracionOrdenDeTrabajo} = ZustandGeneralUsuario();



    //#region SUCCESSTOAST
    function successToastCreado() {
        toast({
            title: "¡Éxito!",
            description: "La anomalía se ha creado correctamente",
            variant: "success",

        })
    }
    function successToastEditado() {
        toast({
            title: "¡Éxito!",
            description: "La anomalía  se ha editado correctamente",
            variant: "success",

        })
    }
    function successToastEliminado() {
        toast({
            title: "¡Éxito!",
            description: "La anomalía  se ha eliminado correctamente",
            variant: "success",

        })
    }
    function successToastRestaurado() {
        toast({
            title: "¡Éxito!",
            description: "La anomalía  se ha restaurado correctamente",
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
    function errorYaExisteToast() {

        toast({
            variant: "destructive",
            title: "Oh, no. Error",
            description: "La anomalía ya existe.",
            action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
        })
    }








  const form = useForm<OrdenDeTrabajoAcciones>({
    resolver: zodResolver(OrdenDeTrabajoAccionesSchema),
    defaultValues: {
      acciones: totalAccionesComponente.map(item => ({
        id: item.id,
        id_orden_trabajo_catalogo: "",
        accion: "",
        modelo: "",
        campo: "",
      })),
    },
  });

  const { control, handleSubmit, reset } = form;

  const onSubmit = async (values: OrdenDeTrabajoAcciones) => {
    console.log('Datos del formulario:', values);

    if (accion === "editar") {
      try {
        const response = await axiosClient.put(`/OrdenTrabajoCatalogo/create/acciones`, values);
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
          reset({
            acciones: totalAccionesComponente.map(item => ({
              id: item.id,
              accion: "",
              modelo: "",
              campo: "",
            })),
          });
          setAccion("creado");
          getAnomalias();
          successToastCreado();
        }
      } catch (err) {
        errorToast();
        console.log(err.response);
        setLoading(false);
      }
    }

    if (accion === "hola") {
      try {
        const response = await axiosClient.put(`/TipoToma/update/${ordenDeTrabajo.id}`, values);
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
    } catch (error) {
      setLoadingTable(false);
      errorToast();

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

    }
  };

  const restaurarDato = async (IdParaRestaurar: number) => {
    try {
      await axiosClient.put(`/TipoToma/restore/${IdParaRestaurar}`);
      setLoading(false);
      setAbrirInput(false);
      setAccion("crear");
      setOrdenDeTrabajo({
        id: 0,
        nombre: "",
        descripcion: "ninguna",
        estado: "activo"
      });
      getAnomalias();
      setAccion("creado");
      successToastRestaurado();
      setModalReactivacionOpen(false);
    } catch (err) {
        errorToast();
      setLoading(false);
    }
  };

  useEffect(() => {
    reset({
      acciones: totalAccionesComponente.map(item => ({
        id: item.id,
        id_orden_trabajo_catalogo: 0,
        accion: "",
        modelo: "",
        campo: "",
      })),
    });
  }, [totalAccionesComponente, reset]);

  useEffect(() => {
    if (accion === "eliminar") {
      setControl2(false);
      setAbrirInput(false);
    }
    if (accion === "crear" || accion === "creado") {
      setControl2(false);
      setAbrirInput(true);
      setErrors({});
      setOrdenDeTrabajo({
        id: 0,
        nombre: "",
        descripcion: "ninguna",
      });
    }
    if (accion === "ver") {
      setControl2(false);
      setAbrirInput(false);
      setErrors({});
      setAccion("");
      reset({
        acciones: totalAccionesComponente.map(item => ({
          id: item.id,
          accion: "",
          modelo: "",
          campo: "",
        })),
      });
    }
    if (accion === "editar") {
      setAbrirInput(true);
      setControl2(true);
      setErrors({});
    }
  }, [accion, reset, totalAccionesComponente]);

  const handleAddComponent = () => {
    setTotalAccionesComponente(prevAcciones => [
      ...prevAcciones,
      { id: aumentarAcciones }
    ]);
    setAumentarAcciones(aumentarAcciones + 1);
  };

  const handleRemoveComponent = (idToRemove: number) => {
    setTotalAccionesComponente(prevAcciones =>
      prevAcciones.filter(({ id }) => id !== idToRemove)
    );
  };

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
        
          <div className=''>
        
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
              {totalAccionesComponente.map((item, index) => (
                
                <div key={item.id}  className={`p-4 border ${borderColor} rounded-md`}>
                
                    <div className="flex justify-end mb-5">
                    <button type="button" onClick={() => handleRemoveComponent(item.id)}><TrashIcon className="w-[2.5vh] h-[2.5vh]"/></button>

                        </div>
                    
                    <div className="w-full grid grid-cols-2 gap-10 mb-10">
                    <Controller
                    name={`acciones.${index}.accion`}
                    control={control}
                    render={({ field }) => (

                      

                      
                                 <Select
                                        onValueChange={(value) => field.onChange((value))}
                                        value={(field.value)}
                                        >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona una acción" />
                                        </SelectTrigger>
                                        <SelectContent>
                                        <SelectItem value="registrar">Registrar</SelectItem>
                                        <SelectItem value="modificar">Modificar</SelectItem>
                                        <SelectItem value="quitar">Quitar</SelectItem>
                                        </SelectContent>
                                    </Select>
                    )}
                  />
                  <Controller
                    name={`acciones.${index}.modelo`}
                    control={control}
                    render={({ field }) => (
                        <Select
                        onValueChange={(value) => field.onChange((value))}
                        value={(field.value)}
                        >
                        <SelectTrigger>
                            <SelectValue placeholder="Selecciona un modelo" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="tomas">Tomas</SelectItem>
                        <SelectItem value="medidor">Medidor</SelectItem>
                        <SelectItem value="contratos">Contratos</SelectItem>
                        <SelectItem value="usuario">Usuario</SelectItem>

                        </SelectContent>
                    </Select>
                    )}
                  />
                    </div>
                    <div className="w-full">
                    <Controller
                    name={`acciones.${index}.campo`}
                    control={control}
                    render={({ field }) => (
                        <Select
                        onValueChange={(value) => field.onChange((value))}
                        value={(field.value)}
                        >
                        <SelectTrigger>
                            <SelectValue placeholder="Selecciona un campo" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="estatus">Estatus</SelectItem>
                        <SelectItem value="tipo_contratacion">Tipo de contratación</SelectItem>
                        </SelectContent>
                    </Select>
                    )}
                  />
                    </div>
                </div>
              ))}
              <div className="col-span-full flex justify-end">
                {accion == "editar" && 
                <Button type="submit" isLoading={loading}>
                  {accion === "crear" ? "Crear" : "Actualizar"}
                </Button>}
                
              </div>
              
            </form>
           
          </div>
        
        {ModalReactivacionOpen && (
          <ModalReactivacion
            isOpen={ModalReactivacionOpen}
            onClose={() => setModalReactivacionOpen(false)}
            onConfirm={() => restaurarDato(IdParaRestaurar!)}
          />
        )}
        {errors && <Error errors={errors} />}
      </div>
    </div>
  );
};

export default OrdenDeTrabajoAccionesForm;
