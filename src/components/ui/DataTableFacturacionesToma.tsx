"use client"
import { es } from "date-fns/locale"
import { isWithinInterval } from "date-fns";
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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import React, { useEffect } from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Select } from "./select";
import IconButton from "./IconButton";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import ModalVerFacturacion from "./ModalVerFacturacion";

type Factura = {
  id: number
  periodo: string
  total: number
  consumo: number
  tipoServicio: string
}

export const columns: ColumnDef<Factura>[] = [
  {
    accessorKey: "periodo",
    header: "Periodo",
    cell: ({ row }) => {
      const info = row.original
      console.log(info)
      return (
        <>
          <p>{info[0]?.periodo?.nombre.toUpperCase()}</p>
        </>
      )
    }
  },
  {
    accessorKey: "consumo",
    header: "Consumo",
    cell: ({ row }) => {
      const info = row.original
      console.log(info)
      return (
        <>
          <p>{info[0]?.consumo?.consumo} m3</p>
        </>
      )
    }
  },
  {
    accessorKey: "tipoServicio",
    header: "Tipo de servicio",
    cell: ({ row }) => {
      const info = row.original
      console.log(info)
      return (
        <>
          <p>{info[0]?.consumo?.tipo.toUpperCase()}</p>
        </>
      )
    }
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      const info = row.original
      console.log(info)
      return (
        <>
          <p>$ {info[0]?.monto}</p>
        </>
      )
    }
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <>
          <ModalVerFacturacion trigger={
            <IconButton>
              <EyeOpenIcon />
            </IconButton>
          } />
        </>
      )
    },
  },
]

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTableFacturacionesToma<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [date, setDate] = React.useState<DateRange | undefined>()

  useEffect(() => {
    table.getColumn("periodo")?.setFilterValue(date)
  }, [date])

  const table = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnFilters,
    },
  })

  return (
    <>
      <div className="flex items-center py-4  gap-3">
        <div className="">

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccionar Periodo" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Periodos</SelectLabel>
                <SelectItem value="apple">ENERO 2024</SelectItem>
                <SelectItem value="banana">FEBRERO 2024</SelectItem>
                <SelectItem value="blueberry">MARZO 2024</SelectItem>
                <SelectItem value="grapes">ABRIL 2024</SelectItem>
                <SelectItem value="pineapple">MAYO 2024</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="">
          <Button>Facturar (periodo actual)</Button>
        </div>
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
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
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