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
  nombreEstado: string

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
      const estado = row.original.estado; 
      const nombre = row.original.nombre; 

      return (

        <div className="flex items-center w-full justify-between">
        <span>{nombre}</span>
        
        <div className="flex items-center">
          <span className="mr-2">{estado === "activo" ? 'Activo' : 'Inactivo'}</span>
          <span
            className={`flex justify-center items-center w-3 h-3 rounded-full text-white ${estado === "activo" ? 'bg-green-500' : 'bg-red-500'}`}
          >
          </span>
        </div>
      </div>
      );
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
