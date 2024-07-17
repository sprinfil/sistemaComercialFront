import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import IconButton from "../../ui/IconButton"
import { EyeOpenIcon } from '@radix-ui/react-icons';
import { useStateContext } from "../../../contexts/ContextTipoDeToma"
import { Checkbox } from "@/components/ui/checkbox"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TarifaServicioDetalle = {
    id: number
    rango: BigInteger
    Agua: number
    Alcantarillado: number
    Saneamiento: number
    id_tipo_toma: BigInteger
    id_tarifa: BigInteger
}


export const columns: ColumnDef<TarifaServicioDetalle>[] = [
    {
        accessorKey: "Rango",
        header: "Rango",
    },
    {
        accessorKey: "Agua",
        header: "Agua",
    },
    {
        accessorKey: "Alcantarillado",
        header: "Alcantarillado",
    },
    {
        accessorKey: "Saneamiento",
        header: "Saneamiento",
    },


]
