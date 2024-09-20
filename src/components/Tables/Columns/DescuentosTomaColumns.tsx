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
    accessorKey: "estatus",
    header: "Estatus",
  },
  {
    accessorKey: "vigencia",
    header: "Vigencia",
  },
]
