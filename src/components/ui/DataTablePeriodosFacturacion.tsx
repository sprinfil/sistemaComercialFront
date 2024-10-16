import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import React from "react"
import { ComboboxRutas } from "./ComboBoxRutas"
import { Button } from "./button"
import { Link, Navigate } from "react-router-dom"
import Loader from "./Loader"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

type Payment = {
  id: string
  periodo: string
  estado: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "nombre",
    header: "Periodo",
  },
  {
    accessorKey: "estatus",
    header: "Estado",
    cell: ({ row }) => {
      let estatus = row.original.estatus;
      let formatted = "";
      let styles = "";
      if (estatus == "activo") {
        formatted = "Activo"
        styles = "bg-green-500"
      }
      if (estatus == "cerrado") {
        formatted = "Cerrado"
        styles = "bg-red-500"
      }

      return <div className="flex gap-2 items-center w-[100px] justify-between">
        {formatted}
        <div className={`w-3 rounded-full ${styles} h-3`}></div>
      </div>
    },
  },
  {
    id: "actions",
    // cell: ({ row }) => {
    //   const payment = row.original
    //   return (
    //     <div className="flex justify-end">
    //       <Button onClick={() => { setDetalle(row.original) }} >
    //         Ver
    //       </Button>
    //     </div>
    //   )
    // },
  },
]

export function DataTablePeriodosFacturacion<TData, TValue>({
  columns,
  data,
  setDetalle,
  loadingData
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  })

  return (
    <>
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
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}

                    </TableCell>
                  ))}
                  <div className="h-full w-fullitems-center flex justify-center mt-2">
                    <Button onClick={() => { setDetalle(row.original) }} >
                      Ver
                    </Button>
                  </div>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}