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
import { ArrowUpDown, ChevronDown, EyeIcon, MoreHorizontal } from "lucide-react"

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
import { TarifaServicios, TarifaServicio, TarifaServicioDetalle } from "../../lib/Services/TarifaService"
import IconButton from "./IconButton"
import { Pencil2Icon } from "@radix-ui/react-icons"


export const columns: ColumnDef<TarifaServicioDetalle>[] = [
  {
    id: "rango",
    header: "Rango",
    accessorKey: "rango",
    filterFn: "includesString",
    cell: ({ row }) => {
      const tarifaServicio: TarifaServicioDetalle = row.original;
      return (<div>{tarifaServicio?.rango} m3</div>)
    }
  },
  {
    id: "agua",
    header: ({ table }) => {
      return (
        <div className="flex flex-col items-center py-2 gap-2">
          <p>Agua</p>
          <Button className="w-[35%] h-6" variant="destructive">No Genera IVA</Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const tarifaServicio: TarifaServicioDetalle = row.original;
      return (
        <div className="flex items-center justify-center">
          {tarifaServicio?.agua ? tarifaServicio.agua.toFixed(2) : "0.00"}
        </div>
      );
    }
  },
  {
    id: "agua",
    header: ({ table }) => {
      return (
        <div className="flex flex-col items-center py-2 gap-2">
          <p>Alcantarillado</p>
          <Button className="w-[35%] h-6" >Genera IVA</Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const tarifaServicio: TarifaServicioDetalle = row.original;
      return (
        <div className="flex items-center justify-center">
          {tarifaServicio?.alcantarillado ? tarifaServicio.agua.toFixed(2) : "0.00"}
        </div>
      );
    }
  },
  {
    id: "agua",
    header: ({ table }) => {
      return (
        <div className="flex flex-col items-center py-2 gap-2">
          <p>Saneamiento</p>
          <Button className="w-[35%] h-6" >Genera IVA</Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const tarifaServicio: TarifaServicioDetalle = row.original;
      return (
        <div className="flex items-center justify-center">
          {tarifaServicio?.agua ? tarifaServicio.saneamiento.toFixed(2) : "0.00"}
        </div>
      );
    }
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <IconButton>
          <Pencil2Icon />
        </IconButton>
      )
    },
  },
]
interface DataTableTarifaServicioProps {
  tipoToma: any;
  Tarifa: any;
}

export function DataTableTarifaServicio({ tipoToma, Tarifa }: DataTableTarifaServicioProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [data, setData] = React.useState<TarifaServicioDetalle[]>([]);

  React.useEffect(() => {
    setData(TarifaServicios.detalle);
  }, [])

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

  return (
    <div className="w-full">
      <div className="flex items-center py-4 px-1">
        <Input
          type="number"
          placeholder="Rango ..."
          value={(table.getColumn("rango")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("rango")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
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
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
