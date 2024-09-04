import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast"; //IMPORTACIONES TOAST
import { ToastAction } from "@/components/ui/toast"; //IMPORTACIONES TOAST
import EscogerOrdenDeTrabajoTable from "../Tables/Components/EscogerOrdenDeTrabajoTable";
import axiosClient from "../../axios-client";
import { ZustandGeneralUsuario } from "../../contexts/ZustandGeneralUsuario";
import { ZustandFiltrosOrdenTrabajo } from "../../contexts/ZustandFiltrosOt";
import { zustandOrdenTrabajoStore } from "../../contexts/ZustandOrdenesDeTrabajoUsuario";
import IconButton from "./IconButton";
import { TrashIcon } from "lucide-react";
import { MdOutlineCancel } from "react-icons/md";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form.tsx";
import { Input } from '../../components/ui/input.tsx';
import { Button } from "./button.tsx";
import Loader from "./Loader.tsx";
import { Textarea } from "./textarea.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cerrarOtSchema } from "../Forms/validaciones.ts";

const ModalRegistroOT = ({ isOpen, setIsOpen, method }) => {

  const { toast } = useToast();
  const {
    arregloCrearOrdenesDeTrabajo,
    setDataOrdenesDeTrabajoHistorialToma,
    detalleOrdenDeTrabajoTomaMonitor2, setLoadingTable, setDataOrdenDeTrabajoMonitor
  } = ZustandFiltrosOrdenTrabajo();

  const {
    usuariosEncontrados,
    setUsuariosEncontrados,
    idSeleccionadoGenerarOrdenDETrabajoToma,
  } = ZustandGeneralUsuario();

  const action = () => {
    method();
    setIsOpen(false);
  };

  const [consultaIdToma, setConsultaIdToma] = useState<Usuario | null>(null);
  const [idDeLaTomaParametro, setIdDeLaTomaParametro] = useState(0);

  type Usuario = {
    id: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    telefono: string;
    correo: string;
    curp: string;
    tomas?: tomas;
  };

  type tomas = {
    id: number;
    codigo_toma: string;
  };

  useEffect(() => {
    setConsultaIdToma(usuariosEncontrados[0]);
  }, [usuariosEncontrados]);

  const getOrdenDeTrabajoMonitor = async () => {
    setLoadingTable(true);
    try {
      const response = await axiosClient.get("OrdenTrabajo/NoAsignada");
      setLoadingTable(false);
      setDataOrdenDeTrabajoMonitor(response.data.data);
      console.log(response);
    } catch (error) {
      setLoadingTable(false);
      console.error("Failed to fetch orden:", error);
    }
  };

  const cancelarOrdenDeTrabajo = async () => {
    setLoadingTable(true);
    try {
      const response = await axiosClient.delete(
        `OrdenTrabajo/log_delete/${detalleOrdenDeTrabajoTomaMonitor2?.id}`
      );
      console.log(response);

      setLoadingTable(false);

      setIsOpen(false);

      toast({
        title: "¡Éxito!",
        description: "La orden de trabajo se ha cancelado correctamente",
        variant: "success",
      })
      getOrdenDeTrabajoMonitor();

    } catch (response) {
      console.log(response);
      toast({
        variant: "destructive",
        title: "Oh, no. Error",
        description: "No se pudo cancelar.",
        action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
      })
      setLoadingTable(false);

    }
  };

  const cerrarUnaOT = async () => {
    setLoadingTable(true);
    try {
      const response = await axiosClient.put(`OrdenTrabajo/cerrar`, values);
      console.log(response);

      setLoadingTable(false);

      setIsOpen(false);

      toast({
        title: "¡Éxito!",
        description: "La orden de trabajo se ha cancelado correctamente",
        variant: "success",
      })
      getOrdenDeTrabajoMonitor();

    } catch (response) {
      console.log(response);
      toast({
        variant: "destructive",
        title: "Oh, no. Error",
        description: "No se pudo cancelar.",
        action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
      })
      setLoadingTable(false);

    }
  };

  function onSubmit(values: z.infer<typeof cerrarOtSchema>) {
    console.log("valores ingresados", values);

    axiosClient.post(`/AnomaliasCatalogo/create`, values)
      .then((response) => {
        console.log(response);
      })
      .catch((response) => {
        console.log(response);
      });
  }

  const form = useForm<z.infer<typeof cerrarOtSchema>>({
    resolver: zodResolver(cerrarOtSchema),
    defaultValues: {
      id: 0,
      obervaciones: "",
      material_utilizado: "",
    },
  });

  const handleca = () =>
  {
    setIsOpen(false);

  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="max-w-[65vh]">
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="flex space-x-2">
              Cerrar orden de trabajo con accion de crear(prueba)
            </div>
          </AlertDialogTitle>

          <AlertDialogDescription>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-2">
                <FormField
                  control={form.control}
                  name="obervaciones"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Observaciones</FormLabel>
                      <FormControl>
                        <Input placeholder="Escribe tus observaciones" {...field} />
                      </FormControl>
                      <FormDescription>
                        Observaciones
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="material_utilizado"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Material utilizado</FormLabel>
                      <FormControl>
                        <Input placeholder="Material utilizado" {...field} />
                      </FormControl>
                      <FormDescription>
                        Agrega una breve descripción.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end">
                <Button type="submit" onClick={handleca}>Guardar</Button>

                  </div>
              </form>
            </Form>
          </AlertDialogDescription>
        </AlertDialogHeader>
       
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ModalRegistroOT;
