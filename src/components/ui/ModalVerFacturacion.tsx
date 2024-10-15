import React from 'react';
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
import { Input } from './input';

interface ModalProps {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
  onConfirm: () => void;
}

const ModalVerFacturacion: React.FC<ModalProps> = ({ trigger }) => {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="mb-5">Facturacion - Enero 2024</AlertDialogTitle>
            <div className='w-full mt-10'>
              <div className='w-full flex px-3 text-[20px]'>
                <p>Consumo</p>
                <p className='ml-auto'>50 m3</p>
              </div>
              <div className='mt-4'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Lectura</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead className="w-[150px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>450 m3</TableCell>
                      <TableCell>25/01/2024</TableCell>
                      <TableCell><Input defaultValue={450}></Input></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>400 m3</TableCell>
                      <TableCell>05/01/2024</TableCell>
                      <TableCell><Input defaultValue={400}></Input></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>

          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            {/* <AlertDialogAction>Aceptar</AlertDialogAction> */}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ModalVerFacturacion;

