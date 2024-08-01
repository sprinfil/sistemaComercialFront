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
import { informaciongeneralSchema } from "./informacionGeneralValidaciones.ts";
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
import { useLocation } from 'react-router-dom';
import MarcoForm from "../ui/MarcoForm.tsx";
import { ZustandGeneralUsuario } from "../../contexts/ZustandGeneralUsuario.tsx";
const InformacionGeneralForm = () => {

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [abrirInput, setAbrirInput] = useState(false);

  const location = useLocation();
  const {usuariosEncontrados, setUsuariosEncontrados} = ZustandGeneralUsuario();

  const form = useForm<z.infer<typeof informaciongeneralSchema>>({
    resolver: zodResolver(informaciongeneralSchema),
    defaultValues: {
        id: usuariosEncontrados.id || '',
        nombre: usuariosEncontrados.nombre || '',
        apellidopaterno: usuariosEncontrados.apellido_paterno || '',
        apellidomaterno: usuariosEncontrados.apellido_materno || '',
        telefono: usuariosEncontrados.telefono || '',
        curp: usuariosEncontrados.curp || '',
        rfc: usuariosEncontrados.rfc || '',
        correo: usuariosEncontrados.correo || '',
    },
  });

  useEffect(() => {
    if (usuariosEncontrados.length > 0) {
      const usuario = usuariosEncontrados[0]; // Obten el primer usuario del arreglo
      form.reset({
        id: usuario.id || '',
        nombre: usuario.nombre || '',
        apellidopaterno: usuario.apellido_paterno || '',
        apellidomaterno: usuario.apellido_materno || '',
        telefono: usuario.telefono || '',
        curp: usuario.curp || '',
        rfc: usuario.rfc || '',
        correo: usuario.correo || '',
      });
    }
  }, [usuariosEncontrados, form]);

  async function onSubmit(values: z.infer<typeof informaciongeneralSchema>) {
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
    <div className="overflow-auto w-full h-[88vh]">
      <div className="flex h-[40px] items-center mb-[10px] bg-card rounded-sm">
        <div className="h-[20px] w-full flex items-center justify-end">
          <div className="mb-[10px] h-full w-full mx-4">
            <p className="text-[20px] font-medium">Información principal</p>
          </div>
        </div>
      </div>
      <div className="py-[20px] px-[10px] w-full">

        <Form {...form}>
          <form className=" flex gap-2">

            <MarcoForm title={"Información Principal"}>


              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre completo</FormLabel>
                    <FormControl>
                      <Input readOnly placeholder="Nombre" {...field} />
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
                    <FormLabel>Telefono</FormLabel>
                    <FormControl>
                      <Input
                        readOnly
                        className=""
                        placeholder="telefono"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="curp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CURP</FormLabel>
                    <FormControl>
                      <Input
                        readOnly
                        className=""
                        placeholder="CURP"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />



              <FormField
                control={form.control}
                name="rfc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>RFC</FormLabel>
                    <FormControl>
                      <Input
                        readOnly
                        className=""
                        placeholder="RFC"
                        {...field}
                      />
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
                    <FormLabel>Correo electronico</FormLabel>
                    <FormControl>
                      <Input
                        readOnly
                        className=""
                        placeholder="Correo electronico"
                        {...field}
                        type="email"
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </MarcoForm>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default InformacionGeneralForm;
