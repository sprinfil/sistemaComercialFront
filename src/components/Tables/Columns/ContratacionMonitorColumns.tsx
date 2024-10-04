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
  toma: {
    codigo_toma: string
  }

}

// Define las columnas de la tabla
export const columns: ColumnDef<ContratoMonitor>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
      className="w-[2.7vh] h-[2.7vh]"
        checked={table.getIsAllRowsSelected()}
        onCheckedChange={(value) => {
          table.toggleAllRowsSelected(!!value);
        }}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
      className="w-[2.7vh] h-[2.7vh]"
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
    accessorFn: (row) => {
      return row.toma?.codigo_toma;
    },
    id: "toma.codigo_toma",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Código toma
      </Button>
    ),
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
            selected_contrato={row?.original}
            open={modal_ver_pago}
            set_open={set_modal_ver_pago}
          />
        </>

      )
    },
  },
];