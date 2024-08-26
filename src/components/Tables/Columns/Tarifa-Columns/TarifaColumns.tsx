import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import IconButton from "../../../ui/IconButton"
import {EyeOpenIcon } from '@radix-ui/react-icons';
import { useStateContext } from "../../../../contexts/ContextTarifa"
import { Checkbox } from "@/components/ui/checkbox"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Tarifa = {
  id: number
  nombre: string
  descripcion: string
  fecha: string
  estado: boolean
}


export const columns: ColumnDef<Tarifa>[] = [

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
    cell: ({ row }) => {
      const estado = row.getValue("estado")
     
      const nombre = row.getValue("nombre")
      return <div className="">{nombre}  <span className="bg-green-500"> {estado ? "Tarifa Activa":""}</span></div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const tarifa = row.original
      const { setTarifa, setAccion } = useStateContext();

      return (
        <div onClick={()=>{setTarifa(tarifa);setAccion("ver")}}>
          <IconButton>
            <EyeOpenIcon className="w-[20px] h-[20px]"/>
          </IconButton>
        </div>
      )
    },
  },

]
