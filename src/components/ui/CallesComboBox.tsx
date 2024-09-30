import React from 'react';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { FormControl } from "./form.tsx";
import { Button } from "@/components/ui/button";
import axiosClient from '../../axios-client.ts';
import Loader from './Loader.tsx';

type Status = {
    value: number;
    label: string;
};

export const CallesComboBox = ({ field, form, name = "entre_calle_2", setCargoSeleccionado, disabled }) => {
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
            const response = await axiosClient.get("/calle");
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
                                selectedValue === null && "text-muted-foreground"
                            )}
                            disabled={disabled}
                        >
                            {selectedValue !== null
                                ? languages.find(language => language.value === selectedValue)?.label
                                : "Selecciona una calle"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 h-[300px]">
                    <Command>
                        <CommandInput placeholder="Buscar calle ... " />
                        <CommandList>
                            <CommandEmpty>Calle no encontrada.</CommandEmpty>
                            <CommandGroup>
                                {loading && <Loader />}
                                {!loading && (
                                    <>
                                        {languages.map(language => (
                                            <CommandItem
                                                key={language.value}
                                                onSelect={() => handleSelect(language.value, language.label)}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        language.value === selectedValue
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
};
