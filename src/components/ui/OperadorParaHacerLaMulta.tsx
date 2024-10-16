"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import axiosClient from "../../axios-client"

export function OperadorParaHacerLaMulta({ onSelect }) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("") // Valor del ID seleccionado
  const [multas, setMultas] = React.useState([])

  React.useEffect(() => {
    const getCatalogoMulta = async () => {
      try {
        const response = await axiosClient.get("/Operador");
        console.log(response.data);
        setMultas(response.data); // Asumiendo que response.data es un array de multas
      } catch (error) {
        console.error("Error fetching operadores:", error);
      }
    }
    getCatalogoMulta();
  }, [])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between " 
        >
          {value
            ? multas.find((multa) => multa.id === value)?.nombre 
            : "Selecciona un operador..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0 max-h-[40vh] overflow-y-auto">
        <Command className="">
          <CommandInput placeholder="Buscar operador..." />
          <CommandList>
            <CommandEmpty>Operador no encontrado.</CommandEmpty>
            <CommandGroup>
              {multas.map((multa) => (
                <CommandItem
                  key={multa.id} 
                  value={multa.id}
                  onSelect={() => {
                    setValue(multa.id); 
                    onSelect(multa); 
                    setOpen(false); 
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === multa.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {multa.nombre} {/* Mostrar la descripción de la multa */}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
