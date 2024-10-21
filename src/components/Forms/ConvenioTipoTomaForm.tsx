import React, { useEffect, useState } from 'react'
import { useStateContext } from "../../contexts/ContextConvenio.tsx";
import IconButton from '../ui/IconButton.tsx';
import { Pencil2Icon, PlusCircledIcon } from '@radix-ui/react-icons';
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
import { PlusCircle } from 'lucide-react';
import ModalAgregarConceptosConvenios from './ModalAgregarConceptosConvenios.tsx';
import { Button } from 'react-day-picker';
import ModalTipoTomasConvenios from '../ui/ModalTipoTomasConvenios.tsx';

export const ConvenioTipoTomaForm = () => {
  const { convenio, setConvenio, loadingTable, setLoadingTable, setConvenios, setAccion, accion } = useStateContext();
  const [tipoTomas, setTipoTomas] = useState([]);

  useEffect(() => {
    setTipoTomas(convenio?.tipoTomas);
    console.log(convenio)
  }, [convenio])

  return (
    <div className="overflow-auto">
      <div className='flex h-[40px] items-center mb-[10px] rounded-sm'>
        <div className='h-[20px] w-full flex items-center justify-end'>
          <div className="mb-[10px] h-full w-full mx-4">
            {convenio.nombre != "" && <p className="text-muted-foreground text-[20px]">{convenio.nombre}</p>}
          </div>

          <>
            <div>
              <a title="Editar">
                <ModalTipoTomasConvenios trigger={
                  <IconButton>
                    <Pencil2Icon className="w-[20px] h-[20px]" />
                  </IconButton>
                } />
              </a>
            </div>
          </>

        </div>

      </div>

      <div className='mx-4'>
        <Table>
          <TableCaption>Tomas Disponibles</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              convenio?.tipoTomas?.map((tipoToma: any) => (
                <TableRow>
                  <TableCell>
                    {tipoToma.nombre}
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>

    </div>
  )
}
