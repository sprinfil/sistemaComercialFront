import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import IconButton from "../../ui/IconButton"
import { EyeOpenIcon } from '@radix-ui/react-icons';
import { useStateContext } from "../../../contexts/ContextTipoDeColonia"
import { Checkbox } from "@/components/ui/checkbox"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ColoniaCalleDetalleColumns = {
    id: number
    id_tarifa: string
    id_tipo_toma: string
    rango: string
    agua: string
    alcantarillado: string
    saneamiento: string
}

export type tipoColoniaId = {
    id: number
    nombre: string

}


export const columns: ColumnDef<ColoniaCalleDetalleColumns>[] = [
    
    {
        accessorKey: "calle",
        header: "Calle",
        cell: ({ row }) => {
            const formatted = parseFloat(row.getValue("calle"))
            return <div className="">{formatted} m3</div>
          },
    },
    
]