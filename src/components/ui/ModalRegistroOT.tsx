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
import { registroMedidotOtSchema } from "../Forms/validaciones.ts";

const ModalRegistroOT = ({ isOpen, setIsOpen, method }) => {

  const { toast } = useToast();
  const {
    arregloCrearOrdenesDeTrabajo,
    setDataOrdenesDeTrabajoHistorialToma,
    detalleOrdenDeTrabajoTomaMonitor2, setLoadingTable, setDataOrdenDeTrabajoMonitor, dataRegistroMedidorModalCerrarOT
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


  console.log(detalleOrdenDeTrabajoTomaMonitor2?.id);
  let modelo = detalleOrdenDeTrabajoTomaMonitor2?.orden_trabajo_catalogo?.orden_trabajo_accion[0]?.modelo;
  //aqui obtengo lo del modal anterIOR
  console.log("informacion obtenida desde la variable", detalleOrdenDeTrabajoTomaMonitor2);

  function onSubmit(values: z.infer<typeof registroMedidotOtSchema>) {
    console.log("valores ingresados", values);
    const values2 = {
      orden_trabajo:
      {
        id: detalleOrdenDeTrabajoTomaMonitor2?.id,
        id_empleado_asigno:  detalleOrdenDeTrabajoTomaMonitor2?.id_empleado_asigno,
        id_orden_trabajo_catalogo: detalleOrdenDeTrabajoTomaMonitor2?.id_orden_trabajo_catalogo,
        observaciones: dataRegistroMedidorModalCerrarOT?.obervaciones,
        material_utilizado: dataRegistroMedidorModalCerrarOT?.material_utilizado,
        genera_OT_encadenadas: false
      },
      modelos:
      {
        "medidores": 
        {
          numero_serie: values.numero_serie, 
          marca: values.marca,
          diametro: values.diametro,
          tipo: values.tipo,

        }
      }
    }
    
    console.log(values2);
    axiosClient.put(`/OrdenTrabajo/cerrar`, values2)
      .then((response) => {
        console.log(response);
        
      toast({
        title: "¡Éxito!",
        description: "La orden de trabajo se ha cancelado correctamente",
        variant: "success",
      })

      })
      .catch((response) => {
        console.log(response);
        toast({
          variant: "destructive",
          title: "Oh, no. Error",
          description: "No se pudo cancelar.",
          action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
        })
      });
  }

  const form = useForm<z.infer<typeof registroMedidotOtSchema>>({
    resolver: zodResolver(registroMedidotOtSchema),
    defaultValues: {
      id: 0,
      numero_serie: "",
      marca: "",
      diametro: "",
      tipo: ""
    },
  });

  const handleca = () =>
  {
    setIsOpen(false);

  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="max-w-[120vh]">
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="flex space-x-2">
              Registro de medidor 
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-2">
                <FormField
                  control={form.control}
                  name="numero_serie"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Numero de serie</FormLabel>
                      <FormControl>
                        <Input placeholder="Escribe el numero de serie" {...field} />
                      </FormControl>
                      <FormDescription>
                        Numero de serie
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="marca"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Marca</FormLabel>
                      <FormControl>
                        <Input placeholder="Escribe la marca del medidor" {...field} />
                      </FormControl>
                      <FormDescription>
                       Escribe la marca del medidor 
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="diametro"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Diametro</FormLabel>
                      <FormControl>
                        <Input placeholder="Escribe el diametro " {...field} />
                      </FormControl>
                      <FormDescription>
                       Escribe el diametro
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                  <FormField
                  control={form.control}
                  name="tipo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo</FormLabel>
                      <FormControl>
                        <Input placeholder="Escribe el tipo " {...field} />
                      </FormControl>
                      <FormDescription>
                       Escribe el tipo
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
