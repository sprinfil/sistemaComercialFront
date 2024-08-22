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


//SE CREA EL SCHEMA. El schema tiene un nombre definido, para que funcione con el form se crea un array.
const OrdenDeTrabajoAccionesSchema = z.object({
  orden_trabajo_accion: z.array(
    z.object({
      id: z.number().min(0),
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
  const [totalAccionesComponente, setTotalAccionesComponente] = useState<{ id: number, accion: string, campo: string, modelo: string }[]>([{ id: 0, accion: "", campo: "", modelo: "" }]);
  const [aumentarAcciones, setAumentarAcciones] = useState(1);
  const [control2, setControl2] = useState(false);
  const { idSeleccionadoConfiguracionOrdenDeTrabajo, accionGeneradaEntreTabs, setAccionGeneradaEntreTabs } = ZustandGeneralUsuario();
  const [longitudAcciones, setLongitudAcciones] = useState<number>(0);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  console.log("esta es la accion generada", accionGeneradaEntreTabs);

  //#region SUCCESSTOAST
  function successToastCreado() {
    toast({
      title: "¡Éxito!",
      description: "Las acciones se han agregado correctamente",
      variant: "success",

    })
  }
  function successToastEditado() {
    toast({
      title: "¡Éxito!",
      description: "Las acciones se han editado correctamente",
      variant: "success",

    })
  }
  function successToastEliminado() {
    toast({
      title: "¡Éxito!",
      description: "Las acciones se han eliminado correctamente",
      variant: "success",

    })
  }
  function successToastRestaurado() {
    toast({
      title: "¡Éxito!",
      description: "Las acciones se han restaurado correctamente",
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








  //en los valores por default, utilizo una varible que recorre las propiedades, esta variable
  //incrementa cuando le doy click al boton de agregar.
  const form = useForm<OrdenDeTrabajoAcciones>({
    resolver: zodResolver(OrdenDeTrabajoAccionesSchema),
    defaultValues: {
      orden_trabajo_accion: totalAccionesComponente.map(item => ({
        id: item.id,
        accion: "",
        modelo: "",
        campo: "",
      })),
    },
  });

  const { control, handleSubmit, reset } = form;

  const onSubmit = async (values: OrdenDeTrabajoAcciones) => {

    // COMO OCUPO MANDARLE EL OBJETO orden_trabajo_accion
    //Agarramos los valores del form, lo recorremos, y accedemos a sus propiedades
    //COMO ES UN ARREGLO PUEDE SER 1 O MAS, y le metemos el id del catalogo(que es aparte del form)
    const valoresAcciones = values.orden_trabajo_accion.map(accion => ({
      id: accion.id,
      accion: accion.accion,
      modelo: accion.modelo,
      campo: accion.campo,
      id_orden_trabajo_catalogo: idSeleccionadoConfiguracionOrdenDeTrabajo
    }));

    // Crear el objeto que necesitamos enviarle y le metemos las acciones
    const orden_trabajo_accion = {
      orden_trabajo_accion: valoresAcciones
    };

    console.log('Objeto para enviar:', orden_trabajo_accion);

    if (accionGeneradaEntreTabs === "editar") {
      try {
        const response = await axiosClient.put(`/OrdenTrabajoCatalogo/create/acciones`, orden_trabajo_accion);
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
            orden_trabajo_accion: totalAccionesComponente.map(item => ({
              id: item.id,
              accion: item.accion,
              modelo: item.modelo,
              campo: item.modelo,
            })),
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
      await axiosClient.delete(`/TipoToma/log_delete/${idSeleccionadoConfiguracionOrdenDeTrabajo}`);
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
    if (accionGeneradaEntreTabs === "eliminar") {
      setControl2(false);
      setAbrirInput(false);
    }
    if (accionGeneradaEntreTabs === "crear" || accionGeneradaEntreTabs === "creado") {
      setControl2(false);
      setAbrirInput(true);
      setErrors({});
      setOrdenDeTrabajo({
        id: 0,
        nombre: "",
        descripcion: "ninguna",
      });
    }
    if (accionGeneradaEntreTabs === "ver") {
      setControl2(false);
      setAbrirInput(false);
      setErrors({});
      setAccion("");

      console.log("entro");

      //PARA DESPLEGAR LA INFORMACIÓN EXISTE UN OBJETO(ordenDeTrabajo), al seleccionar
      //LA FILA, CONSULTA LA INFORMACIÓN Y LA GUARDA EN ESE OBJETO, ese objeto de consulta
      //cuenta con varios objetos adentro, se le tienen que agregar.
      //validamos si es un array si no, lo devuelve como array vacío para que no nos de problemas el react

      //recorremos el array, y le asignamos sus propiedades

      const ordenTrabajoAcciones = Array.isArray(ordenDeTrabajo.orden_trabajo_accion) ?
        ordenDeTrabajo.orden_trabajo_accion.map(item => ({

          id: item.id,
          accion: item.accion,
          modelo: item.modelo,
          campo: item.campo,
        })) : [];

      //una vez recorrido reseteamos el formulario. que viene siendo el objeto orden_trabajo_accion
      //con sus propiedades.
      reset({
        orden_trabajo_accion: ordenTrabajoAcciones,

      });

      setIsDataLoaded(true); // Marca los datos como cargados


      setTotalAccionesComponente(ordenTrabajoAcciones)
      setLongitudAcciones(ordenTrabajoAcciones.length);
      console.log("ESTLO DEBERIA OBNTENER AL RECORRER EL ARREGLO:", ordenTrabajoAcciones);
      console.log("Valores del formulario después del reset:", form.getValues());
    }


    if (accionGeneradaEntreTabs === "editar") {
      setAbrirInput(true);
      setControl2(true);
      setErrors({});
    }

  }, [accion, reset, idSeleccionadoConfiguracionOrdenDeTrabajo]);




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

  const borderColor = accionGeneradaEntreTabs == "editar" ? 'border-green-500' : 'border-gray-200';
  console.log("esto se le mete al objeto total acciones", JSON.stringify(totalAccionesComponente));
  console.log("esto es lo que recibe al final", form.getValues());

  useEffect(() => {
    if (totalAccionesComponente.length > 0) {
      reset({ orden_trabajo_accion: totalAccionesComponente });
    }
  }, [totalAccionesComponente, reset]);

  return (
    <div>
      <div className="overflow-auto">
        <div className='flex h-[40px] items-center mb-[10px] bg-card rounded-sm'>
          <div className='h-[20px] w-full flex items-center justify-end '>
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
                  <a title="Modificar acciones">
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
          {totalAccionesComponente.length < 1
            &&
            <div className="flex justify-center mt-[20vh]">
              <p className="text-muted-foreground text-[20px]">Sin acciones</p>

            </div>
          }
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            {totalAccionesComponente.map((item, index) => (

              <div key={item.id} className={`p-4 border ${borderColor} rounded-md`}>

                <div className="flex justify-end mb-5">
                  <button type="button" onClick={() => handleRemoveComponent(item.id)}>
                    <a title="Borrar acción">
                      <TrashIcon className="w-[2.5vh] h-[2.5vh]" />
                    </a>
                  </button>

                </div>
      
                <div className="w-full flex space-x-2" >
                  <div>
                  <div className="text-sm font-medium mb-2">
                  Selecciona una acción.
                </div>
                  <div className="w-[65vh]">
                    <Controller
                      name={`orden_trabajo_accion.${index}.accion`}
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
                  </div>
                  </div>
              


                  <div className="w-full">
                    <div className="text-sm font-medium mb-2">
                      Selecciona un modelo.
                    </div>
                    <Controller
                      name={`orden_trabajo_accion.${index}.modelo`}
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
                            <SelectItem value="toma">Tomas</SelectItem>
                            <SelectItem value="medidor">Medidor</SelectItem>
                            <SelectItem value="contratos">Contratos</SelectItem>
                            <SelectItem value="usuario">Usuario</SelectItem>

                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>

                </div>
                <div className="w-full mt-5">
                  <div className="text-sm font-medium mb-2">
                    Selecciona un campo.
                  </div>
                  <Controller
                    name={`orden_trabajo_accion.${index}.campo`}
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
              {accionGeneradaEntreTabs == "editar" &&
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
