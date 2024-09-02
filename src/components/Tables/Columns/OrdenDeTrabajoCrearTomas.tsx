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
import { useState } from "react"
import { useStateContext } from "../../../contexts/ContextAnomalias"
import { Checkbox } from "@/components/ui/checkbox"
import { ZustandFiltrosOrdenTrabajo } from "../../../contexts/ZustandFiltrosOt"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrdenDeTrabajoCrearTomas = {
  id: number
  id_codigo_toma: string
  descripcion: string
  facturable: string
  estado: boolean
}


export const columns: ColumnDef<OrdenDeTrabajoCrearTomas>[] = [
  {
    id: "select",
    header: ({ table }) => {
        const {setArregloCrearOrdenesDeTrabajo} = ZustandFiltrosOrdenTrabajo();
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
            setArregloCrearOrdenesDeTrabajo(selectedRows);
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
      const {setArregloCrearOrdenesDeTrabajo} = ZustandFiltrosOrdenTrabajo();

      return(
        <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(!!value);

          // Esperar hasta que se complete la actualización y luego obtener las filas seleccionadas
          setTimeout(() => {
            const selectedRows = table.getSelectedRowModel().rows.map(row => row.original);
            setArregloCrearOrdenesDeTrabajo(selectedRows);
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
    accessorKey: "id_codigo_toma",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Codigo de toma
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      //const anomalia = row.original;
      //const { setAnomalia, setAccion } = useStateContext();

      return (
          <IconButton>
            <EyeOpenIcon className="w-[20px] h-[20px]" />
          </IconButton>
      );
    },
  },
];