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
import { OcultarTable } from '../../components/Tables/Components/OcultarTable.tsx';

const MostrarFiltros = () => {

  //const { accion } = useStateContext();
 // const {accionGeneradaEntreTabs} = ZustandGeneralUsuario();

  return (
    <>
      {/*Datatable*/}

      <OcultarTable accion={""}>
      <FiltrosAsignarOTMasiva/>
      </OcultarTable>

    </>
  )


};
export const AsignarOTMasiva = () => {

  const { toast } = useToast()

  const { usuariosEncontrados, idSeleccionadoTomaAsignacionOT, controlTablaOperadorOTIndividual,idSeleccionadoAsignarOrdenDeTrabajoToma} = ZustandGeneralUsuario();
  const [operadorSeleccionado, setOperadorSeleccionado] = useState("");
  const { isAsignadaChecked, setIsAsignadaChecked, isNoAsignadaChecked, setIsNoAsignadaChecked,
    setInformacionRecibidaPorFiltros, informacionRecibidaPorFiltros, arregloOrdenesDeTrabajoParaAsignarAOperador,
     arregloAsignarIndividualTomaAOperador, setLoadingTable, loadingTable, selectedAction, 
     setSelectedAction, setDataAsignarOtIndividual, informacionAsignacionMasivaRecibidaPorFiltros, 
     setInformacionAsignacionMasivaRecibidaPorFiltros,setboolControlDetalleUsuarioAsignarIndividual,
     isConcluidaChecked, setIsConcluidaChecked,
     isCanceladaChecked, setIsCanceladaChecked,
     isDomesticaChecked, setIsDomesticaChecked,
     isComercialChecked, setIsComercialChecked,
     isIndustrialChecked, setIsIndustrialChecked,
     isEspecialChecked, setIsEspecialChecked,  idLibroFiltro, idRutaFiltro,
     saldoMinFiltro, saldoMaxFiltro} = ZustandFiltrosOrdenTrabajo();



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


  const getOtIndividuales = async () => {
    setLoadingTable(true);
    try {
      const response = await axiosClient.get(`Toma/ordenesTrabajo/${usuariosEncontrados[0]?.tomas[0]?.codigo_toma}`);
      setLoadingTable(false);
      //setAnomalias(response.data.data);
      console.log(response.data.data);
      setDataAsignarOtIndividual(response.data.data)
    } catch (error) {
      //setLoadingTable(false);
      console.error("Failed to fetch anomalias:", error);
      setLoadingTable(false);

    }
  };


  //METODO PARA ASIGNAR INDIVIDUALMENTE LA OT
  function onSubmitIndividual(values: z.infer<typeof OrdenDeTrabajoAsignarIndividualSchema>) {

    const values2 = {
      id: idSeleccionadoAsignarOrdenDeTrabajoToma,
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
      getOtIndividuales();

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
    getOrdenesDeTrabajo();

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
    domestica: isDomesticaChecked,
    comercial: isComercialChecked,
    industrial: isIndustrialChecked,
    especial: isEspecialChecked,
    ruta_id: idRutaFiltro,
    libro_id: idLibroFiltro,
    saldo_min: saldoMinFiltro,
    saldo_max: saldoMaxFiltro
  }
  console.log("VALORES ENVIADOS", values);
  setLoadingTable(true);
  try {
    const response = await axiosClient.post("OrdenTrabajo/filtros", values);
    console.log(response);

    setLoadingTable(false);
    if (Array.isArray(response.data.ordenes_trabajo)) {
      const tomas = response.data.ordenes_trabajo.map((item: any) => item);

      console.log("Tomas extraídas", tomas);

      setInformacionAsignacionMasivaRecibidaPorFiltros(tomas);
    } else {
      console.log("No jala", response.data.ordenes_trabajo);
    }

  } catch (error) {
    console.error("Failed to fetch anomalias:", error);
    setLoadingTable(false);
  }
};

const handleControlBuscarUsuarioIndividual = () => 
{
  setboolControlDetalleUsuarioAsignarIndividual(true);
}


return (
  <div>
    <div className='flex space-x-2 mt-2'>
      <MostrarFiltros />
      <div className='w-full'>
        <div className='border border-gray-300 rounded-sm p-7 mr-5 shadow-sm h-[78vh] overflow-auto'>
          {selectedAction === "individual" && (
            <p className="text-muted-foreground text-[20px] mb-5">Asignar órdenes de trabajo individual</p>
          )}
          {selectedAction === "" && (
            <p className="text-muted-foreground text-[20px] mb-5">Selecciona el tipo de orden de trabajo.</p>
          )}
          {selectedAction === "masivamente" && (
            <p className="text-muted-foreground text-[20px] mb-5">Asignar órdenes de trabajo masivas.</p>
          )}

          <div className='flex space-x-2 w-full'>
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
                      <IconButton title="Más Filtros" onClick={handleControlBuscarUsuarioIndividual}>
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
            <div className=''>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitIndividual)} className="space-y-8 ">
                  <FormField
                    control={form.control}
                    name="id_empleado_encargado"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Selecciona el operador</FormLabel>
                        <div className='flex space-x-2'>
                          <div className='w-[120vh]'>
                            <OperadoresOtIndividualComboBox form={form} field={field} name="id_empleado_encargado" setCargoSeleccionado={setOperadorSeleccionado} />
                          </div>
                          <Button type='submit' className=' w-[10vh]'>Asignar</Button>
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
                <form onSubmit={form.handleSubmit(onSubmitMasiva)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="id_empleado_encargado"
                    render={({ field }) => (
                      <FormItem>
                        <div className='mt-2'>
                        <FormLabel>Selecciona el operador</FormLabel>
                        <div className='flex space-x-2'>
                          <OperadoresOtIndividualComboBox form={form} field={field} name="id_empleado_encargado" setCargoSeleccionado={setOperadorSeleccionado} />
                          <Button type='submit' className=''>Asignar</Button>
                        </div>
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
