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
import { useStateContext } from "../../../contexts/ContextAjuste"
import { Checkbox } from "@/components/ui/checkbox"
import { ZustandCargaDeTrabajo } from "../../../contexts/ZustandCargaDeTrabajo"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.



export const columns: ColumnDef<CargaTrabajo>[] = [
  {
    id: "select",
    cell: ({ row }) => (
      <Checkbox
      className="w-[2.7vh] h-[2.7vh]"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "libro.nombre",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-xl text-black"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Libro
        </Button>
      )
    },
  },
  {
    accessorKey: "tiene_encargado.nombre",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-xl text-black"
        >
          Operador asignado
        </Button>
      )
    },
    cell({row}) {
      const encargado = row?.original?.tiene_encargado?.nombre || "";
      const {dataArrayColumns} = ZustandCargaDeTrabajo();
      console.log(dataArrayColumns);
      return encargado === "" ? <div className="text-red-500">No asignado</div>: encargado

    },
  },

  

]