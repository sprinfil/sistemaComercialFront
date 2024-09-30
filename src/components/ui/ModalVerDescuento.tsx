import React, { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../../components/ui/button";
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
import Modal from './Modal';
import descuentoService from '../../lib/DescuentoService';
import { useToast } from './use-toast';

interface ModalProps {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
  onConfirm: () => void;
}

const ModalVerDescuento: React.FC<ModalProps> = ({ trigger, open, setOpen, selectedDescuento, updateData }) => {
  const { toast } = useToast();

  const desactivarDescuento = async () => {
    try {
      let response = await descuentoService.ModificarEstadoDescuento("no_vigente", selectedDescuento?.id);

      updateData((prev) => {
        return prev.map(descuento => {
          if (descuento?.id == selectedDescuento?.id) {
            return response;
          } else {
            return descuento;
          }
        })
      })
      setOpen(false);
    } catch (e) {
      console.log(e);

      toast({
        title: "Ocurrió un error",
        variant: "destructive"
      });
    }
  }

  return (
    <div>
      <AlertDialog open={open}>
        <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle></AlertDialogTitle>
          </AlertDialogHeader>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Folio</TableCell>
                <TableCell>{selectedDescuento?.folio || "<<Sin datos>>"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>{selectedDescuento?.descuento_catalogo?.nombre || "<<Sin datos>>"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Vigencia</TableCell>
                <TableCell>{selectedDescuento?.vigencia || "<<Sin datos>>"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Estatus</TableCell>
                <TableCell>
                  <div className='flex gap-4 items-center'>
                    {selectedDescuento?.estatus == "vigente" ? "Activo" : "Inactivo" || "<<Sin datos>>"}
                    <div
                      className={`w-3 rounded-full 
                  ${selectedDescuento?.estatus == "vigente" ? "bg-green-500" : "bg-red-500"} h-3`}></div>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <AlertDialogFooter>
            {
              selectedDescuento?.estatus == "vigente" ?
                <Modal
                  trigger={<Button variant={"outline"}>Desactivar descuento</Button>}
                  title={"¿Desactivar Descuento?"}
                  onConfirm={desactivarDescuento}
                />
                :
                <>
                
                </>
            }
            <AlertDialogAction onClick={() => { setOpen(false) }}>Aceptar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
};

export default ModalVerDescuento;

