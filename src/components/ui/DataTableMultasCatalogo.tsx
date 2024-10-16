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
import Loader from "./Loader"
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
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'nombre',
    header: 'Nombre', 
    cell: ({ row }) => row?.original?.nombre || 'Sin nombre', 
  },
  {
    id: "actions",
    header: '', 
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
        <div className="">
           <IconButton><EyeOpenIcon className="w-[20px] h-[20px]"/></IconButton>
        </div>
         
      
        </>
   
      )
    },
  },
]

export function DataTableMultasCatalogo({ data }) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const {setMultas, setAccionMulta} = ZustandMultas();
 const {loadingTable} = ZustandMultas();


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
    <div className="">
       <IconButton onClick={handleCrearNuevaMulta}>
          <div className='flex gap-2 items-center'> 
            Agregar nueva multa
            
            <PlusCircleIcon className='w-[20px] h-[20px]'/>
          
          </div>
        </IconButton>
      <div className="flex items-center mb-2 mt-2 justify-center">
        <Input
          placeholder="Filtrar multas..."
          value={(table.getColumn("nombre")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("nombre")?.setFilterValue(event.target.value)
          }
          className="w-full"
        />
        
      </div>
      <div className="rounded-md border">
     
          <Table className="p-2">
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
      <div className="flex items-center justify-end  ">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} filas(s) seleccionadas.
        </div>
        <div className="space-x-2 mt-5 mb-5">
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
