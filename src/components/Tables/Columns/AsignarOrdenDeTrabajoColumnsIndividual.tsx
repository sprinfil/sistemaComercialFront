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
  codigo_toma: string
  estado: string
  clave_catastral: string
  fecha_finalizada: string
  toma:
  {
    codigo_toma: string
    clave_catastral: string
  }
  orden_trabajo_catalogo:
  {
   descripcion: string
  }


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
    accessorFn: (row) => {
      // Verifica la estructura de los datos en la consola
      return row?.toma?.clave_catastral;
    },
    id: "toma.clave_catastral",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Clave catastral
      </Button>
    ),
  },
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
        Concluida
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
        
        </div>
      )
    },
  },

]
