"use client"

import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

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

const estados = [
  {
    value: "1",
    label: "Activo",
  },
  {
    value: "0",
    label: "Inactivo",
  },
]

export function ComboBoxCeroUno({placeholder, form, name, currentValue, readOnly}) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(currentValue)

  React.useEffect(() => {
    setValue(currentValue);
  }, [currentValue]);

  return (
    <div >
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
          disabled={readOnly}
        >
          {value
            ? estados.find((estado) => estado.value === value)?.label
            : placeholder}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Buscar estado..." className="h-9" />
          <CommandList>
            <CommandEmpty>No estado found.</CommandEmpty>
            <CommandGroup>
              {estados.map((estado) => (
                <CommandItem
                  key={estado.value}
                  value={estado.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                    form.setValue(`${name}`, estado.value)
                  }}
                >
                  {estado.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === estado.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
    </div>

  )
}
