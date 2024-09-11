"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { FactibilidadMonitor } from "../../../views/Monitores/FactibilidadMonitor"
import IconButton from "../../ui/IconButton";
import { useState } from "react"
import ModalVerFactibilidadMonitor from "../../ui/ModalVerFactibilidadMonitor";
import { EyeIcon } from 'lucide-react';

export type Factibilidad = {
  id: number
  id_contrato: string
  contrato : {
    nombre_contrato: string
  }
  solicitante: number
  revisor: number
  estado: "pendiente de pago" | "pendiente" | "rechazada" | "pagada"
  agua_estado_factible: "pendiente" | "no_factible" | "factible"
  alcantarillado_estado_factible: "pendiente" | "no_factible" | "factible"
  saneamiento_estado_factible: "pendiente" | "no_factible" | "factible"
  derechos_conexion: number
  fecha_solicitud: Date
  deleted_at: Date
  created_at: Date
  updated_at: Date
}

export const FactiblidadMonitorColumns: ColumnDef<Factibilidad>[] = [
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
    id: "nombre_contrato", // Este es el ID de la columna
    accessorFn: (row) => row.contrato.nombre_contrato,
    header: "Nombre contrato",
  }, 
  {
    accessorKey: "fecha_solicitud",
    header: "Fecha de Factibilidad",
  },
  {
    accessorKey: "estado",
    header: "Estado",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [modal_ver_fact, set_modal_ver_fact] = useState(false);

      return (
        <>
          <IconButton  onClick={() => { set_modal_ver_fact(true) }} >
            <EyeIcon className='w-[15px] h-[15px]' />
          </IconButton>
          <ModalVerFactibilidadMonitor
            selected_fact={row?.original}
            open={modal_ver_fact}
            set_open={set_modal_ver_fact}
           
            
          />
        </>

      )
    },
  },
]
