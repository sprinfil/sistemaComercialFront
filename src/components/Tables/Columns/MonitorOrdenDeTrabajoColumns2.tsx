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
export type MonitorOrden2 = {
  id: number
  nombre: string
  descripcion: string
  facturable: string
  estado: boolean
  created_at: string
  toma: {
    codigo_toma: string
    saldo: string
    libro:
  {
    nombre:string
  }
  usuario:{
    nombre_completo: string
    nombre: string
  }
  }
  orden_trabajo_catalogo:
  {
    descripcion: string
  }
  
}


export const columns2: ColumnDef<MonitorOrden2>[] = [
  {
    id: "select",
    header: ({ table }) => {
        const {setArregloOrdenesDeTrabajoParaAsignarAOperador, setInformacionCerrarOtMasivamente} = ZustandFiltrosOrdenTrabajo();
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
            setInformacionCerrarOtMasivamente(selectedRows);
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
      const {setArregloOrdenesDeTrabajoParaAsignarAOperador, setInformacionCerrarOtMasivamente} = ZustandFiltrosOrdenTrabajo();

      return(
        <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(!!value);

          // Esperar hasta que se complete la actualización y luego obtener las filas seleccionadas
          setTimeout(() => {
            const selectedRows = table.getSelectedRowModel().rows.map(row => row.original);
            setInformacionCerrarOtMasivamente(selectedRows);
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
    accessorFn: (row) => {
      return row.toma?.codigo_toma;
    },
    id: "toma.codigo_toma",
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
        Nombre
      </Button>
    ),
    cell: ({ row }) => {
      console.log("Nombre:", row?.original?.toma?.usuario?.nombre); // Verifica si el saldo es accesible
      return <span>{ row?.original?.toma?.usuario?.nombre}</span>;
    }
  },
  {
    accessorFn: (row) => {
      return row.toma?.saldo;
    },
    id: "toma.saldo",
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
    accessorFn: (row) => {
      return row.orden_trabajo_catalogo?.descripcion;
    },
    id: "orden_trabajo_catalogo.descripcion",
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
    accessorKey: "estado",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Estado
        </Button>
      )
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Fecha de creación
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
        Fecha de finalización
      </Button>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const anomalia = row.original
      const { setAnomalia, setAccion } = useStateContext()
      const {setIsOpenPadreModalDetalleMonitorOT} =  ZustandFiltrosOrdenTrabajo();
      const handleAbrirEnOjo = () => 
      {
        setIsOpenPadreModalDetalleMonitorOT(true);

      }
      return (
        <div onClick={()=>{setAnomalia(anomalia);setAccion("ver")}}>
          <IconButton onClick={handleAbrirEnOjo}>
            <EyeOpenIcon className="w-[20px] h-[20px]"/>
          </IconButton>
        </div>
      )
    },
  },

]