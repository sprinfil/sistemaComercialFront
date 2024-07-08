import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { useStateContext } from "../../contexts/ContextDetalleUsuario"


import React from 'react'

const MenuLateral = ({ options, context}) => {

  const {setPantalla} = context();

  const changeScreen = (pantalla) => {
    setPantalla(pantalla);
    console.log(pantalla)
  }

  return (
    <div className="border border-border rounded-md h-full">
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        {options.map((option, index) => {
          return (
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading={option.titulo}>
                {option.opciones.map((opcion, index) => (
                  <div onClick={()=>{changeScreen(opcion.pantalla)}}>
                    <CommandItem>{opcion.nombre}</CommandItem>
                  </div>
                ))}
              </CommandGroup>
            </CommandList>
          )
        })}
      </Command>
    </div>
  )
}

export default MenuLateral