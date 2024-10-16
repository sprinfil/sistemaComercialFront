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
import { Checkbox } from "./checkbox";
import { ZustandFiltrosOrdenTrabajo } from "../../contexts/ZustandFiltrosOt";
import axiosClient from "../../axios-client";

import { ZustandGeneralUsuario } from "../../contexts/ZustandGeneralUsuario";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  sorter: string;
  onRowClick?: (row: TData) => void;
}

export function DataTableAsignarOTIndividual2<TData, TValue>({
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
  const { setAsignadasEnToma, asignadasEnToma, setInformacionRecibidaPorFiltros, setLoadingTableModalAsignarOperadorTable} = ZustandFiltrosOrdenTrabajo();
  const { usuariosEncontrados, setIdSeleccionadoTomaAsignacionOT, idSeleccionadoTomaAsignacionOT, setIdSeleccionadoAsignarOrdenDeTrabajoToma} = ZustandGeneralUsuario();

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
    if (control) {
      setControl(false);

    }
    else {
      setControl(true);

    }


  }

  //METODO DE FILTRACION PARA CONSEGUIR LAS ORDENES DE TRABAJO Y PODER ASIGNARLAS
  const getOrdenesDeTrabajo = async () => {
    setLoadingTableModalAsignarOperadorTable(true);
    const values = {
      asignada: asignadasEnToma,
      toma_id: usuariosEncontrados[0].tomas[0].id
    }
    console.log("VALORES ENVIADOS", values);
    try {
      const response = await axiosClient.post("OrdenTrabajo/filtros", values);
      console.log(response);


      if (Array.isArray(response.data.ordenes_trabajo)) {
        const tomas = response.data.ordenes_trabajo.map((item: any) => item);

        console.log("Tomas extraídas", tomas);
        setLoadingTableModalAsignarOperadorTable(false);
        setInformacionRecibidaPorFiltros(tomas);
      } else {
        console.log("No jala", response.data.ordenes_trabajo);
      }

    } catch (error) {
      console.error("Failed to fetch anomalias:", error);
      setLoadingTableModalAsignarOperadorTable(false);
    }
  };


  return (
    <div className="">
    <div className="flex flex-col items-start">
        <div className="flex items-center space-x-10 mb-2">
          <div className="w-[5vh] h-[5vh]" onClick={handleControl} title="Ver más filtros.">
            <IconButton>
              <TbFilterPlus className="w-[2.5vh] h-[2.5vh]" />
            </IconButton>
          </div>
        </div>

        {control && (
          <div className="flex space-x-5 mb-8 border shadow-sm w-full h-[9vh] p-2 justify-center">
             <Input
              placeholder="Buscar tipo"
              type="text"
              value={(table.getColumn(`orden_trabajo_catalogo.tipo`)?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn(`orden_trabajo_catalogo.tipo`)?.setFilterValue(event.target.value)
              }
              className="w-[20vh] border border-gray-300 rounded-md p-2 mt-2 ml-2"
            />
            <Input
              placeholder="Buscar estado"
              type="text"
              value={(table.getColumn(`estado`)?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn(`estado`)?.setFilterValue(event.target.value)
              }
              className="w-[20vh] border border-gray-300 rounded-md p-2 mt-2 ml-2"
            />
            
             <Input
              placeholder="Buscar creación"
              type="text"
              value={(table.getColumn(`created_at`)?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn(`created_at`)?.setFilterValue(event.target.value)
              }
              className="w-[20vh] border border-gray-300 rounded-md p-2 mt-2 ml-2"
            />
               <Input
              placeholder="Buscar concluidas"
              type="text"
              value={(table.getColumn(`fecha_finalizada`)?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn(`fecha_finalizada`)?.setFilterValue(event.target.value)
              }
              className="w-[20vh] border border-gray-300 rounded-md p-2 mt-2 ml-2"
            />
            
          </div>
        )}
      </div>
      <div className="rounded-md border overflow-auto max-h-[50vh]">
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

          <TableBody className="">
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

      </div>
    </div>
  );
}

