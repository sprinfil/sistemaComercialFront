import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import IconButton from "../../ui/IconButton"
import {EyeOpenIcon } from '@radix-ui/react-icons';
import { useStateContext } from "../../../contexts/ContextOrdenDeTrabajo"
import { Checkbox } from "@/components/ui/checkbox"
import { ZustandGeneralUsuario } from "../../../contexts/ZustandGeneralUsuario";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrdenDeTrabajo = {
  id: number
  nombre: string
  descripcion: string
  vigencias: string
  momento_cargo: string
  genera_masiva: boolean
  orden_trabajo_accion: orden_trabajo_accion[]
  ordenes_trabajo_cargos: orden_trabajo_cargos[]
  ordenes_trabajo_encadenadas: orden_trabajo_encadenadas[]
  orden_trabajo_catalogo:
  {
    descripcion: string;
  }

}

export type orden_trabajo_accion = {
  id: number
  accion: string
  modelo: string
  campo:string
}

export type orden_trabajo_cargos = {
  id: number
  id_concepto_catalogo: number
  id_orden_trabajo_catalogo: number
}

export type orden_trabajo_encadenadas = {
  id: number
  id_OT_Catalogo_padre: number
  id_OT_Catalogo_encadenada: number
}





export const columns: ColumnDef<OrdenDeTrabajo>[] = [
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
      const OrdenDeTrabajo = row.original
      const { setOrdenDeTrabajo, setAccion } = useStateContext();
      const { setAccionGeneradaEntreTabs } = ZustandGeneralUsuario();
      return (
        <div onClick={()=>{setOrdenDeTrabajo(OrdenDeTrabajo);setAccionGeneradaEntreTabs("ver")}}>
          <IconButton>
            <EyeOpenIcon className="w-[20px] h-[20px]"/>
          </IconButton>
        </div>
      )
    },
  },

]
