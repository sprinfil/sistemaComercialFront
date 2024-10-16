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
import { Button } from "@/components/ui/button";
import axiosClient from '../../axios-client.ts';
import Loader from './Loader.tsx';
import { ZustandFiltrosOrdenTrabajo } from '../../contexts/ZustandFiltrosOt.tsx';

type Status = {
    value: string;
    label: string;
};

type RutaFilterComboBoxProps = {
    field: any; // Cambiar a un tipo más específico si es posible
    name?: string;
    setCargoSeleccionado: (label: string) => void;
};

export const RutaFilterComboBox = ({ field, name = "id_concepto", setCargoSeleccionado }: RutaFilterComboBoxProps) => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [languages, setLanguages] = React.useState<Status[]>([]);
    const [open, setOpen] = React.useState(false);
    const { setidRutaSeleccionada, setRutaBooleanForLibro, rutaBooleanForLibro } = ZustandFiltrosOrdenTrabajo();

    React.useEffect(() => {
        getConcepto();
    }, []);

    const getConcepto = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get("/ruta");
            const conceptos = response.data.data.map((concepto: any) => ({
                value: concepto.id,
                label: concepto.nombre,
            }));
            // Añadir una opción vacía al principio
            setLanguages([{ value: '', label: 'Limpiar selección' }, ...conceptos]);
        } catch (response) {
            console.log("Failed to fetch ruta:", response);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        if (field.value) {
            setRutaBooleanForLibro(false);
        } else {
            setRutaBooleanForLibro(true);
        }
    }, [field.value]);

    return (
        <div>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                        )}
                        onClick={() => setOpen(!open)}
                    >
                        {field.value
                            ? languages.find((language) => language.value === field.value)?.label
                            : "Selecciona una ruta"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 h-[300px]">
                    <Command>
                        <CommandInput placeholder="Buscar ruta ... " />
                        <CommandList>
                            <CommandEmpty>Ruta no encontrada.</CommandEmpty>
                            <CommandGroup>
                                {loading ? (
                                    <Loader />
                                ) : (
                                    languages.map((language) => (
                                        <CommandItem
                                            value={language.label}
                                            key={language.value}
                                            onSelect={() => {
                                                // Si el valor es vacío, limpiar el campo
                                                field.onChange({ target: { value: language.value } });
                                                setCargoSeleccionado(language.value);
                                                setidRutaSeleccionada(language.value);
                                                setOpen(false);
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
                                    ))
                                )}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
};
