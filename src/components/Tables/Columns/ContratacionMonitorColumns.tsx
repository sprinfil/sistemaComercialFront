"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

import IconButton from "../../ui/IconButton";
import { useState } from "react"
import ModalVerPagosMonitor from "../../ui/ModalVerPagosMonitor"
import { EyeIcon } from 'lucide-react';
import ModalMonitorContratacion from "../../ui/ModalMonitorContratacion";
export type Pago = {
  id: number
  nombre_contrato: string
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
      const [modal_ver_pago, set_modal_ver_pago] = useState(false);

      return (
        <>
          <IconButton  onClick={() => { set_modal_ver_pago(true) }} >
            <EyeIcon className='w-[15px] h-[15px]' />
          </IconButton>
          <ModalMonitorContratacion
            isOpen={modal_ver_pago}
            setIsOpen={set_modal_ver_pago}
            selected_contrato= {row?.original}
          />

        </>

      )
    },
  },
]
