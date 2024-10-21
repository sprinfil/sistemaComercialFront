import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axiosClient from "../../axios-client.ts";
import { ZustandGeneralUsuario } from "../../contexts/ZustandGeneralUsuario.tsx";
import Loader from "./Loader.tsx";

// Define the type for AjusteToma
export type AjusteToma = {
  id: string;
  estado: string;
  monto_ajustado: number;
  monto_total: number;
  comentario: string;
  motivo_cancelacion: string;
  fecha_solicitud: string;
  fecha_actualizacion: string;
};

// Define the table columns
export const columns: ColumnDef<AjusteToma>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => <div className="capitalize">{row.getValue("estado")}</div>,
  },
  {
    accessorKey: "monto_ajustado",
    header: "Monto Ajustado",
    cell: ({ row }) => {
      const amount = row.getValue("monto_ajustado");
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "monto_total",
    header: "Monto Total",
    cell: ({ row }) => {
      const amount = row.getValue("monto_total");
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "comentario",
    header: "Comentario",
    cell: ({ row }) => <div>{row.getValue("comentario")}</div>,
  },
  {
    accessorKey: "motivo_cancelacion",
    header: "Motivo de Cancelación",
    cell: ({ row }) => <div>{row.getValue("motivo_cancelacion")}</div>,
  },
  {
    accessorKey: "fecha_solicitud",
    header: "Fecha de Solicitud",
    cell: ({ row }) => (
      <div>{new Date(row.getValue("fecha_solicitud")).toLocaleString()}</div>
    ),
  },
  {
    accessorKey: "fecha_actualizacion",
    header: "Fecha de Actualización",
    cell: ({ row }) => (
      <div>{new Date(row.getValue("fecha_actualizacion")).toLocaleString()}</div>
    ),
  },
];

// Main component function for AjusteTomaDataTable
export function AjusteTomaDataTable() {
  const [ajustes, setAjustes] = React.useState<AjusteToma[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const { usuariosEncontrados } = ZustandGeneralUsuario();

  const cargarAjustes = () => {
    if (usuariosEncontrados) {
      setLoading(true);
      axiosClient
        .get(`/Ajuste`, {
          
            id_modelo_dueno: usuariosEncontrados[0].tomas[0].codigo_toma,
            modelo_dueno: "toma",
          
        })
        .then(({ data }) => {
          setAjustes(data);
        })
        .catch((err) => {
          console.error("Error al obtener los ajustes:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  React.useEffect(() => {
    cargarAjustes();
  }, [usuariosEncontrados]);

  const table = useReactTable({
    data: ajustes,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by Estado..."
          value={(table.getColumn("estado")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("estado")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  <Loader />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {cell.column.columnDef.cell
                        ? cell.column.columnDef.cell({ row })
                        : cell.getValue()}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  );
}
