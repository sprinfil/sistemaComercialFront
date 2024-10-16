import React from 'react';
import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2Icon } from 'lucide-react';
import ModalText from '../ModalText.tsx';
import { EdicionColoniaCalleNew } from '../../Tables/Components/EdicionColoniaCalleNew'; // Asegúrate de importar correctamente
import axiosClient
 from '../../../axios-client.ts';
interface DataTableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  onRowClick?: (row: TData) => void;
  updateData: () => void;
}

export function DataTableColoniaCalleNew<TData>({
  columns,
  data,
  onRowClick,
  updateData,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [selectedRow, setSelectedRow] = React.useState<TData | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);

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
    setSelectedRow(rowData);
    if (onRowClick) onRowClick(rowData); // Llama al callback si está definido
    setOpenEditModal(true);
  };

  const handleDeleteClick = (rowId: string, rowData: TData) => {
    setSelectedRow(rowData);
    setOpenDeleteModal(true);
  };

  const deleteRecord = async () => {
    if (selectedRow) {
      try {
        // Ajusta el endpoint según tu API
        await axiosClient.delete(`/calle/delete/${(selectedRow as any).id}`);
        updateData(); // Actualiza los datos después de eliminar
        setOpenDeleteModal(false); // Cierra el modal después de eliminar
      } catch (error) {
        console.error('Error deleting record:', error);
      }
    }
  };

  return (
    <>
      <ModalText
        isOpen={openDeleteModal}
        setIsOpen={setOpenDeleteModal}
        method={deleteRecord}
        text={`¿Estás seguro de que quieres eliminar esta calle?`}
      />
      <EdicionColoniaCalleNew
        updateData={updateData}
        open={openEditModal}
        setOpen={setOpenEditModal}
        coloniaCalle={selectedRow as any} // Asegúrate de que `selectedRow` sea del tipo correcto
      />
      <div className="">
        <div className="flex items-center py-4 px-2">
          {/* Tu entrada de búsqueda u otros controles */}
        </div>
        <div className="rounded-md border h-full overflow-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow
                    key={row.id}
                    className="cursor-pointer hover:bg-border"
                    onClick={() => handleRowClick(row.id, row.original)}
                  >
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={e => {
                          e.stopPropagation(); // Previene el clic en la fila
                          handleDeleteClick(row.id, row.original);
                        }}
                      >
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    </TableCell>
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
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
