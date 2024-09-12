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

import { ZustandGeneralUsuario } from "../../contexts/ZustandGeneralUsuario";
import { Input } from "./input.tsx";
import { ConceptosComboBox } from "./ConceptosComboBox.tsx";
import { ConceptosComboBoxCotizacion } from "./ConceptosComboBoxCotizacion.tsx";

const ModalMonitorContratacionCotizacionAgua = ({ selected_contrato }) => {
  const { toast } = useToast();
  
  const {boolModalCotizacionMonitor, setBoolModalCotizacionMonitor, MonitorsetDataMonitorContratos,  setLoadingTableMonitorContrato, setBoolModalContratacionCambioDeNombre, boolModalContratacionCambioDeNombre, setControlModalMonitorContratacionClick} =  ZustandFiltrosContratacion();

  console.log(selected_contrato);

  const [operadorSeleccionado, setOperadorSeleccionado] = useState();
  const {usuariosEncontrados, } = ZustandGeneralUsuario();


console.log(usuariosEncontrados[0]?.id);

console.log(selected_contrato?.id);


const [cargoSeleccionado, setCargoSeleccionado] = useState();


const form = useForm<z.infer<typeof cambioPropietarioSchema>>({
  resolver: zodResolver(cambioPropietarioSchema),
  defaultValues: {
      id: 0,
      nombre_contrato: "",
  },
})


function onSubmit(values: z.infer<typeof cambioPropietarioSchema>) 
{
  

      axiosClient.post(`/AnomaliasCatalogo/create`, values2)
          .then((response) => {
              
            console.log(response);
          })
          .catch((err) => {
             console.log(err);
          })
  
}




  // Función para manejar el cierre del modal
  const handleCloseModal = () => {
    setBoolModalContratacionCambioDeNombre(false);
    setControlModalMonitorContratacionClick(false);
  };
  return (
    <AlertDialog open={boolModalCotizacionMonitor} onOpenChange={setBoolModalCotizacionMonitor}>
      <AlertDialogContent className="max-w-screen-2xl max-h-screen overflow-auto">
        <AlertDialogHeader>
          <div className="flex justify-between items-center">
            {/* Título al principio */}
            <div className="flex">
              <span className="text-lg">Cotizacion contrato de agua</span>
            </div>
            
            
         </div>
          <AlertDialogTitle></AlertDialogTitle>
          <AlertDialogDescription> 
          <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
                                control={form.control}
                                name="nombre_contrato"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Contrato de agua.</FormLabel>
                                        <FormControl>
                                          <>
                                          <div className="flex space-x-2">
                                            <div className="w-[150vh]">
                                            <ConceptosComboBoxCotizacion form={form} field={field} name="nombre_contrato" setCargoSeleccionado={setCargoSeleccionado}/>

                                            </div>
                                          <Button>Agregar concepto</Button>
                                          </div>
                                       
                                          </>
                                     

                                        </FormControl>
                                        <FormDescription>
                                            Selecciona un concepto si es necesario.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                    
                    
                  <Button type="submit">Guardar</Button>
                </form>
                        </Form>

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

export default ModalMonitorContratacionCotizacionAgua;
