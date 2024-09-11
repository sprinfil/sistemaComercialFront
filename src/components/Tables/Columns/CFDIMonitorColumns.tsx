"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

import IconButton from "../../ui/IconButton";
import { useState } from "react"
import ModalVerPagosMonitor from "../../ui/ModalVerPagosMonitor"
import { EyeIcon } from 'lucide-react';
import ModalVerCFDIMonitor from "../../ui/ModalVerCFDIMonitor";
export type Pago = {
  id: number
  folio: string
  id_caja: number
  id_dueno: number
  modelo_dueno: string
  total_pagado: number
  saldo_anterior: number
  saldo_pendiente: number
  saldo_a_favor: number
  recibido: number
  cambio: number
  forma_pago: string
  fecha_pago: Date
  estado: "abonado" | "pendiente" | "cancelado"
  timbrado: "realizado" | "pendiente" | "cancelado"
  referencia: string
  deleted_at: Date
  created_at: Date
  updated_at: Date
}

export const columns: ColumnDef<Pago>[] = [
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
    accessorKey: "folio",
    header: "Folio",
  },
  {
    accessorKey: "timbro",
    header: "Timbro",
  },
  {
    accessorKey: "metodo",
    header: "Metodo",
  },
  {
    accessorKey: "fecha_solicitud",
    header: "Fecha Solicitud",
  },
  {
    accessorKey: "fecha_actualizacion",
    header: "Fecha Actualizacion",
  },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => {
      let estado_timbrado: string = row.getValue("estado")
      let styles = "";

      if (estado_timbrado == "realizado") {
        styles = "bg-green-500 text-white p-1 flex items-center justify-center rounded-md"
      }
      if (estado_timbrado == "pendiente") {
        styles = "bg-yellow-500 text-white p-1 flex items-center justify-center rounded-md"
      }
      if (estado_timbrado == "cancelado") {
        styles = "bg-red-500 text-white p-1 flex items-center justify-center rounded-md"
      }
      if (estado_timbrado == "fallido") {
        styles = "bg-red-500 text-white p-1 flex items-center justify-center rounded-md"
      }
      return <div className={`${styles}`}>{estado_timbrado}</div>
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [modal_ver_pago, set_modal_ver_pago] = useState(false);

      return (
        <>
          <IconButton onClick={() => { set_modal_ver_pago(true) }} >
            <EyeIcon className='w-[15px] h-[15px]' />
          </IconButton>
          <ModalVerCFDIMonitor
            selected_pago={row?.original}
            open={modal_ver_pago}
            set_open={set_modal_ver_pago}
          />
        </>

      )
    },
  },
]
