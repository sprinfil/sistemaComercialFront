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
import { Input } from "../../components/ui/input.tsx";
import { Button } from "./button.tsx";
import Loader from "./Loader.tsx";
import { Textarea } from "./textarea.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registroMedidotOtSchema } from "../Forms/validaciones.ts";
import { Switch } from "./switch.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const ModalRegistroOT = () => {
  const { toast } = useToast();
  const {
    arregloCrearOrdenesDeTrabajo,
    setDataOrdenesDeTrabajoHistorialToma,
    detalleOrdenDeTrabajoTomaMonitor2,
    setLoadingTable,
    setDataOrdenDeTrabajoMonitor,
    dataRegistroMedidorModalCerrarOT,
    isOpenHijoFormularioModalMonitorOT,
    setIsOpenHijoFormularioModalMonitorOT,
    setIsOpenHijoFormularioModalDetalleMonitorOT,setLoadingTableFiltrarOrdenDeTrabajoMasivas,setInformacionRecibidaPorFiltrosMonitorOrdenDeTrabajo
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
  let modelo =
    detalleOrdenDeTrabajoTomaMonitor2?.orden_trabajo_catalogo
      ?.orden_trabajo_accion[0]?.modelo;
  //aqui obtengo lo del modal anterIOR
  console.log(
    "informacion obtenida desde la variable",
    detalleOrdenDeTrabajoTomaMonitor2
  );


  const getOrdenDeTrabajoMonitor = async () => {
    setLoadingTableFiltrarOrdenDeTrabajoMasivas(true);
    try {
      const response = await axiosClient.get("OrdenTrabajo/NoAsignada");
      setLoadingTableFiltrarOrdenDeTrabajoMasivas(false);
      setInformacionRecibidaPorFiltrosMonitorOrdenDeTrabajo(response.data.data);
      console.log(response);
    } catch (error) {
      setLoadingTableFiltrarOrdenDeTrabajoMasivas(false);
      console.error("Failed to fetch orden:", error);
    }
  };

  console.log(detalleOrdenDeTrabajoTomaMonitor2);
  function onSubmit(values: z.infer<typeof registroMedidotOtSchema>) {
    console.log("valores ingresados", values);
    setLoadingTableFiltrarOrdenDeTrabajoMasivas(true);
    const values2 = {
      ordenes_trabajo: [{
        id: detalleOrdenDeTrabajoTomaMonitor2?.id,
        id_toma: detalleOrdenDeTrabajoTomaMonitor2?.id_toma,
        id_empleado_asigno:
          detalleOrdenDeTrabajoTomaMonitor2?.id_empleado_asigno,
        id_orden_trabajo_catalogo:
          detalleOrdenDeTrabajoTomaMonitor2?.id_orden_trabajo_catalogo,
        observaciones: dataRegistroMedidorModalCerrarOT?.obervaciones,
        material_utilizado:
          dataRegistroMedidorModalCerrarOT?.material_utilizado,
        genera_OT_encadenadas: false,
      }],
      modelos: {
        medidores: {
          numero_serie: values.numero_serie,
          marca: values.marca,
          diametro: values.diametro,
          tipo: values.tipo,
          estatus: values.estatus,
          fecha_instalacion: values.fecha_instalacion,
          lectura_inicial: values.lectura_inicial
        },
      },
    };

    console.log(values2);
    axiosClient
      .put(`/OrdenTrabajo/cerrar`, values2)
      .then((response) => {
        console.log(response);

        toast({
          title: "¡Éxito!",
          description: "La orden de trabajo se ha cerrado correctamente",
          variant: "success",
        });
        setIsOpenHijoFormularioModalMonitorOT(false);
        setIsOpenHijoFormularioModalDetalleMonitorOT(false);
        getOrdenDeTrabajoMonitor();
        setLoadingTableFiltrarOrdenDeTrabajoMasivas(false);

      })
      .catch((error) => {
        setLoadingTableFiltrarOrdenDeTrabajoMasivas(false);
        console.log(error);
        const errorMessage = error.response?.data.message || "No se pudo cancelar";
        toast({
          variant: "destructive",
          title: "Oh, no. Error",
          description: errorMessage,
          action: (
            <ToastAction altText="Try again">Intentar de nuevo</ToastAction>
          ),
        });
      });
  }

  const form = useForm<z.infer<typeof registroMedidotOtSchema>>({
    resolver: zodResolver(registroMedidotOtSchema),
    defaultValues: {
      id: 0,
      numero_serie: "",
      marca: "",
      diametro: "",
      tipo: "",
      estatus: true,
      fecha_instalacion: "",
      lectura_inicial: "",
    },
  });

  const cerrar = () => {
    setIsOpenHijoFormularioModalDetalleMonitorOT(false);
  };
console.log(isOpenHijoFormularioModalMonitorOT);
  return (
    <AlertDialog
      open={isOpenHijoFormularioModalMonitorOT}
      onOpenChange={setIsOpenHijoFormularioModalMonitorOT}
    >
      <AlertDialogContent className="max-w-[150vh] max-h-[90vh] overflow-auto p-16">
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="flex space-x-2">Registro de medidor</div>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5 mt-2"
              >
                <div className="mt-5">
                <FormField
                  control={form.control}
                  name="numero_serie"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número de serie</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Escribe el número de serie"
                          {...field}
                          type="number"
                        />
                      </FormControl>
                      <FormDescription>Número de serie</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                </div>
               
                <FormField
                  control={form.control}
                  name="marca"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Marca</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Escribe la marca del medidor"
                          {...field}
                        />
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
                      <FormLabel>Diámetro de la toma</FormLabel>
                      <FormControl>
                      <Select
                          onValueChange={(value) => field.onChange(value)}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona el diámetro de la toma" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="2 pulgadas">2"</SelectItem>
                            <SelectItem value="4 pulgadas">4"</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tipo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de medidor</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona el tipo de medidor" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="electromagnetico">
                              Electromagnético
                            </SelectItem>
                            <SelectItem value="digital">Digital</SelectItem>
                            <SelectItem value="mecanico">Mecánico</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lectura_inicial"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lectura inicial</FormLabel>
                      <FormControl>
                        <Input
                        type="number"
                          placeholder="Escribe la lectura inicial"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Escribe la lectura inicial
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="estatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="">Estatus</FormLabel>
                      <FormControl>
                        <Switch
                          className="ml-2"
                          checked={field.value}
                          onCheckedChange={(checked) => field.onChange(checked)}
                        />
                      </FormControl>
                      <FormDescription>Selecciona el estado.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fecha_instalacion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fecha de instalación</FormLabel>
                      <FormControl>
                        <input
                          type="datetime-local"
                          {...field}
                          className="shadcn-input p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ml-5"
                        />
                      </FormControl>
                      <FormDescription>
                        Selecciona la fecha de instalación.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-5">
                <AlertDialogCancel onClick={cerrar}>
                    Cancelar
                  </AlertDialogCancel>
                  <Button type="submit">
                    Guardar
                  </Button>
                 
                </div>
              </form>
            </Form>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalRegistroOT;
