import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axiosClient from "../../axios-client";
import { DataTable } from "../ui/DataTable";

interface Factibilidad {
  id: number;
  estado: string;
  id_solicitante: number;
  solicitante: string | null;
  id_revisor: number | null;
  revisor: string | null;
  fecha_solicitud: string;
  contrato: {
    nombre_contrato: string;
    domicilio: string;
    codigo_postal: string;
  };
}

// Definición de columnas para la tabla
const columns: ColumnDef<Factibilidad>[] = [
  { header: 'Estado', accessorKey: 'estado' },
  { header: 'Solicitante', accessorKey: 'solicitante' },
  { header: 'Revisor', accessorKey: 'revisor', cell: ({ getValue }) => getValue() ?? 'Pendiente' },
  { header: 'Fecha Solicitud', accessorKey: 'fecha_solicitud' },
  { header: 'Nombre Contrato', accessorKey: 'contrato.nombre_contrato' },
  { header: 'Domicilio', accessorKey: 'contrato.domicilio' },
  {
    header: 'Acciones',
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button
          onClick={() => handleAccept(row.original.id)}
          className="bg-green-500 text-white hover:bg-green-600"
        >
          Aceptar
        </Button>
        <Button
          onClick={() => handleReject(row.original.id)}
          className="bg-red-500 text-white hover:bg-red-600"
        >
          Rechazar
        </Button>
      </div>
    )
  }
];

const FactibilidadesTable: React.FC = () => {
  const [data, setData] = React.useState<Factibilidad[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [estadoFilter, setEstadoFilter] = React.useState<string>("");
  const [solicitanteFilter, setSolicitanteFilter] = React.useState<string>("");
  const [revisorFilter, setRevisorFilter] = React.useState<string>("");
  const [fechaFilter, setFechaFilter] = React.useState<string>("");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get('/factibilidad'); // Reemplaza con tu URL de API
        setData(response.data.data || []); // Asegúrate de que `data` sea un array
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((factibilidad) => {
    return (
      (estadoFilter ? factibilidad.estado.includes(estadoFilter) : true) &&
      (solicitanteFilter ? factibilidad.solicitante?.includes(solicitanteFilter) : true) &&
      (revisorFilter ? (factibilidad.revisor ?? 'Pendiente').includes(revisorFilter) : true) &&
      (fechaFilter ? factibilidad.fecha_solicitud.includes(fechaFilter) : true)
    );
  });

  const handleAccept = async (id: number) => {
  try {
    const response = await axiosClient.put(`/factibilidad/update/${id}`, {
      estado: 'pagada',
      id_revisor: 1
    });
    if (response.status === 200) {
      setData(prevData =>
        prevData.map(factibilidad =>
          factibilidad.id === id
            ? { ...factibilidad, estado: 'pagada', id_revisor: 1 }
            : factibilidad
        )
      );
    }
  } catch (error) {
    console.error("Error updating factibilidad:", error);
  }
};


  const handleReject = async (id: number) => {
    // Implementa la lógica para rechazar la solicitud aquí, si es necesario.
    console.log('Rechazado:', id);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Monitor de Factibilidades</h2>

      {/* Filtros */}
      <div className="mb-4 grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Input
          placeholder="Estado (pendiente, pagada, etc.)"
          value={estadoFilter}
          onChange={(e) => setEstadoFilter(e.target.value)}
          className="w-full"
        />

        <Input
          placeholder="Solicitante"
          value={solicitanteFilter}
          onChange={(e) => setSolicitanteFilter(e.target.value)}
          className="w-full"
        />

        <Input
          placeholder="Revisor"
          value={revisorFilter}
          onChange={(e) => setRevisorFilter(e.target.value)}
          className="w-full"
        />

        <Input
          type="date"
          value={fechaFilter}
          onChange={(e) => setFechaFilter(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Tabla usando el DataTable */}
      <DataTable
        columns={columns}
        data={filteredData}
        sorter="revisor"
      />
    </div>
  );
};

export default FactibilidadesTable;
