import React, { useEffect, useState } from 'react';
import { createSwapy } from 'swapy'
import { ChartComponent } from '../../components/ui/ChartComponent';
import { DatePickerWithRange } from '../../components/ui/DatePickerWithRange';
import { Button } from '../../components/ui/button';
import { Pencil1Icon } from '@radix-ui/react-icons';
import { editPeriodo } from '../../lib/Services/PeriodosFacturacionService';

export const InformacionGeneral = ({ selectedRutaDetalle, setPeriodos, setDetalle }) => {
  const [datesLectura, setDatesLectura] = useState({
    from: new Date(selectedRutaDetalle?.lectura_inicio),
    to: new Date(selectedRutaDetalle?.lectura_final)
  });
  const [datesValidacion, setDatesValidacion] = useState({});
  const [datesFacturacion, setDatesFacturacion] = useState({});
  const [datesEntrega, setDatesEntrega] = useState({});
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loadingEditPeriodo, setLoadingEditPeriodo] = useState(false);
  const [editar, setEditar] = useState(false);

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
        }
      }
    )
  }, [datesLectura, datesValidacion, datesFacturacion, datesEntrega])

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
    setEditar(!editar);
    if (editar) {
      editPeriodo(data, setPeriodos, setDetalle);
    }
  }

  useEffect(() => {
    let facturacion_temp = {
      from: new Date(selectedRutaDetalle?.facturacion_fecha_inicio),
      to: new Date(selectedRutaDetalle?.facturacion_fecha_final)
    }
    setDatesFacturacion(facturacion_temp);
    console.log(facturacion_temp)
  }, [selectedRutaDetalle])

  return (
    <>
      <div className='w-full flex gap-2 max-h-[82vh] overflow-auto'>
        <div className='w-[50%] p-4 border rounded-md'>
          <div className='flex flex-col gap-4'>
            <div className='h-5 w-full flex'>
              <div className='ml-auto flex gap-2'>
                <Button variant={"outline"}>Cerrar Periodo</Button>
                {
                  editar ?
                    <>
                      <Button variant={"destructive"} onClick={() => { setEditar(false); }}>Cancelar</Button>
                    </>
                    : <></>
                }
                <Button onClick={() => { handleEditar(); }}
                  variant={editar ? "default" : "outline"}
                  className=''>
                  {
                    editar ?
                      <>
                        Aceptar
                      </>
                      :
                      <>
                        <Pencil1Icon className='mr-3' />
                        Editar Fechas
                      </>
                  }
                </Button>
              </div>
            </div>
            <div className={`flex flex-col gap-3 ${editar == true ? " " : "pointer-events-none"}`}>
              <div>
                <p>Lectura</p>
                <DatePickerWithRange setFecha={setDatesLectura} defaultDate={{
                  from: new Date(selectedRutaDetalle?.lectura_inicio),
                  to: new Date(selectedRutaDetalle?.lectura_final)
                }}
                />
              </div>

              <div>
                <p>Validación</p>
                <DatePickerWithRange setFecha={setDatesValidacion} />
              </div>

              <div>
                <p>Facturación</p>
                <DatePickerWithRange setFecha={setDatesFacturacion} defaultDate={{
                  from: new Date(selectedRutaDetalle?.facturacion_fecha_inicio),
                  to: new Date(selectedRutaDetalle?.facturacion_fecha_final)
                }} />
              </div>
              <div>
                <p>Entrega de recibos</p>
                <DatePickerWithRange setFecha={setDatesEntrega} defaultDate={{
                  from: new Date(selectedRutaDetalle?.recibo_inicio),
                  to: new Date(selectedRutaDetalle?.recibo_final)
                }} />
              </div>
              <div className="">
                <p>Vencimiento de recibos</p>
                <input type="date" name="fecha_nacimiento" className="border border-border  w-full  rounded-md p-[4px] bg-background" />
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


