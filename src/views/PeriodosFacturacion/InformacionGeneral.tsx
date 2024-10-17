import React, { useEffect, useState } from 'react';
import { createSwapy } from 'swapy'
import { ChartComponent } from '../../components/ui/ChartComponent';
import { DatePickerWithRange } from '../../components/ui/DatePickerWithRange';
import { Button } from '../../components/ui/button';
import { Pencil1Icon } from '@radix-ui/react-icons';
import { editPeriodo } from '../../lib/Services/PeriodosFacturacionService';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Modal from '../../components/ui/Modal';
import { useToast } from '../../components/ui/use-toast';
import { ToastAction } from '@radix-ui/react-toast';

export const InformacionGeneral = ({ selectedRutaDetalle, setPeriodos, setDetalle }) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const { toast } = useToast();
  console.log(selectedRutaDetalle)
  const [datesLectura, setDatesLectura] = useState({
    from: dayjs(selectedRutaDetalle?.lectura_inicio).local().toDate(),
    to: dayjs(selectedRutaDetalle?.lectura_final).local().toDate()
  });
  const [datesValidacion, setDatesValidacion] = useState({
    from: dayjs(selectedRutaDetalle?.validacion_inicio).local().toDate(),
    to: dayjs(selectedRutaDetalle?.validacion_final).local().toDate()
  });
  const [datesFacturacion, setDatesFacturacion] = useState({
    from: dayjs(selectedRutaDetalle?.facturacion_fecha_inicio).local().toDate(),
    to: dayjs(selectedRutaDetalle?.facturacion_fecha_final).local().toDate()
  });
  const [datesEntrega, setDatesEntrega] = useState({
    from: dayjs(selectedRutaDetalle?.recibo_inicio).local().toDate(),
    to: dayjs(selectedRutaDetalle?.recibo_final).local().toDate()
  });

  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loadingEditPeriodo, setLoadingEditPeriodo] = useState(false);
  const [editar, setEditar] = useState(false);
  const [vigenciaRecibo, setVigenciaRecibo] = useState(selectedRutaDetalle?.vigencia_recibo);

  useEffect(() => {
    if (error != "") {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
        action: <ToastAction altText='Aceptar'>Aceptar</ToastAction>
      })
    }
    setError("");
  }, [error])

  useEffect(() => {
    setData(
      {
        periodos:
        {
          id: selectedRutaDetalle?.id,
          id_ruta: selectedRutaDetalle?.id_ruta,
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
      }
    )
  }, [datesLectura, datesValidacion, datesFacturacion, datesEntrega, vigenciaRecibo])

  const TomasData = [
    { month: "Facturadas", desktop: 186, mobile: 100 },
    { month: "Pendientes", desktop: 305, mobile: 200 },
    { month: "Anomalías", desktop: 237, mobile: 120 },
  ]
  const AnomaliasData = [
    { month: "Sin Medidor", desktop: 86, mobile: 100 },
    { month: "Perro Bravo", desktop: 25, mobile: 200 },
    { month: "Medidor Volteado", desktop: 37, mobile: 120 },
  ]

  const handleEditar = () => {
    if (!editar) {
      setEditar(true);
    }
    if (editar) {
      editPeriodo(data, setPeriodos, setDetalle, setLoadingEditPeriodo, setEditar, false, setError);
    }
  }

  const refresh = () => {
    setDatesFacturacion({
      from: dayjs(selectedRutaDetalle?.facturacion_fecha_inicio).local().toDate(),
      to: dayjs(selectedRutaDetalle?.facturacion_fecha_final).local().toDate()
    })

    setDatesLectura({
      from: dayjs(selectedRutaDetalle?.lectura_inicio).local().toDate(),
      to: dayjs(selectedRutaDetalle?.lectura_final).local().toDate()
    })

    setDatesEntrega({
      from: dayjs(selectedRutaDetalle?.recibo_inicio).local().toDate(),
      to: dayjs(selectedRutaDetalle?.recibo_final).local().toDate()
    })

    setDatesValidacion({
      from: dayjs(selectedRutaDetalle?.validacion_inicio).local().toDate(),
      to: dayjs(selectedRutaDetalle?.validacion_final).local().toDate()
    })
  }

  useEffect(() => {

    console.log(datesLectura)

  }, [datesLectura])


  return (
    <>
      <div className='w-full flex gap-2 max-h-[82vh] overflow-auto'>
        <div className='w-[50%] p-4 border rounded-md'>
          <div className='flex flex-col gap-4'>
            <div className='h-5 w-full flex'>
              <div className='ml-auto flex gap-2'>
                {
                  loadingEditPeriodo ?
                    <>
                      <div className='h-10 w-10 flex mr-3'>
                        <div class="loader"></div>
                      </div>
                    </>
                    : <>
                    </>
                }
                {
                  selectedRutaDetalle?.estatus == "activo" ?
                    <>
                      <Modal
                        trigger={<Button variant={"outline"}>Cerrar Periodo</Button>}
                        title='¿Cerrar Periodo?'
                        onConfirm={() => { editPeriodo(data, setPeriodos, setDetalle, setLoadingEditPeriodo, setEditar, true, setError); }}
                      />
                    </> :
                    <>

                    </>
                }

                {
                  editar ?
                    <>
                      <Button variant={"destructive"} onClick={() => { setEditar(false); refresh(); }}>Cancelar</Button>
                    </>
                    : <></>
                }
                {
                  selectedRutaDetalle?.estatus == "activo" ?
                    <>
                      <Button onClick={() => { handleEditar(); }}
                        variant={editar ? "default" : "outline"}
                        className={` select-none ${loadingEditPeriodo ? "pointer-events-none" : ""}`}>
                        {

                        }

                        {
                          editar ?
                            <>
                              <p>
                                Aceptar

                              </p>
                            </>
                            :
                            <>
                              <Pencil1Icon className='mr-3' />
                              Editar Fechas
                            </>
                        }
                      </Button>
                    </>
                    :
                    <>
                    </>
                }

              </div>
            </div>
            <div className={`flex flex-col gap-3 ${editar == true ? " " : "pointer-events-none"}`}>
              <div>
                <p>Lectura</p>
                <DatePickerWithRange setFecha={setDatesLectura} defaultDate={datesLectura}
                />
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
              <div className="">
                <p>Vencimiento de recibos</p>
                <input type="date" 
                name="fecha_nacimiento" 
                className="border border-border  w-full  rounded-md p-[4px] bg-background"
                defaultValue={vigenciaRecibo}
                onChange={(e)=>{
                  const value = e.currentTarget.value;
                  setVigenciaRecibo(value);
                }}
                />
              </div>
              <div className='flex items-center gap-3'>
                <p>Estado</p>
                <div className={`flex gap-2 items-center ${selectedRutaDetalle?.estatus == "activo" ? "text-green-500" : "text-red-500"}`}>
                  <div className={`w-3 rounded-full ${selectedRutaDetalle?.estatus == "activo" ? "bg-green-500" : "bg-red-500"} h-3`}></div>
                  <p>{selectedRutaDetalle?.estatus == "activo" ? "ACTIVO" : "CERRADO"}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className='w-[50%] flex flex-col gap-2'>
          <ChartComponent chartData={TomasData} title={"tomas"} description={"R01 Enero 2024"} />
          <ChartComponent chartData={AnomaliasData} title={"Anomalías"} description={"R01 Enero 2024"} />
        </div>
      </div>

    </>
  )
}


