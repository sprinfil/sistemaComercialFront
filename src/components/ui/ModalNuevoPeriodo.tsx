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
import { newPeriodo } from '../../lib/Services/PeriodosFacturacionService';
import { useToast } from './use-toast';
const ModalNuevoPeriodo = ({ trigger, selectedRuta, setPeriodos, open, setOpen }) => {
  const { toast } = useToast();
  const [datesLectura, setDatesLectura] = useState({});
  const [datesValidacion, setDatesValidacion] = useState({});
  const [datesFacturacion, setDatesFacturacion] = useState({});
  const [datesEntrega, setDatesEntrega] = useState({});
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loadingNewPeriodo, setLoadingNewPeriodo] = useState(false);
  const [vigenciaRecibo, setVigenciaRecibo] = useState("");

  useEffect(() => {
    setData(
      {
        periodos:
          [
            {
              id_ruta: selectedRuta?.id,
              tipo_periodo: "lectura",
              facturacion_fecha_inicio: datesFacturacion?.from?.toISOString().split('T')[0],
              facturacion_fecha_final: datesFacturacion?.to?.toISOString().split('T')[0],
              lectura_inicio: datesLectura?.from?.toISOString().split('T')[0],
              lectura_final: datesLectura?.to?.toISOString().split('T')[0],
              recibo_inicio: datesEntrega?.from?.toISOString().split('T')[0],
              recibo_final: datesEntrega?.to?.toISOString().split('T')[0],
              validacion_inicio: datesValidacion?.from?.toISOString().split('T')[0],
              validacion_final: datesValidacion?.to?.toISOString().split('T')[0],
              vigencia_recibo: vigenciaRecibo
            }
          ]
      }
    )
  }, [datesLectura, datesValidacion, datesFacturacion, datesEntrega, vigenciaRecibo])

  useEffect(() => {
    if (error != "") {
      toast({
        title: "Ocurrio un error",
        description: error,
        variant: "destructive"
      })
      setError("");
    }
  }, [error])

  return (
    <div>
      <AlertDialog open={open}>
        <AlertDialogTrigger asChild onClick={() => { setOpen(true) }}>{trigger}</AlertDialogTrigger>
        <AlertDialogContent className="min-w-[40vw] h-[90vh]">
          <AlertDialogHeader>
            <AlertDialogTitle>Crear Periodo</AlertDialogTitle>
            <div className='flex flex-col gap-4'>
              <div>
                <p>Lectura</p>
                <DatePickerWithRange setFecha={setDatesLectura} defaultDate={datesLectura} />
              </div>

              <div>
                <p>Validación</p>
                <DatePickerWithRange setFecha={setDatesValidacion} defaultDate={datesValidacion} />
              </div>

              <div>
                <p>Facturación</p>
                <DatePickerWithRange setFecha={setDatesFacturacion} defaultDate={datesFacturacion} />
              </div>
              <div>
                <p>Entrega de recibos</p>
                <DatePickerWithRange setFecha={setDatesEntrega} defaultDate={datesEntrega} />
              </div>
              <div className="mt-[20px]">
                <p>Vencimiento de recibos</p>
                <input type="date"
                  name="fecha_nacimiento"
                  className="border border-border  w-full  rounded-md p-[4px] bg-background"
                  onChange={(e) => {
                    const value = e.currentTarget.value;
                    setVigenciaRecibo(value);
                  }
                  }
                />
              </div>
            </div>
          </AlertDialogHeader>

          <AlertDialogFooter className="flex items-end">
            <AlertDialogCancel onClick={() => {
              setOpen(false)
              setDatesEntrega({});
              setDatesLectura({});
              setDatesFacturacion({});
              setDatesValidacion({});
            }}>Cancelar</AlertDialogCancel>

            <Button
              disabled={loadingNewPeriodo}
              className='select-none'
              onClick={() => {
                newPeriodo(data, setError, setPeriodos, setOpen, setLoadingNewPeriodo);
                setDatesEntrega({});
                setDatesLectura({});
                setDatesFacturacion({});
                setDatesValidacion({});
              }}>
              <div className='flex gap-2 items-center justify-center'>
                {loadingNewPeriodo ?
                  <>
                    <div className='h-6 w-6 flex '>
                      <div class="loaderWhite"></div>
                    </div>
                  </>
                  : <></>
                }
                <p>Aceptar</p>
              </div>
            </Button>

          </AlertDialogFooter>

        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ModalNuevoPeriodo;

