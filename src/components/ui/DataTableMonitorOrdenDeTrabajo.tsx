import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import IconButton from "./IconButton";
import { MdContentPasteSearch, MdOutlineCancel } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { TbFilterPlus } from "react-icons/tb";
import { ZustandFiltrosOrdenTrabajo } from "../../contexts/ZustandFiltrosOt";
import axiosClient from "../../axios-client";
import { TrashIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { FaCheckCircle } from "react-icons/fa";

import { TiCancel } from "react-icons/ti";
import ModalEstasSeguroCancelarMasivamenteOT from "./ModalEstasSeguroCancelarMasivamenteOT";
import ModalEstasSeguroCancelarOTSSS from "./ModalEstasSeguroCancelarOTSSS";
import { RiUserSearchLine } from "react-icons/ri";
import ModalAsignarOperadorMasivamente from "./ModalAsignarOperadorMasivamente";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  sorter: string;
  onRowClick?: (row: TData) => void;
}

export function DataTableMonitorOrdenDeTrabajo<TData, TValue>({
  columns,
  data,
  sorter,
  onRowClick,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [selectedRow, setSelectedRow] = React.useState<string | null>(null);
  const [abrirModal, setAbrirModal] =  React.useState(false);
  const [abrirModal2, setAbrirModal2] =  React.useState(false);

  const [control, setControl] = React.useState(false);
  const [abrirModalOperador, setAbrirModalOperador] = React.useState(false);

  const { isAsignadaChecked, setIsAsignadaChecked, 
    isNoAsignadaChecked, setIsNoAsignadaChecked,
    setInformacionRecibidaPorFiltros, informacionRecibidaPorFiltros, arregloOrdenesDeTrabajoParaAsignarAOperador, boolUsoFiltros,
    setBoolUsoFiltros, setvalorParaSaberSiUsaLaTablaDeFiltros, setLoadingTable, loadingTable,
    isConcluidaChecked, setIsConcluidaChecked,
    isCanceladaChecked, setIsCanceladaChecked,
    isDomesticaChecked, setIsDomesticaChecked,
    isComercialChecked, setIsComercialChecked,
    isIndustrialChecked, setIsIndustrialChecked,
    isEspecialChecked, setIsEspecialChecked,
    idLibroFiltro, idRutaFiltro, setIdLibroFiltro, setIdRutaFiltro,
    saldoMinFiltro, saldoMaxFiltro,setLoadingTableFiltrarOrdenDeTrabajoMasivas,
    setInformacionRecibidaPorFiltrosMonitorOrdenDeTrabajo, informacionRecibidaPorFiltrosMonitorOrdenDeTrabajo, informacionCerrarOtMasivamente,isFechaTipo,
    setIsFechaTipo,
    isHastaFecha,
    setIsHastaFecha,
    isDesdeFecha,
    setIsDesdeFecha,
    isCodigoDeTomaFiltro,
    setIsCodigoDeTomaFiltro, } = ZustandFiltrosOrdenTrabajo();
  
  const table = useReactTable({
    data,
    columns,
    sorter,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const handleRowClick = (rowId: string, rowData: TData) => {
    setSelectedRow(rowId);
    onRowClick?.(rowData);
  };

  const handleControl = () => {
    setBoolUsoFiltros(!boolUsoFiltros);
  }

  const abrirModalGG = () => {
    //setAnomalia(anomalia);
    //setAccion("ver");
    setAbrirModal(true);
  };
  const abrirModalGG2 = () => {
    //setAnomalia(anomalia);
    //setAccion("ver");
    setAbrirModal2(true);
  };


const handleSeleccionarOperador = () => 
{
  setAbrirModalOperador(true);
}

  console.log(informacionRecibidaPorFiltrosMonitorOrdenDeTrabajo);
  console.log(informacionCerrarOtMasivamente);

  return (
    <div className="p-4">
      <div className="flex items-center space-x-2 mb-4 bg-muted w-[full] rounded-xl ">
        <div className="flex justify-center">
         
        <IconButton title="Ver más filtros" onClick={handleControl}>
          <TbFilterPlus className="w-[3.5vh] h-[3.5vh] ml-2" />
        </IconButton>
        {informacionCerrarOtMasivamente.length > 1 && 
         <IconButton title="Seleccionar operador" onClick={handleSeleccionarOperador}
          >       
         <RiUserSearchLine  className="ml-2 w-[3.5vh] h-[3.5vh]"/>
         <ModalAsignarOperadorMasivamente
         isOpen={abrirModalOperador}
         setIsOpen={setAbrirModalOperador}/>
         
      </IconButton>

      }
        {
          informacionCerrarOtMasivamente.length > 1 && 
          <div className='flex justify-end ' title='Cerrar ordenes de trabajo'>
          <IconButton onClick={abrirModalGG}>
            <FaCheckCircle className="ml-2 w-[3.0vh] h-[3.0vh]"/>
          </IconButton>
          <IconButton title="Cancelar ordenes de trabajo" onClick={abrirModalGG2}>  <TiCancel className='w-[5vh] h-[4.3vh]' /></IconButton>
        </div>
        }
       
        </div>
        
      </div>

      {boolUsoFiltros && (
        <div className="flex space-x-10 border border-border shadow-md rounded-lg p-6 w-full h-[15vh] justify-center mb-[3vh]">
          <div className="flex flex-col flex-1">
          <p className="mb-1">Código de toma</p>
        
            <Input
            placeholder="Buscar codigo de toma..."
            type="text"
            value={(table.getColumn(`toma.codigo_toma`)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(`toma.codigo_toma`)?.setFilterValue(event.target.value)
            }
  
          />
            </div>
          <div className="flex flex-col flex-1">
          <p className="mb-1">Tipo de orden de trabajo</p>
        
          <Input
            placeholder="Buscar tipo de OT..."
            type="text"
            value={(table.getColumn(`orden_trabajo_catalogo.descripcion`)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(`orden_trabajo_catalogo.descripcion`)?.setFilterValue(event.target.value)
            }
          />
            </div>
         
         <div className="flex flex-col flex-1">
         <p className="mb-1">Estado</p>
         
         <Input
            placeholder="Buscar estado..."
            type="text"
            value={(table.getColumn(`estado`)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(`estado`)?.setFilterValue(event.target.value)
            }
          />
          </div>
          <div className="flex flex-col flex-1">
          <p className="mb-1">Creación</p>
          <Input
            placeholder="Buscar creacion..."
            type="text"
            value={(table.getColumn(`created_at`)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(`created_at`)?.setFilterValue(event.target.value)
            }
          />
            </div>
          
            <div className="flex flex-col flex-1">
              <p className="mb-1">Concluida</p>
            <Input
            placeholder="Buscar concluida..."
            type="text"
            value={(table.getColumn(`fecha_finalizada`)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(`fecha_finalizada`)?.setFilterValue(event.target.value)
            }
          />
            </div>
        
        </div>
      )}

      <div className="rounded-md border h-full overflow-auto max-h-[70vh]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => handleRowClick(row.id, row.original)}
                  className={`cursor-pointer hover:bg-border ${selectedRow === row.id ? "bg-border" : ""}`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-3xl">
                  Filtra las tomas.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ModalEstasSeguroCancelarMasivamenteOT
        isOpen={abrirModal}
        setIsOpen={setAbrirModal}
        method={""}
      />
       <ModalEstasSeguroCancelarOTSSS
        isOpen={abrirModal2}
        setIsOpen={setAbrirModal2}
        method={""}
      />

      </div>
      <div className=" flex-1 text-sm text-muted-foreground mt-1">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} filas(s) seleccionadas.
            </div>
              <div className="flex justify-end ">
              <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Anterior
            </Button>
            <div className="ml-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Siguiente
            </Button>
            </div>
           
              </div>
            
            
    </div>
  );
}
