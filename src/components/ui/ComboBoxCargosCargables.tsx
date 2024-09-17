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
import axios from "axios"
import axiosClient from "../../axios-client"

const frameworks = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
]



const ComboBoxCargosCargables = ({set}) => {



    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const [conceptos_cargables, set_conceptos_cargables] = React.useState<{ value: string, label: string }[]>([]);

    React.useEffect((() => {
        get_conceptos_cargables();
    }), [])

     const get_conceptos_cargables = () => {
        axiosClient.get("/Concepto/cargable")
            .then((response) => {
                console.log(response.data);

                let conceptos_temp = response.data.map((element: any) => ({
                    value: element.id,
                    label: element.nombre,
                    ...element,
                }));


                set_conceptos_cargables(conceptos_temp);
            }).catch((error) => {
                console.log(error);
            });
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
                        ? conceptos_cargables.find((framework) => framework.label === value)?.label
                        : "Selecciona un Cargo..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[47rem] p-0 h-[30vh]">
                <Command>
                    <CommandInput placeholder="Busca un Cargo..." />
                    <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {conceptos_cargables.length > 0 ? conceptos_cargables.map((framework) => (
                                <CommandItem
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                        set(framework);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === framework.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {framework.label}
                                </CommandItem>
                            )) : <></>}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )

}

export default ComboBoxCargosCargables