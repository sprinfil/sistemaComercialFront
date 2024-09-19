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
  id_ajuste_catalogo: number
  id_modelo_dueno: number
  modelo_dueno: "toma"
  id_operador: number
  estado: string
  monto_ajustado: string
  monto_total: string
  comentario: string
  motivo_cancelacion: string
  fecha_solicitud: Date
  fecha_actualizacion: Date
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
    id: "codigo_toma",
    header: "Codigo de toma",
  }, 
  {
    accessorKey: "fecha_solicitud",
    header: "Fecha de Factibilidad",
  },
  {
    accessorKey: "estatus",
    header: "Estatus",
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
