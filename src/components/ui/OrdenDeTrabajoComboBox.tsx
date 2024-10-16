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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form.tsx";
import { Button } from "@/components/ui/button";
import axiosClient from '../../axios-client.ts';
import Loader from './Loader.tsx';

type Status = {
  value: string;
  label: string;
};

type ConceptosComboBoxNewProps = {
  field: any;
  onSelect: (selected: Status) => void; 
};

const valoresParaAplicacionCargo: Status[] = [
  { value: '1', label: 'generar' },
  { value: '2', label: 'modificar' },
  { value: '3', label: 'quitar' },
  // Add more static values here
];

export const OrdenDeTrabajoComboBox = ({ field, form, name = "id_concepto", setCargoSeleccionado }) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [languages, setLanguages] = React.useState<Status[]>(valoresParaAplicacionCargo);
  const [open, setOpen] = React.useState(false);

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
                : "Selecciona cuando se aplica el cargo"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 h-[150px]">
          <Command>
            <CommandInput placeholder="Buscar aplicación ... " />
            <CommandList>
              <CommandEmpty>Aplicación no encontrada.</CommandEmpty>
              <CommandGroup>
                {loading && <Loader />}
                {!loading && (
                  <>
                    {languages.map((language) => (
                      <CommandItem
                        value={language.label}
                        key={language.value}
                        onSelect={() => {
                          form.setValue(name, language.label); // Guarda el label
                          setCargoSeleccionado(language.label); // Actualiza el estado con el label
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
};
