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
    id_concepto: BigInteger
    id_tipo_toma: number
    monto: number
    id_tarifa: number
}


export const columns: ColumnDef<TarifaConceptoDetalle>[] = [
    {
        accessorKey: "id_concepto",
        header: "Nombre",
    },
    {
        accessorKey: "id_tipo_toma",
        header: "Comercial",
    },
    {
        accessorKey: "monto",
        header: "Alcantarillado",
    },
    {
        accessorKey: "id_tarifa",
        header: "Saneamiento",
    },


]
