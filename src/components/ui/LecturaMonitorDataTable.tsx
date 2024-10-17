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
import React, { useState } from "react"

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
import ModalVerFactibilidadMonitor from "./ModalVerFactibilidadMonitor"
// import ModalVerAjusteMonitor from "./ModalVerAjusteMonitor"
import { ExternalLinkIcon } from "lucide-react"
import IconButton from "./IconButton"
import * as XLSX from "xlsx";
import axiosClient from "../../axios-client"
import ModalImportarExcelMonitorLectura from "./ModalImportarExcelMonitorLectura"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onRowClick?: (data: TData) => void // Añadido
}

export function LecturaMonitorDataTable<TData, TValue>({
  columns,
  data,
  onRowClick, // Añadido
}: DataTableProps<TData, TValue>) {

  const [selected_ajuste, set_selected_ajuste] = useState<TData | undefined>(undefined);
  //const [modal_ver_fact, set_modal_ver_fact] = useState(false);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = React.useState({})
  //para el modal de importar excel
  const [openModal, setOpenModal] = React.useState(false)

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


  const handleAbrirModal = () => {
    setOpenModal(true);
  }

  return (
    <>
    
      <div className="px-2 flex gap-4">

        <div className=" flex flex-col gap-2 py-4 max-h-[70vh] no-scrollbar overflow-auto text-muted-foreground w-[15%]">
         <b>Filtros</b>
          <div className="px-2">
            <p>Folio</p>
            <Input
              placeholder="Folio"
              value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("id")?.setFilterValue(event.target.value)
              }
              className="w-full"
            />
          </div>

          <div className="px-2">
            <p>Estatus</p>
            <Select onValueChange={(value) => { table.getColumn("estatus")?.setFilterValue(value === "cualquiera" ? "" : value) }}>
              <SelectTrigger className="w-full">  
                <SelectValue placeholder="Estatus" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Estatus</SelectLabel>
                  <SelectItem value="activo">Activo</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                  <SelectItem value="incumplido">Incumplido</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="px-1">
            <p>Fecha de creación</p>
            <input type="date"
              name="fecha_creacion"
              className=" border border-border  w-full  rounded-md p-[8px] bg-background"
              onChange={(event) => {
                table.getColumn("fecha_creacion")?.setFilterValue(event.target.value)
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
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>

              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      onClick={() => onRowClick && onRowClick(row.original)} // Manejo del clic
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

          <div className=" flex items-center justify-between space-x-2 py-4">
            <div className="flex space-x-2 ml-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}>
                Anterior
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}>
                Siguiente
              </Button>
            </div>
          </div>

          <div className=" flex items-center justify-between space-x-2 py-4">
          <div className="flex space-x-2">
              {/* <Button className="w-full">Exportar PDF ?</Button> */}
              <Button onClick={handleAbrirModal}>Importar Excel</Button> {/* Botón para iniciar la importación */}
                
            </div>
          </div>

        </div>
      </div>

      {/**modal */}
      <ModalImportarExcelMonitorLectura
        open={openModal} 
        setOpen={setOpenModal}
      />

      {/* {selected_ajuste && (
        <ModalVerAjusteMonitor
        selected_ajuste={selected_ajuste}
          open={modal_ver_ajuste}
          set_open={modal_ver_ajuste}
        />
      )} */}

    </>
  )
}
