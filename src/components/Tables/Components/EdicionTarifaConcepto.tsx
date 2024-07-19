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

const SHEET_SIDES = ["bottom"] as const

export function EdicionTarifaConcepto({ trigger = null, open, setOpen, tarifaServicio, updateData }) {

  const [objeto, setObjeto] = useState({});

  const form = useForm<z.infer<typeof TarifaConceptoDetalleSchema>>({
    resolver: zodResolver(TarifaConceptoDetalleSchema),
    defaultValues: {
      id_tarifa: objeto.id_tarifa,
      id_tipo_toma: objeto.id_tipo_toma,
      id_concepto: objeto.id_concepto,
      monto: objeto.monto,
    },
  })

  const { reset } = form;

  useEffect(() => {

    setObjeto(tarifaServicio);
    reset({
      id_tarifa: tarifaServicio.id_tarifa,
      id_tipo_toma: tarifaServicio.id_tipo_toma,
      id_concepto: tarifaServicio.id_concepto,
      monto: tarifaServicio.monto,
    });
  }, [tarifaServicio, reset]);

  const onClick = () => {
    setOpen(false);
  }

  const handleFormSubmit = () => {
    form.handleSubmit(onSubmit)();
  };

  function onSubmit(values: z.infer<typeof TarifaConceptoDetalleSchema>) {
    console.log(values);

    axiosClient.put(`/tarifaConceptoDetalle/update/${tarifaServicio.id}`, values)
      .then((response) => {
        console.log(response);
        updateData();
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <>
      <Sheet open={open}>
        <SheetContent side={"bottom"}>
          <SheetHeader>
            <SheetTitle>Editar <span className="text-primary">{tarifaServicio.nombre_concepto}</span></SheetTitle>
            <SheetDescription>
              Agrega una nueva tarifa para un concepto
            </SheetDescription>
          </SheetHeader>
          <div className="flex items-center justify-center">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="monto"
                  render={({ field }) => (
                    <FormItem className="w-[400px]">
                      <FormLabel>Monto</FormLabel>
                      <FormControl>
                        <Input type="number" className="col-span-3" {...field} />
                      </FormControl>
                      <FormDescription>

                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <SheetFooter>
                  <SheetClose asChild>
                    <>


                    </>

                  </SheetClose>
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
