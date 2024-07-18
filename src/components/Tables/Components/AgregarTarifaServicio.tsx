"use client";

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
} from "@/components/ui/sheet";
import { nuevoServicioSchema } from "../../Forms/TarifaValidaciones";
import { useToast } from "@/components/ui/use-toast";
import { useStateContext } from "../../../contexts/ContextTarifa";
import axiosClient from "../../../axios-client";

const SHEET_SIDES = ["bottom"] as const;

export function AgregarTarifaServicio({ trigger, open, setOpen }) {
  const { toast } = useToast();
  const { tarifa, setTarifa, servicios, setAccion } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState();

  console.log("Servicios: ", servicios);

  const handleCerrar = () => {
    setOpen(false);
  };

  function successToastCreado() {
    toast({
      title: "¡Éxito!",
      description: "El servicio se ha creado correctamente",
      variant: "success",
    });
  }

  const form = useForm<z.infer<typeof nuevoServicioSchema>>({
    resolver: zodResolver(nuevoServicioSchema),
    defaultValues: {
      id: servicios?.id,
      id_tarifa: tarifa?.id,
      id_tipo_toma: servicios?.id_tipo_toma,
      rango: servicios?.rango,
      alcantarillado: servicios?.alcantarillado,
      saneamiento: servicios?.saneamiento,
    },
  });

  async function onSubmit(values: z.infer<typeof nuevoServicioSchema>) {
    setLoading(true);
    console.log("Submitting form with values: ", values);
    try {
      const response = await axiosClient.post(`/tarifaServicioDetalle/create`, values);
      console.log("Response: ", response.data);
      setTarifa({});
      setAccion("creado");
      successToastCreado();
      form.reset();
      setOpen(false);
    } catch (error) {
      setErrors(error.response?.data?.errors || {});
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex gap-2 justify-center items-center">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>{trigger}</SheetTrigger>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Agregar nuevo servicio</SheetTitle>
            <SheetDescription>
              Puedes agregar un servicio aquí. Presiona guardar cuando termines.
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="rango" className="text-right">
                  Rango(hasta)
                </Label>
                <Input id="rango" {...form.register("rango")} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="agua" className="text-right">
                  Agua
                </Label>
                <Input id="agua" {...form.register("agua")} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="alcantarillado" className="text-right">
                  Alcantarillado
                </Label>
                <Input id="alcantarillado" {...form.register("alcantarillado")} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="saneamiento" className="text-right">
                  Saneamiento
                </Label>
                <Input id="saneamiento" {...form.register("saneamiento")} className="col-span-3" />
              </div>
            </div>
            <SheetFooter>
              <Button type="submit" disabled={loading}>
                {loading ? "Guardando..." : "Guardar cambios"}
              </Button>
              <SheetClose>
                <Button onClick={handleCerrar} className="ml-3 bg-green-900">
                  Cancelar
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
