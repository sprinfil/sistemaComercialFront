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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import { FiFilter } from "react-icons/fi";
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { getTomasPorPeriodo } from "../../lib/Services/MonitorAnomaliaService";
import { EyeOpenIcon } from "@radix-ui/react-icons";


export function DataTableMonitorAnomalias({ data, setSelectedToma}) {
  const [selectedId, setSelectedId] = React.useState(0);
  const columns = [
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
      id: "toma",
      accessorKey: "toma.codigo_toma",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
          >
            Toma
          </Button>
        )
      },
      // cell: ({ row }) => {
      //   const data = row.original;
      //   return (
      //     <div className="text-center">{data?.toma?.codigo_toma}</div>
      //   )
      // },
    },
    {
      accessorKey: "libro",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"

          >
            Libro

          </Button>
        )
      },
      cell: ({ row }) => {
        const data = row?.original;

        return (
          <div className="text-center">{data?.toma?.nombre_libro}</div>
        )
      },
    },
    {
      accessorKey: "tipoAnomalia",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"

          >
            Anomalia

          </Button>
        )
      },
      cell: ({ row }) => <div className="text-center">{ }</div>,
    },
    {
      accessorKey: "consumo",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Consumo
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        //console.log(row);
        const data: Object = row.original;
        let formatted: String = "";
        if (data?.consumos[0]?.consumo != null) {
          formatted = data?.consumos[0]?.consumo + " m3";
        } else {
          formatted = "SIN CONSUMO";
        }

        return (
          <div className="text-center">{formatted}</div>
        )
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const toma = row.original

        return (
          <>
            <Button variant="outline"
              onClick={() => {
                setSelectedToma(toma);
                setSelectedId(toma?.toma?.id);

              }}
            ><EyeOpenIcon className="text-black dark:text-white" /></Button>
          </>
        )
      },
    },
  ]

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

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
      <Accordion type="single" collapsible className="mb-3">
        <AccordionItem value="item-1">
          <AccordionTrigger><div className="flex items-center gap-2"><FiFilter /> <p>Filtros</p></div></AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap items-center py-4 gap-2 gap-y-4 px-3 shadow-md border">
              <div className="w-[48%]">
                <p>Toma</p>
                <Input
                  placeholder="Toma"
                  value={(table.getColumn("toma")?.getFilterValue() as string) ?? ""}
                  onChange={(event) =>
                    table.getColumn("toma")?.setFilterValue(event.target.value)
                  }
                  className="max-w-sm"
                />
              </div>
              <div className="w-[48%]">
                <p>Libro</p>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Libro" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Libro</SelectLabel>
                      <SelectItem value="apple">R01L01</SelectItem>
                      <SelectItem value="banana">R01L02</SelectItem>
                      <SelectItem value="blueberry">R01L03</SelectItem>
                      <SelectItem value="grapes">R01L04</SelectItem>
                      <SelectItem value="pineapple">R01L04</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[48%]">
                <p>Consumo</p>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Consumo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Consumo</SelectLabel>
                      <SelectItem value="apple">Con consumo</SelectItem>
                      <SelectItem value="banana">Sin consumo</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

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
                  className={`${row.original?.toma?.id == selectedId ? "bg-green-800 text-white hover:bg-green-800" : ""}`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                    >
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
