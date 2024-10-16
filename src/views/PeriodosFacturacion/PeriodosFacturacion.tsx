import React, { useEffect, useState } from 'react'
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
import { DataTablePeriodosFacturacion, columns } from '../../components/ui/DataTablePeriodosFacturacion.tsx';
import { ComboboxRutas } from '../../components/ui/ComboBoxRutas'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from '../../components/ui/button'
import { IoCalendarNumberSharp } from "react-icons/io5";
import ModalNuevoPeriodo from '../../components/ui/ModalNuevoPeriodo'
import { useParams } from 'react-router-dom';
import PeriodoFacturacionDetalle from './PeriodoFacturacionDetalle'
import { loadPeriodosRuta } from '../../lib/Services/PeriodosFacturacionService'
import Loader from '../../components/ui/Loader'

export const PeriodosFacturacion = () => {
  // Cambiar el estado inicial a null
  const [selectedRuta, setSelectedRuta] = useState({});
  const [selectedRutaDetalle, setSelectedRutaDetalle] = useState({});
  const [accordionValue, setAccordionValue] = useState("item-1");
  const [periodos, setPeriodos] = useState([]);
  const { loadingPeriodos } = loadPeriodosRuta(selectedRuta, setPeriodos);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (selectedRuta?.nombre) {
      setAccordionValue("item-2");

    } else {
      setAccordionValue("item-1");
    }
  }, [selectedRuta]);

  useEffect(()=>{console.log(periodos)},[periodos])

  return (
    <div className='h-[90vh] flex flex-col'>
      <div className='mx-1 mt-1 h-full flex flex-col flex-grow'>
        {
          selectedRutaDetalle?.id ?
            <>
              <PeriodoFacturacionDetalle
                setDetalle={setSelectedRutaDetalle}
                selectedRutaDetalle={selectedRutaDetalle}
                setPeriodos={setPeriodos}
              />
            </>
            :
            <>
              <Accordion type="single" collapsible className={`w-full`} value={accordionValue}>
                <AccordionItem value="item-1" onClick={() => { setSelectedRuta({}) }}>
                  <AccordionTrigger className="bg-muted px-2">Seleccionar Ruta</AccordionTrigger>
                  <AccordionContent>
                    <div className="my-1 shadow-md border border-border rounded-md p-6">
                      <p className="ml-1 text-lg">Seleccionar Ruta</p>
                      <ComboboxRutas setSelectedRuta={setSelectedRuta} />
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="bg-muted px-2">Periodos</AccordionTrigger>
                  <AccordionContent>
                    <div className='mt-1'>
                      <div className="shadow-md border border-border p-5 rounded-md">
                        <div>
                          <p className='text-lg font-medium my-2'>{selectedRuta?.nombre}</p>
                        </div>
                        <div className="w-full flex justify-end items-center my-2">
                          <ModalNuevoPeriodo
                            open={openModal}
                            setOpen={setOpenModal}
                            setPeriodos={setPeriodos}
                            selectedRuta={selectedRuta}
                            trigger={<Button >
                              <div className='flex items-center'>
                                <p> Nuevo periodo</p>
                                <IoCalendarNumberSharp className='w-6 h-6 ml-3' />
                              </div>
                            </Button>}
                          />
                        </div>
                        {
                          loadingPeriodos ?
                            <>
                              <Loader />
                            </>
                            :
                            <>
                              {
                                periodos.length > 0 ?
                                  <>
                                    <DataTablePeriodosFacturacion
                                      columns={columns}
                                      setDetalle={setSelectedRutaDetalle}
                                      data={periodos}
                                    />
                                  </> :
                                  <>
                                    <p>Sin Periodos.</p>
                                  </>
                              }
                            </>
                        }
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </>
        }
      </div>
    </div>
  );
};
