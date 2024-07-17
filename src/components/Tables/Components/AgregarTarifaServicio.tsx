"use client"

import { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { useForm } from "react-hook-form";
import { Label } from "../../ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
import {nuevoServicioSchema} from '../../Forms/TarifaValidaciones';
import { useToast } from "@/components/ui/use-toast"; //IMPORTACIONES TOAST
import { ToastAction } from "@/components/ui/toast"; //IMPORTACIONES TOAST
import { useStateContext } from "../../../contexts/ContextTarifa";
import axiosClient from "../../../axios-client";
const SHEET_SIDES = ["bottom"] as const
type EdicionTarifaServicio = (typeof SHEET_SIDES)[number]

export function AgregarTarifaServicio({trigger, open, setOpen, tarifaServicio}) {

  const { toast } = useToast()
  const { tarifa, setTarifa, servicios, loadingTable, setLoadingTable, setTarifas, setAccion, accion } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState();

  console.log(tarifaServicio);
  const handleCerrar = () => {
    setOpen(false);
  }
  function successToastCreado() {
    toast({
        title: "¡Éxito!",
        description: "La anomalía se ha creado correctamente",
        variant: "success",

    })
}
  const [guardar, setGuardar] = useState(false);

  const form = useForm<z.infer<typeof nuevoServicioSchema>>({
    resolver: zodResolver(nuevoServicioSchema),
    defaultValues: {
        id: servicios.id,
        id_tarifa: servicios.id_tarifa,
        id_tipo_toma: servicios.id_tipo_toma,
        rango: servicios.rango,
        alcantarillado: servicios.alcantarillado,
        saneamiento: servicios.saneamiento,

        
    },
})

async function onSubmit(values: z.infer<typeof nuevoServicioSchema>) {
  setLoading(true);
  try {
    const response = await axiosClient.post(`/tarifaServicioDetalle/create`, values);
    const data = response.data;
    setTarifa({});
    setAccion("creado");
    successToastCreado();
    form.reset();
    setOpen(false);
  } catch (error) {
    setErrors(error.response.data.errors);
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="flex gap-2 justify-center items-center">
      {SHEET_SIDES.map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            {trigger}
            {/*<Button variant="outline">{side}</Button>*/}
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>Agregar nuevo servicio             <p>{tarifa.id}</p>
              </SheetTitle>
              <SheetDescription>
                Puedes agregar un servicio aquí. Presionar guardar cuando termines.
              </SheetDescription>
            </SheetHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Rango(hasta)
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Agua
                </Label>
                <Input id="username" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Alcantarillado
                </Label>
                <Input id="username" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Sanamiento
                </Label>
                <Input id="username" className="col-span-3" />
              </div>
            </div>
            <SheetFooter>
          
              <SheetClose>
                <Button type="submit">Guardar cambios</Button>
                <Button onClick={handleCerrar} className="ml-3 bg-green-900">Cancelar</Button>
                </SheetClose>
            </SheetFooter>
            </form>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  )
}
