import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import IconButton from "../../../ui/IconButton"
import {Pencil2Icon } from '@radix-ui/react-icons';
import {EyeOpenIcon, DotsHorizontalIcon} from '@radix-ui/react-icons';
import { useStateContext } from "../../../../contexts/ContextColonia"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EdicionTarifaServicio } from "../Components/EdicionColoniaCalle";
import { Colonia } from "./ColoniaColums";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ColoniaCalleDetalle = {
  id: number
  nombre: string
}

export const columns: ColumnDef<Colonia>[] = [
  {
    accessorKey: "Calle",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
        >
          Calle(hasta)
        </Button>
      )
    },
  },

]
