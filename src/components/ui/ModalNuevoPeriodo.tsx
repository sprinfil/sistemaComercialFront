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
import { DatePickerWithRange } from './DatePickerWithRange';

const ModalNuevoPeriodo = ({ trigger }) => {
  const [datesLectura, setDatesLectura] = useState({});
  const [datesValidacion, setDatesValidacion] = useState({});
  const [datesFacturacion, setDatesFacturacion] = useState({});
  const [datesEntrega, setDatesEntrega] = useState({});

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
        <AlertDialogContent className="min-w-[40vw] h-[90vh]">
          <AlertDialogHeader>
            <AlertDialogTitle>Crear Periodo</AlertDialogTitle>
            <div className='flex flex-col gap-4'>
              <div>
                <p>Lectura</p>
                <DatePickerWithRange setFecha={setDatesLectura} />
              </div>

              <div>
                <p>Validación</p>
                <DatePickerWithRange setFecha={setDatesValidacion} minDate={datesLectura?.to} />
              </div>

              <div>
                <p>Facturación</p>
                <DatePickerWithRange setFecha={setDatesFacturacion} />
              </div>
              <div>
                <p>Entrega de recibos</p>
                <DatePickerWithRange setFecha={setDatesEntrega} />
              </div>
              <div className="mt-[20px]">
                <p>Vencimiento de recibos</p>
                <input type="date" name="fecha_nacimiento" className="border border-border  w-full  rounded-md p-[4px] bg-background" />
              </div>
            </div>
          </AlertDialogHeader>

          <AlertDialogFooter className="flex items-end">
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction>Aceptar</AlertDialogAction>
          </AlertDialogFooter>

        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ModalNuevoPeriodo;

