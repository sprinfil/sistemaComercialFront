import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFactibilidadContext } from "../../../contexts/FactibilidadContext";
import { Checkbox } from "@/components/ui/checkbox";
import { EyeOpenIcon } from '@radix-ui/react-icons';

export type Factibilidad = {
  id: number;
  estado: string;
  solicitante: string | null;
  revisor: string | null;
  fecha_solicitud: string;
  contrato: {
    nombre_contrato: string;
    domicilio: string;
    codigo_postal: string;
  };
};

export const columns: ColumnDef<Factibilidad>[] = [
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
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Estado
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "solicitante",
    header: "Solicitante",
  },
  {
    accessorKey: "revisor",
    header: "Revisor",
  },
  {
    accessorKey: "fecha_solicitud",
    header: "Fecha Solicitud",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const factibilidad = row.original;
      const { setFactibilidad } = useFactibilidadContext();
      
      return (
        <div onClick={() => setFactibilidad(factibilidad)}>
          <Button variant="ghost">
            <EyeOpenIcon className="w-[20px] h-[20px]" />
          </Button>
        </div>
      );
    },
  },
];
