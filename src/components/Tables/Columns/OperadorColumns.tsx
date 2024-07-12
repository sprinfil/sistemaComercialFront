import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import IconButton from "../../ui/IconButton"
import { TrashIcon, Pencil2Icon, PlusCircledIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { useState } from "react"
import { useStateContext } from "../../../contexts/ContextOperador"
import { Checkbox } from "@/components/ui/checkbox"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Operador = {
  id: number
  name: string
  email: string
  password: string
  password_confirmation: string
  codigo_empleado: string
  nombre: string
  apellido_paterno: string
  apellido_materno: string
  CURP: string
  fecha_nacimiento: Date | string
}


export const columns: ColumnDef<Operador>[] = [
  {
    accessorKey: "nombre",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const operador = row.original
      const { setOperador, setAccion } = useStateContext();
      
      return (
        <div onClick={()=>{setOperador(operador);setAccion("ver")}}>
          <IconButton>
            <EyeOpenIcon className="w-[20px] h-[20px]"/>
          </IconButton>
        </div>
      )
    },
  },

]