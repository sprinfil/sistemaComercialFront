"use client"

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form.tsx";
import { ConceptosComboBoxNew } from "../../ui/ConceptosComboBoxNew.tsx";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form";
import { TarifaConceptoDetalleSchema } from "../../Forms/TarifaConceptoDetalleValidaciones.ts";
import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client.ts";
import { nuevoServicioSchema } from "../../Forms/TarifaValidaciones.ts";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from '@radix-ui/react-toast'

const SHEET_SIDES = ["bottom"] as const

export function EdicionTarifaServicioNew({ trigger = null, open, setOpen, tarifaServicio, updateData }) {

  const [objeto, setObjeto] = useState({});
  const { toast } = useToast()
  const form = useForm<z.infer<typeof nuevoServicioSchema>>({
    resolver: zodResolver(nuevoServicioSchema),
    defaultValues: {
        id_tarifa: String( tarifaServicio.id),
        id_tipo_toma: String( tarifaServicio.id_tipo_toma),
        rango: tarifaServicio.rango,
        agua:  tarifaServicio.agua,
        alcantarillado: tarifaServicio,
        saneamiento:  tarifaServicio.saneamiento,
    },
})

  const { reset } = form;

  useEffect(() => {

    if(tarifaServicio.rango !=null){
      let rango = tarifaServicio.rango;
      let agua = tarifaServicio.agua;
      let alcantarillado = tarifaServicio.alcantarillado;
      let saneamiento = tarifaServicio.saneamiento;
  
      setObjeto(tarifaServicio);
      reset({
        id_tarifa: tarifaServicio.id_tarifa.toString(),
        id_tipo_toma: tarifaServicio.id_tipo_toma.toString(),
        rango: rango.toString(),
        agua:  agua.toString(),
        alcantarillado: alcantarillado.toString(),
        saneamiento: saneamiento.toString(),
      });
    }

  }, [tarifaServicio, reset]);

  const onClick = () => {
    setOpen(false);
  }

  const handleFormSubmit = () => {
    const values = form.getValues();
    
    console.log("id_tarifa:", values.id_tarifa, typeof values.id_tarifa);
    console.log("id_tipo_toma:", values.id_tipo_toma, typeof values.id_tipo_toma);
    console.log("rango:", values.rango, typeof values.rango);
    console.log("alcantarillado:", values.alcantarillado, typeof values.alcantarillado);
    console.log("saneamiento:", values.saneamiento, typeof values.saneamiento);
    console.log("agua:", values.agua, typeof values.agua);
   
    form.handleSubmit(onSubmit)();
  };

  function onSubmit(values: z.infer<typeof TarifaConceptoDetalleSchema>) {
    axiosClient.put(`/tarifaServicioDetalle/update/${tarifaServicio.id}`, values)
      .then((response) => {
        console.log(response);
        updateData();
        setOpen(false);
      })
      .catch((response) => {
        toast({
          title: "Error",
          description: response.response.data.message,
          variant: "destructive",
          action: <ToastAction altText="Try again">Aceptar</ToastAction>,
      })
      })

  }

  return (
    <>
      <Sheet open={open}>
        <SheetContent side={"bottom"}>
          <SheetHeader>
            <SheetTitle>Editar <span className="text-primary">{tarifaServicio.nombre_concepto}</span></SheetTitle>
            <SheetDescription>
              Aquí puede editar datos del servicio.
            </SheetDescription>
          </SheetHeader>
          <div className="flex items-center justify-center">
          <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="rango"
                                render={({ field }) => (
                                    <FormItem className="w-[400px]">
                                        <FormLabel>rango</FormLabel>
                                        <FormControl>
                                            <Input  className="col-span-3" {...field} />
                                        </FormControl>
                                        <FormDescription>

                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="agua"
                                render={({ field }) => (
                                    <FormItem className="w-[400px]">
                                        <FormLabel>agua</FormLabel>
                                        <FormControl>
                                            <Input  className="col-span-3" {...field} />
                                        </FormControl>
                                        <FormDescription>

                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="alcantarillado"
                                render={({ field }) => (
                                    <FormItem className="w-[400px]">
                                        <FormLabel>alcantarillado</FormLabel>
                                        <FormControl>
                                            <Input  className="col-span-3" {...field} />
                                        </FormControl>
                                        <FormDescription>

                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="saneamiento"
                                render={({ field }) => (
                                    <FormItem className="w-[400px]">
                                        <FormLabel>saneamiento</FormLabel>
                                        <FormControl>
                                            <Input  className="col-span-3" {...field} />
                                        </FormControl>
                                        <FormDescription>

                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <SheetFooter>
                        
                            </SheetFooter>
                        </form>
                    </Form>

          </div>
          <div className="w-full justify-center flex gap-5">
            <Button onClick={handleFormSubmit} type="submit">Aceptar</Button>
            <Button onClick={onClick} variant={"destructive"}>Cancelar</Button>
          </div>
        </SheetContent>

      </Sheet>

    </>

  )
}
