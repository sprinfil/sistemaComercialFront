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
import MarcoForm from "./MarcoForm";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  sorter: string;
  onRowClick?: (row: TData) => void;
}

export function DataTableUsuarios<TData, TValue>({
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
    <div className="mt-5 p-10">
      <MarcoForm title={"Filtros para buscar al usuario"}>
      <div className="flex space-x-4 ">
      <div className="flex flex-col space-y-2">
        <p>Nombre</p>
        <Input
          placeholder="Buscar nombre"
          type="text"
          value={(table.getColumn("nombre")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("nombre")?.setFilterValue(event.target.value)
          }
          className="w-[40vh]"
        />
          </div>
          <div className="flex flex-col space-y-2">
          <p>Telefono</p>
        <Input
          placeholder="Buscar telefono"
          type="text"
          value={(table.getColumn("telefono")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("telefono")?.setFilterValue(event.target.value)
          }
          className="w-[40vh]"
        />

          </div>
          <div className="flex flex-col space-y-2">
          <p>CURP</p>
        <Input
          placeholder="Buscar CURP"
          type="text"
          value={(table.getColumn("curp")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("curp")?.setFilterValue(event.target.value)
          }
          className="w-[40vh]"
        />
          </div>

          <div className="flex flex-col space-y-2">
          <p>RFC</p>
        <Input
          placeholder="Buscar RFC"
          type="text"
          value={(table.getColumn("rfc")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("rfc")?.setFilterValue(event.target.value)
          }
          className="w-[40vh]"
        />
          </div>

          <div className="flex flex-col space-y-2">
          <p>Correo</p>
        <Input
          placeholder="Buscar correo"
          type="text"
          value={(table.getColumn("correo")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("correo")?.setFilterValue(event.target.value)
          }
          className="w-[40vh]"
        />
          </div>
          </div>
      </MarcoForm>
     
       
       
       
      
      <div className="rounded-md border h-full overflow-auto mt-10">
        <Table>
          <TableHeader className="bg-muted">
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
                  className={`cursor-pointer hover:bg-border ${selectedRow === row.id ? "bg-border" : ""
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
                  No se encontró al.
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
