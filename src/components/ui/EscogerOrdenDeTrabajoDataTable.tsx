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
import IconButton from "./IconButton";
import { TbFilterPlus } from "react-icons/tb";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  sorter: string;
  onRowClick?: (row: TData) => void;
}

export function EscogerOrdenDeTrabajoDataTable<TData, TValue>({
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
  const [control, setControl] = React.useState<boolean | null>(null); // Estado para la fila seleccionada

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

  const handleControl = () =>
  {
    if(control)
    {
      setControl(false);
    }
    else
    {
      setControl(true);

    }
  }

  return (
    <div className="">
   <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-4 ">
          <IconButton title="Ver más filtros" onClick={handleControl}>
            <TbFilterPlus className="w-[2.5vh] h-[2.5vh]" />
          </IconButton>
        </div>

        {control && (
          <div className="flex space-x-5">
            <div className="flex-1">
            <Input
          placeholder="Buscar tipo..."
          type="text"
          value={(table.getColumn('nombre')?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn('nombre')?.setFilterValue(event.target.value)
          }
      
        />
              </div>
       
        <div className="flex-1">
        <Input
          placeholder="Buscar descripción..."
          type="text"
          value={(table.getColumn('descripcion')?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn('descripcion')?.setFilterValue(event.target.value)
          }
        />
          </div>
       
           
          </div>
        )}
      </div>
      <div className="rounded-md border overflow-auto max-h-[50vh] mt-5">
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
                  No resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
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
  );
}

