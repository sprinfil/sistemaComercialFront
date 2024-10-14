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
import { loadRutas } from "../../lib/Services/PeriodosFacturacionService"
import Loader from "./Loader"

export function ComboboxRutas({ setSelectedRuta}) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [frameworks, setFrameworks] = React.useState([]);
  const [framework, setFramework] = React.useState([]);

  React.useEffect(() => {
    setSelectedRuta(framework);
  }, [framework])

  loadRutas(setFrameworks);

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
            ? frameworks.find((framework) => framework.id === value)?.nombre
            : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[95vw] p-0 h-[500px] overflow-auto">
        <Command className="w-full">
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty><Loader /></CommandEmpty>
            <CommandGroup>
              {frameworks?.map((framework) => (
                <CommandItem
                  key={framework.id}
                  value={framework.id}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : framework.id)
                    setOpen(false)
                    setFramework(framework)
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
