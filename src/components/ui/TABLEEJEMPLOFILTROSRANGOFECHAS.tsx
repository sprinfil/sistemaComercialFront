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

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    id: "operador",
    accessorKey: "operador.nombre_completo",
    header: "Operador",
  },
  {
    id: "lectura",
    accessorKey: "lectura",
    header: "Lectura",
    cell: ({ row }) => {
      let lectura = row.getValue("lectura")?.toString();

      return <div className="">{lectura} m3</div>;
    },
    filterFn: (row, columnId, value) => {
      const lectura = row.getValue(columnId);
      return lectura !== undefined && lectura !== null && lectura.toString().includes(value);
    },
  },
  {
    id: "fecha_creacion",
    accessorKey: "fecha_creacion",
    header: "Fecha de lectura",
    cell: ({ row }) => {
      const fecha_creacion = row.getValue("fecha_creacion");
      const fechaInicial = new Date(fecha_creacion);

      // Formateamos las fechas
      const opcionesFormato = { day: "2-digit", month: "short", year: "numeric" }; // Ejemplo: 20 ENE 2021
      const fechaInicialFormateada = fechaInicial.toLocaleDateString("es-ES", opcionesFormato).toUpperCase();

      const formatted = `${fechaInicialFormateada}`;

      return <div className="">{formatted}</div>;
    },
  },
  {
    accessorKey: "periodo",
    header: "Periodo",
    cell: ({ row }) => {
      const periodo = row.getValue("periodo");
      const fechaInicial = new Date(periodo?.facturacion_fecha_inicio);
      const fechaFinal = new Date(periodo?.facturacion_fecha_final);

      // Formateamos las fechas
      const opcionesFormato = { day: "2-digit", month: "short", year: "numeric" }; // Ejemplo: 20 ENE 2021
      const fechaInicialFormateada = fechaInicial.toLocaleDateString("es-ES", opcionesFormato).toUpperCase();
      const fechaFinalFormateada = fechaFinal.toLocaleDateString("es-ES", opcionesFormato).toUpperCase();

      const formatted = `${fechaInicialFormateada} - ${fechaFinalFormateada}`;

      return <div className="">{formatted}</div>;
    },
    filterFn: (row, columnId, value) => {
      const periodo = row.getValue(columnId)
      const fechaInicio = new Date(periodo?.facturacion_fecha_inicio)
      const fechaFin = new Date(periodo?.facturacion_fecha_final)

      // Si no hay fechas seleccionadas, mostrar todos los registros
      if (!value || !value.from || !value.to) return true

      // Verificar si las fechas de facturación están dentro del rango seleccionado
      return isWithinInterval(fechaInicio, { start: value.from, end: value.to }) ||
        isWithinInterval(fechaFin, { start: value.from, end: value.to })
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
      <div className="flex items-center py-4">
        <div className="mx-2 flex-col gap-1 flex">
          <p className="ml-1">Operador</p>
          <Input
            placeholder="Operador..."
            value={(table.getColumn("operador")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("operador")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <div className="mx-2 flex-col gap-1 flex w-[100px]">
          <p className="ml-1">Lectura</p>
          <Input
            type="number"
            placeholder=""
            value={(table.getColumn("lectura")?.getFilterValue() as string) ?? ""}
            onChange={(event) => {
              console.log(event.target.value)
              table.getColumn("lectura")?.setFilterValue(event.target.value)
            }
            }
            className="max-w-sm"
          />
        </div>
        <div className="mx-2 flex-col gap-1 flex  w-[150px]">
          <p className="ml-1">Fecha de lectura</p>
          <input
            type="date"
            value={(table.getColumn("fecha_creacion")?.getFilterValue() as string) ?? ""}
            onChange={(event) => {
              console.log(event.target.value)
              table.getColumn("fecha_creacion")?.setFilterValue(event.target.value)
            }
            }
            className="border  rounded-md p-[6px] w-full"
          />
        </div>
        <div className="mx-4">
          <p>Periodo</p>
          <div className={cn("grid gap-2")}>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-[400px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-5 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "d 'de' MMMM 'de' yyyy", { locale: es })} -{" "}
                        {format(date.to, "d 'de' MMMM 'de' yyyy", { locale: es })}
                      </>
                    ) : (
                      format(date.from, "d 'de' MMMM 'de' yyyy", { locale: es })
                    )
                  ) : (
                    <span>Selecciona una fecha</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}

                  numberOfMonths={2}
                  locale={es}
                />
              </PopoverContent>
            </Popover>
          </div>
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