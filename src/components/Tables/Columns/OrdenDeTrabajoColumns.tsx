import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import IconButton from "../../ui/IconButton"
import {EyeOpenIcon } from '@radix-ui/react-icons';
import { useStateContext } from "../../../contexts/ContextOrdenDeTrabajo"
import { Checkbox } from "@/components/ui/checkbox"
import { ZustandGeneralUsuario } from "../../../contexts/ZustandGeneralUsuario";
import { ZustandFiltrosOrdenTrabajo } from "../../../contexts/ZustandFiltrosOt";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrdenDeTrabajo = {
  id: number
  nombre: string
  descripcion: string
  vigencias: string
  servicio: string,
  momento_cargo: string
  genera_masiva: boolean
  asigna_masiva: boolean
  cancela_masiva: boolean,
  cierra_masiva: boolean,
  limite_ordenes: string,
  publico_general: boolean,
  orden_trabajo_accion: orden_trabajo_accion[]
  ordenes_trabajo_cargos: orden_trabajo_cargos[]
  ordenes_trabajo_encadenadas: orden_trabajo_encadenadas[]
  orden_trabajo_catalogo:
  {
    descripcion: string;
  }

}

export type orden_trabajo_accion = {
  id: number
  accion: string
  modelo: string
  campo:string
  valor: string
}

export type orden_trabajo_cargos = {
  id: number
  id_concepto_catalogo: number
  id_orden_trabajo_catalogo: number
  conceptos: {
    nombre: string
  }

}

export type orden_trabajo_encadenadas = {
  id: number
  id_OT_Catalogo_padre: number
  id_OT_Catalogo_encadenada: number
  OT_Encadenada: 
  {
    nombre:string
  }
}





export const columns: ColumnDef<OrdenDeTrabajo>[] = [
  
  {
    accessorFn: (row) => {
      // Verifica la estructura de los datos en la consola
      return row.orden_trabajo_catalogo?.descripcion;
    },
    id: "orden_trabajo_catalogo.tipo",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Tipo
      </Button>
    ),
  },
  {
    accessorKey: "estado",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Estado
      </Button>
    ),
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Creada
      </Button>
    ),
  },
  {
    accessorKey: "fecha_finalizada",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Finalización
      </Button>
    ),
  },
 
  {
    id: "actions",
    cell: ({ row }) => {
      const OrdenDeTrabajo = row.original
      const { setOrdenDeTrabajo, setAccion } = useStateContext();
      const { setAccionGeneradaEntreTabs } = ZustandGeneralUsuario();
      const {setAbrirModalInformacionTomaDetalleUsuarioToma, setInformacionModalDetalleEnToma} = ZustandFiltrosOrdenTrabajo();
      const handleAbrir = () => 
      {
        setAbrirModalInformacionTomaDetalleUsuarioToma(true);
      }
      return (
        <div onClick={()=>{setOrdenDeTrabajo(OrdenDeTrabajo);setAccionGeneradaEntreTabs("ver");setInformacionModalDetalleEnToma(OrdenDeTrabajo)}}>
          <IconButton onClick={handleAbrir}>
            <EyeOpenIcon className="w-[20px] h-[20px]"/>
          </IconButton>
        </div>
      )
    },
  },

]
