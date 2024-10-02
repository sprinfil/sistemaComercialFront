import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ZustandFiltrosOrdenTrabajo } from "../../contexts/ZustandFiltrosOt";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  sorter: string;
  onRowClick?: (row: TData) => void;
}

export function DataTableGenerarOrden<TData, TValue>({
  columns,
  data,
  sorter,
  onRowClick,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [selectedRow, setSelectedRow] = React.useState<string | null>(null); // Estado para la fila seleccionada
 const  {setAbrirModalOrdenTrabajo, abrirModalOrdenTrabajo} = ZustandFiltrosOrdenTrabajo();
  const table = useReactTable({
    data,
    columns,
    sorter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const handleRowClick = (rowId: string, rowData: TData) => {
    setSelectedRow(rowId);
    onRowClick?.(rowData);
  };

  return (
    <div className="">
      <div className="mb-5">
        {
          abrirModalOrdenTrabajo && 
          <>
          <div className="flex space-x-2 mt-5">
            <Input
          placeholder="Buscar codigo de toma..."
          type="text"
          value={(table.getColumn(`codigo_toma`)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(`codigo_toma`)?.setFilterValue(event.target.value)
          }
        className="flex-grow"
        />
      
      <Input
          placeholder="Buscar nombre del usuario..."
          type="text"
          value={(table.getColumn(`usuario.nombre_completo`)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(`usuario.nombre_completo`)?.setFilterValue(event.target.value)
          }
          className="flex-grow"
          />
       
          </div>
            
            <div className="flex space-x-2 mt-5 mb-5">
            <Input
          placeholder="Buscar tipo..."
          type="text"
          value={(table.getColumn(`usuario.nombre_completo`)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(`usuario.nombre_completo`)?.setFilterValue(event.target.value)
          }
             className="flex-grow"
        />
        
            <Input
          placeholder="Buscar saldo..."
          type="text"
          value={(table.getColumn(`usuario.nombre_completo`)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(`usuario.nombre_completo`)?.setFilterValue(event.target.value)
          }
            className="flex-grow"
        />
              </div>
            

            <div className="mb-5">
            <Input
          placeholder="Buscar dirección..."
          type="text"
          value={(table.getColumn(`usuario.nombre_completo`)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(`usuario.nombre_completo`)?.setFilterValue(event.target.value)
          }
          className="w-full"
        />
            </div>

          </>
        
        

        }
      
        
      </div>
      
       
      <div className="rounded-md border h-[50vh] overflow-auto">
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
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => handleRowClick(row.id, row.original)}
                  className={`cursor-pointer hover:bg-border ${
                    selectedRow === row.id ? "bg-border" : ""
                  }`}
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
                  Filta primero las tomas.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

    
      </div>
      <div className=" flex-1 text-sm text-muted-foreground mt-1">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} filas(s) seleccionadas.
            </div>
              <div className="flex justify-end ">
              <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Anterior
            </Button>
            <div className="ml-2">
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
  );
}

