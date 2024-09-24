"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import ZustandMonitorPagos from "../../../contexts/ZustandMonitorPagos"
import IconButton from "../../ui/IconButton";
import { useState } from "react"
import ModalVerPagosMonitor from "../../ui/ModalVerPagosMonitor"
import { EyeIcon } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast"; //IMPORTACIONES TOAST
import { ToastAction } from "@/components/ui/toast"; //IMPORTACIONES TOAST

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

  referencia: string
  deleted_at: Date
  created_at: Date
  updated_at: Date
}

export const PagosMonitorColumns: ColumnDef<Pago>[] = [
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
    accessorKey: "forma_pago",
    header: "Método de Pago",
    cell: ({ row }) => {
      let forma_pago: string = row.getValue("forma_pago")
      let formatted = forma_pago
        .replace(/_/g, " ")
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      return <div className="">{formatted}</div>
    },
  },
  {
    accessorKey: "referencia",
    header: "Referencia",
  },
  {
    accessorKey: "fecha_pago",
    header: "Fecha de pago",
  },
  {
    accessorKey: "timbrado",
    header: "Timbrado",
    cell: ({ row }) => {
      let estado_timbrado: string = row.getValue("timbrado")

      console.log(estado_timbrado)
      let styles = "";

      if (estado_timbrado?.estado == "realizado") {
        styles = "bg-green-500 text-white p-1 flex items-center justify-center rounded-md"
      }
      if (estado_timbrado?.estado == "pendiente") {
        styles = "bg-yellow-500 text-white p-1 flex items-center justify-center rounded-md"
      }
      if (estado_timbrado?.estado == "cancelado") {
        styles = "bg-red-500 text-white p-1 flex items-center justify-center rounded-md"
      }
      if (estado_timbrado?.estado == "fallido") {
        styles = "bg-red-500 text-white p-1 flex items-center justify-center rounded-md"
      }

      return <div className={`${styles}`}>{estado_timbrado?.estado}</div>


    },
    // Filtrar basándonos en la propiedad estado del objeto timbrado
    filterFn: (row, columnId, filterValue) => {
      const timbrado = row.getValue(columnId);
      return timbrado?.estado === filterValue;
    }
  },
  {
    accessorKey: "estado",
    header: "Estado",
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
          <ModalVerPagosMonitor
            selected_pago ={row?.original}
            open={modal_ver_pago}
            set_open={set_modal_ver_pago}
          />
        </>

      )
    },
  },
]
