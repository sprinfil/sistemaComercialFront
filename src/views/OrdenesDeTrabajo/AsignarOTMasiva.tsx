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


export const AsignarOTMasiva = () => {

  const { toast } = useToast()

  const [selectedAction, setSelectedAction] = useState('');
  const { usuariosEncontrados, idSeleccionadoTomaAsignacionOT, controlTablaOperadorOTIndividual } = ZustandGeneralUsuario();
  const [operadorSeleccionado, setOperadorSeleccionado] = useState("");

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

  const handleSelectChange = (value) => {
    setSelectedAction(value);
  };


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

  function onSubmit(values: z.infer<typeof OrdenDeTrabajoAsignarIndividualSchema>) {

    const values2 = {
      id: idSeleccionadoTomaAsignacionOT,
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
                  <IconButton title="Más Filtros">
                          <FaSearch />
                        </IconButton>

                  </div>


                </div>
              }


            </div>

            {selectedAction == "individual" && controlTablaOperadorOTIndividual &&
              <AsignarOrdenDeTrabajoTable />
            }




            {selectedAction === "individual" && controlTablaOperadorOTIndividual && (
              <div>




                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                      control={form.control}
                      name="id_empleado_encargado"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Selecciona el operador</FormLabel>
                          <FormControl>
                            <OperadoresOtIndividualComboBox form={form} field={field} name="id_empleado_encargado" setCargoSeleccionado={setOperadorSeleccionado} />

                          </FormControl>
                          <FormDescription>
                            El nombre del operador.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className='flex justify-end'>
                      <Button type='submit' className='mt-5'>Asignar</Button>
                    </div>
                  </form>
                </Form>

              </div>
            )}

            {selectedAction === "masivamente" && (
              <div>
                <p className="text-gray-500 text-[20px] mt-5">Selecciona a quién deseas asignar.</p>
                <AsignarOrdenDeTrabajoTable />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
