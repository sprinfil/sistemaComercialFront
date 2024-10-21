import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import IconButton from "../../ui/IconButton"
import { TrashIcon, Pencil2Icon, PlusCircledIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { useState } from "react"
import { useStateContext } from "../../../contexts/ContextAnomalias"
import { Checkbox } from "@/components/ui/checkbox"
import { ImCancelCircle } from "react-icons/im";
import ModalSeguroCancelarMulta from "../../ui/ModalSeguroCancelarMulta"
import { ZustandMultas } from "../../../contexts/ZustandMultas"
import ModalEstasSeguroMulta2 from "../../ui/ModalEstasSeguroMulta2"
import ModalDetalleMulta from "../../ui/ModalDetalleMulta"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Multas = {
  id: number
  nombre: string
  descripcion: string
  facturable: string
  estado: boolean
}

export const columns: ColumnDef<Multas>[] = [
  
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "nombre_multa",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Toma
        </Button>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const anomalia = row.original
      const { setAnomalia, setAccion } = useStateContext();
      const {abrirModalCancelacion, setAbrirModalCancelacion} = ZustandMultas();
      const [abrirModal, setAbrirModal] = useState(false);
      const [abrirModalDetalle, setAbrirModalDetalle] = useState(false);

      const handleAbrirModal = () => {
        setAbrirModal(true);
    }
    const handleAbrirModal2 = () => {
      setAbrirModalDetalle(true);
  }
    
      return (
        <>
        <div className="flex space-x-2">
        <div onClick={()=>{handleAbrirModal2;setAbrirModal(true)}} title="Ver detalles">
          <IconButton>
            <EyeOpenIcon className="w-[20px] h-[20px]"/>
          </IconButton>
        </div>
          <div onClick={()=>{handleAbrirModal;setAbrirModalDetalle(true)}} title="Cancelar multa">
          <IconButton>
            <ImCancelCircle className="w-[15px] h-[15px] mt-[2px]"/>
          </IconButton>
        </div>
        </div>
        <ModalEstasSeguroMulta2 open={abrirModalDetalle} setIsOpen={setAbrirModalDetalle} selected_multa={row?.original}/>
        <ModalDetalleMulta open={abrirModal} setIsOpen={setAbrirModal} selected_multa={row?.original}/>
        </>
   
      )
    },
  },

]