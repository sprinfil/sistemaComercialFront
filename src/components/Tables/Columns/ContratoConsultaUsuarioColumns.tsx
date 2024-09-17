import { ColumnDef } from "@tanstack/react-table"
import { Button } from "../../ui/button"
import { useStateContext } from "../../../contexts/ContextContratos"

// Definiciones de tipos
export type BuscarUsuario = {
  id: number
  nombre: string
  apellido_paterno: string
  apellido_materno: string
  nombre_contacto: string
  telefono: string
  curp: string
  rfc: string
  correo: string
  tomas: tomas[]
}

export type tomas = {
  id: number
  id_codigo_toma: string
  codigo_toma: string
  clave_catastral: string
  numero_casa: string
  colonia: string
  calle: string
  entre_calle_1: string
  entre_calle_2: string
  direccion_completa: string
  codigo_postal: string
  localidad: string
}

// Configuración de las columnas
export const columns: ColumnDef<BuscarUsuario>[] = [
  {
    accessorKey: "nombre_completo",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nombre
      </Button>
    ),
  },
  
  {
    accessorKey: "nombre_contacto",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nombre de contacto
      </Button>
    ),
  },
  {
    accessorKey: "telefono",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Telefono
      </Button>
    ),
  },
  {
    accessorKey: "curp",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        CURP
      </Button>
    ),
  },
  {
    accessorKey: "rfc",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        RFC
      </Button>
    ),
  },
  {
    accessorKey: "correo",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Correo
      </Button>
    ),
  },
  {
    accessorFn: (row) => {
      // Verifica la estructura de los datos en la consola
      return row.tomas?.[0].clave_catastral;
    },
    id: "tomas.clave_catastral",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Clave catastral
      </Button>
    ),
  },
  {
    accessorFn: (row) => {
      // Verifica la estructura de los datos en la consola
      return row.tomas?.[0].direccion_completa;
    },
    id: "tomas.direccion_completa",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Direccion
      </Button>
    ),
  },
  {
    accessorFn: (row) => {
      // Verifica la estructura de los datos en la consola
      return row.tomas?.[0].localidad;
    },
    id: "tomas.localidad",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Localidad
      </Button>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { setOperador, setAccion } = useStateContext();
      return (
        <>
          {/* Aquí puedes agregar botones u otros elementos */}
        </>
      );
    },
  },
]
