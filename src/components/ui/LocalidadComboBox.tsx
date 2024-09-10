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

export const LocalidadComboBox = ({ field, form, name = "id_concepto", setCargoSeleccionado}) => {


    const [loading, setLoading] = React.useState<boolean>(false);
    const [languages, setLanguages] = React.useState<Status[]>([]);


    React.useEffect(() => {
        getConcepto();
    }, []);

    const getConcepto = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get("/Concepto");
            let ctr = 0;
            response.data.forEach(concepto => {
                languages[ctr] = { value: concepto.id, label: concepto.nombre };
                ctr = ctr + 1;
            });
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("Failed to fetch concepto:", error);
        }
    };

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
                                : "Selecciona una localidad"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 h-[300px]">
                    <Command>
                        <CommandInput placeholder="Buscar localidad ... " />
                        <CommandList>
                            <CommandEmpty>Localidad no encontrada.</CommandEmpty>
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
                                                key={language.label}
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
