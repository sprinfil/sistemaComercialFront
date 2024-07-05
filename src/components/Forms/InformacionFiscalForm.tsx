import { useState } from "react";
import logo from "../../img/logo.png";
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
import { ModeToggle } from "../../components/ui/mode-toggle.tsx";
import axiosClient from "../../axios-client.ts";
import Loader from "../../components/ui/Loader.tsx";
import Error from "../../components/ui/Error.tsx";
import { Textarea } from "../ui/textarea.tsx";
import { useEffect } from "react";
import { TrashIcon, Pencil2Icon, PlusCircledIcon } from "@radix-ui/react-icons";
import IconButton from "../ui/IconButton.tsx";
import { ComboBoxActivoInactivo } from "../ui/ComboBox.tsx";
import Modal from "../ui/Modal.tsx";


const InformacionFiscalForm = ({ userId }) => {
  const [mostrarTooltip, setMostrarTooltip] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [abrirInput, setAbrirInput] = useState(false);
  const [userData, setUserData] = useState(null);
  const [accion, setAccion] = useState(null);

  const form = useForm<z.infer<typeof informacionficalSchema>>({
    resolver: zodResolver(informacionficalSchema),
    defaultValues: {
      id: 0,
      regimenfiscal: "",
      razonsocial: "",
      pais: "",
      estado: "",
      municipio: "",
      colonia: "",
      referencia: "",
      codigopostal: "",
      localidad: "",
      calle:"",
      numeroexterior:"",
      nombre:"",
      telefono:"",
      correoelectronico:"",
    },
  });
  
  
  
  // Función para obtener los detalles del usuario
  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get(`/ruta/del/api/usuario/${userId}`);
      setUserData(response.data); // Actualiza el estado con los datos del usuario
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
      setLoading(false);
    }
  };
  // Función para actualizar los detalles del usuario
  const updateUserDetails = async (formData) => {
    setLoading(true);
    try {
      const response = await axiosClient.put(`/ruta/del/api/actualizar-usuario/${userId}`, formData);
      console.log("Detalles del usuario actualizados:", response.data);
      // Puedes realizar acciones adicionales aquí, como mostrar un mensaje de éxito o redirigir al usuario
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        setErrors({ general: "Ocurrió un error al actualizar los detalles del usuario" });
      }
      setLoading(false);
    }
  };

  const onSubmit = async (formData) => {
    try {
      await form.trigger(); // Dispara validación
      if (form.getValues()) {
        await updateUserDetails(formData); // Actualiza los detalles del usuario
        console.log(formData)
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

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


  return (
    <div className="overflow-auto w-full  ">
      <div className="flex h-[40px] items-center mb-[10px] bg-card rounded-sm ">
        <div className="flex-1">
          <p className="text-[20px] font-medium mx-4">Información Fiscal</p>
        </div>
          <div className="relative" onClick={handleClickEditar} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            
              <IconButton>
                  <Pencil2Icon className="w-[20px] h-[20px]" />
              </IconButton>
              {mostrarTooltip && (
              <span className="absolute top-[30px] left-1 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 text-xs rounded">
                Modificar
              </span>)}
          </div>
      </div>
      <div className="py-[20px] px-[10px] w-full ">
        <Form {...form }>
            <div className="py-[40px] px-[10px] flex gap-2 w-full mb-5 rounded-md border border-border  relative">
            <span className="absolute -top-3 left-2 bg-white px-2 text-gray-500 text-xs">Datos fiscales</span>
                <div className="w-[50%]">
                <FormField
                    control={form.control}
                    name="regimenfiscal"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Régimen fiscal</FormLabel>
                        <FormControl>
                        <Input readOnly={!abrirInput} placeholder="Régimen fiscal" {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                </div>
                <div className="w-[50%]">
                <FormField
                    control={form.control}
                    name="razonsocial"
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
                </div>
            </div>
            
            <div className="py-[40px] px-[10px] flex gap-2 w-full mb-5 rounded-md border border-border relative">
            <span className="absolute -top-3 left-2 bg-white px-2 text-gray-500 text-xs">Datos de domicilio</span>
                <div className="w-[50%] ">
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
                        <FormLabel>Colomia</FormLabel>
                        <FormControl>
                        <Input readOnly={!abrirInput} placeholder="Colonia" {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                </div>
                <div className="w-[50%] ">
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
                    name="numeroexterior"
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
                    name="codigopostal"
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
                </div>
            </div>
            <div className="grid grid-cols-3 gap-1  rounded-md border border-border relative">
            <span className="absolute -top-3 left-2 bg-white px-2 text-gray-500 text-xs">Datos de contacto</span>
                <div className="py-[40px] px-[10px]  mb-5">
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
                </div>
                <div className="py-[40px] px-[10px]  mb-5">
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
                </div>
                <div className="py-[40px] px-[10px]  mb-5">
                    <FormField
                    control={form.control}
                    name="correoelectronico"
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
                </div>
            </div>
            <div className="flex space-x-4 mt-7">
              {abrirInput && <Button type="submit">Guardar</Button>}
              {abrirInput && <Button onClick={handleCancelar} type="submit">Cancelar</Button>}
            </div>
        </Form>
      </div>
    </div>
  );
};

export default InformacionFiscalForm;
