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

const SHEET_SIDES = ["bottom"] as const

export function EdicionTarifaServicio({ trigger = null, open, setOpen, tarifaServicio}) {

  console.log(tarifaServicio);
  const onClick = () => {
    setOpen(false);
  }

  return (
    <div className="">
      {SHEET_SIDES.map((side) => (
        <Sheet key={side} open = {open}>
          <SheetTrigger asChild>
            {trigger}
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>Editar servicios</SheetTitle>
              <SheetDescription>
                Puedes editar los servicios aquí. Presionar guardar cuando termines.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Rango(hasta)
                </Label>
                <Input id="name" className="col-span-3" defaultValue = {tarifaServicio.Rango} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Agua
                </Label>
                <Input id="username" className="col-span-3" defaultValue = {tarifaServicio.Agua}/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Alcantarillado
                </Label>
                <Input id="username" className="col-span-3" defaultValue = {tarifaServicio.Alcantarillado}/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Sanamiento
                </Label>
                <Input id="username" className="col-span-3" defaultValue = {tarifaServicio.Saneamiento}/>
              </div>
            </div>
            <SheetFooter>
              <SheetClose >
              <Button onClick={onClick} type="submit">Guardar cambios</Button>
              <Button onClick={onClick} type="submit" className="ml-3 bg-green-900">Cancelar</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  )
}
