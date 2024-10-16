import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import IconButton from "../../ui/IconButton"
import { TrashIcon, Pencil2Icon, PlusCircledIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from "react"
import { useStateContext } from "../../../contexts/ContextAnomalias"
import { Checkbox } from "@/components/ui/checkbox"
import { ZustandFiltrosOrdenTrabajo } from "../../../contexts/ZustandFiltrosOt"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type AsignarOrdenDeTrabajo = {
  id: number
  clave_catastral: string
  nombre: string
  descripcion: string
  facturable: string
  estado: boolean
  saldo: string
}




export const columns: ColumnDef<AsignarOrdenDeTrabajo>[] = [
  {
    id: "select",
    header: ({ table }) => {
        const {setArregloOrdenesDeTrabajoParaAsignarAOperador} = ZustandFiltrosOrdenTrabajo();
      return(
        <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        
        onCheckedChange={(value) => {
          // Actualizar la selección de todas las filas
          table.toggleAllPageRowsSelected(!!value);

          // Esperar hasta que se complete la actualización y luego obtener las filas seleccionadas
          setTimeout(() => {
            const selectedRows = table.getSelectedRowModel().rows.map(row => row.original);
            setArregloOrdenesDeTrabajoParaAsignarAOperador(selectedRows);
            if (selectedRows.length === 0) {
              console.log("No rows selected.");
            } else {
              console.log("Selected Rows:", selectedRows);
            }
          }, 0); // Ejecuta después de que la actualización se haya aplicado
        }}
        aria-label="Select all"
      />
      )
     
      },
    cell: ({ row, table }) => {
      const {setArregloOrdenesDeTrabajoParaAsignarAOperador} = ZustandFiltrosOrdenTrabajo();

      return(
        <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(!!value);

          // Esperar hasta que se complete la actualización y luego obtener las filas seleccionadas
          setTimeout(() => {
            const selectedRows = table.getSelectedRowModel().rows.map(row => row.original);
            setArregloOrdenesDeTrabajoParaAsignarAOperador(selectedRows);
            if (selectedRows.length === 0) {
              console.log("No rows selected.");
            } else {
              console.log("Selected Rows:", selectedRows);
            }
          }, 0); // Ejecuta después de que la actualización se haya aplicado
        }}
        aria-label="Select row"
      />
      )
     
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "toma.codigo_toma",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Toma
      </Button>
    ),
  },
  {
    accessorKey: "toma.usuario.nombre",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nombre del usuario
      </Button>
    ),
  },
  {
    accessorKey: "toma.direccion_completa",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Dirección
      </Button>
    ),
  },
  {
    accessorKey: "orden_trabajo_catalogo.nombre",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Tipo
      </Button>
    ),
  },
  {
    accessorKey: "toma.saldo",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Saldo
      </Button>
    ),
  },
  {
    accessorKey: "estado",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Estado
      </Button>
    ),
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Creada
      </Button>
    ),
  },
  {
    accessorKey: "fecha_finalizada",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Concluida
      </Button>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const anomalia = row.original;
      const { setAnomalia, setAccion } = useStateContext();

      return (
        <div onClick={() => { setAnomalia(anomalia); setAccion("ver") }}>
         
        </div>
      );
    },
  },
];