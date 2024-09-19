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
import { Toast } from '@radix-ui/react-toast'
import { useStateContext } from '../../contexts/ContextProvider.tsx';


interface ModalAjusteProps {
  trigger: React.ReactNode;
  title: string;
  onConfirm: (selectedConvenio: any) => void;
}

const ModalAjuste: React.FC<ModalAjusteProps> = ({ trigger, title, onConfirm }) => {
  const [ajustes, setAjustes] = useState<any[]>([]);
  const [cargosAjustables, setCargosAjustables] = useState<any[]>([]);
  const [cargosSeleccionados, setCargosSeleccionados] = useState<any[]>([]);
  const [selectAll, setSelectAll] = useState(false); // Estado para seleccionar todos
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAjuste, setSelectedAjuste] = useState<any | null>(null);
  const [montoAjustable, setMontoAjustable] = useState<number>(0);
  const [comentario, setComentario] = useState<string>('');
  const { usuariosEncontrados } = ZustandGeneralUsuario();
  const [activeAccordion, setActiveAccordion] = useState<string | null>("ajustes");
  const {user}= useStateContext();

  useEffect(() => {
    setLoading(true);
    axiosClient.get('/AjustesCatalogo')
      .then(({ data }) => {
        setAjustes(data.data);
        setLoading(false);
        console.log(ajustes)
      })
      .catch(err => {
        setError('Error al obtener los ajustes.');
        console.error('API Error:', err);
        setLoading(false);
      });
  }, []);

  const handleRowClick = (ajuste: any) => {
    setSelectedAjuste(ajuste);
  
    const idModeloDueno = usuariosEncontrados?.[0]?.tomas?.[0]?.id;
    if (!idModeloDueno) {
      console.error('No se encontró un id_modelo_dueno válido');
      return;
    }
  
    try {
      axiosClient.get("/Ajuste/comparar", {
        params: {
        modelo_dueno: "toma",
        id_modelo_dueno: idModeloDueno,
        id_ajuste_catalogo: ajuste.id
      }})
      .then(({ data }) => {
        console.log('Respuesta de la API:', data); // Verifica los datos
        const filteredCargos = data.map((cargo: any) => ({
          id: cargo.cargo_id,
          nombre: cargo.cargo,
          monto: cargo.monto_pendiente,
          porcentajeAjustable: cargo.porcentaje_ajustable,
          concepto: cargo.concepto
        }));
        setCargosAjustables(filteredCargos);
        setActiveAccordion("cargosAjustables")
        console.log(cargosAjustables)
      })
      .catch(err => {
        
        console.error('Error al obtener los cargos ajustables:', err);
      });
    } catch (error) {
      console.error('Error en handleRowClick:', error);
    }
  };
  

  

  const handleCargoSeleccionado = (cargo: any) => {
    setCargosSeleccionados((prevCargosSeleccionados) => {
      if (prevCargosSeleccionados.some((c: any) => c.id === cargo.id)) {
        // Eliminar el cargo si ya está seleccionado
        return prevCargosSeleccionados.filter((c: any) => c.id !== cargo.id);
      } else {
        // Agregar el cargo si no está seleccionado
        return [...prevCargosSeleccionados, cargo];
      }
    });
  };
  

  const handleSelectAll = () => {
    if (selectAll) {
      setCargosSeleccionados([]);
    } else {
      setCargosSeleccionados(cargosAjustables);
    }
    setSelectAll(!selectAll);
  };

  const handleConfirmar = () => {
    const payload = {
        id_ajuste_catalogo: selectedAjuste.id || 0,
        id_modelo_dueno: usuariosEncontrados[0].tomas[0].id,
        modelo_dueno: "toma",
        id_operador: user.id,
        cargos_ajustados: cargosSeleccionados.map(cargo => ({
            id_cargo: cargo.id,
            monto_bonificado: montoAjustable
        })),
    };

    axiosClient.post('/Ajuste/create', payload)
        .then(response => {
            console.log('Convenio registrado', response);
            onConfirm(selectedAjuste);  // Llama a la función para actualizar la tabla
            // Limpiar estados
            setAjustes([]);
            setCargosAjustables([]);
            setCargosSeleccionados([]);
            setSelectAll(false);
            setSelectedAjuste(null);
            setMontoAjustable(0);
            setComentario('');
        })
        .catch(error => {
            console.error('Error al registrar ajuste:', error);
            console.log(payload)
            
        });
};

  

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="w-[90vw] max-w-none">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold">{title}</AlertDialogTitle>
          {selectedAjuste && (
            <div className="mt-4">
              <h3 className="font-medium">Resumen:</h3>
              <p>Ajuste: {selectedAjuste.nombre}</p>
              <p>Cargos Ajustables:</p>
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
          <Accordion type="single" collapsible value={activeAccordion} onValueChange={setActiveAccordion}>
            <AccordionItem value="ajustes">
              <AccordionTrigger className="font-medium">Ajustes Disponibles</AccordionTrigger>
              <AccordionContent>
                {ajustes.length > 0 ? (
                  ajustes.map((ajuste: any) => (
                    <div
                      key={ajuste.id}
                      className={`cursor-pointer p-2 hover:bg-gray-100 ${selectedAjuste?.id === ajuste.id ? 'bg-gray-200' : ''}`}
                      onClick={() => handleRowClick(ajuste)}
                    >
                      {ajuste.nombre}
                    </div>
                  ))
                ) : (
                  <p className="text-center">No hay ajustes disponibles.</p>
                )}
              </AccordionContent>
            </AccordionItem>

            {selectedAjuste && (
              <AccordionItem value="cargosAjustables">
                <AccordionTrigger className="font-medium">Cargos Ajustables</AccordionTrigger>
                <div className=''>
                  <AccordionContent>
                  <table>
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left">Monto Ajustable</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                          <td className="px-4 py-2">
                            <Input
                              type="number"
                              value={montoAjustable}
                              onChange={(e) => setMontoAjustable(Number(e.target.value))}
                              className="border p-1"
                            />
                          </td>
                      </tr>
                    </tbody>
                  </table>
                    <table className="min-w-full table-auto mt-4">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 text-left">
                            <Checkbox
                              checked={selectAll}
                              onCheckedChange={handleSelectAll}
                            />
                            {" "} Nombre del Cargo
                          </th>
                          <th className="px-4 py-2 text-left">Monto</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cargosAjustables.map((cargo: any) => (
                          <tr key={cargo.id} className="border-t">
                            <td className="px-4 py-2">
                              <Checkbox
                                checked={cargosSeleccionados.some((c: any) => c.id === cargo.id)}
                                onCheckedChange={() => handleCargoSeleccionado(cargo)}
                              />
                              {" "}{cargo.nombre}
                            </td>
                            <td className="px-4 py-2">${cargo.monto}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    
                    
                  </AccordionContent>
                </div>
              </AccordionItem>
            )}
          </Accordion>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmar}>
            Aceptar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalAjuste;

;
