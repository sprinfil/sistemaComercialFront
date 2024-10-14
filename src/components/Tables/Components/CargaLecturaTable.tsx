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
import { TbFilterPlus } from "react-icons/tb"
import IconButton from "../../ui/IconButton"
import { ZustandCargaDeTrabajo } from "../../../contexts/ZustandCargaDeTrabajo"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export type CargaTrabajo = {
  id: number
  nombre: string

  descripcion: string
  estado: boolean
  libro:
  {
    nombre: string
  }
  tiene_encargado:
  {
    nombre: string
  }
}

export const columns: ColumnDef<CargaTrabajo>[] = [
  // {
  //   id: "select",

  //   cell: ({ row }) => (
  //     <Checkbox
  //       className="w-[2.7vh] h-[2.7vh]"
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorFn: (row) => {
      return row?.libro?.nombre;
    },
    id: "libro.nombre",
    header: ({ column }) => (
      <Button
        className="text-2xl text-black"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Libro
      </Button>
    ),
  },
  {
    accessorFn: (row) => {
      return row?.tiene_encargado?.nombre;
    },
    id: "tiene_encargado.nombre",
    header: ({ column }) => (
      <Button
        className="text-2xl text-black"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Encargado
      </Button>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original
      return (
        <>
        </>
      )
    },
  },
]

export function CargaLecturaDataTable({ data }) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [booleanAbrir, setBooleanAbrir] = React.useState(false)

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

  const handleAbrirCerrarFiltros = () => {
    if (booleanAbrir) {
      setBooleanAbrir(false);
    }
    else {
      setBooleanAbrir(true);
    }
  }
  const { setFilasSeleccionadasCargaTrabajo } = ZustandCargaDeTrabajo(); // Hook para Zustand

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
      <div className="flex flex-col w-full">

      <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div className="flex space-x-1">
            <div>
            <TbFilterPlus className="w-[3vh] h-[3vh]" />

            </div>
          <div className="text-xl">Filtros</div>
          </div>

          </AccordionTrigger>
        <AccordionContent>
        <div className="flex flex-col w-full">
              <div className="flex-1">
                <Input
                  placeholder="Filtrar por libros..."
                  value={(table.getColumn("libro.nombre")?.getFilterValue() as string) ?? ""}
                  onChange={(event) =>
                    table.getColumn("libro.nombre")?.setFilterValue(event.target.value)
                  }
                  className="flex-1 mt-5"
                />


              </div>

              <div className="flex-1">
                <Input
                  placeholder="Filtrar por encargado..."
                  value={(table.getColumn("tiene_encargado.nombre")?.getFilterValue() as string) ?? ""}
                  onChange={(event) =>
                    table.getColumn("tiene_encargado.nombre")?.setFilterValue(event.target.value)
                  }
                  className="flex-1 mt-5"
                />
              </div>


            </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
      <IconButton onClick={handleAbrirCerrarFiltros}>

        </IconButton>

        {booleanAbrir &&

          <>

            <div>



            </div>











          </>

        }
      </div>


      </div>
      <div className="rounded-md border">
        <Table className="w-[50vh]">
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
                className={`text-xl cursor-pointer ${row.getIsSelected() ? "bg-gray-500" : ""}`}  // Aplica el fondo gris si está seleccionada
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                onClick={() => { table.getRowModel().rows.forEach(r => r.toggleSelected(false)); row.toggleSelected(); setFilasSeleccionadasCargaTrabajo(row.original); } }  // Selecciona/deselecciona al hacer clic en la fila

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
