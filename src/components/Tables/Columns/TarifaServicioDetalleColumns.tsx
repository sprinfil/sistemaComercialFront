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
    id_tarifa: number
    id_tipo_toma: number
    rango: number
    agua: number
    alcantarillado: number
    saneamiento: number
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
