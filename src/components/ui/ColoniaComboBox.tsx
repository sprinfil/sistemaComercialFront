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

export const ColoniaComboBox = ({ field, form, name = "id_concepto", setCargoSeleccionado, disabled}) => {


    const [loading, setLoading] = React.useState<boolean>(false);
    const [languages, setLanguages] = React.useState<Status[]>([]);
    const [selectedValue, setSelectedValue] = React.useState<number | null>(null);


    React.useEffect(() => {
        getConcepto();
    }, []);

    React.useEffect(() => {
        // Establecer el valor inicial
        if (field.value) {
            setSelectedValue(Number(field.value));
        } else {
            setSelectedValue(null); // No hay selección, muestra el placeholder
            form.setValue(name, 0); // Asegúrate de enviar 0 si no hay valor
        }
    }, [field.value]);

    const getConcepto = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get("/colonia");
            const conceptos = response.data.map((concepto: any) => ({
                value: Number(concepto.id),
                label: concepto.nombre,
            }));
            setLanguages(conceptos);
        } catch (error) {
            console.error("Failed to fetch concepto:", error);
        } finally {
            setLoading(false);
        }
    };

    const [open, setOpen] = React.useState(false)

    const handleSelect = (value: number, label: string) => {
        setSelectedValue(value);
        form.setValue(name, value); // Establece el ID seleccionado
        setCargoSeleccionado(label);
    };

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

                            disabled={disabled}
                        >
                            {field.value
                                ? languages.find(
                                    (language) => language.value === field.value
                                )?.label
                                : "Selecciona una colonia o fraccionamiento"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 h-[300px]">
                    <Command>
                        <CommandInput placeholder="Buscar colonia / fraccionamiento ... " />
                        <CommandList>
                            <CommandEmpty>Colonia o fraccionamiento no encontrado.</CommandEmpty>
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
                                             key={language.value}
                                             onSelect={() => handleSelect(language.value, language.label)}
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
