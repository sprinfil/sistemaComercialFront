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
    rango: string
    agua: string
    alcantarillado: string
    saneamiento: string
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
        cell: ({ row }) => {
            const formatted = parseFloat(row.getValue("rango"))
            return <div className="">{formatted} m3</div>
          },
    },
    {
        accessorKey: "agua",
        header: "Agua",
        cell: ({ row }) => {
            const formatted = parseFloat(row.getValue("agua"))
            return <div className="">$ {formatted}</div>
          },
    },
    {
        accessorKey: "alcantarillado",
        header: "Alcantarillado",
        cell: ({ row }) => {
            const formatted = parseFloat(row.getValue("alcantarillado"))
            return <div className="">$ {formatted}</div>
          },
        
    },
    {
        accessorKey: "saneamiento",
        header: "Saneamiento",
        cell: ({ row }) => {
            const formatted = parseFloat(row.getValue("saneamiento"))
            return <div className="">$ {formatted}</div>
          },
    },
]
