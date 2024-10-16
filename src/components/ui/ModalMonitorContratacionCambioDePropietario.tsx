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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form.tsx";
import { OperadoresOtIndividualComboBox } from "./OperadoresOtIndividualComboBox.tsx";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cambioPropietarioSchema } from "../Forms/validaciones.ts";
import { z } from "zod";
import { Button } from "./button.tsx";
import AsignarOrdenDeTrabajoTable from "../Tables/Components/AsignarOrdenDeTrabajoTable.tsx";
import { ZustandFiltrosOrdenTrabajo } from "../../contexts/ZustandFiltrosOt.tsx";
import AsignarOrdenDeTrabajoIndividualEnDetalleUsuarioTable from "../Tables/Components/AsignarOrdenDeTrabajoIndividualEnDetalleUsuarioTable.tsx";
import { MdDeleteOutline } from "react-icons/md";
import IconButton from "./IconButton.tsx";
import { FaUserEdit } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaTools } from "react-icons/fa";
import MarcoForm from "./MarcoForm.tsx";
import MarcoFormModalContratoMonitor from "./MarcoFormModalContratoMonitor.tsx";
import { ZustandFiltrosContratacion } from "../../contexts/ZustandFiltrosContratacion.tsx";
import { UsuariosComboBox } from "./UsuariosComboBox.tsx";
import { BuscarUsuarioForm } from "../../views/Usuarios/Contratos/FormsContratos/BuscarUsuarioForm.tsx";
import { RiUserSearchFill } from "react-icons/ri";

import { ZustandGeneralUsuario } from "../../contexts/ZustandGeneralUsuario";
import { Input } from "./input.tsx";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
const ModalMonitorContratacionCambioDePropietario = ({ selected_contrato }) => {
  const { toast } = useToast();
  
  const {setDataMonitorContratos,  setLoadingTableMonitorContrato, setBoolModalContratacionCambioDeNombre, 
    boolModalContratacionCambioDeNombre, setControlModalMonitorContratacionClick} =  ZustandFiltrosContratacion();

  console.log(selected_contrato);

  const [operadorSeleccionado, setOperadorSeleccionado] = useState();
  const {usuariosEncontrados, setUsuariosEncontrados, mostrarUsuarioCambioPropietario, setMostrarUsuarioCambioPropietario} = ZustandGeneralUsuario();


console.log(usuariosEncontrados[0]?.id);

console.log(selected_contrato?.id);





const form = useForm<z.infer<typeof cambioPropietarioSchema>>({
  resolver: zodResolver(cambioPropietarioSchema),
  defaultValues: {
      id: 0,
      nombre_contrato: "",
  },
})




const fetch_contratos = async () => {
  //setLoadingTableMonitorContrato(true);
  try {
    const response = await axiosClient.get("/contratos");
    //setLoadingTableMonitorContrato(false);
    setDataMonitorContratos(response.data.contrato);
    console.log(response.data.contrato);
  } catch (error) {
    //setLoadingTableMonitorContrato(false);
    console.error("Failed to fetch contratos:", error);
  }
}


async function onSubmit(values: z.infer<typeof cambioPropietarioSchema>) {
  const values2 = {
    id: selected_contrato?.id,
    nombre_contrato: values.nombre_contrato,
    id_usuario: usuariosEncontrados[0]?.id,
  };

  const contrato = {
    contrato: values2
  }
  
  console.log(contrato);

  try {
    const response = await axiosClient.put('contratos/cambio_nombre', contrato);

    const mensaje = response.data.message;
    setControlModalMonitorContratacionClick(false);
    toast({
      title: '¡Éxito!',
      description: mensaje,
      variant: 'success',
    });

    fetch_contratos();
    setBoolModalContratacionCambioDeNombre(false);
    console.log(response);
  } catch (error) {
    console.error('Error eliminando el contrato:', error);

    toast({
      variant: 'destructive',
      title: 'Oh, no. Error',
      description: 'Algo salió mal.',
      action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
    });
  }
}

console.log(usuariosEncontrados[0]?.id);
console.log(usuariosEncontrados.length);
  // Función para manejar el cierre del modal
  const handleCloseModal = () => {
    setBoolModalContratacionCambioDeNombre(false);
    setControlModalMonitorContratacionClick(false);
    setUsuariosEncontrados([]);
    setMostrarUsuarioCambioPropietario(false);
    
  };

  const consultarOtroUsuario = () => {
    setMostrarUsuarioCambioPropietario(false);
    setUsuariosEncontrados([]);

  }

  useEffect(() => {
    // Limpiar usuarios cuando el modal se cierre
    if (!boolModalContratacionCambioDeNombre) {
      setUsuariosEncontrados([]);
    }
  }, [boolModalContratacionCambioDeNombre]);


  return (
    <AlertDialog open={boolModalContratacionCambioDeNombre} onOpenChange={setBoolModalContratacionCambioDeNombre}>
      <AlertDialogContent className="max-w-screen-2xl max-h-screen overflow-auto">
        <AlertDialogHeader>
        <div className="flex justify-between items-center">
        <div className="">
          <span className="text-lg">Cambio de propietario</span>
        </div>
        
        <div className="flex-shrink-0">
          <div className="w-[5vh]">
          <IconButton onClick={consultarOtroUsuario}>
            <RiUserSearchFill className="w-[3vh]" />
            </IconButton>
          </div>
         
        </div>
      </div>
          <AlertDialogTitle></AlertDialogTitle>
          <AlertDialogDescription> 
            <div className="overflow-x-auto">
              <div className="min-w-full">
                {mostrarUsuarioCambioPropietario  ?
                <>
                <Table className="mt-5">
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow>
        <TableHead >Código de usuario</TableHead>
          <TableHead >Nombre</TableHead>
          <TableHead>Teléfono</TableHead>
          <TableHead>Correo</TableHead>
          <TableHead>CURP</TableHead>
          <TableHead>RFC</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
      
          <TableRow >
            <TableCell>{usuariosEncontrados[0]?.codigo_usuario}</TableCell>
            <TableCell>{usuariosEncontrados[0]?.nombre_completo}</TableCell>
            <TableCell>{usuariosEncontrados[0]?.telefono}</TableCell>
            <TableCell >{usuariosEncontrados[0]?.correo}</TableCell>
            <TableCell>{usuariosEncontrados[0]?.curp}</TableCell>

            <TableCell>{usuariosEncontrados[0]?.rfc}</TableCell>

          </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
  
        </TableRow>
      </TableFooter>
    </Table>
              
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="ml-2 max-w-[188vh] mt-5">
                  <FormField
                                control={form.control}
                                name="nombre_contrato"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nombre</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Escribe el nombre del contrato" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            El nombre del contrato.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                  </div>
                      
                             <Button type="submit">Guardar</Button>
                                </form>
                                </Form>
                </>
             
              :
              <BuscarUsuarioForm
              botonCrearUsuario={false}/>
              }
              
              </div>

            </div>

          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCloseModal}>
            Cancelar
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalMonitorContratacionCambioDePropietario;
