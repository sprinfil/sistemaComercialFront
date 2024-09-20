"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { FactibilidadMonitor } from "../../../views/Monitores/FactibilidadMonitor"
import IconButton from "../../ui/IconButton";
import { useState } from "react"
import ModalVerFactibilidadMonitor from "../../ui/ModalVerFactibilidadMonitor";
import { EyeIcon } from 'lucide-react';
import { XCircleIcon } from "lucide-react"
import ModalVerAjusteMonitor from "../../ui/ModalVerAjusteMonitor"

export type Ajuste = {
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

export const AjusteMonitorColumns: ColumnDef<Ajuste>[] = [
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
    accessorKey: "estado",
    header: "Estatus",
  },
  {
    accessorKey: "fecha_solicitud",
    header: "Fecha de solicitud",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [modal_ver_ajuste, set_modal_ver_ajuste] = useState(false);

      return (
        <>
          <IconButton  onClick={() => { set_modal_ver_ajuste(true) }} >
            <XCircleIcon className='w-[15px] h-[15px]' />
          </IconButton>
          <ModalVerAjusteMonitor
            selected_ajuste={row?.original}
            open={modal_ver_ajuste}
            set_open={set_modal_ver_ajuste}
           
            
          />
        </>

      )
    },
  },
]
