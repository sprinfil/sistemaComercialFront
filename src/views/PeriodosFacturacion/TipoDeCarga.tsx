import React, { useState, useEffect } from 'react'
import { OperadoresCargaDeTrabajoComboBox } from '../../components/ui/OperadoresCargaDeTrabajoComboBox'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FilaCargaTrabajo, ZustandCargaDeTrabajo } from '../../contexts/ZustandCargaDeTrabajo'
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast"; //IMPORTACIONES TOAST
import { ToastAction } from "@/components/ui/toast"; //IMPORTACIONES TOAST
import { OperadoresCargaTrabajo } from '../../components/ui/OperadoresCargaTrabajo.tsx';
import IconButton from '../../components/ui/IconButton.tsx';
import { IoMdAddCircleOutline } from "react-icons/io";
import { Button } from '../../components/ui/button.tsx';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Coins } from 'lucide-react';

export const tipoCargaSchema = z.object({
  tipo_carga: z.string().min(1, "El tipo de carga es requerido"),
  operadores: z.number().min(1, "El operador es requerido"),
})

export const TipoDeCarga = ({booleanMostrar}) => {

  const [operadorSeleccionado, setOperadorSeleccionado] = useState("");

  const [nombreOperadorVer, setNombreOperadorVer] = useState("");

  const [existenCargaAsignada, setExisteCargaAsignada] = useState(false);

  const { toast } = useToast()
  const { filasSeleccionadaCargaTrabajo, cargasDeTrabajoAEnviar, setCargasDeTrabajoAEnviar, setFilasSeleccionadaCargaTrabajo } = ZustandCargaDeTrabajo();
  console.log(filasSeleccionadaCargaTrabajo);

  const [tipoCargaSeleccionada, setTipoCargaSeleccionada] = useState("");

  const [dataArray, setDataArray] = useState<FilaCargaTrabajo[]>([]);

  const form = useForm<z.infer<typeof tipoCargaSchema>>({
    resolver: zodResolver(tipoCargaSchema),
    defaultValues: {
      tipo_carga: "",
      operadores: 0,
    },
  })

  const onSubmit = (values) => {
    console.log(values);
    
    
    // Crear el nuevo objeto
    const newData = {
      id: filasSeleccionadaCargaTrabajo?.id,
      id_libro: filasSeleccionadaCargaTrabajo?.id_libro,
      id_periodo: filasSeleccionadaCargaTrabajo?.id_periodo,
      id_operador_encargado: values.operadores,
      estado: "en proceso",
      tipo_carga: values.tipo_carga,
      nombre_operador_encargado: operadorSeleccionado,
    };
  
    // ACTUALIZAMOS EL ESTADO SET DATA ARRAY
    setDataArray(prevDataArray => {

      //VERIFICAMOS SI EN EL ESTADO EXISTE UN ID IGUAL QUE EL NEW DATA

      const existingIndex = prevDataArray.findIndex(item => item.id === newData.id);
      
      //SI EXISTE EL ID SE ACTUALIZA
      if (existingIndex !== -1) {
        // Si existe, actualizar el objeto
        const updatedArray = [...prevDataArray];
        updatedArray[existingIndex] = {
          ...updatedArray[existingIndex],
          tipo_carga: newData.tipo_carga,
          id_operador_encargado: newData.id_operador_encargado,
          nombre_operador_encargado: operadorSeleccionado, 
        };
        console.log(updatedArray);
        //REGRESA LA ACTUALIZACIÓN DEL ESTADO
        return updatedArray;
      } else {
        // SI NO EXISTE CREA OTRO OBJETO
        return [...prevDataArray, newData];
      }
    });
  
    console.log(dataArray);
    // Actualizar cargas de trabajo a enviar
    setCargasDeTrabajoAEnviar(dataArray); // Usa el nuevo objeto `newData` que acabas de crear
  
    // Reiniciar el formulario
  };
  console.log(dataArray);
  console.log(cargasDeTrabajoAEnviar);
  console.log(cargasDeTrabajoAEnviar[0]?.nombre_operador_encargado);

  useEffect(() => 
  {
    if (dataArray && dataArray.length > 0) {
      const updatedCargas = dataArray.map(item => ({
        id: item.id,
        id_libro: item.id_libro,
        id_periodo: item.id_periodo,
        id_operador_encargado: item.id_operador_encargado,
        estado: item.estado,
        tipo_carga: item.tipo_carga,
      }));
  
      // Actualiza el estado
      setCargasDeTrabajoAEnviar(updatedCargas);
    }
  },[dataArray])


  useEffect(()=>
  {
    if(filasSeleccionadaCargaTrabajo)
    {
      if( filasSeleccionadaCargaTrabajo?.id_operador_encargado)
        {
          setExisteCargaAsignada(true);
          setNombreOperadorVer(filasSeleccionadaCargaTrabajo?.tiene_encargado?.nombre);
            form.reset(
              {
                tipo_carga: filasSeleccionadaCargaTrabajo.tipo_carga,
                operadores: filasSeleccionadaCargaTrabajo.id_operador_encargado
              }
            )
            console.log(filasSeleccionadaCargaTrabajo);
        }
        else
        {
          setExisteCargaAsignada(false);
          form.setValue("tipo_carga", ""),
          form.setValue("operadores", 0);
          console.log(filasSeleccionadaCargaTrabajo);
    
        }
    }
   

  },[filasSeleccionadaCargaTrabajo])




  console.log(filasSeleccionadaCargaTrabajo);

  console.log(form.getValues());


  return (
    <div className='bg-muted h-full overflow-auto'>
      <div className='text-2xl p-5 text-black'>
        {filasSeleccionadaCargaTrabajo?.libro?.nombre}
        <div>
     
      {/** SI EXISTE LA CARGA ASIGNADA VA A ENTRAR EN ACCIÓN VER, Y VERA LOS VALORES QUE EXISTEN EN LA BD*/}
        {existenCargaAsignada &&
        <div>Operador asignado: {nombreOperadorVer}</div>
        }
          </div>
      </div>

      <div className='p-6'>
        <div className='text-xl '>
          {filasSeleccionadaCargaTrabajo && filasSeleccionadaCargaTrabajo?.id ?

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

          
                  <div className={`flex justify-end ${!booleanMostrar ? 'pointer-events-none opacity-50' : ''}`}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button type="submit" className={`h-[5vh] bg-[#0d751d] ${booleanMostrar ? '' : ''}`} title=''>
                  <IoMdAddCircleOutline className='w-[3.5vh] h-[3.5vh] mr-2' /> Agregar
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Asignar carga de trabajo</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
                


                <FormField
                  control={form.control}
                  name="tipo_carga"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-xl mb-5'>Selecciona el tipo de carga</FormLabel>
                      <div>
                        {
                          !booleanMostrar ?
                          <Select
                          onValueChange={(value) => field.onChange(value)}
                          value={field.value}
                          disabled
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Tipo de carga" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="mt-5">
                            <SelectItem value="lectura">Lectura</SelectItem>
                            <SelectItem value="facturacion">Facturacion</SelectItem>
                            <SelectItem value="facturacion en sitio">Facturacion en sitio</SelectItem>

                          </SelectContent>
                        </Select>

                          :

                          <Select
                          onValueChange={(value) => field.onChange(value)}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Tipo de carga" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="mt-5">
                            <SelectItem value="lectura">Lectura</SelectItem>
                            <SelectItem value="facturacion">Facturacion</SelectItem>
                            <SelectItem value="facturacion en sitio">Facturacion en sitio</SelectItem>

                          </SelectContent>
                        </Select>
                        }
                      

                      </div>

                      <FormDescription>

                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="operadores"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-xl mb-5'>Selecciona un operador</FormLabel>
                      <FormControl>
                        <OperadoresCargaTrabajo form={form} field={field} name="operadores" setCargoSeleccionado={setOperadorSeleccionado} disabled={!booleanMostrar} />
                      </FormControl>

                      <FormDescription>

                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </form>
            </Form>

            :
            <div className='text-3xl flex justify-center mt-28'>Selecciona un libro para asignar una carga de trabajo</div>
          }

        </div>

      </div>


    </div>
  )
}
