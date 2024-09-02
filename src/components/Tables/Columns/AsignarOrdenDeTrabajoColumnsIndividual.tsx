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
import { useEffect, useState } from "react"
import { useStateContext } from "../../../contexts/ContextAnomalias"
import { Checkbox } from "@/components/ui/checkbox"
import { ZustandFiltrosOrdenTrabajo } from "../../../contexts/ZustandFiltrosOt"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type AsignarOrdenDeTrabajoIndividual = {
  id: number
  id_codigo_toma: string
  nombre: string
  descripcion: string
  facturable: string
  estado: boolean
  tomas: tomas[]
}

export type tomas = { 
  id: number,
  id_codigo_toma: string
}




// Configuración de las columnas
export const columns: ColumnDef<AsignarOrdenDeTrabajoIndividual>[] = [
  {
    accessorFn: (row) => {
      // Verifica la estructura de los datos en la consola
      return row.tomas[0].id_codigo_toma;
    },
    id: "tomas.id_codigo_toma",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Codigo de toma
      </Button>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { setOperador, setAccion } = useStateContext();
      return (
        <>
          {/* Aquí puedes agregar botones u otros elementos */}
        </>
      );
    },
  },
]