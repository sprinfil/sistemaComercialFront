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
import { Button } from "@/components/ui/button"
import axiosClient from '../../axios-client.ts'
import Loader from './Loader.tsx'

type Status = {
    value: string
    label: string
}

type OperadoresCargaDeTrabajoComboBoxProps = {
    setCargoSeleccionado: (value: string) => void; // Prop para establecer el valor seleccionado
};

export const OperadoresCargaDeTrabajoComboBox = ({ setCargoSeleccionado }: OperadoresCargaDeTrabajoComboBoxProps) => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [languages, setLanguages] = React.useState<Status[]>([]);
    const [value, setValue] = React.useState<string>(""); // Almacena el valor seleccionado
    const [open, setOpen] = React.useState<boolean>(false);

    React.useEffect(() => {
        getConcepto();
    }, []);

    const getConcepto = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get("/Operador");
            const conceptos = response.data.map((concepto: any) => ({
                value: concepto.id,
                label: concepto.nombre,
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
            {loading ? (
                <Loader />
            ) : (
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between h-[7vh]"
                        >
                            {value
                                ? languages.find((lang) => lang.value === value)?.label
                                : "Selecciona un operador"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0 mt-1" side="bottom" align="start">
                    <Command>
                            <CommandInput placeholder="Buscar operador..." />
                            <CommandList>
                                <CommandEmpty>Operador no encontrado.</CommandEmpty>
                                <CommandGroup className="max-h-[40vh] overflow-auto">
                                    {languages.map((operador) => (
                                        <CommandItem
                                            key={operador.value}
                                            value={operador.value}
                                            onSelect={() => {
                                                setValue(operador.value); // Actualiza el valor seleccionado
                                                setCargoSeleccionado(operador.value); // Llama a la prop para establecer el valor
                                                setOpen(false); // Cierra el popover
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    value === operador.value ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {operador.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            )}
        </div>
    )
}
