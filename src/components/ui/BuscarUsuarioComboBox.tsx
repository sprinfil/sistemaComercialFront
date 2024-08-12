import React, { useEffect } from 'react'
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
    FormControl,
} from "./form.tsx";
import { Button } from "@/components/ui/button"
import Loader from './Loader.tsx'

type Status = {
    value: string
    label: string
}

type ConceptosComboBoxNewProps = {
    field: any;
    form: any;
    name?: string;
    setCargoSeleccionado: (label: string) => void;
};

export const BuscarUsuarioComboBox = ({ field, form, name = "id_concepto", setCargoSeleccionado }: ConceptosComboBoxNewProps) => {

    const [loading, setLoading] = React.useState<boolean>(false);
    const [languages, setLanguages] = React.useState<Status[]>([
        { value: "1", label: "Nombre" },
        { value: "2", label: "Código usuario" },
        { value: "3", label: "Correo" },
        { value: "4", label: "Dirección" },
        { value: "5", label: "Código toma" },
    ]);

    const [open, setOpen] = React.useState(false);

    // Establecer un filtro por defecto al cargar el componente
    useEffect(() => {
        // Solo establece el valor predeterminado si no hay un valor en el campo
        if (!field.value) {
            const defaultFilter = languages[4]; // Cambia aquí el filtro por defecto que deseas
            form.setValue(name, defaultFilter.value); // Actualiza el valor del formulario
            setCargoSeleccionado(defaultFilter.label); // Actualiza el estado del filtro seleccionado
        }
    }, [form, name, languages, setCargoSeleccionado, field.value]);

    const selectedLabel = field.value
        ? languages.find((language) => language.value === field.value)?.label
        : languages[4]?.label; // Mostrar el valor predeterminado

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
                            {selectedLabel || "Selecciona un filtro"} {/* Mostrar el valor seleccionado o predeterminado */}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 h-[300px]">
                    <Command>
                        <CommandInput placeholder="Buscar filtro ..." />
                        <CommandList>
                            <CommandEmpty>Filtro no encontrado.</CommandEmpty>
                            <CommandGroup>
                                {loading && <Loader />}
                                {!loading && (
                                    <>
                                        {languages.map((language) => (
                                            <CommandItem
                                                value={language.label}
                                                key={language.value}
                                                onSelect={() => {
                                                    form.setValue(name, language.value);
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
                                )}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
