import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import IconButton from "../../ui/IconButton"
import { EyeOpenIcon } from '@radix-ui/react-icons';
import { useStateContext } from "../../../contexts/ContextTipoDeToma"
import { Checkbox } from "@/components/ui/checkbox"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TarifaConceptoDetalle = {
    id: number
    id_concepto: string
    nombre_concepto: string
    id_tipo_toma: number
    monto: number
    id_tarifa: number
}


export const columns: ColumnDef<TarifaConceptoDetalle>[] = [
    {
        accessorKey: "nombre_concepto",
        header: "Concepto",
    },
    {
        accessorKey: "monto",
        header: "Monto",
        cell: ({ row }) => {
            const formatted = parseFloat(row.getValue("monto"))
            return <div className="">$ {formatted}</div>
          },
    },
]
