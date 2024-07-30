import React from 'react'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./form.tsx";
import { Button } from "@/components/ui/button"
import axiosClient from '../../axios-client.ts'
import Loader from './Loader.tsx'

type Status = {
    value: string
    label: string

}

type ConceptosComboBoxNewProps = {
    field: any;
    onSelect: (selected: Status) => void; // Nueva prop para el callback
};

export const BuscarUsuarioComboBox = ({ field, form, name = "id_concepto", setCargoSeleccionado}) => {


    const [loading, setLoading] = React.useState<boolean>(false);
    const [languages, setLanguages] = React.useState<Status[]>([
        {value: "1", label: "Nombre"},
        {value: "2", label: "Codigo usuario"},
        {value: "3", label: "Correo"},



    ]);



    const [open, setOpen] = React.useState(false)

    return (
        <div>
            <Popover>
                <PopoverTrigger asChild>
                    <FormControl>
                        <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                            )}
                        >
                            {field.value
                                ? languages.find(
                                    (language) => language.value === field.value
                                )?.label
                                : "Selecciona un concepto"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 h-[300px]">
                    <Command>
                        <CommandInput placeholder="Buscar Concepto ... " />
                        <CommandList>
                            <CommandEmpty>Concepto no encontrado.</CommandEmpty>
                            <CommandGroup>
                                {
                                    loading &&
                                    <Loader />
                                }
                                {
                                    !loading &&
                                    <>
                                        {languages.map((language) => (
                                            <CommandItem
                                                value={language.label}
                                                key={language.value}
                                                onSelect={() => {
                                                    form.setValue(name, language.value)
                                                    setCargoSeleccionado(language.label); 

                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        language.value === field.value
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                    )}
                                                />
                                                {language.label}
                                            </CommandItem>
                                        ))}
                                    </>
                                }

                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}
