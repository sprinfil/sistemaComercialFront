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
import dayjs from 'dayjs';


interface ModalProps {
  trigger: React.ReactNode;
  selectedFacturacion: Object
}

const ModalVerFacturacion: React.FC<ModalProps> = ({ trigger, selectedFacturacion }) => {
  console.log(selectedFacturacion?.consumo?.lectura_actual?.lectura)
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="mb-5">{selectedFacturacion?.periodo?.nombre?.toUpperCase()}</AlertDialogTitle>
            <div className='w-full mt-10'>
              <div className='w-full flex px-3 text-[20px]'>
                <p>Consumo</p>
                <p className='ml-auto'>
                  {selectedFacturacion?.consumo?.consumo} m3
                </p>
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

                    {
                      selectedFacturacion?.consumo?.lectura_actual != null ?
                        <>
                          <TableRow>
                            <TableCell>{selectedFacturacion?.consumo?.lectura_actual?.lectura}</TableCell>
                            <TableCell>{ dayjs(selectedFacturacion?.consumo?.lectura_actual?.created_at).format('DD/MM/YYYY')}</TableCell>
                            <TableCell><Input disabled defaultValue={selectedFacturacion?.consumo?.lectura_actual?.lectura}></Input></TableCell>
                          </TableRow>
                        </>
                        :
                        <></>
                    }
                    {
                      selectedFacturacion?.consumo?.lectura_anterior != null ?
                        <>
                           <TableRow>
                            <TableCell>{selectedFacturacion?.consumo?.lectura_anterior?.lectura}</TableCell>
                            <TableCell>{ dayjs(selectedFacturacion?.consumo?.lectura_anterior?.created_at).format('DD/MM/YYYY')}</TableCell>
                            <TableCell><Input disabled defaultValue={selectedFacturacion?.consumo?.lectura_anterior?.lectura}></Input></TableCell>
                          </TableRow>
                        </>
                        :
                        <></>
                    }
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

