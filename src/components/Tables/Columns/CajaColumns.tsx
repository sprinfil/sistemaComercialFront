import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import IconButton from "../../ui/IconButton"
import { EyeOpenIcon } from '@radix-ui/react-icons';
import { Checkbox } from "@/components/ui/checkbox"
import { useStateContext } from "../../../contexts/ContextCaja"
import { ZustandGeneralUsuario } from '../../../contexts/ZustandGeneralUsuario';

// Define the type for Caja
export type Caja = {
  id: number
  id_cuenta_contable: number
  nombre_caja: string
  hora_apertura: string
  hora_cierre: string
  operadorAsignado: operadorAsignado[]
}

export type operadorAsignado = {
  id: number
  id_operador: number
  id_caja_catalogo: number
}

export const columns: ColumnDef<Caja>[] = [
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
    accessorKey: "nombre_caja",
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
      const caja = row.original
      const { setCaja, setAccion } = useStateContext();
      const { setAccionGeneradaEntreTabs } = ZustandGeneralUsuario(); // Usar el hook aquí
      
      return (
        <div onClick={() => {
          setCaja(caja);
          setAccionGeneradaEntreTabs("ver");
        }}>
          <IconButton>
            <EyeOpenIcon className="w-[20px] h-[20px]" />
          </IconButton>
        </div>
      )
    },
  },
]
