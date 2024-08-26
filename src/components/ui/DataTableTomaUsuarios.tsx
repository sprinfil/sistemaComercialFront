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
import IconButton from "./IconButton";
import { TbFilterPlus } from "react-icons/tb";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  sorter: string;
  onRowClick?: (row: TData) => void;
}

export function DataTableTomaUsuarios<TData, TValue>({
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
  const [mostrarMasFiltros, setMostrarMasFiltros] = React.useState(false);

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

  const handleAbrirMasFiltros = () => {
    if(mostrarMasFiltros == true)
    {
      setMostrarMasFiltros(false);

    }
    if(mostrarMasFiltros == false)
      {
        setMostrarMasFiltros(true);
  
      }
  }

  return (
    <div className="mt-5 p-10">
    <div className="flex space-x-3 mb-10">
          <div onClick={handleAbrirMasFiltros}>
          <IconButton>      
          <TbFilterPlus className="w-[2.5vh] h-[2.5vh]"/>
        </IconButton>
          </div>
     
        <Input
          placeholder="Buscar telefono"
          type="text"
          value={(table.getColumn("telefono")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("telefono")?.setFilterValue(event.target.value)
          }
          className="w-[60vh]"
        />
        </div>



      {
        mostrarMasFiltros && 
        <MarcoForm title={"Filtros para buscar al usuario"}>
      <div className="flex space-x-4 mt-5  ">
        <div className="flex flex-col space-y-2">
        <p className="mb-2 ml-2">Nombre</p>
        <Input
        placeholder="Buscar por nombre"
        type="text"
        value={(table.getColumn("usuario.nombre")?.getFilterValue() as string) ?? ""}
        onChange={(event) => {
          const value = event.target.value;
          table.getColumn("usuario.nombre")?.setFilterValue(value);
        }}
        className="w-[30vh]"
      />
        </div>
        <div className="flex flex-col space-y-2">
        <p className="mb-2 ml-2">Apellido paterno</p>
        <Input
        placeholder="Buscar por apellido paterno"
        type="text"
        value={(table.getColumn("usuario.apellido_paterno")?.getFilterValue() as string) ?? ""}
        onChange={(event) => {
          const value = event.target.value;
          table.getColumn("usuario.apellido_paterno")?.setFilterValue(value);
        }}
        className="w-[30vh]"
      />
      
        </div>

        <div className="flex flex-col space-y-2">
        <p className="mb-2 ml-2">Apellido materno</p>
        <Input
        placeholder="Buscar por apellido materno"
        type="text"
        value={(table.getColumn("usuario.apellido_materno")?.getFilterValue() as string) ?? ""}
        onChange={(event) => {
          const value = event.target.value;
          table.getColumn("usuario.apellido_materno")?.setFilterValue(value);
        }}
        className="w-[30vh]"
      />
      
        </div>



        <div className="flex flex-col space-y-2">
          <p className="mb-2 ml-2">Clave catastral</p>
          <Input
            placeholder="Buscar por clave catastral"
            type="text"
            value={(table.getColumn("clave_catastral")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("clave_catastral")?.setFilterValue(event.target.value)
            }
            className="w-[30vh]"
          />
          </div>
         
        
        
      </div>
      </MarcoForm>
      }


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

          <TableBody >
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
                  No se encontró ningún resultado.
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
