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


import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { EdicionColoniaCalleNew } from "../../Tables/Components/EdicionColoniaCalleNew";
import { Trash2Icon } from "lucide-react";
import axiosClient from "../../../axios-client.ts"; // Importar tu cliente axios

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  sorter: string;
  onRowClick?: (row: TData) => void;
  updateData: () => void;
}

export function DataTableColoniaCalleNew<TData, TValue>({
  columns,
  data,
  sorter,
  onRowClick,
  updateData,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [selectedRow, setSelectedRow] = React.useState<string | null>(null); // Estado para la fila seleccionada
  const [openModal, setOpenModal] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false); // Estado para el modal de eliminación
  const [coloniaCalle, setColoniaCalle] = React.useState({});
  
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
    setColoniaCalle(rowData);
    setSelectedRow(rowId);
    onRowClick?.(rowData);
    setOpenModal(true);
  };

  const handleDeleteClick = (rowId: string, rowData: TData) => {
    setColoniaCalle(rowData);
    setSelectedRow(rowId);
    setOpenDeleteModal(true); // Abre el modal de confirmación de eliminación
  };

  const handleDelete = () => {
    axiosClient.delete(`/calle/delete/${coloniaCalle.id}`)
      .then((response) => {
        console.log(response);
        updateData(); // Actualiza la tabla después de eliminar
        setOpenDeleteModal(false); // Cierra el modal de confirmación de eliminación
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <EdicionColoniaCalleNew updateData={updateData} open={openModal} setOpen={setOpenModal} coloniaCalle={coloniaCalle} />
      
      {openDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-md z-50">
            <h3>Confirmar Eliminación</h3>
            <p>¿Estás seguro de que deseas eliminar esta calle?</p>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setOpenDeleteModal(false)}>Cancelar</Button>
              <Button variant="destructive" onClick={handleDelete}>Eliminar</Button>
            </div>
          </div>
        </div>
      )}
      
      <div className="">
        <div className="flex items-center py-4 px-2">
          {/* <Input
            placeholder="Buscar Rango..."
            type="text"
            value={(table.getColumn(`${sorter}`)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(`${sorter}`)?.setFilterValue(event.target.value)
            }
            className="w-full"
          /> */}
        </div>
        <div className="rounded-md border h-full overflow-auto ">
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
                    className={`cursor-pointer hover:bg-border`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteClick(row.id, row.original)}
                      >
                        <Trash2Icon className=" h-4 w-4" />
                      </Button>
                    </TableCell>
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
    </>
  );
}
