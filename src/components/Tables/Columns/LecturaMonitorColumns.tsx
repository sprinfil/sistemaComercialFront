"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { FactibilidadMonitor } from "../../../views/Monitores/FactibilidadMonitor"
import IconButton from "../../ui/IconButton";
import { useState } from "react"
import ModalVerFactibilidadMonitor from "../../ui/ModalVerFactibilidadMonitor";
import { Eye, EyeIcon } from 'lucide-react';
import { XCircleIcon } from "lucide-react"
// import ModalVerAjusteMonitor from "../../ui/ModalVerAjusteMonitor"
import { ExternalLinkIcon } from "@radix-ui/react-icons"
import ModalExportarAjustesMonitor from "../../ui/ModalExportarAjustesMonitor"

export type Lectura = {
  id: number
  id_operador: number
  operador: string
  id_toma: number
  toma: string
  id_periodo: number
  periodo:{
    periodo:string
  }
  id_origen: number
  modelo_origen: string
  origen: string
  id_anomalia: number
  anomalia: string
  lectura: string
  comentario: string
  fecha_creacion: Date
  fecha_actualizacion: Date
}

export const LecturaMonitorColumns: ColumnDef<Lectura>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected()}  // Cambiado a getIsAllRowsSelected
        onCheckedChange={(value) => {
          table.toggleAllRowsSelected(!!value) // Cambiado a toggleAllRowsSelected
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
    accessorKey: "id",
    header: "Folio",
  }, 
  {
    accessorKey: "id_toma",
    header: "Toma",
  }, 
  {
    accessorKey: "lectura",
    header: "Lectura",
  },
  {
    id: "periodo",
    header: "Periodo",
    accessorFn: (row) => row?.periodo?.periodo, // Custom accessor function
  },
  {
    accessorKey: "fecha_creacion",
    header: "Fecha de creación",
  },

]
