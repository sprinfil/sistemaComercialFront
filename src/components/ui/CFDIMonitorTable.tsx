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

export function CFDIMonitorTable<TData, TValue>({
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
              value={(table.getColumn("folio")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("folio")?.setFilterValue(event.target.value)
              }
              className="w-full"
            />
          </div>

          <div className="px-2">
            <p>Timbró</p>
            <Input
              placeholder="Timbro"
              value={(table.getColumn("timbro")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("timbro")?.setFilterValue(event.target.value)
              }
              className="w-full"
            />
          </div>

          <div className="px-2">
            <p>Estado del Timbrado</p>
            <Select onValueChange={(value) => { table.getColumn("estado")?.setFilterValue(value == "cualquiera" ? "" : value) }}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Timbrado" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Estado</SelectLabel>
                  <SelectItem value="cualquiera">Cualquiera</SelectItem>
                  <SelectItem value="realizado">Realizado</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                  <SelectItem value="pendiente">Pendiente</SelectItem>
                  <SelectItem value="fallido">Fallido</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="px-1">
            <p>Fecha de solicitud</p>
            <input type="date"
              name="fecha_nacimiento"
              className=" border border-border  w-full  rounded-md p-[8px] bg-background"
              onChange={(value) => {
                console.log(value.currentTarget.value)
                table.getColumn("fecha_solicitud")?.setFilterValue(value.currentTarget.value)
              }}
            />
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
            <Select onValueChange={(value) => { }}>
              <SelectTrigger className="w-[200px] my-1">
                <SelectValue placeholder="Accion" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Acción</SelectLabel>
                  <SelectItem value="timbrar">Enviar Correo</SelectItem>
                  <SelectItem value="cancelacion">Imprimir Timbre</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className=" flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
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

      <ModalVerPagosMonitor
        selected_pago={selected_pago?.original}
        open={modal_ver_pago}
        set_open={set_modal_ver_pago}
      />

    </>

  )
}
