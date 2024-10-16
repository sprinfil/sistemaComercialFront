"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Descuento = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Descuento>[] = [
  {
    accessorKey: "folio",
    header: "Folio",
  },
  {
    accessorKey: "descuento_catalogo.nombre",
    header: "Nombre",
  },
  {
    accessorKey: "vigencia",
    header: "Vigencia hasta",
  },
  {
    accessorKey: "estatus",
    header: "Estatus",
    cell: ({ row }) => {
      let estatus = row.original.estatus;
      let formatted = "";
      let styles = "";
      if (estatus == "vigente") {
        formatted = "Activo"
        styles = "bg-green-500"
      }
      if (estatus == "no_vigente") {
        formatted = "Inactivo"
        styles = "bg-red-500"
      }

      return <div className="flex gap-2 items-center w-[100px] justify-between">
        {formatted}
        <div className={`w-3 rounded-full ${styles} h-3`}></div>
      </div>
    },

  },
]
