import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import IconButton from "../../../ui/IconButton";
import { EyeOpenIcon } from '@radix-ui/react-icons';
import { useStateContext } from "../../../../contexts/ContextMedidores";

// Definir el tipo Medidor
export type Medidor = {
  id: number;
  id_toma: number;
  numero_serie: string;
  marca: string;
  diametro: string;
  tipo: string;
  estatus: boolean;
  lectura_inicial: string;
  nombreEstado: string;
};

export const columns: ColumnDef<Medidor>[] = [
  {
    accessorKey: "numero_serie", // Nombre de la propiedad en el objeto de datos
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Número de serie
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const numero_serie = row.original.numero_serie;
      const estatus = row.original.estatus; 

      return (
        <div className="flex items-center w-full justify-between">
          <span>{numero_serie}</span>

          <div className="flex items-center">
          <span className="mr-2">{estatus === "activo" ? 'Activo' : 'Inactivo'}</span>
          <span
            className={`flex justify-center items-center w-3 h-3 rounded-full text-white ${estatus === "activo" ? 'bg-green-500' : 'bg-red-500'}`}
          >
          </span>
        </div>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const medidor = row.original;
      const { setMedidor, setAccion } = useStateContext();

      return (
        <div onClick={() => { setMedidor(medidor); setAccion("ver"); }}>
          <IconButton>
            <EyeOpenIcon className="w-[20px] h-[20px]" />
          </IconButton>
        </div>
      );
    },
  },
];
