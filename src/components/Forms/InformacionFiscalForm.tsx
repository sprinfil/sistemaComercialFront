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

const InformacionFiscalForm = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [abrirInput, setAbrirInput] = useState(false);

  const form = useForm<z.infer<typeof informacionficalSchema>>({
    resolver: zodResolver(informacionficalSchema),
    defaultValues: {
      id: 0,
      nombre: "",
      apellidopaterno: "",
      apellidomaterno: "",
      telefono: "",
      curp: "",
      rfc: "",
      correo: "",
    },
  });

  async function onSubmit(values: z.infer<typeof informacionficalSchema>) {
    setLoading(true);
    setErrors({});
    console.log(values);
    try {
      const response = await axiosClient.post(
        "/ruta/del/api/crear-usuario",
        values
      );
      console.log("Usuario creado:", response.data);
      // Aquí puedes realizar alguna acción adicional, como redirigir al usuario o mostrar un mensaje de éxito
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        setErrors({ general: "Ocurrió un error al crear el usuario" });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="overflow-auto w-full ">
      <div className="flex h-[40px] items-center mb-[10px] bg-card rounded-sm">
        <div className="h-[20px] w-full flex items-center justify-end">
          <div className="mb-[10px] h-full w-full mx-4">
            <p className="text-[20px] font-medium">Información Fiscal</p>
          </div>
        </div>
      </div>
      <div className="py-[20px] px-[10px] w-full ">
        <Form {...form}>
            <div className="py-[50px] px-[10px] flex gap-2 w-full mb-5 rounded-md border border-border">
                <div className="w-[50%]">
                <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Regimen fiscal</FormLabel>
                        <FormControl>
                        <Input readOnly placeholder="Regimen fiscal" {...field} />
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
                    name="nombre"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Razon social</FormLabel>
                        <FormControl>
                        <Input readOnly placeholder="Razon social" {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                </div>
            </div>
            <div className="grid grid-cols-3 gap-1 bg-red-600 mb-5">
                
            </div>
            <div className="py-[50px] px-[10px] flex gap-2 w-full mb-5 rounded-md border border-border">
                <div className="w-[50%] ">
                <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Pais</FormLabel>
                        <FormControl>
                        <Input readOnly placeholder="Pais" {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Municipio</FormLabel>
                        <FormControl>
                        <Input readOnly placeholder="Municipio" {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Colonia</FormLabel>
                        <FormControl>
                        <Input readOnly placeholder="Colonia" {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Referencia</FormLabel>
                        <FormControl>
                        <Input readOnly placeholder="Referencia" {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Codigo postal</FormLabel>
                        <FormControl>
                        <Input readOnly placeholder="Codigo postal" {...field} />
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
                    name="nombre"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Estado</FormLabel>
                        <FormControl>
                        <Input readOnly placeholder="Estado" {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Localidad</FormLabel>
                        <FormControl>
                        <Input readOnly placeholder="Localidad" {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Calle</FormLabel>
                        <FormControl>
                        <Input readOnly placeholder="Calle" {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Numero exterior</FormLabel>
                        <FormControl>
                        <Input readOnly placeholder="Numero exterior" {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                </div>
            </div>
            <div className="grid grid-cols-3 gap-1  rounded-md border border-border ">
                <div className="py-[40px] px-[10px]  mb-5">
                <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input readOnly placeholder="Nombre" {...field} />
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
                    name="nombre"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Teléfono</FormLabel>
                        <FormControl>
                        <Input readOnly placeholder="Teléfono" {...field} />
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
                    name="nombre"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Correo</FormLabel>
                        <FormControl>
                        <Input readOnly placeholder="Correo" {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                </div>
            </div>
        </Form>
      </div>
    </div>
  );
};

export default InformacionFiscalForm;
