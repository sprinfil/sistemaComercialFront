"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

import IconButton from "../../ui/IconButton";
import { useState } from "react"
import ModalVerPagosMonitor from "../../ui/ModalVerPagosMonitor"
import { EyeIcon } from 'lucide-react';
import ModalMonitorContratacion from "../../ui/ModalMonitorContratacion";
import { ZustandFiltrosContratacion } from "../../../contexts/ZustandFiltrosContratacion";
export type ContratoMonitor = {
  id: number
  folio_solicitud: string
  nombre_contrato: string
  clave_catastral: string
  estatus: string

}

// Define las columnas de la tabla
export const columns: ColumnDef<ContratoMonitor>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected()}
        onCheckedChange={(value) => {
          table.toggleAllRowsSelected(!!value);
        }}
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
  },
  {
    accessorKey: "folio_solicitud",
    header: "Folio",
  },
  {
    accessorKey: "nombre_contrato",
    header: "Nombre del contrato",
  },
  {
    accessorKey: "clave_catastral",
    header: "Clave catastral",
  },
  {
    accessorKey: "estatus",
    header: "Estatus",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { boolModalContratacionMonitor, setBoolModalContratacionMonitor } =
        ZustandFiltrosContratacion();

      // Estado local para almacenar el contrato seleccionado
      const [selectedContrato, setSelectedContrato] = useState<ContratoMonitor | null>(null);

      const handleViewContrato = () => {
        setSelectedContrato(row.original); // Establecer el contrato seleccionado
        setBoolModalContratacionMonitor(true); // Abrir el modal
      };

      return (
        <>
          <IconButton onClick={handleViewContrato}>
            <EyeIcon className="w-[15px] h-[15px]" />
          </IconButton>

          {/* Renderizar el modal solo si selectedContrato tiene un valor y el modal está activo */}
          {boolModalContratacionMonitor && selectedContrato && (
            <ModalMonitorContratacion selected_contrato={selectedContrato} />
          )}
        </>
      );
    },
  },
];