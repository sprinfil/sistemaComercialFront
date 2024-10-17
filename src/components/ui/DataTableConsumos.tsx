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
import { EyeOpenIcon } from "@radix-ui/react-icons";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import ModalEstablecerConsumo from "./ModalEstablecerConsumo";
import ModalPromediarConsumo from "./ModalPromediarConsumo";
import ModalVerLectura from "./ModalVerLectura";

const data: Consumo[] = [
  {
    id: "m5gr84i9",
    consumo: 20,
    periodo: "ENERO 2024",
  },
]

export type Consumo = {
  id: string
  consumo: number,
  periodo: string,
}

export const columns: ColumnDef<Consumo>[] = [

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
    accessorKey: "consumo",
    header: () => <div className="">Consumo</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("consumo"))

      return <div className="">{amount} m3</div>
    },
  },
  {
    accessorKey: "periodo",
    header: () => <div className="">Periodo</div>,
    cell: ({ row }) => {
      const amount = row.getValue("periodo")
      return <div className="">{amount}</div>
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <>
          <div className=" flex justify-end">
            <ModalVerLectura trigger={<Button><EyeOpenIcon /></Button>} />
          </div>
        </>
      )
    },
  },
]

export function DataTableConsumos() {
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
      <div className="flex items-center py-4">
        <div>
          <Input
            placeholder="Consumo m3"
            value={(table.getColumn("consumo")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("consumo")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <div className="ml-3">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Periodo" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Periodos</SelectLabel>
                <SelectItem value="apple">Enero 2024</SelectItem>
                <SelectItem value="banana">Febrero 2024</SelectItem>
                <SelectItem value="blueberry">Marzo 2024</SelectItem>
                <SelectItem value="grapes">Abril 2024</SelectItem>
                <SelectItem value="pineapple">Mayo 2024</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>



        <div className="ml-auto">
          <ModalEstablecerConsumo
            trigger={<Button className="ml-auto">Establecer Consumo</Button>}
          >
          </ModalEstablecerConsumo>
        </div>

        <ModalPromediarConsumo trigger={<Button className="ml-2">Promediar Consumo</Button>}
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
