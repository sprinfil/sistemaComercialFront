import React, { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import axiosClient from '../../axios-client';
import Loader from '../ui/Loader.tsx';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from "@/components/ui/checkbox"
import { ComboBoxConvenio } from './ComboBoxConvenio.tsx';
import { ZustandGeneralUsuario } from '../../contexts/ZustandGeneralUsuario.tsx';
import { Input } from './input.tsx';
import { ToastAction } from '@radix-ui/react-toast';
import { useToast } from './use-toast.ts';


interface ModalConvenioProps {
  trigger: React.ReactNode;
  title: string;
  onConfirm: (selectedConvenio: any) => void;
}

const ModalConvenio: React.FC<ModalConvenioProps> = ({ trigger, title, onConfirm }) => {
  const [convenios, setConvenios] = useState<any[]>([]);
  const [cargosConveniables, setCargosConveniables] = useState<any[]>([]);
  const [cargosSeleccionados, setCargosSeleccionados] = useState<any[]>([]);
  const [selectAll, setSelectAll] = useState(false); // Estado para seleccionar todos
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedConvenio, setSelectedConvenio] = useState<any | null>(null);
  const [porcentajeConveniado, setPorcentajeConveniado] = useState<number>(0);
  const [montoBonificado, setmontoBonificado] = useState<number>(0);
  const [cantidadLetras, setCantidadLetras] = useState<number>(0);
  const [comentario, setComentario] = useState<string>('');
  const { usuariosEncontrados } = ZustandGeneralUsuario();
  const [activeAccordion, setActiveAccordion] = useState<string | null>("convenios");
  const [tipoMonto, setTipoMonto] = useState<string>('%');
  const [montoConveniado, setMontoConveniado] = useState<number>(0);

  const { toast } = useToast()
  

  function successToastCreado() {
    toast({
        title: "¡Éxito!",
        description: "Convenio creado exitosamente!",
        variant: "success",

    })
}

  useEffect(() => {
    setLoading(true);
    axiosClient.get('/Convenio')
      .then(({ data }) => {
        setConvenios(data.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error al obtener los convenios.');
        console.error('API Error:', err);
        setLoading(false);
      });
  }, []);

  const handleRowClick = (convenio: any) => {
    setSelectedConvenio(convenio);

    axiosClient.post("/Convenio/BuscarConceptosConveniables", {
      tipo: "toma", 
      id: usuariosEncontrados[0].tomas[0].id, 
      id_convenio_catalogo: convenio.id 
    })
      .then(({ data }) => {
        const filteredCargos = data.filter((cargo: any) => ({
          nombre: cargo.nombre,
          aplicable: cargo.aplicable,
          id: cargo.id,
          monto: cargo.monto_pendiente,
        }));
        setCargosConveniables(filteredCargos);
        setActiveAccordion("cargosConveniables");
        console.log(filteredCargos)
      })
      .catch(err => {
        console.error('Error al obtener los cargos conveniables:', err);
      });
  };

  const handleCargoSeleccionado = (cargo: any) => {
    const yaSeleccionado = cargosSeleccionados.some((c) => c.id === cargo.id);
    if (yaSeleccionado) {
        setCargosSeleccionados(cargosSeleccionados.filter((c) => c.id !== cargo.id));
    } else {
        const montoBonificadoActual = tipoMonto === '%' 
            ? (cargo.monto_pendiente * porcentajeConveniado) / 100 
            : montoBonificado;
        
        setCargosSeleccionados([
            ...cargosSeleccionados,
            { ...cargo, montoBonificado: montoBonificadoActual }
        ]);
    }
};



  useEffect(() => {
    console.log(cargosSeleccionados)
   }, [cargosSeleccionados]);
   
   const calcularTotalSeleccionados = () => {
    return cargosSeleccionados.reduce((acc, cargo) => acc + (cargo.monto_pendiente || 0), 0);
  };
  

  useEffect(() => {
    calcularTotalSeleccionados(); // Llama a la función para que actualice el total
  }, [cargosSeleccionados]); // Dependencia en cargosSeleccionados
  
  

useEffect(() => {
    const totalSeleccionados = calcularTotalSeleccionados();
    if (tipoMonto === '%') {
        setmontoBonificado((totalSeleccionados * porcentajeConveniado) / 100);
    } else if (tipoMonto === '$') {
        // Aquí se puede manejar el caso de monto fijo si es necesario
        setPorcentajeConveniado((montoBonificado / totalSeleccionados) * 100);
    }
}, [porcentajeConveniado, montoBonificado, cargosSeleccionados, tipoMonto]);

  useEffect(() => {
    const totalSeleccionados = calcularTotalSeleccionados();
    if (tipoMonto === '$') {
      // Si el tipo es monto fijo, recalculamos el porcentaje basado en el monto sobre el total seleccionado
      setPorcentajeConveniado((montoBonificado / totalSeleccionados) * 100);
    }
  }, [montoBonificado, cargosSeleccionados]);

  const calcularTotalmontoBonificado = () => {
    return cargosSeleccionados.reduce((acc, cargo) => acc + (cargo.montoBonificado || 0), 0);
    
    
};


  const handleSelectAll = (checked: boolean) => {
    if (checked) {
        const nuevosCargosSeleccionados = cargosConveniables.map((cargo) => {
            const montoBonificadoActual = tipoMonto === '%' 
                ? (cargo.monto_pendiente * porcentajeConveniado) / 100 
                : montoBonificado;
            return { ...cargo, montoBonificado: montoBonificadoActual };
        });
        setCargosSeleccionados(nuevosCargosSeleccionados);
    } else {
        setCargosSeleccionados([]);
    }
    setSelectAll(checked);
};


  const handleConfirmar = () => {
    const payload = {
        id_convenio_catalogo: selectedConvenio.id || 0,
        id_modelo: usuariosEncontrados[0].tomas[0].id,
        modelo_origen: "toma",
        cantidad_letras: cantidadLetras,
        comentario: comentario,
        cargos_conveniados: cargosSeleccionados.map(cargo => ({
            id: cargo.id,
            porcentaje_conveniado: tipoMonto === '%' ? porcentajeConveniado : montoBonificado,
        })),
    };

    axiosClient.post('/Convenio/RegistrarConvenio', payload)
        .then(response => {
            console.log('Convenio registrado', response);
            onConfirm(selectedConvenio); 
            successToastCreado(); // Llama a la función para actualizar la tabla
        })
        .catch(error => {
            console.error('Error al registrar convenio:', error);
        });
};
const calcularTotalMontos = () => {
  return cargosSeleccionados.reduce((total, cargo) => total + (Number(cargo.monto_pendiente) || 0), 0);
};

useEffect(() => {
  const totalSeleccionados = calcularTotalMontos();
  console.log('Total de montos seleccionados:', totalSeleccionados); // Para depuración
}, [cargosSeleccionados]);

const formatMonto = (monto: number) => {
  // Convierte el monto a una cadena con 2 decimales solo si es necesario
  return monto % 1 === 0 ? monto.toString() : monto.toFixed(2);
};

const totalMontos = calcularTotalMontos();
const totalBonificado = calcularTotalmontoBonificado();
const resultadoResta = totalMontos - totalBonificado;
const resultadoDivision = cantidadLetras > 0 ? resultadoResta / cantidadLetras : 0;





return (
  <AlertDialog>
    <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
    <AlertDialogContent className="w-[90vw] max-w-none">
      <div className='flex '>
        
        {/* Primera parte - Resumen (1/3 del ancho) */}
        <div className="w-[40vh] p-4 ">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-semibold">{title}</AlertDialogTitle>

            {selectedConvenio && (
              <div className="mt-4 ">
                <h3 className="font-medium">Resumen:</h3>
                <p>Convenio: {selectedConvenio.nombre}</p>
                <p>Cargos Conveniados:</p>
                <ul>
                  {cargosSeleccionados.map((cargo: any) => (
                    <li key={cargo.id}>{cargo.nombre}</li>
                  ))}
                </ul>
              </div>
            )}
          </AlertDialogHeader>
        </div>

        {/* Segunda parte - Contenido restante (2/3 del ancho) */}
        <div className="w-[120vh] p-4 ">
          {loading ? (
            <Loader />
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <Accordion
              type="single"
              collapsible
              value={activeAccordion}
              onValueChange={setActiveAccordion}
            >
              <AccordionItem value="convenios">
                <AccordionTrigger className="font-medium">
                  Convenios Disponibles
                </AccordionTrigger>
                <AccordionContent>
                  {convenios.length > 0 ? (
                    convenios.map((convenio: any) => (
                      <div
                        key={convenio.id}
                        className={`cursor-pointer p-2 hover:bg-gray-100 ${
                          selectedConvenio?.id === convenio.id ? 'bg-gray-200' : ''
                        }`}
                        onClick={() => handleRowClick(convenio)}
                      >
                        {convenio.nombre}
                      </div>
                    ))
                  ) : (
                    <p className="text-center">No hay convenios disponibles.</p>
                  )}
                </AccordionContent>
              </AccordionItem>

              {selectedConvenio && (
                <AccordionItem value="cargosConveniables">
                  <AccordionTrigger className="font-medium">
                    Cargos Conveniables
                  </AccordionTrigger>
                  <AccordionContent>
                    <table>
                      <thead>
                        <tr>
                          <th className="px-4 py-2 text-left">Tipo de monto</th>
                          <th className="px-4 py-2 text-left">Porcentaje bonificado</th>
                          <th className="px-4 py-2 text-left">Monto bonificado</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-4 py-2">
                            <ComboBoxConvenio
                              placeholder="Tipo de monto"
                              name="tipoMonto"
                              readOnly={false}
                              onSelect={setTipoMonto}
                            />
                          </td>
                          <td className="px-4 py-2">
                            <Input
                              type="number"
                              
                              onChange={(e) => {
                                const value = e.target.value;
                                setPorcentajeConveniado(
                                  value === '' ? 0 : Number(value)
                                );
                              }}
                              className="border p-1"
                              disabled={tipoMonto !== '%'}
                            />
                          </td>
                          <td className="px-4 py-2">
                            <Input
                              type="number"
                              
                              onChange={(e) => {
                                const value = e.target.value;
                                setmontoBonificado(value === '' ? 0 : Number(value));
                              }}
                              className="border p-1"
                              disabled={tipoMonto !== '$'}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table className="min-w-full table-auto mt-4">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 text-left">
                            <Checkbox checked={selectAll} onCheckedChange={handleSelectAll} />
                            {" "}Nombre del Cargo
                          </th>
                          <th className="px-4 py-2 text-left">Aplicable</th>
                          <th className="px-4 py-2 text-left">Monto total</th>
                          <th className="px-4 py-2 text-left">Monto bonificado</th>
                          <th className="px-4 py-2 text-left">Monto conveniado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cargosConveniables.map((cargo: any) => (
                          <tr key={cargo.id} className="border-t">
                            <td className="px-4 py-2">
                              <Checkbox
                                checked={cargosSeleccionados.some((c: any) => c.id === cargo.id)}
                                onCheckedChange={() => handleCargoSeleccionado(cargo)}
                              />
                              {" "}{cargo.nombre}
                            </td>
                            <td className="px-4 py-2">{cargo.aplicable ? 'Sí' : 'No'}</td>
                            <td className="px-4 py-2">${cargo.monto_pendiente.toFixed(2)}</td>
                            <td className="px-4 py-2">
                              ${ (cargosSeleccionados.find((c: any) => c.id === cargo.id)?.montoBonificado ?? 0).toFixed(2) }
                            </td>
                            <td className="px-4 py-2">
                              ${ 
                                (cargo.monto_pendiente - (cargosSeleccionados.find((c: any) => c.id === cargo.id)?.montoBonificado ?? 0)).toFixed(2)
                              }
                            </td>
                          </tr>
                        ))}
                        <tr className="font-bold">
                          <td className="px-4 py-2" colSpan={2}>Total:</td>
                          <td className="px-4 py-2">${calcularTotalMontos().toFixed(2)}</td>
                          <td className="px-4 py-2">${calcularTotalmontoBonificado().toFixed(2)}</td>
                          <td className="px-4 py-2">$ {resultadoResta.toFixed(2)  }</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="px-4 py-2 text-left font-bold">Letras
                      <Input
                        className="w-15 font-normal"
                        value={cantidadLetras}
                        type="number"
                        onChange={(e) => setCantidadLetras(Number(e.target.value))}
                      />
                    </div>
                    <div className="px-4 py-2">
                      Cantidad por letra: ${resultadoDivision.toFixed(2)}
                    </div>
                    <div className="px-4 py-2 text-left font-bold">Comentarios
                      <Input
                        className="font-normal"
                        value={comentario}
                        type="text"
                        onChange={(e) => setComentario(String(e.target.value))}
                        placeholder="Añade un comentario"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          )}
        </div>
      </div>

      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction
          onClick={handleConfirmar}
          disabled={!selectedConvenio || cargosSeleccionados.length === 0}
        >
          Aceptar
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

};

export default ModalConvenio;
