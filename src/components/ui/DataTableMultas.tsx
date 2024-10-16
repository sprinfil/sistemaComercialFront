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
import { ArrowUpDown, ChevronDown, MoreHorizontal, PlusCircleIcon } from "lucide-react"
import { ZustandMultas } from "../../contexts/ZustandMultas"
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
import axiosClient from "../../axios-client"
import IconButton from "./IconButton"
import { getMultas } from "../../lib/MultasService"
import { EyeOpenIcon } from "@radix-ui/react-icons"
import { ImCancelCircle } from "react-icons/im"
import ModalEstasSeguroMulta2 from "./ModalEstasSeguroMulta2"
import ModalDetalleMulta from "./ModalDetalleMulta"

export type Multas = {
  id: number;
  nombre: string;
  descripcion: string;
  UMAS_min: string;
  UMAS_max: string;
  estatus: boolean;

}



export const columns: ColumnDef<Multas>[] = [
  
  {
    id: "select",
   
    cell: ({ row }) => (
      <Checkbox
      className="w-[3vh] h-[3vh]"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'nombre_multa',
    header: 'Nombre', 
    cell: ({ row }) => row?.original?.nombre_multa || 'Sin nombre', 
  },
  {
    accessorKey: 'estado',
    header: 'Estado', 
    cell: ({ row }) => row?.original?.estado, 
  },
  {
    accessorKey: 'monto',
    header: 'Monto', 
    cell: ({ row }) => row?.original?.monto, 
  },
  {
    accessorKey: 'comentario',
    header: 'Comentario', 
    cell: ({ row }) => row?.original?.monto, 
  },

 
 
  {
    id: "actions",
    header: 'Acciones', 
    cell: ({ row }) => {
      const anomalia = row.original
      const {abrirModalCancelacion, setAbrirModalCancelacion} = ZustandMultas();
      const [abrirModal, setAbrirModal] = React.useState(false);
      const [abrirModalDetalle, setAbrirModalDetalle] = React.useState(false);

      const handleAbrirModal = () => {
        setAbrirModal(true);
    }
    const handleAbrirModal2 = () => {
      setAbrirModalDetalle(true);
  }
    
      return (
        <>
        <div className="flex space-x-2">
        <div onClick={()=>{handleAbrirModal2;setAbrirModal(true)}} title="Ver detalles">
          <IconButton title="Ver detalle">
            <EyeOpenIcon className="w-[3vh] h-[3vh]"/>
          </IconButton>
        </div>
          <div onClick={()=>{handleAbrirModal;setAbrirModalDetalle(true)}} title="Cancelar multa">
          <IconButton title="Cancelar multa">
            <ImCancelCircle className="w-[2.2vh] h-[2.2vh] mt-[2px]"/>
          </IconButton>
        </div>
        </div>
        <ModalEstasSeguroMulta2 open={abrirModalDetalle} setIsOpen={setAbrirModalDetalle} selected_multa={row?.original}/>
        <ModalDetalleMulta open={abrirModal} setIsOpen={setAbrirModal} selected_multa={row?.original}/>
        </>
   
      )
    },
  },
]

export function DataTableMultas({ data }) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const {setMultas, setAccionMulta} = ZustandMultas();



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

  const handleRowClick = (row: any) => {
    setMultas(row.original); // Almacena la fila seleccionada
    setAccionMulta("ver");
  };

  const handleCrearNuevaMulta = () => 
  {
    setAccionMulta("crear");

  }

  return (
    <div className="w-full p-2">
      
      <div className="flex items-center mb-2 mt-2 w-full justify-center">
        <Input
          placeholder="Filtrar multas..."
          value={(table.getColumn("nombre_multa_catalogo")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("nombre_multa_catalogo")?.setFilterValue(event.target.value)
          }
          className="w-full"
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
                  onClick={() => handleRowClick(row)} // Evento para seleccionar la fila completa
                  className={row.getIsSelected() ? 'bg-gray-100' : ''} // Estilo condicional
                >
                 {row.getVisibleCells().map((cell) => {
              return (
                  <TableCell key={cell.id}>
                      {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                      )}
                  </TableCell>
              );
})}
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
