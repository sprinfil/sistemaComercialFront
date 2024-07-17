"use client"

import { useState } from "react";
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

const SHEET_SIDES = ["bottom"] as const
type EdicionTarifaServicio = (typeof SHEET_SIDES)[number]

export function AgregarTarifaServicio({trigger, open, setOpen, tarifaServicio}) {


  console.log(tarifaServicio);
  const handleCerrar = () => {
    setOpen(false);
  }

  const [guardar, setGuardar] = useState(false);


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
              <SheetTitle>Agregar nuevo servicio</SheetTitle>
              <SheetDescription>
                Puedes agregar un servicio aquí. Presionar guardar cuando termines.
              </SheetDescription>
            </SheetHeader>
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
                <Button onClick={handleCerrar} type="submit">Guardar cambios</Button>
                <Button onClick={handleCerrar} type="submit" className="ml-3 bg-green-900">Cancelar</Button>
                </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  )
}
