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
import {
    FormControl,
} from "./form.tsx";
import { Button } from "@/components/ui/button";
import axiosClient from '../../axios-client.ts';
import Loader from './Loader.tsx';

type Status = {
    value: string;
    label: string;
    disabled?: boolean;
};

type ConceptosComboBoxNewProps = {
    field: any;
    onSelect: (selected: Status) => void;
};

export const DisparaOtraOTComboBox = ({ field, form, name = "id_concepto", setCargoSeleccionado, disabled = false }: ConceptosComboBoxNewProps) => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [languages, setLanguages] = React.useState<Status[]>([]);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        getConcepto();
    }, []);

    const getConcepto = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get("/OrdenTrabajoCatalogo");
            const conceptos = response.data.data.map(concepto => ({
                value: concepto.id,
                label: concepto.nombre
            }));
            setLanguages(conceptos);
        } catch (error) {
            console.error("Failed to fetch concepto:", error);
        } finally {
            setLoading(false);
        }
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
                                ? languages.find(lang => lang.value === field.value)?.label
                                : "Selecciona una orden de trabajo"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 h-[400px]" align="start">
                    <Command>
                        <CommandInput placeholder="Buscar una OT.. " />
                        <CommandList>
                            <CommandEmpty>Orden de trabajo no encontrada.</CommandEmpty>
                            <CommandGroup>
                                {loading && <Loader />}
                                {!loading && languages.map(language => (
                                    <CommandItem
                                        key={language.value}
                                        onSelect={() => {
                                            form.setValue(name, language.value);
                                            setCargoSeleccionado(language.value);
                                            setOpen(false); // Opcional: cierra el popover después de seleccionar

                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                language.value === field.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {language.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
};
