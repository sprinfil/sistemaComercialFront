import React from 'react';
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

interface ModalProps {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
  onConfirm: () => void;
}

const ModalVerLectura: React.FC<ModalProps> = ({ trigger }) => {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ver Lecturas</AlertDialogTitle>
            <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>lectura</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Modificar Lectura</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
              
                    <TableRow>
                      <TableCell>500 m3</TableCell>
                      <TableCell>20/01/2024</TableCell>
                      <TableCell><Input defaultValue={500}/></TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>450 m3</TableCell>
                      <TableCell>01/01/2024</TableCell>
                      <TableCell><Input defaultValue={450}/></TableCell>
                    </TableRow>
              
                </TableBody>
              </Table>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction>Aceptar y guardar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ModalVerLectura;

