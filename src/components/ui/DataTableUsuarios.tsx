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
import MarcoForm from "./MarcoForm";
import { TbFilterPlus } from "react-icons/tb";
import IconButton from "./IconButton";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  sorter: string;
  onRowClick?: (row: TData) => void;
}

export function DataTableUsuarios<TData, TValue>({
  columns,
  data,
  sorter,
  onRowClick,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [selectedRow, setSelectedRow] = React.useState<string | null>(null); // Estado para la fila seleccionada
  const [mostrarMasFiltros, setMostrarMasFiltros] = React.useState(false);
  const table = useReactTable({
    data,
    columns,
    sorter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
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

  const handleAbrirMasFiltros = () => {
    if(mostrarMasFiltros == true)
    {
      setMostrarMasFiltros(false);

    }
    if(mostrarMasFiltros == false)
      {
        setMostrarMasFiltros(true);
  
      }
  }

  return (
    <div className="p-2 ml-6">
      <div className=" w-[5vh] h-[5vh] " title="Mostrar mas filtros" >
        <div className="flex space-x-3 w-[50vh]">
          <div onClick={handleAbrirMasFiltros}>
          <IconButton>      
          <TbFilterPlus className="w-[2.5vh] h-[2.5vh]"/>
        </IconButton>
          </div>

          <div className="mt-2 ml-10 text-muted-foreground text-[2vh]">Ver más filtros.</div>
     
        
        </div>
        

      </div>
      {
        mostrarMasFiltros &&

        <div className="mt-6"> 
   <MarcoForm title={"Filtros para buscar al usuario"}>
      <div className="">
        <div className="flex space-x-4 ">
        <div className="flex flex-col space-y-2">
        
        </div>
        <div className="flex flex-col space-y-2">
        <p>Telefono</p>
      <Input
        placeholder="Buscar telefono"
        type="text"
        value={(table.getColumn("telefono")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("telefono")?.setFilterValue(event.target.value)
        }
        className="w-[103vh]"
      />
      

        </div>
        
        
       

       

        <div className="flex flex-col space-y-2">
        <p>Correo</p>
      <Input
        placeholder="Buscar correo"
        type="text"
        value={(table.getColumn("correo")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("correo")?.setFilterValue(event.target.value)
        }
        className="w-[104vh]"
      />
        </div>
        </div>
     
        <div className="flex space-x-4 mt-5 ml-4">
        <div className="flex flex-col space-y-2 ">
          <p>Calle</p>
        <Input
          placeholder="Buscar calle"
          type="text"
          value={(table.getColumn("tomas.calle")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("tomas.calle")?.setFilterValue(event.target.value)
          }
          className="w-[40vh]"
        />
        

          </div>

          <div className="flex flex-col space-y-2 ">
          <p>Numero de casa</p>
        <Input
          placeholder="Buscar numero de casa"
          type="text"
          value={(table.getColumn("tomas.numero_casa")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("tomas.numero_casa")?.setFilterValue(event.target.value)
          }
          className="w-[40vh]"
        />
        

          </div>

          <div className="flex flex-col space-y-2">
          <p>Entre calle 1</p>
        <Input
          placeholder="Buscar entre calle 1"
          type="text"
          value={(table.getColumn("tomas.entre_calle_1")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("tomas.entre_calle_1")?.setFilterValue(event.target.value)
          }
          className="w-[40vh]"
        />
        

          </div>


          <div className="flex flex-col space-y-2">
          <p>Entre calle 2</p>
        <Input
          placeholder="Buscar entre calle 2"
          type="text"
          value={(table.getColumn("tomas.entre_calle_2")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("tomas.entre_calle_2")?.setFilterValue(event.target.value)
          }
          className="w-[40vh]"
        />
        

          </div>

          <div className="flex flex-col space-y-2">
          <p>Código postal</p>
        <Input
          placeholder="Buscar código postal"
          type="text"
          value={(table.getColumn("tomas.codigo_postal")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("tomas.codigo_postal")?.setFilterValue(event.target.value)
          }
          className="w-[40vh]"
        />
        

          </div>
        </div>
         
          
          </div>
          

          
      </MarcoForm>
        </div>

        
       
     
      }
      
       
       
       
      
      <div className="rounded-md border h-full overflow-auto mt-1 w-[214vh]">
        <Table>
          <TableHeader className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => handleRowClick(row.id, row.original)}
                  className={`cursor-pointer hover:bg-border ${
                    selectedRow === row.id ? "bg-border" : ""
                  }`}
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
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No se encontró al.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
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
  );
}
