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
import ConceptosService from "../../lib/Conceptos"
import ZustandConvenios from "../../contexts/ZustandConvenios"
import { useToast } from "./use-toast"

export function ComboBoxAnomalia({ set, selected_conceptos }) {
  const { toast } = useToast()

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(0)
  const [conceptos, set_conceptos] = React.useState([]);
  const { convenio_conceptos, set_convenio_conceptos } = ZustandConvenios();


  React.useEffect(() => {
    get();
  }, [])

  async function get() {
    let temp = await ConceptosService.get_all();
    set_conceptos(temp);
  }

  React.useEffect(() => {
    console.log(selected_conceptos);
  }, [selected_conceptos])

  const validar_concepto = (concepto) => {
    let repetido = false;
    selected_conceptos.map(concepto_temp => concepto_temp.id == concepto.id ? repetido = true : "");
    if (repetido) {
      toast({
        title: "Concepto Repetido",
        variant: "destructive",
      })
    }
    return repetido;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? conceptos.find((framework) => framework.id === value)?.nombre
            : "Seleccionar Concepto"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" p-0 w-full">
        <Command>
          <CommandInput placeholder="Buscar Concepto" />
          <CommandList className="h-[300px] w-full">
            <CommandEmpty>No se encontraron conceptos.</CommandEmpty>
            <CommandGroup>
              {conceptos.map((framework) => (
                <CommandItem
                  key={framework.id}
                  value={framework.id}
                  onSelect={(currentValue) => {
                    setValue(framework.id === value ? "" : framework.id)
                  
                    setOpen(false)
                 
                    if (!validar_concepto(framework)) {
                      let conceptos = [...selected_conceptos, framework];
                      set(conceptos);
                      set_convenio_conceptos(conceptos);
                    }
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.nombre}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
