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
import { ZustandGeneralUsuario } from '../../contexts/ZustandGeneralUsuario.tsx';
import { useToast } from './use-toast.ts';

interface ModalConvenioProps {
  trigger: React.ReactNode;
  title: string;
  onConfirm: () => void; 
}

const ModalConvenioDetalle: React.FC<ModalConvenioProps> = ({ trigger, title, onConfirm }) => {
  const { usuariosEncontrados } = ZustandGeneralUsuario();
  const [convenios, setConvenios] = useState<any[]>([]);
  const [comentario, set_comentario] = useState<string>("");
  const [selectedConvenio, setSelectedConvenio] = useState<any>(null);
  const { toast } = useToast();

  function successToastEliminado() {
    toast({
      title: "¡Éxito!",
      description: "Convenio eliminado exitosamente",
      variant: "success",
    });
  }

  const cargarConvenios = () => {
    if (usuariosEncontrados && usuariosEncontrados.length > 0) {
      const id_modelo = usuariosEncontrados[0].tomas[0];
      axiosClient
        .get(`/Convenio/ConsultarConvenio`, {
          params: {
            modelo_origen: 'toma',
            id_modelo: id_modelo,
          },
        })
        .then(({ data }) => {
          if (data && data.id_convenio_catalogo) {
            const convenioCatalogo = data.convenio_catalogo;
            console.log(data)
            const conveniosData = [{
              id: data.id,
              id_convenio_catalogo: convenioCatalogo.id,
              id_modelo: data.id_modelo,
              modelo_origen: data.modelo_origen,
              monto_conveniado: data.monto_conveniado,
              monto_total: data.monto_total,
              periodicidad: data.periodicidad,
              cantidad_letras: data.cantidad_letras,
              estado: data.estado,
              comentario: data.comentario,
              letras: data.letras, // Actualizar para incluir las letras
            }];
            console.log(conveniosData)
         
            //setConvenios(conveniosData);
          } else {
            setConvenios([]);
          }
        })
        .catch((err) => {
          console.error('Error al obtener los convenios:', err);
          setConvenios([]);
        });
    }
  };

  useEffect(() => {
    cargarConvenios();
  }, [usuariosEncontrados]);

  const handleCancelarConvenio = async (convenioId: number) => {
    try {
      const response = await axiosClient.put("/Convenio/CancelarConvenio", {
        id_convenio: convenioId,
        motivo_cancelacion: comentario,
      });

      if (response.status === 200) {
        cargarConvenios();
        setSelectedConvenio(null);
        set_comentario(""); // Clear the comment when canceling
        successToastEliminado();
      } else {
        console.error("Error al cancelar el convenio");
      }
    } catch (error) {
      console.error("Error en la solicitud de cancelación:", error);
    }
  };

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="w-[90vw] max-w-none">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold">
            {title}
          </AlertDialogTitle>
        </AlertDialogHeader>

        {/* Mostrar los detalles del convenio en una tabla */}
        <div className="mt-4 overflow-x-auto">
          {convenios.length > 0 ? (
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left px-4 py-2">Monto Conveniado</th>
                  <th className="text-left py-2">Monto Total</th>
                  <th className="text-left px-4 py-2">Periodicidad</th>
                  <th className="text-left px-4 py-2">Cantidad de Letras</th>
                  <th className="text-left px-4 py-2">Estado</th>
                  <th className="text-left px-4 py-2">Comentario</th>
                </tr>
              </thead>
              <tbody>
                {convenios.map((convenio) => (
                  <tr key={convenio.id} className="hover:bg-gray-50" onClick={() => setSelectedConvenio(convenio)}>
                    <td className="px-4 py-2">{convenio.monto_conveniado}</td>
                    <td className="px-4 py-2">{convenio.monto_total}</td>
                    <td className="px-4 py-2">{convenio.periodicidad}</td>
                    <td className="px-4 py-2">{convenio.cantidad_letras}</td>
                    <td className="px-4 py-2">{convenio.estado}</td>
                    <td className="px-4 py-2">{convenio.comentario}</td>    
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No hay convenios disponibles.</p>
          )}
          
          {/* Mostrar el comentario solo si hay un convenio seleccionado */}
          {selectedConvenio && (
            <div className="mt-4">
              <label htmlFor="comentario">Comentario</label>
              <textarea
                id="comentario"
                className="w-full mt-2 p-2 border rounded-md"
                value={comentario}
                onChange={(e) => set_comentario(e.target.value)}
                placeholder="Agrega un comentario..."
              />
            </div>
          )}
        </div>

        {/* Botón para cancelar el convenio seleccionado fuera de la tabla */}
        <div className="mt-4">
          {selectedConvenio && (
            <button
              onClick={() => handleCancelarConvenio(selectedConvenio.id)}
              className="bg-red-500 text-white p-2 rounded"
            >
              Cancelar Convenio
            </button>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>Aceptar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalConvenioDetalle;
