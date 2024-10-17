import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '../../../components/ui/button'
import { FaUser } from "react-icons/fa";

export const VerToma = () => {
  return (
    <div className='h-[75vh] overflow-auto w-full relative'>
      <div className='w-full flex mt-1 sticky top-0 z-20'>
        <Button className='ml-auto'>Ir al perfil de la toma<FaUser className='ml-2'/></Button>
      </div>
      <p className='font-medium ml-3'>Usuario</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[400px]">Campo</TableHead>
            <TableHead>Valor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Jeremy</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Teléfono</TableCell>
            <TableCell>6241204731</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>RFC</TableCell>
            <TableCell>12312423423</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>CURP</TableCell>
            <TableCell>SFASDFASDF</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Correo</TableCell>
            <TableCell>Jeremy.ojeda@hotmail.com</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <p className='font-medium ml-3 mt-10'>Toma</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[400px]">Campo</TableHead>
            <TableHead>Valor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Toma</TableCell>
            <TableCell>0101001</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Clave Catastral</TableCell>
            <TableCell>DZ91-D6KR-96H4</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Estatus</TableCell>
            <TableCell>Baja definitiva</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Calle</TableCell>
            <TableCell>Esperanza Lights</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Entre Calle 1</TableCell>
            <TableCell>Eloisa Spurs</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Entre Calle 2</TableCell>
            <TableCell>Caleigh Island</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Colonia</TableCell>
            <TableCell>Donnelly Station</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Código Postal</TableCell>
            <TableCell>72068-2746</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Localidad</TableCell>
            <TableCell>San Bartolo</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tipo Servicio</TableCell>
            <TableCell>Lectura</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tipo Toma</TableCell>
            <TableCell>Normal</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tipo Contratación</TableCell>
            <TableCell>Sí</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Servicio de agua</TableCell>
            <TableCell>No</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Servicio de agua y alcantarillado</TableCell>
            <TableCell>No</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
