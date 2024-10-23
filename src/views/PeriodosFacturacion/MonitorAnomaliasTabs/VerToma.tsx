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

export const VerToma = ({ selectedToma }) => {

  return (
    <div className='h-[75vh] overflow-auto w-full relative'>
      <div className='w-full flex mt-1 sticky top-0 z-20'>
        <Button className='ml-auto'>Ir al perfil de la toma<FaUser className='ml-2' /></Button>
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
            <TableCell>{`${selectedToma?.toma?.usuario?.nombre || "N/A"} ${selectedToma?.toma?.usuario?.apellido_paterno || ""} ${selectedToma?.toma?.usuario?.apellido_materno || ""}`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Teléfono</TableCell>
            <TableCell>{selectedToma?.toma?.usuario?.telefono || "N/A"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>RFC</TableCell>
            <TableCell>{selectedToma?.toma?.usuario?.rfc || "N/A"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>CURP</TableCell>
            <TableCell>{selectedToma?.toma?.usuario?.curp || "N/A"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Correo</TableCell>
            <TableCell>{selectedToma?.toma?.usuario?.correo || "N/A"}</TableCell>
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
            <TableCell>{selectedToma?.toma?.codigo_toma || "N/A"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Clave Catastral</TableCell>
            <TableCell>{selectedToma?.toma?.clave_catastral || "N/A"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Estatus</TableCell>
            <TableCell>{selectedToma?.toma?.estatus || "N/A"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Calle</TableCell>
            <TableCell>{selectedToma?.toma?.calle || "N/A"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Entre Calle 1</TableCell>
            <TableCell>{selectedToma?.toma?.entre_calle_1 || "N/A"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Entre Calle 2</TableCell>
            <TableCell>{selectedToma?.toma?.entre_calle_2 || "N/A"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Colonia</TableCell>
            <TableCell>{selectedToma?.toma?.colonia || "N/A"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Código Postal</TableCell>
            <TableCell>{selectedToma?.toma?.codigo_postal || "N/A"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Localidad</TableCell>
            <TableCell>{selectedToma?.toma?.localidad || "N/A"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tipo Servicio</TableCell>
            <TableCell>{selectedToma?.toma?.tipo_servicio || "N/A"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tipo Toma</TableCell>
            <TableCell>{selectedToma?.toma?.id_tipo_toma ? "Normal" : "N/A"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tipo Contratación</TableCell>
            <TableCell>{selectedToma?.toma?.tipo_contratacion || "N/A"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Servicio de agua</TableCell>
            <TableCell>{selectedToma?.toma?.c_agua ? "Sí" : "No"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Servicio de agua y alcantarillado</TableCell>
            <TableCell>{selectedToma?.toma?.c_alc ? "Sí" : "No"}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
