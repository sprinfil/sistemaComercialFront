import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import IconButton from "../../../ui/IconButton"
import {EyeOpenIcon } from '@radix-ui/react-icons';
import { useStateContext } from "../../../../contexts/ContextMedidores"
import { Checkbox } from "@/components/ui/checkbox"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Medidor = {
  id: number
  numeroSerie: string
  marca: string
  diametro: string
  tipo: string
  estado: boolean
  nombreEstado: string

}


export const columns: ColumnDef<Medidor>[] = [

  {
    accessorKey: "numeroSerie",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Número de serie
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const estado = row.original.estado; 
      const numeroSerie = row.original.numeroSerie; 

      return (

        <div className="flex items-center w-full justify-between">
        <span>{numeroSerie}</span>
        
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
      const medidor = row.original
      const { setMedidor, setAccion } = useStateContext();

      return (
        <div onClick={()=>{setMedidor(medidor);setAccion("ver")}}>
          <IconButton>
            <EyeOpenIcon className="w-[20px] h-[20px]"/>
          </IconButton>
        </div>
      )
    },
  },

]
