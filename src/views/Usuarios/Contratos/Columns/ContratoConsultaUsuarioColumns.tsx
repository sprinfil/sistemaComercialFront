import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "../../../../components/ui/button"
import IconButton from "../../../../components/ui/IconButton"
import {EyeOpenIcon } from '@radix-ui/react-icons';
import { useStateContext } from "../ContextContratos";
import { Checkbox } from "../../../../components/ui/checkbox"

// AQUI VAN TODOS LOS DATOS QUE SE REQUIERAN PARA HACER UNA BUSQUEDA ESPECIFICA
export type ContratoBuscarUsuario = {
  id: number
  nombre: string
  apellido_paterno: string
  apellido_materno: string
  nombre_contacto: string
  telefono: string
  curp: string
  rfc: string
  correo: string
}


export const columns: ColumnDef<ContratoBuscarUsuario>[] = [
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
        </Button>
      )
    },
  },
  {
    accessorKey: "apellido_paterno",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Apellido paterno
        </Button>
      )
    },
  },
  {
    accessorKey: "apellido_materno",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Apellido materno
        </Button>
      )
    },
  },
  {
    accessorKey: "nombre_contacto",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre de contacto
        </Button>
      )
    },
  },
  {
    accessorKey: "telefono",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Telefono
        </Button>
      )
    },
  },
  {
    accessorKey: "curp",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          CURP
        </Button>
      )
    },
  },
  {
    accessorKey: "rfc",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          RFC
        </Button>
      )
    },
  },
  {
    accessorKey: "correo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Correo
        </Button>
      )
    },
  },
  
  {
    id: "actions",
    cell: ({ row }) => {
      const TipoDeToma = row.original
      const {setOperador, setAccion } = useStateContext();

      return (
        <div onClick={()=>{setOperador(TipoDeToma);setAccion("ver")}}>
          <IconButton>
            <EyeOpenIcon className="w-[20px] h-[20px]"/>
          </IconButton>
        </div>
      )
    },
  },

]
