"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal, PlusCircleIcon } from "lucide-react"
import { ZustandMultas } from "../../contexts/ZustandMultas"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import axiosClient from "../../axios-client"
import IconButton from "./IconButton"
import { getMultas } from "../../lib/MultasService"
import ModalModificarMulta from "./ModalModificarMulta"
import { EyeOpenIcon } from "@radix-ui/react-icons"
import ModalMonitorMultas from "./ModalMonitorMultas"

export type Multas = {
  id: number;
  nombre: string;
  descripcion: string;
  UMAS_min: string;
  UMAS_max: string;
  estatus: boolean;
  codigo_toma: number;
  nombre_multa: string;
  operador_levanto_multa: string;
  nombre_operador_revisor: string; 
  monto: string; 
  estado: string;
  fecha_solicitud: string;
  fecha_revision: string;
  motivo: string;
  nombre_multado: string;
}



export const columns: ColumnDef<Multas>[] = [
  
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
    accessorKey: 'codigo_toma',
    header: 'Código de toma', 
    cell: ({ row }) => row?.original?.codigo_toma, 
  },
  {
    accessorKey: 'nombre_multado',
    header: 'Nombre del usuario', 
    cell: ({ row }) => row?.original?.nombre_multado, 
  },
  {
    accessorKey: 'nombre_multa',
    header: 'Multa', 
    cell: ({ row }) => row?.original?.nombre_multa, 
  },
  {
    accessorKey: 'motivo',
    header: 'Motivo', 
    cell: ({ row }) => row?.original?.motivo, 
  },
  {
    accessorKey: 'estado',
    header: 'Estado', 
    cell: ({ row }) => row?.original?.estado, 
  },

 
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      console.log(row?.original);
      const [abrirModal, setAbrirModal] = React.useState(false);
      const handleVerDetalles = () => 
      {
        setAbrirModal(true);

      }
      return (
        <>
        <ModalMonitorMultas isOpen={abrirModal} setIsOpen={setAbrirModal} idMulta={row?.original}/>

         <IconButton onClick={handleVerDetalles}>
         <EyeOpenIcon className="w-[20px] h-[20px]"/>
         </IconButton>
        </>
      )
    },
  },
]

export function DataTableMonitorMultas({ data }) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const {setMultas, setAccionMulta} = ZustandMultas();



  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const handleRowClick = (row: any) => {
    setMultas(row.original); // Almacena la fila seleccionada
    setAccionMulta("ver");
  };

  const handleCrearNuevaMulta = () => 
  {
    setAccionMulta("crear");

  }

  return (
    <div className="w-full p-2">
      
      <div className="flex items-center mb-2 mt-2 w-full justify-center">
        <Input
          placeholder="Filtrar multas..."
          value={(table.getColumn("nombre")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("nombre")?.setFilterValue(event.target.value)
          }
          className="w-full"
        />
        
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => handleRowClick(row)} // Evento para seleccionar la fila completa
                  className={row.getIsSelected() ? 'bg-gray-100' : ''} // Estilo condicional
                >
                 {row.getVisibleCells().map((cell) => {
              console.log("Datos de la celda:", cell.getValue()); // Verifica los valores de la celda
              return (
                  <TableCell key={cell.id}>
                      {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                      )}
                  </TableCell>
              );
})}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} filas(s) seleccionadas.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}
