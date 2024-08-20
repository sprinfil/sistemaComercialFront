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
  numero_casa: string
  colonia: string
  calle: string
  entre_calle_1: string
  entre_calle_2: string
  codigo_postal: string
  localidad: string
  usuario: Usuario
}

export type Usuario = {
  id: number
  nombre: string
  apellido_paterno: string
  apellido_materno: string
  telefono: string
  correo: string
  curp: string
}


export const columns: ColumnDef<BuscarTomaUsuario>[] = [
  {
    accessorFn: (row) => row.usuario?.nombre,
    id: "usuario.nombre",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
        </Button>
      );
    },
  },
  {
    accessorFn: (row) => row.usuario?.apellido_paterno,
    id: "usuario.apellido_paterno",
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
    accessorFn: (row) => row.usuario?.apellido_materno,
    id: "usuario.apellido_materno",
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
    accessorKey: "usuario.telefono",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Teléfono
        </Button>
      )
    },
  },
  {
    accessorKey: "usuario.correo",
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
    accessorKey: "usuario.curp",
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
    accessorKey: "codigo_postal",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Código postal 
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
