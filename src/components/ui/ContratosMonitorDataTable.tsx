"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  getFilteredRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React, { useEffect, useState } from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ModalVerPago from "./ModalVerPago"
import ModalVerPagosMonitor from "./ModalVerPagosMonitor"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function ContratosMonitorDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {

  const [selected_pago, set_selected_pago] = useState();
  const [modal_ver_pago, set_modal_ver_pago] = useState(false);

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      columnFilters,
      rowSelection,
    },
  })

  return (
    <>

      <div className="px-2 flex gap-4">

        <div className=" flex flex-col gap-2 py-4 max-h-[70vh] no-scrollbar overflow-auto text-muted-foreground w-[15%]">
          <div className="px-2">
            <p>Folio</p>
            <Input
              placeholder="Folio"
              value={(table.getColumn("folio_solicitud")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("folio_solicitud")?.setFilterValue(event.target.value)
              }
              className="w-full"
            />
          </div>

          <div className="px-2">
            <p>Nombre del contrato</p>
            <Input
              placeholder="Nombre del contrato"
              value={(table.getColumn("nombre_contrato")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("nombre_contrato")?.setFilterValue(event.target.value)
              }
              className="w-full"
            />
          </div>

          <div className="px-2">
            <p>Clave catastral</p>
            <Input
              placeholder="Clave catastral"
              value={(table.getColumn("clave_catastral")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("clave_catastral")?.setFilterValue(event.target.value)
              }
              className="w-full"
            />
          </div>

          <div className="px-2">
            <p>Estatus</p>
            <Select onValueChange={(value) => { table.getColumn("estatus")?.setFilterValue(value == "cualquiera" ? "" : value) }}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Timbrado" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Estado</SelectLabel>
                  <SelectItem value="pendiente de pago">Pendiente de pago</SelectItem>
                  <SelectItem value="contrato no factible">No factible</SelectItem>
                  <SelectItem value="pendiente de inspeccion">Pendiente de inspección</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                  <SelectItem value="terminado">Terminado</SelectItem>
                  <SelectItem value=" ">Sin filtro</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

       

        </div>

        <div className="w-[85%] p-4">

          <div className="rounded-md border max-h-[55vh] overflow-auto">
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
                    //onClick={() => { set_selected_pago(row); set_modal_ver_pago(true) }}
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


          <div className="flex items-center justify-end space-x-2 py-4">
            
            <div className=" flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} fila(s) seleccionadas.
            </div>

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

     

    </>

  )
}
