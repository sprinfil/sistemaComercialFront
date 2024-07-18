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
    id_tarifa: string
    id_tipo_toma: string
    rango: number
    agua: number
    alcantarillado: number
    saneamiento: number
}

export type tipoTomaId = {
    id: number
    nombre: string
    descripcion: string

}


export const columns: ColumnDef<TarifaServicioDetalle>[] = [
    {
        accessorKey: "rango",
        header: "Rango",
    },
    {
        accessorKey: "agua",
        header: "Agua",
    },
    {
        accessorKey: "alcantarillado",
        header: "Alcantarillado",
    },
    {
        accessorKey: "saneamiento",
        header: "Saneamiento",
    },


]
