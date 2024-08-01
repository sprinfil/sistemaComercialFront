import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "../../ui/button"
import IconButton from "../../ui/IconButton"
import {EyeOpenIcon } from '@radix-ui/react-icons';
import { useStateContext } from "../../../contexts/ContextContratos";
import { Checkbox } from "../../ui/checkbox"

// AQUI VAN TODOS LOS DATOS QUE SE REQUIERAN PARA HACER UNA BUSQUEDA ESPECIFICA
export type BuscarTomaUsuario = {
  id: number
  clave_catastral: string
  calle: string
  numero_casa: string
  entre_calle_1: string
  entre_calle_2: string
  colonia: string
  codigo_postal: string
  localidad: string
}


export const columns: ColumnDef<BuscarTomaUsuario>[] = [
  {
    accessorKey: "clave_catastral",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Clave catastral
        </Button>
      )
    },
  },
  {
    accessorKey: "calle",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Calle
        </Button>
      )
    },
  },
  {
    accessorKey: "numero_casa",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          #
        </Button>
      )
    },
  },
  {
    accessorKey: "entre_calle_1",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Entre calle 1
        </Button>
      )
    },
  },
  {
    accessorKey: "entre_calle_2",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Entre calle 2
        </Button>
      )
    },
  },
  {
    accessorKey: "colonia",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Colonia
        </Button>
      )
    },
  },
  {
    accessorKey: "codigo_postal",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Codigo postal 
        </Button>
      )
    },
  },
  {
    accessorKey: "localidad",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Localidad 
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
