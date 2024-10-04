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
import { FiFilter } from "react-icons/fi"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import IconButton from "./IconButton"
import { TbFilterPlus } from "react-icons/tb"
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
  const [abrirFiltro, setAbrirFiltro] = React.useState(false)

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

  const handleAbrirFiltros  = () => {
    if(abrirFiltro)
    {
      setAbrirFiltro(false);
    }
    else
    {
      setAbrirFiltro(true);

    }
  }
console.log(abrirFiltro);
  return (
    <>
      <div className="w-[5vh] h-[5vh] mb-5" onClick={handleAbrirFiltros}>
      <IconButton >
      <TbFilterPlus className="w-[3.5vh] h-[3.5vh]" />
      </IconButton>
    
      </div>

      <div className="">
        {abrirFiltro && 
        <div className="flex space-x-10 border border-border shadow-md rounded-lg p-6 w-full h-[15vh] justify-center mb-[3vh] mt-5">
           <div className="flex-1">
               <p>Codigo de toma</p>
               <Input
                 placeholder="Buscar código de toma..."
                 value={(table.getColumn("toma.codigo_toma")?.getFilterValue() as string) ?? ""}
                 onChange={(event) =>
                   table.getColumn("toma.codigo_toma")?.setFilterValue(event.target.value)
                 }
                 className="w-full"
               />
             </div>
             <div className="flex-1">
               <p>Folio</p>
               <Input
                 placeholder="Buscar folio..."
                 value={(table.getColumn("folio_solicitud")?.getFilterValue() as string) ?? ""}
                 onChange={(event) =>
                   table.getColumn("folio_solicitud")?.setFilterValue(event.target.value)
                 }
                 className="w-full"
               />
             </div>
   
             <div className="flex-1">
               <p>Nombre del contrato</p>
               <Input
                 placeholder="Buscar nombre del contrato..."
                 value={(table.getColumn("nombre_contrato")?.getFilterValue() as string) ?? ""}
                 onChange={(event) =>
                   table.getColumn("nombre_contrato")?.setFilterValue(event.target.value)
                 }
                 className="w-full"
               />
             </div>
   
             <div className="flex-1">
               <p>Clave catastral</p>
               <Input
                 placeholder="Buscar clave catastral..."
                 value={(table.getColumn("clave_catastral")?.getFilterValue() as string) ?? ""}
                 onChange={(event) =>
                   table.getColumn("clave_catastral")?.setFilterValue(event.target.value)
                 }
                 className="w-full"
               />
             </div>
   
             <div className="flex-1">
               <p>Estatus</p>
               <Select onValueChange={(value) => { table.getColumn("estatus")?.setFilterValue(value == "cualquiera" ? "" : value) }}>
                 <SelectTrigger className="w-full">
                   <SelectValue placeholder="Sin filtro" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectGroup>
                     <SelectLabel>Estatus</SelectLabel>
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
        }
     


     <div className="rounded-md border h-full overflow-auto max-h-[70vh]">
     <Table className="mt-5">
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
                      No resultados.
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

     

    </>

  )
}
