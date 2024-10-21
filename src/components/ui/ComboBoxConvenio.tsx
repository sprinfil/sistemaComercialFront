// ComboBoxConvenio.tsx
import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const opcionesMonto = [
  { value: "%", label: "Porcentaje (%)" },
  { value: "$", label: "Pesos ($)" },
];

interface ComboBoxConvenioProps {
  placeholder: string;
  name: string;
  currentValue: string;
  readOnly?: boolean;
  onSelect: (value: string) => void;
}

export function ComboBoxConvenio({
  placeholder,
  name,
  currentValue,
  readOnly,
  onSelect
}: ComboBoxConvenioProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(currentValue);

  React.useEffect(() => {
    setValue(currentValue);
  }, [currentValue]);

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
            disabled={readOnly}
          >
            {value
              ? opcionesMonto.find((opcion) => opcion.value === value)?.label
              : placeholder}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Selecciona el tipo de monto..." className="h-9" />
            <CommandList>
              <CommandEmpty>No se encontró ninguna opción.</CommandEmpty>
              <CommandGroup>
                {opcionesMonto.map((opcion) => (
                  <CommandItem
                    key={opcion.value}
                    value={opcion.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue);
                      onSelect(currentValue); // Notify parent component of selection
                      setOpen(false);
                    }}
                  >
                    {opcion.label}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === opcion.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
