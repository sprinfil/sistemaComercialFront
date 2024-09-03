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
  momento_cargo: string
  genera_masiva: boolean
  orden_trabajo_accion: orden_trabajo_accion[]
  ordenes_trabajo_cargos: orden_trabajo_cargos[]
  ordenes_trabajo_encadenadas: orden_trabajo_encadenadas[]

}

export type orden_trabajo_accion = {
  id: number
  accion: string
  modelo: string
  campo:string
}

export type orden_trabajo_cargos = {
  id: number
  id_concepto_catalogo: number
  id_orden_trabajo_catalogo: number
}

export type orden_trabajo_encadenadas = {
  id: number
  id_OT_Catalogo_padre: number
  id_OT_Catalogo_encadenada: number
}





export const columns: ColumnDef<OrdenDeTrabajo>[] = [
  {
    id: "select",
    header: ({ table }) => {

      const {arregloAsignarIndividualTomaAOperador, setArregloAsignarIndividualTomaAOperador} = ZustandFiltrosOrdenTrabajo();
      return(
        <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        
        onCheckedChange={(value) => {
          // Actualizar la selección de todas las filas
          table.toggleAllPageRowsSelected(!!value);

          // Esperar hasta que se complete la actualización y luego obtener las filas seleccionadas
          setTimeout(() => {
            const selectedRows = table.getSelectedRowModel().rows.map(row => row.original);
            setArregloAsignarIndividualTomaAOperador(selectedRows);
            if (selectedRows.length === 0) {
              console.log("No rows selected.");
            } else {
              console.log("Selected Rows:", selectedRows);
            }
          }, 0); // Ejecuta después de que la actualización se haya aplicado
        }}
        aria-label="Select all"
      />
      )
     
      },
    cell: ({ row, table }) => {
      const {arregloAsignarIndividualTomaAOperador, setArregloAsignarIndividualTomaAOperador} = ZustandFiltrosOrdenTrabajo();

      return(
        <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(!!value);

          // Esperar hasta que se complete la actualización y luego obtener las filas seleccionadas
          setTimeout(() => {
            const selectedRows = table.getSelectedRowModel().rows.map(row => row.original);
              setArregloAsignarIndividualTomaAOperador(selectedRows);
            if (selectedRows.length === 0) {
              console.log("No rows selected.");
            } else {
              console.log("Selected Rows:", selectedRows);
            }
          }, 0); // Ejecuta después de que la actualización se haya aplicado
        }}
        aria-label="Select row"
      />
      )
     
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "toma.codigo_toma",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Toma
      </Button>
    ),
  },
  {
    accessorKey: "orden_trabajo_catalogo.descripcion",
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
        Tipo
      </Button>
    ),
  },
  {
    accessorKey: "fecha_vigencia",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Fecha de vigencia
      </Button>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const OrdenDeTrabajo = row.original
      const { setOrdenDeTrabajo, setAccion } = useStateContext();
      const { setAccionGeneradaEntreTabs, setAbrirModalInformativo } = ZustandGeneralUsuario();


      const handleAbrir = () => {
        setAbrirModalInformativo(true);
      }

      return (
        <div onClick={()=>{setOrdenDeTrabajo(OrdenDeTrabajo);setAccionGeneradaEntreTabs("ver");}}>
          <IconButton>
            <EyeOpenIcon className="w-[20px] h-[20px]" onClick={() => handleAbrir()}/>
          </IconButton>
        </div>
      )
    },
  },

]
