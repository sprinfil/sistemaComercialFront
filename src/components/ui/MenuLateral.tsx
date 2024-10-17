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
} from "@/components/ui/commandSapa"


import React, { useState } from 'react'

const MenuLateral = ({ options, context}) => {

  const {setPantalla, setClick, click} = context();
  const [selected, setSelected] = useState("");
  const changeScreen = (pantalla) => {
    setClick(!click);
    setPantalla(pantalla);
    console.log(pantalla);
  }

  return (
    <div className=" rounded-md h-full w-full">
      <Command>
        <CommandInput placeholder="Buscar..." />
        {options.map((option, index) => {
          return (
            <CommandList>
              <CommandEmpty>No resultados encontrados.</CommandEmpty>
              <CommandGroup heading={option.titulo}>
                {option.opciones.map((opcion, index) => (
                  <div onClick={()=>{changeScreen(opcion.pantalla); setSelected(opcion?.nombre)}}>
                    <CommandItem className={`p-2 transition-all duration-200 cursor-pointer ${selected == opcion.nombre ? "bg-primary text-white":"hover:bg-green-200 dark:hover:bg-muted  hover:p-3"}`}>{opcion.nombre}</CommandItem>
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