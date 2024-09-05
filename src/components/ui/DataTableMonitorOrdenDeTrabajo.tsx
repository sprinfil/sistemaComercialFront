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
import { MdContentPasteSearch } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { TbFilterPlus } from "react-icons/tb";
import { ZustandFiltrosOrdenTrabajo } from "../../contexts/ZustandFiltrosOt";
import axiosClient from "../../axios-client";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  sorter: string;
  onRowClick?: (row: TData) => void;
}

export function DataTableMonitorOrdenDeTrabajo<TData, TValue>({
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
  const [control, setControl] =  React.useState(false);
  const { isAsignadaChecked, setIsAsignadaChecked, isNoAsignadaChecked, setIsNoAsignadaChecked,
    setInformacionRecibidaPorFiltros, informacionRecibidaPorFiltros, arregloOrdenesDeTrabajoParaAsignarAOperador, boolUsoFiltros, 
    setBoolUsoFiltros, setvalorParaSaberSiUsaLaTablaDeFiltros, setLoadingTable, loadingTable} = ZustandFiltrosOrdenTrabajo();
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

  const handleControl = () => {

    if(boolUsoFiltros)
    {
      setBoolUsoFiltros(false);
    }
    else
    {
      setBoolUsoFiltros(true);

    }
  }

  
//METODO DE FILTRACION PARA CONSEGUIR LAS ORDENES DE TRABAJO Y PODER ASIGNARLAS
const getOrdenesDeTrabajo = async () => {
  setLoadingTable(true);
  const values = {
    asignada: isAsignadaChecked,
    no_asignada: isNoAsignadaChecked,
  }
  console.log("VALORES ENVIADOS", values);
  try {
    const response = await axiosClient.post("OrdenTrabajo/filtros", values);
    console.log(response);

    setLoadingTable(false);

    if (Array.isArray(response.data.ordenes_trabajo)) {
      const tomas = response.data.ordenes_trabajo.map((item: any) => item);

      console.log("Tomas extraídas", tomas);
      setvalorParaSaberSiUsaLaTablaDeFiltros(true);
      setInformacionRecibidaPorFiltros(tomas);
    } else {
      console.log("No jala", response.data.ordenes_trabajo);
    }

  } catch (error) {
    setLoadingTable(false);
    console.error("Failed to fetch anomalias:", error);
  }
};





  return (
    <div className="">
      <div className="flex items-center py-4">
      
      <IconButton title="Buscar" onClick={getOrdenesDeTrabajo}>
          <FaSearch />
        </IconButton>
        <IconButton title="Ver más filtros" onClick={handleControl}>      
          <TbFilterPlus className="w-[2.5vh] h-[2.5vh]"/> 
        </IconButton>
        {
          boolUsoFiltros && 
          <Input
          placeholder="Buscar..."
          type="text"
          value={(table.getColumn(`${sorter}`)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(`${sorter}`)?.setFilterValue(event.target.value)
          }
          className="w-full"
        />
        }
       
      </div>
      <div className="rounded-md border h-full overflow-auto">
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

