import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "../../ui/button"
import IconButton from "../../ui/IconButton"
import {EyeOpenIcon } from '@radix-ui/react-icons';
import { useStateContext } from "../../../contexts/ContextContratos";
import { Checkbox } from "../../ui/checkbox"

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
       <>
       </>
      )
    },
  },

]
