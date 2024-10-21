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
import ComboBoxCargosCargables from "./ComboBoxCargosCargables.tsx";

const ModalMonitorContratacionCotizacionAlcantarilladoSaneamiento = ({ selected_contrato, open, setOpen }) => {
  const { toast } = useToast();
  
  const {boolModalCotizacionMonitor, setBoolModalCotizacionMonitor, MonitorsetDataMonitorContratos,  setLoadingTableMonitorContrato, setBoolModalContratacionCambioDeNombre, 
    boolModalContratacionCambioDeNombre, setControlModalMonitorContratacionClick, tarifaDeContratoActual} =  ZustandFiltrosContratacion();

  console.log(selected_contrato);

  const [operadorSeleccionado, setOperadorSeleccionado] = useState();
  const {usuariosEncontrados, } = ZustandGeneralUsuario();


console.log(usuariosEncontrados[0]?.id);

console.log(selected_contrato?.toma?.id_tipo_toma);



const [cargoSeleccionado, setCargoSeleccionado] = useState();
const [monto, setMonto] = useState(''); // Estado para el monto
const [tipoToma, setTipoToma] = useState(selected_contrato?.toma?.id_tipo_toma);
const [deshabilitarInput, setDeshabilitatInput] = useState();
const [deshabilitarInput2, setDeshabilitatInput2] = useState();
const [conceptoEnviar, setConceptoEnviar] = useState([]);
const [piezas, setPiezas] = useState(1);

const handlePiezasChange = (event) => {
  setPiezas(event.target.value);
};


const form = useForm<z.infer<typeof cambioPropietarioSchema>>({
  resolver: zodResolver(cambioPropietarioSchema),
  defaultValues: {
      id: 0,
      nombre_contrato: "",
  },
})


function onSubmit(values: z.infer<typeof cambioPropietarioSchema>) 
{

  const values3 = {
    id_contrato: selected_contrato?.id, // Asegúrate de que este valor sea el ID correcto del contrato
    cotizacion_detalle: conceptoEnviar.map((item) => {
      const tarifaCorrespondiente = item.tarifas.find(
        (tarifa) => tarifa.id_tipo_toma === tipoToma
      );
  
      // Multiplica el monto por la cantidad de piezas
      const montoCalculado = tarifaCorrespondiente
        ? tarifaCorrespondiente.monto * piezas
        : 1; // Asegúrate de tener un valor por defecto si tarifaCorrespondiente es undefined
  
      return {
        id_sector: 2,
        id_concepto: item.id,
        monto: montoCalculado, // Aquí usamos el monto calculado
      };
    }),
  };
  
  console.log(values3);
  

      axiosClient.post(`contratos/cotizacion/detalle/create`, values3)
          .then((response) => {
              
            console.log(response);
            toast({
              title: "¡Éxito!",
              description: "La cotización se ha creado correctamente.",
              variant: "success",
      
          })
          setBoolModalCotizacionMonitor(false);
          setOpen(false);
          })
          .catch((err) => {
             console.log(err);
             const errorMessage = err.response?.data?.message || "Algo salió mal.";
             toast({
               variant: "destructive",
               title: "Oh, no. Error",
               description: errorMessage,
               action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
           })
           setBoolModalCotizacionMonitor(false);

          })
  
}
const agregrarConcepto = () => {
  // Si cargoSeleccionado es un objeto, conviértelo en un array si es necesario
  const nuevosConceptos = Array.isArray(cargoSeleccionado) ? cargoSeleccionado : [cargoSeleccionado];

  if(!cargoSeleccionado)
  {
    toast({
      variant: "destructive",
      title: "Oh, no. Error",
      description: "Selecciona un concepto",
      action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
  })
  }
  else
  {
    setConceptoEnviar(prevConceptos => [...prevConceptos, ...nuevosConceptos]);
  }

};

useEffect(() => {
  console.log('cargoSeleccionado:', cargoSeleccionado);
}, [cargoSeleccionado]);


useEffect(() => {
  if (cargoSeleccionado && cargoSeleccionado?.tarifas && tipoToma) {
    // tarifa dependiendo el tipo de toma
    
    const tarifaCorrespondiente = cargoSeleccionado.tarifas.find(tarifa => tarifa.id_tipo_toma === tipoToma);
    
    if (tarifaCorrespondiente) {
      setMonto(tarifaCorrespondiente.monto); 
    }
  }
  if(cargoSeleccionado?.pide_monto == 0)
  {
    setDeshabilitatInput(true);
  }

  if(!cargoSeleccionado)
  {
    setDeshabilitatInput(true);
  }
}, [cargoSeleccionado, tipoToma]);

// Función para eliminar un concepto
const eliminarConcepto = (index: number) => {
  setConceptoEnviar(prevConceptos => prevConceptos.filter((_, i) => i !== index));
};

  // Función para manejar el cierre del modal
  const handleCloseModal = () => {
    setBoolModalContratacionCambioDeNombre(false);
    setControlModalMonitorContratacionClick(false);
    setBoolModalCotizacionMonitor(false);
    setOpen(false);
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="max-w-screen-2xl max-h-screen overflow-auto">
        <AlertDialogHeader>
          <div className="flex justify-between items-center">
            {/* Título al principio */}
            <div className="flex">
              <span className="text-lg">Cotización contrato de alcantarillado y saneamiento.</span>
            </div>
            
            
         </div>
          <AlertDialogTitle></AlertDialogTitle>
          <AlertDialogDescription> 
            <div className="max-h-[50vh]">
            <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
                                control={form.control}
                                name="nombre_contrato"
                                render={({ field }) => (
                                    <FormItem>
                                      <div className="flex space-x-2 justify-center">
                                      <div className="text-lg text-black">Precio del contrato de alcantarillado y saneamiento:</div>
                                   <div className="mt-2 mb-2">
                                   {tarifaDeContratoActual.monto}
                                    </div> 
                                        </div>
                                   
                                        <FormLabel>Selecciona un cargo si es necesario.</FormLabel>
                                        <FormControl>
                                          <>
                                          {
                                        cargoSeleccionado?.pide_monto == 1 ?
                                            <>
                                                <p className='text-[14px] m-1 text-blue-500'>Monto Variable</p>
                                            </>
                                            :
                                            <>
                                                <p className='text-[14px] m-1 text-red-500'>Monto Fijo</p>
                                            </>
                                     }

                                          <div className="flex space-x-2 w-full items-center">
                                            {/* ComboBox para seleccionar cargos */}
                                            <div className="flex-1 w-[50px]">
                                              <ComboBoxCargosCargables set={setCargoSeleccionado} />
                                            </div>

                                            {/* Input para el monto */}
                                            <div className="w-[150px] mb-3">
                                              <input
                                                type="number"
                                                className="bg-background border p-2 mt-2 w-full rounded-md outline-none"
                                                placeholder="Monto"
                                                value={monto}
                                                disabled={deshabilitarInput}
                                                onChange={(e) => setMonto(e.target.value)}
                                              />
                                            </div>

                                            {/* Input para las piezas */}
                                            <div className="w-[150px] mb-3">
                                            <input
                                              type="number"
                                              className="bg-background border p-2 mt-2 w-full rounded-md outline-none"
                                              placeholder="Piezas"
                                              value={piezas} // El valor del input está asociado al estado
                                              onChange={handlePiezasChange} // Actualiza el estado cuando el valor cambia
                                            />
                                            </div>

                                            {/* Botón Agregar */}
                                            <Button onClick={agregrarConcepto}  type="button">Agregar</Button>
                                          </div>
                                                                                      
                                          <div className="max-h-[50vh]  p-2">


                                            <div>
                                              {conceptoEnviar.length > 0 ? (
                                                conceptoEnviar.map((item, index) => {
                                                  // Filtra la tarifa correspondiente según tu lógica
                                                  const tarifaCorrespondiente = item?.tarifas?.find(tarifa => tarifa.id_tipo_toma === tipoToma);

                                                  return (
                                                    <div key={index} className="mt-5 flex flex-col space-y-2">
                                                    <div className="flex space-x-2 overflow-auto max-h-[10vh]">
                                                      <div className="text-xl text-black">Nombre del cargo:</div>
                                                      <div className="mt-[5px] text-base">{item?.nombre}</div>
                                                    </div>
                                                  
                                                    <div className="flex justify-between items-center">
                                                      <div className="flex space-x-2">
                                                        <div className="text-xl text-black">Monto:</div>
                                                        <div className="mt-[5px] text-base">
                                                          {tarifaCorrespondiente ? (tarifaCorrespondiente.monto * piezas) : 'No disponible'}
                                                        </div>
                                                      </div>
                                                  
                                                      <div className="flex items-center">
                                                        <IconButton onClick={() => eliminarConcepto(index)} aria-label="Eliminar concepto">
                                                          <MdDeleteOutline className="w-[30px] h-[30px] text-red-500 mb-2" /> {/* Ajusta el tamaño aquí */}
                                                        </IconButton>
                                                      </div>
                                                    </div>
                                                  
                                                    <hr className="border-t border-border my-1 mt-2" />
                                                  </div>
                                                      
                                                      
                                                    
                                                  );
                                                })
                                              ) : (
                                                <p></p>
                                              )}
                                            </div>
                                            </div>

                                          </>
                                     

                                        </FormControl>
                                        <FormDescription>
                                            Selecciona un cargo si es necesario.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                    
                    <div className="mb-5">
                    <div className="mt-5 flex space-x-2">
                    <Button type="submit" >Guardar</Button>

          <AlertDialogCancel onClick={handleCloseModal}>
            Cancelar
          </AlertDialogCancel>
          </div>
     </div>
                 
                </form>
                        </Form>
            </div>
        

          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalMonitorContratacionCotizacionAlcantarilladoSaneamiento;
