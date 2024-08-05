import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import IconButton from "../../ui/IconButton"
import {EyeOpenIcon } from '@radix-ui/react-icons';
import { useStateContext } from "../../../contexts/ContextConcepto"
import { Checkbox } from "@/components/ui/checkbox"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Concepto = {
  id: number
  nombre: string
  descripcion: string
  prioridad_abono: string
  genera_iva: string
  abonable: boolean,
  tarifa_fija: boolean,
  tarifas: Array<{}>
}


export const columns: ColumnDef<Concepto>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
      const concepto = row.original
      const { setConcepto, setAccion } = useStateContext();

      return (
        <tr onClick={()=>{setConcepto(concepto);setAccion("ver")}}>
          <IconButton>
            <EyeOpenIcon className="w-[20px] h-[20px]"/>
          </IconButton>
        </tr>
      )
    },
  },

]
