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
import { TbFilterPlus } from "react-icons/tb";
import IconButton from "./IconButton";

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
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [selectedRow, setSelectedRow] = React.useState<string | null>(null);
  const [mostrarMasFiltros, setMostrarMasFiltros] = React.useState(false);

  const table = useReactTable({
    data,
    columns,
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

  const handleAbrirMasFiltros = () => {
    setMostrarMasFiltros(prev => !prev);
  };

  return (
    <div className="p-2 ml-6">
      <div className="w-[5vh] h-[5vh]" title="Mostrar más filtros">
        <div className="flex space-x-3 w-[50vh]">
          <div onClick={handleAbrirMasFiltros}>
            <div className="flex items-center justify-center mt-1 gap-2 cursor-pointer hover:bg-muted transition-all duration-200 p-1 rounded-md px-3">
              <TbFilterPlus className="w-[2.5vh] h-[2.5vh]" />
              <div>Ver más filtros.</div>
            </div>
          </div>
        </div>
      </div>

      {mostrarMasFiltros && (
        <div className="mt-6">
          <MarcoForm title={"Filtros para buscar al usuario"}>
            <div className="flex flex-col space-y-4 mt-1 ml-4">
              <div className="flex flex-col space-y-2 ">
                <p>Nombre completo</p>
                <Input
                  placeholder="Buscar por nombre"
                  type="text"
                  value={(table.getColumn("nombre_completo")?.getFilterValue() as string) ?? ""}
                  onChange={(event) =>
                    table.getColumn("nombre_completo")?.setFilterValue(event.target.value)
                  }
                  className="w-[209vh]"
                />
              </div>

              <div className="flex space-x-4">
                <div className="flex flex-col space-y-2">
                  <p>Teléfono</p>
                  <Input
                    placeholder="Buscar telefono"
                    type="text"
                    value={(table.getColumn("telefono")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                      table.getColumn("telefono")?.setFilterValue(event.target.value)
                    }
                    className="w-[103vh]"
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
                    className="w-[104vh]"
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-2 mt-5">
                <p>Dirección</p>
                <Input
                  placeholder="Buscar dirección"
                  type="text"
                  value={(table.getColumn("tomas.direccion_completa")?.getFilterValue() as string) ?? ""}
                  onChange={(event) =>
                    table.getColumn("tomas.direccion_completa")?.setFilterValue(event.target.value)
                  }
                  className="w-[209vh]"
                />
              </div>
            </div>
          </MarcoForm>
        </div>
      )}

      <div className="rounded-md border h-full mt-1 w-[214vh] overflow-auto">
        <Table>
          <TableHeader className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => handleRowClick(row.id, row.original)}
                  className={`cursor-pointer hover:bg-border ${selectedRow === row.id ? "bg-border" : ""}`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="truncate">{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No se encontraron resultados.
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
