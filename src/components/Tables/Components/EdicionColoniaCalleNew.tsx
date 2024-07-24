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
import { nuevaCalleSchema } from "../../Forms/ColoniaValidaciones.ts"

const SHEET_SIDES = ["bottom"] as const

export function EdicionColoniaCalleNew({ trigger = null, open, setOpen, coloniaCalle, updateData }) {

  const [objeto, setObjeto] = useState({});

  const form = useForm<z.infer<typeof nuevaCalleSchema>>({
    resolver: zodResolver(nuevaCalleSchema),
    defaultValues: {
        id_colonia: coloniaCalle.id,
        nombre: coloniaCalle.nombre,
    },
})

  const { reset } = form;

  useEffect(() => {

    if(coloniaCalle.nombre !=null){
      let nombre = coloniaCalle.id;
      setObjeto(coloniaCalle);
      reset({
        id_colonia: coloniaCalle.id,
        nombre: nombre.toString(),
      });
    }

  }, [coloniaCalle, reset]);

  const onClick = () => {
    setOpen(false);
  }

  const handleFormSubmit = () => {
    form.handleSubmit(onSubmit)();
  };

  function onSubmit(values: z.infer<typeof nuevaCalleSchema>) {
    console.log(values)

    axiosClient.put(`/calle/update/${coloniaCalle.id}`, values)
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
            <SheetTitle>Editar <span className="text-primary">{coloniaCalle.nombre}</span></SheetTitle>
            <SheetDescription>
              Aquí puede editar datos de la calle.
            </SheetDescription>
          </SheetHeader>
          <div className="flex items-center justify-center">
          <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="nombre"
                                render={({ field }) => (
                                    <FormItem className="w-[400px]">
                                        <FormLabel>Calle</FormLabel>
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
