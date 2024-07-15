import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import IconButton from "../../../ui/IconButton"
import {Pencil2Icon } from '@radix-ui/react-icons';
import {EyeOpenIcon, DotsHorizontalIcon} from '@radix-ui/react-icons';
import { useStateContext } from "../../../../contexts/ContextTarifa"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EdicionTarifaServicio } from "../Components/EdicionTarifaServicio";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Tarifa = {
  id: number
  nombre: string
  descripcion: string
}


export const columns: ColumnDef<Tarifa>[] = [
  {
    accessorKey: "Rango",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
        >
          Rango(hasta)
        </Button>
      )
    },
  },
  {
    accessorKey: "Agua",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
        >
          Agua
        </Button>
      )
    },
  },
  {
    accessorKey: "Alcantarillado",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Alcantarillado
        </Button>
      )
    },
  },
  {
    accessorKey: "Sanamiento",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sanamiento
        </Button>
      )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original
      const ajuste = row.original
      const { setAccion } = useStateContext();
      return (
        <div onClick={()=>{setAccion("editar")}}>
          <IconButton>
            <EyeOpenIcon className="w-[20px] h-[20px]"/>
          </IconButton>
        </div>
      )
    },
  },

]
