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
import { ZustandGeneralUsuario } from '../../contexts/ZustandGeneralUsuario.tsx';

interface ModalConvenioProps {
  trigger: React.ReactNode;
  title: string;
  onConfirm: (selectedConvenio: any) => void;
}

const ModalConvenio: React.FC<ModalConvenioProps> = ({ trigger, title, onConfirm }) => {
  const [convenios, setConvenios] = useState<any[]>([]);
  const [cargosConveniables, setCargosConveniables] = useState<any[]>([]);
  const [cargosSeleccionados, setCargosSeleccionados] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedConvenio, setSelectedConvenio] = useState<any | null>(null);
  const [porcentajeConveniado, setPorcentajeConveniado] = useState<number>(0);
  const [cantidadLetras, setCantidadLetras] = useState<number>(0);
  const [comentario, setComentario] = useState<string>('');
  const { usuariosEncontrados } = ZustandGeneralUsuario();

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
      id: convenio.id, 
      id_convenio_catalogo: convenio.id 
    })
      .then(({ data }) => {
        const filteredCargos = data.filter((cargo: any) => ({
          nombre: cargo.nombre,
          aplicable: cargo.aplicable,
          id: cargo.id,
          monto: cargo.monto,  // Asegúrate de incluir el monto aquí
        }));
        setCargosConveniables(filteredCargos);
      })
      .catch(err => {
        console.error('Error al obtener los cargos conveniables:', err);
      });
  };

  const handleCargoSeleccionado = (cargo: any) => {
    if (cargosSeleccionados.some((c: any) => c.id === cargo.id)) {
      setCargosSeleccionados(cargosSeleccionados.filter((c: any) => c.id !== cargo.id));
    } else {
      setCargosSeleccionados([...cargosSeleccionados, cargo]);
    }
  };

  const handleConfirmar = () => {
    const payload = {
      porcentaje_conveniado: porcentajeConveniado,
      id_convenio_catalogo: selectedConvenio.id,
      cantidad_letras: cantidadLetras,
      comentario,
      cargos_conveniados: cargosSeleccionados.map(cargo => ({ id: cargo.id })),
    };
    
    axiosClient.post('/Convenio/RegistrarConvenio', payload)
      .then(response => {
        console.log('Convenio registrado', response);
        onConfirm(selectedConvenio); 
      })
      .catch(error => {
        console.error('Error al registrar convenio:', error);
      });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="w-[90vw] max-w-none">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold">{title}</AlertDialogTitle>
          {selectedConvenio && (
            <div className="mt-4">
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
        
        {loading ? (
          <Loader />
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <Accordion type="single" collapsible>
            <AccordionItem value="convenios">
              <AccordionTrigger className="font-medium">Convenios Disponibles</AccordionTrigger>
              <AccordionContent>
                {convenios.length > 0 ? (
                  convenios.map((convenio: any) => (
                    <div
                      key={convenio.id}
                      className={`cursor-pointer p-2 hover:bg-gray-100 ${selectedConvenio?.id === convenio.id ? 'bg-gray-200' : ''}`}
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
                <AccordionTrigger className="font-medium">Cargos Conveniables</AccordionTrigger>
                <AccordionContent>
                  {cargosConveniables.length > 0 ? (
                    <table className="min-w-full table-auto mt-4">
                      <thead>
                        <tr>
                          <th className="px-4 py-2">Nombre del Cargo</th>
                          <th className="px-4 py-2">Aplicable</th>
                          <th className="px-4 py-2">Monto</th>
                          <th className="px-4 py-2">Porcentaje Conveniado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cargosConveniables.map((cargo: any) => (
                          <tr key={cargo.id} className="border-t">
                            <td className="px-4 py-2">
                              <input
                                type="checkbox"
                                checked={cargosSeleccionados.some((c: any) => c.id === cargo.id)}
                                onChange={() => handleCargoSeleccionado(cargo)}
                              />{" "}
                              {cargo.nombre}
                            </td>
                            <td className="px-4 py-2">{cargo.aplicable ? 'Sí' : 'No'}</td>
                            <td className="px-4 py-2">${cargo.monto}</td>
                            <td className="px-4 py-2">
                              <input
                                type="number"
                                value={porcentajeConveniado}
                                onChange={(e) => setPorcentajeConveniado(Number(e.target.value))}
                                className="border p-1 w-full"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-center">No hay cargos conveniables disponibles.</p>
                  )}
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmar} disabled={!selectedConvenio || cargosSeleccionados.length === 0}>
            Aceptar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalConvenio;
