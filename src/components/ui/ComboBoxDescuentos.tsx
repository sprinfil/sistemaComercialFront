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
import descuentoService from "../../lib/DescuentoService"

export function ComboBoxDescuentos({form}) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const [frameworks, set_frameworks] = React.useState([]);

    React.useEffect(() => {
        get();
    }, [])

    const get = async () => {
        let temp = await descuentoService.get_all();
        set_frameworks(temp)
        console.log(temp)
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
                        ? frameworks.find((framework) => framework.id === value)?.nombre
                        : "Selecciona descuento"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder="Busca algún descuento" />
                    <CommandList>
                        <CommandEmpty>No se encontraron descuentos.</CommandEmpty>
                        <CommandGroup>
                            {frameworks.map((framework) => (
                                <CommandItem
                                    key={framework.id}
                                    value={framework.id}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : framework.id)
                                        setOpen(false)
                                        form.setValue("id_descuento", framework.id)
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
