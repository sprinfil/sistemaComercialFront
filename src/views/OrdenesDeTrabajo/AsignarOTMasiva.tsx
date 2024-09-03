import React, { useState, useEffect } from 'react';
import AsignarOrdenDeTrabajoTable from '../../components/Tables/Components/AsignarOrdenDeTrabajoTable';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { OperadoresOtIndividualComboBox } from '../../components/ui/OperadoresOtIndividualComboBox';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { Button } from '../../components/ui/button';
import FiltrosAsignarOTMasiva from './FiltrosAsignarOTMasiva';
import OrdenDeTrabajoCrearTomasTable from '../../components/Tables/Components/OrdenDeTrabajoCrearTomasTable';
import { OrdenDeTrabajoAsignarIndividualSchema } from '../../components/Forms/OrdenDeTrabajoValidaciones';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form.tsx";
import { z } from "zod";
import axiosClient from '../../axios-client.ts';
import { FaSearch } from "react-icons/fa";
import { ModalMasFiltros } from '../../components/ui/ModalMasFiltros.tsx';
import IconButton from '../../components/ui/IconButton.tsx';
import { ZustandGeneralUsuario } from '../../contexts/ZustandGeneralUsuario.tsx';
import { useToast } from "@/components/ui/use-toast"; //IMPORTACIONES TOAST
import { ToastAction } from "@/components/ui/toast"; //IMPORTACIONES TOAST
import AsignarOrdenDeTrabajoMasivamenteTable from '../../components/Tables/Components/AsignarOrdenDeTrabajoMasivamenteTable.tsx';
import { ZustandFiltrosOrdenTrabajo } from '../../contexts/ZustandFiltrosOt';


export const AsignarOTMasiva = () => {

  const { toast } = useToast()

  const [selectedAction, setSelectedAction] = useState('');
  const { usuariosEncontrados, idSeleccionadoTomaAsignacionOT, controlTablaOperadorOTIndividual } = ZustandGeneralUsuario();
  const [operadorSeleccionado, setOperadorSeleccionado] = useState("");
  const { isAsignadaChecked, setIsAsignadaChecked, isNoAsignadaChecked, setIsNoAsignadaChecked,
    setInformacionRecibidaPorFiltros, informacionRecibidaPorFiltros, arregloOrdenesDeTrabajoParaAsignarAOperador, arregloAsignarIndividualTomaAOperador} = ZustandFiltrosOrdenTrabajo();



  const form = useForm<z.infer<typeof OrdenDeTrabajoAsignarIndividualSchema>>({
    resolver: zodResolver(OrdenDeTrabajoAsignarIndividualSchema),
    defaultValues: {
      id: 0,
      id_empleado_encargado: 0
    },
  })


  useEffect(() => {
    if (selectedAction) {
      console.log(`Acción seleccionada: ${selectedAction}`);
    }
  }, [selectedAction]);



  console.log("INFORMACION A MANDARRRRRRR", arregloOrdenesDeTrabajoParaAsignarAOperador);


  const handleSelectChange = (value) => {
    setSelectedAction(value);
  };


  //#region TOAST

  function successToastCreado() {
    toast({
      title: "¡Éxito!",
      description: "La orden de trabajo se ha asignado correctamente",
      variant: "success",

    })
  }
  //Funcion de errores para el Toast
  function errorToast() {

    toast({
      variant: "destructive",
      title: "Oh, no. Error",
      description: "Algo salió mal.",
      action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
    })


  }

  //#endregion


  //METODO PARA ASIGNAR INDIVIDUALMENTE LA OT
  function onSubmitIndividual(values: z.infer<typeof OrdenDeTrabajoAsignarIndividualSchema>) {

    const values2 = {
      id: idSeleccionadoTomaAsignacionOT || arregloAsignarIndividualTomaAOperador,
      id_empleado_encargado: values.id_empleado_encargado
    }

    const ordenes_trabajo = {
      ordenes_trabajo: [values2]
    }

    console.log(ordenes_trabajo)

    try {

      const response = axiosClient.put('/OrdenTrabajo/update', ordenes_trabajo)
      console.log(response);
      successToastCreado();

    }
    catch (response) {
      console.log(response);
      errorToast();
    }
  };

  //METODO PARA ASIGNAR INDIVIDUALMENTE LA OT
  function onSubmitMasiva(values: z.infer<typeof OrdenDeTrabajoAsignarIndividualSchema>) {


    const values2 = arregloOrdenesDeTrabajoParaAsignarAOperador.map((item) => ({
      id: item.id,
      id_empleado_encargado: values.id_empleado_encargado
    }));
    



  const ordenes_trabajo = {
      ordenes_trabajo: values2,
  }

  console.log(ordenes_trabajo)

  try {

    const response = axiosClient.put('OrdenTrabajo/asigna/masiva', ordenes_trabajo)
    console.log(response);
    successToastCreado();

  }
  catch (response) {
    console.log(response);
    errorToast();
  }
};




//METODO DE FILTRACION PARA CONSEGUIR LAS ORDENES DE TRABAJO Y PODER ASIGNARLAS
const getOrdenesDeTrabajo = async () => {
  const values = {
    asignada: isAsignadaChecked,
    no_asignada: isNoAsignadaChecked,
  }
  console.log("VALORES ENVIADOS", values);
  try {
    const response = await axiosClient.post("OrdenTrabajo/filtros", values);
    console.log(response);


    if (Array.isArray(response.data.ordenes_trabajo)) {
      const tomas = response.data.ordenes_trabajo.map((item: any) => item);

      console.log("Tomas extraídas", tomas);

      setInformacionRecibidaPorFiltros(tomas);
    } else {
      console.log("No jala", response.data.ordenes_trabajo);
    }

  } catch (error) {
    console.error("Failed to fetch anomalias:", error);
  }
};


return (
  <div>
    <div className='flex space-x-2'>
      <FiltrosAsignarOTMasiva />
      <div className='w-full'>
        <div className='border border-gray-300 rounded-sm ml-5 p-7 mr-5 mt-5 shadow-sm'>
          {selectedAction === "individual" && (
            <p className="text-muted-foreground text-[20px] mb-5">Asignar órdenes de trabajo individual</p>
          )}
          {selectedAction === "" && (
            <p className="text-muted-foreground text-[20px] mb-5">Selecciona el tipo de orden de trabajo.</p>
          )}
          {selectedAction === "masivamente" && (
            <p className="text-muted-foreground text-[20px] mb-5">Asignar órdenes de trabajo masivas.</p>
          )}

          <div className='flex space-x-2'>
            <Select onValueChange={handleSelectChange} value={selectedAction}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona el tipo de orden de trabajo." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">Individual</SelectItem>
                <SelectItem value="masivamente">Masivamente</SelectItem>
              </SelectContent>
            </Select>


            {selectedAction == "individual" &&
              <div>
                <div className='flex justify-center items-center'>
                  <ModalMasFiltros
                    trigger={
                      <IconButton title="Más Filtros">
                        <FaSearch />
                      </IconButton>
                    }

                  />

                </div>


              </div>
            }
            {selectedAction == "masivamente" &&
              <div>
                <div className='flex justify-center items-center'>
                  <IconButton title="Buscar tomas" onClick={getOrdenesDeTrabajo}>

                    <FaSearch />

                  </IconButton>

                </div>


              </div>
            }


          </div>





          {selectedAction === "individual" && controlTablaOperadorOTIndividual && (
            <div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitIndividual)} className="space-y-8 mt-5">
                  <FormField
                    control={form.control}
                    name="id_empleado_encargado"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Selecciona el operador</FormLabel>
                        <div className='flex space-x-2'>
                          <div className='w-[180vh]'>
                            <OperadoresOtIndividualComboBox form={form} field={field} name="id_empleado_encargado" setCargoSeleccionado={setOperadorSeleccionado} />
                          </div>
                          <Button type='submit' className='mb-2 w-[10vh]'>Asignar</Button>
                        </div>

                        <FormDescription>
                          El nombre del operador.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className='flex justify-end'>
                  </div>
                </form>
              </Form>
              <AsignarOrdenDeTrabajoTable />

            </div>
          )}

          {selectedAction === "masivamente" && (
            <div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitMasiva)} className="space-y-8 mt-2">
                  <FormField
                    control={form.control}
                    name="id_empleado_encargado"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Selecciona el operador</FormLabel>
                        <div className='flex space-x-2'>
                          <OperadoresOtIndividualComboBox form={form} field={field} name="id_empleado_encargado" setCargoSeleccionado={setOperadorSeleccionado} />
                          <Button type='submit' className=''>Asignar</Button>
                        </div>


                        <FormDescription>
                          El nombre del operador.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className='flex justify-end'>
                  </div>
                </form>
              </Form>
              <AsignarOrdenDeTrabajoMasivamenteTable />
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);
};
