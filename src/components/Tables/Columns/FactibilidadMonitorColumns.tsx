"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { FactibilidadMonitor } from "../../../views/Monitores/FactibilidadMonitor"
import IconButton from "../../ui/IconButton";
import { useState } from "react"
import ModalVerFactibilidadMonitor from "../../ui/ModalVerFactibilidadMonitor";
import { EyeIcon } from 'lucide-react';
import ModalVerFactibilidadMonitorAgua from "../../ui/ModalVerFactibilidadMonitorAgua"
import ModalVerFactibilidadMonitorAlc from "../../ui/ModalVerFactibilidadMonitorAlc"

export type Factibilidad = {
  id: number
  id_contrato: string
  toma : {
    codigo_toma: string
  }
  solicitante: number
  revisor: number
  estatus: "sin revisar" | "pendiente" | "rechazada" | "pagada"
  agua_estado_factible: "pendiente" | "no_factible" | "factible"
  alcantarillado_estado_factible: "pendiente" | "no_factible" | "factible"
  saneamiento_estado_factible: "pendiente" | "no_factible" | "factible"
  derechos_conexion: number
  archivos : {
    url: string
  }
  comentario: string
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
    id: "codigo_toma", // Este es el ID de la columna
    accessorFn: (row) => row.toma.codigo_toma,
    header: "Código de toma",
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
          {console.log(row?.original?.servicio)}
          {
            row?.original?.servicio == "AGUA" &&
            <ModalVerFactibilidadMonitorAgua
            selected_fact={row?.original}
            open={modal_ver_fact}
            set_open={set_modal_ver_fact}
          />
          }

          {
            row?.original?.servicio == "ALCANTARILLADO Y SANEAMIENTO" &&
            <ModalVerFactibilidadMonitorAlc
            selected_fact={row?.original}
            open={modal_ver_fact}
            set_open={set_modal_ver_fact}
          />
          }
         
        </>

      )
    },
  },
]
