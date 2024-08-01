import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../components/ui/button.tsx";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form.tsx";
import { Input } from "../../components/ui/input.tsx";
import { informacionficalSchema } from "./informacionFiscalValidaciones.ts";
import axiosClient from "../../axios-client.ts";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import IconButton from "../ui/IconButton.tsx";
import { Pencil2Icon } from "@radix-ui/react-icons";
import MarcoForm from "../ui/MarcoForm.tsx";
import Loader from "../ui/Loader.tsx";
import { ZustandGeneralUsuario } from "../../contexts/ZustandGeneralUsuario.tsx";

const InformacionFiscalForm = () => {
  const { toast } = useToast();
  const [mostrarTooltip, setMostrarTooltip] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [abrirInput, setAbrirInput] = useState(false);
  const [datosFiscalesDesplegados, setdatosFiscalesDesplegados] = useState({});
  const {usuariosEncontrados, setUsuariosEncontrados} = ZustandGeneralUsuario();

  // #region SUCCESSTOAST
  function successToastCreado() {
    toast({
      title: "¡Éxito!",
      description: "Acción realizada correctamente",
      variant: "success",
    });
  }

  // Funcion de errores para el Toast
  function errorToast() {
    toast({
      variant: "destructive",
      title: "Oh, no. Error",
      description: "Algo salió mal.",
      action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
    });
  }

  const form = useForm<z.infer<typeof informacionficalSchema>>({
    resolver: zodResolver(informacionficalSchema),
    defaultValues: {
      id: 0,
      id_modelo: "0",
      modelo: "usuario",
      regimen_fiscal: "",
      razon_social: "",
      pais: "",
      estado: "",
      municipio: "",
      localidad: "",
      colonia: "",
      calle: "",
      referencia: "",
      numero_exterior: "",
      codigo_postal: "",
      nombre: "",
      telefono: "",
      correo: "",
    },
  });


  function onSubmit(values: z.infer<typeof informacionficalSchema>) {
    console.log(values);
    const { getValues } = form;

    if (!getValues("id")) {
      axiosClient.post(`/datos_fiscales/create`, values)
        .then((response) => {
          const data = response.data;
          successToastCreado();
        })
        .catch((err) => {
          const response = err.response;
          errorToast();
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
          setLoading(false);
        })
    } else {
      axiosClient.put(`/datos_fiscales/update/${getValues("id")}`, values)
        .then((response) => {
          const data = response.data;
          successToastCreado();
          setAbrirInput(false)
        })
        .catch((err) => {
          const response = err.response;
          errorToast();
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
          setLoading(false);
        })
    }
  }
  const { setValue } = form;

  useEffect(() => {
    // Función para obtener los datos de la base de datos
    let values = {
      "modelo": "usuario",
      "id_modelo": usuariosEncontrados.id,
    };

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axiosClient.get(`/datos_fiscales/showPorModelo`, {
          params: values

        });
        const data = response.data;
        setLoading(false);
        // Actualiza los valores del formulario con los datos obtenidos
        setValue("id", data.id);
        setValue("modelo", "usuario");
        setValue("id_modelo", String(data.id_modelo));
        setValue("regimen_fiscal", data.regimen_fiscal);
        setValue("razon_social", data.razon_social);
        setValue("pais", data.pais);
        setValue("estado", data.estado);
        setValue("municipio", data.municipio);
        setValue("localidad", data.localidad);
        setValue("colonia", data.colonia);
        setValue("calle", data.calle);
        setValue("referencia", data.referencia);
        setValue("numero_exterior", data.numero_exterior);
        setValue("codigo_postal", data.codigo_postal);
        setValue("nombre", data.nombre);
        setValue("telefono", data.telefono);
        setValue("correo", data.correo);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [usuariosEncontrados.id, setValue]);


  // #region HANDLE

  const handleClickEditar = () => {
    setAbrirInput(true); // Cambia abrirInput a true cuando se hace clic en editar
  };

  const handleCancelar = () => {
    setAbrirInput(false); // Cambia el estado para desactivar los campos
    form.reset(); // Limpia el formulario
  };

  const handleMouseEnter = () => {
    setMostrarTooltip(true);
  };

  const handleMouseLeave = () => {
    setMostrarTooltip(false);
  };

  // #endregion

  return (
    <div className="overflow-auto w-full">
      <div className="flex h-[40px] items-center mb-[10px] bg-card rounded-sm">
        <div className="flex-1">
          <p className="text-[20px] font-medium mx-4">Información Fiscal</p>
        </div>
        <div
          className="relative"
          onClick={handleClickEditar}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <IconButton>
            <Pencil2Icon className="w-[20px] h-[20px]" />
          </IconButton>
          {mostrarTooltip && (
            <span className="absolute top-[30px] left-1 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 text-xs rounded">
              Modificar
            </span>
          )}
        </div>
      </div>
      <div className="py-[20px] px-[10px] w-full">
      {loading && <Loader/>}
        {
          !loading &&
          <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <MarcoForm title={"Datos fiscales"}>
              <FormField
                control={form.control}
                name="regimen_fiscal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Régimen fiscal</FormLabel>
                    <FormControl>
                      <Input readOnly={!abrirInput} placeholder="Régimen fiscal" {...field} set />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="razon_social"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Razón social</FormLabel>
                    <FormControl>
                      <Input readOnly={!abrirInput} placeholder="Razón social" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </MarcoForm>

            <MarcoForm title={"Datos de domicilio"}>
              <FormField
                control={form.control}
                name="pais"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>País</FormLabel>
                    <FormControl>
                      <Input readOnly={!abrirInput} placeholder="País" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="estado"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <FormControl>
                      <Input readOnly={!abrirInput} placeholder="Estado" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="municipio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Municipio</FormLabel>
                    <FormControl>
                      <Input readOnly={!abrirInput} placeholder="Municipio" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="localidad"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Localidad</FormLabel>
                    <FormControl>
                      <Input readOnly={!abrirInput} placeholder="Localidad" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="colonia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Colonia</FormLabel>
                    <FormControl>
                      <Input readOnly={!abrirInput} placeholder="Colonia" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="calle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Calle</FormLabel>
                    <FormControl>
                      <Input readOnly={!abrirInput} placeholder="Calle" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="referencia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Referencia</FormLabel>
                    <FormControl>
                      <Input readOnly={!abrirInput} placeholder="Referencia" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="numero_exterior"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número exterior</FormLabel>
                    <FormControl>
                      <Input readOnly={!abrirInput} placeholder="Número exterior" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="codigo_postal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código postal</FormLabel>
                    <FormControl>
                      <Input readOnly={!abrirInput} placeholder="Código postal" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </MarcoForm>

            <MarcoForm title={"Informacion de contacto"}>
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input readOnly={!abrirInput} placeholder="Nombre" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="telefono"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input readOnly={!abrirInput} placeholder="Teléfono" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="correo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input readOnly={!abrirInput} placeholder="Correo electrónico" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </MarcoForm>
               
            <div className="flex space-x-4 mt-7">
              {abrirInput && <Button type="submit">Guardar</Button>}
              {abrirInput && <Button onClick={handleCancelar} type="button" variant={"destructive"}>Cancelar</Button>}
            </div>
          </form>
        </Form>
        }
       
      </div>
    </div>
  );
};

export default InformacionFiscalForm;
