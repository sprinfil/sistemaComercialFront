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
  const [control, setControl] = React.useState(false);
  const { isAsignadaChecked, setIsAsignadaChecked, 
    isNoAsignadaChecked, setIsNoAsignadaChecked,
    setInformacionRecibidaPorFiltros, informacionRecibidaPorFiltros, arregloOrdenesDeTrabajoParaAsignarAOperador, boolUsoFiltros,
    setBoolUsoFiltros, setvalorParaSaberSiUsaLaTablaDeFiltros, setLoadingTable, loadingTable,
    isConcluidaChecked, setIsConcluidaChecked,
    isCanceladaChecked, setIsCanceladaChecked,
    isDomesticaChecked, setIsDomesticaChecked,
    isComercialChecked, setIsComercialChecked,
    isIndustrialChecked, setIsIndustrialChecked,
    isEspecialChecked, setIsEspecialChecked, setInformacionRecibidaPorFiltrosMonitorOrdenDeTrabajo, informacionRecibidaPorFiltrosMonitorOrdenDeTrabajo} = ZustandFiltrosOrdenTrabajo();
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

    if (boolUsoFiltros) {
      setBoolUsoFiltros(false);
    }
    else {
      setBoolUsoFiltros(true);

    }
  }


  //METODO DE FILTRACION PARA CONSEGUIR LAS ORDENES DE TRABAJO Y PODER ASIGNARLAS
  const getOrdenesDeTrabajo = async () => {
    setLoadingTable(true);
    const values = {
      
      asignada: isAsignadaChecked,
      domestica: isDomesticaChecked

    }
    console.log("VALORES ENVIADOS", values);
    try {
      const response = await axiosClient.post("OrdenTrabajo/filtros", values);
      console.log(response);
      setvalorParaSaberSiUsaLaTablaDeFiltros(true);
      setLoadingTable(false);

      if (Array.isArray(response.data.ordenes_trabajo)) {
        const tomas = response.data.ordenes_trabajo.map((item: any) => item);

        console.log("Tomas extraídas", tomas);
        setInformacionRecibidaPorFiltrosMonitorOrdenDeTrabajo(tomas);
      } else {
        console.log("No jala", response.data.ordenes_trabajo);
      }

    } catch (error) {
      setLoadingTable(false);
      console.error("Failed to fetch anomalias:", error);
    }
  };



console.log(informacionRecibidaPorFiltrosMonitorOrdenDeTrabajo);

  return (
    <div className="">
      <div className="p-4">
        <div className="flex items-center space-x-4 mb-4 bg-muted w-[12vh] rounded-xl">
          <IconButton title="Buscar" onClick={getOrdenesDeTrabajo}>
            <FaSearch />
          </IconButton>
          <IconButton title="Ver más filtros" onClick={handleControl}>
            <TbFilterPlus className="w-[2.5vh] h-[2.5vh]" />
          </IconButton>
        </div>

        {boolUsoFiltros && (
          <div className="flex space-x-10 border shadow-transparent- p-4 w-full h-[10vh] justify-center">
          <Input
            placeholder="Buscar codigo de toma"
            type="text"
            value={(table.getColumn(`toma.codigo_toma`)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(`toma.codigo_toma`)?.setFilterValue(event.target.value)
            }
            className="w-[22vh] border border-gray-300 rounded-md p-2"
          />
          <Input
            placeholder="Buscar tipo de OT"
            type="text"
            value={(table.getColumn(`orden_trabajo_catalogo.descripcion`)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(`orden_trabajo_catalogo.descripcion`)?.setFilterValue(event.target.value)
            }
            className="w-[22vh] border border-gray-300 rounded-md p-2"
          />
          <Input
            placeholder="Buscar estado"
            type="text"
            value={(table.getColumn(`estado`)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(`estado`)?.setFilterValue(event.target.value)
            }
            className="w-[22vh] border border-gray-300 rounded-md p-2"
          />
          <Input
            placeholder="Buscar creacion"
            type="text"
            value={(table.getColumn(`estado`)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(`estado`)?.setFilterValue(event.target.value)
            }
            className="w-[22vh] border border-gray-300 rounded-md p-2"
          />
          <Input
            placeholder="Buscar concluida"
            type="text"
            value={(table.getColumn(`estado`)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(`estado`)?.setFilterValue(event.target.value)
            }
            className="w-[22vh] border border-gray-300 rounded-md p-2"
          />
        </div>
        )}
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

