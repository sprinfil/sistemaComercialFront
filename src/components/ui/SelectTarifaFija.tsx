import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

export const SelectTarifaFija = ({value, onChange}) => {
  const stringValue = value ? 'si' : 'no';

  const handleValue = (valorBool) =>
  {
    console.log('Valor recibido en handleValue:', valorBool); // Verifica el valor recibido
    onChange(valorBool === 'si');
  };

  return (
    <Select value = {stringValue} onValueChange= {handleValue}>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>¿Tiene tarifa fija?</SelectLabel>
        <SelectItem value="si">Sí</SelectItem>
        <SelectItem value="no">No</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
  )
}



