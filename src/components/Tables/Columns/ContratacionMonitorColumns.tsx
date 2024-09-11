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

export const columns: ColumnDef<ContratoMonitor>[] = [
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
      const {boolModalContratacionMonitor, setBoolModalContratacionMonitor} =  ZustandFiltrosContratacion();

      return (
        <>
          <IconButton  onClick={() => { setBoolModalContratacionMonitor(true) }} >
            <EyeIcon className='w-[15px] h-[15px]' />
          </IconButton>
          <ModalMonitorContratacion
            selected_contrato= {row?.original}
          />

        </>

      )
    },
  },
]
