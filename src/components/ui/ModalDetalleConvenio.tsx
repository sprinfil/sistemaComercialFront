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
import Loader from "../ui/Loader.tsx";

interface ModalConvenioProps {
  trigger: React.ReactNode;
  title: string;
  onConfirm: () => void;
}

const ModalConvenioDetalle: React.FC<ModalConvenioProps> = ({ trigger, title, onConfirm }) => {
  const { usuariosEncontrados } = ZustandGeneralUsuario();
  const [convenios, setConvenios] = useState<any[]>([]);
  const [comentario, setComentario] = useState<string>("");
  const [selectedConvenio, setSelectedConvenio] = useState<any>(null);
  const [convenioDetails, setConvenioDetails] = useState<any>(null); // State for detailed convenio info
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

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
      setLoading(true);
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
              letras: data.letras,
            }];
            setConvenios(conveniosData);
          } else {
            setConvenios([]);
          }
        })
        .catch((err) => {
          console.error('Error al obtener los convenios:', err);
          setConvenios([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    cargarConvenios();
  }, [usuariosEncontrados]);

  const cargarConvenioDetalles = (convenioId: number) => {
    axiosClient
      .get(`/Convenio/DetallesConvenio`, {
        params: {
          id_convenio: convenioId,
        },
      })
      .then(({ data }) => {
        setConvenioDetails(data); // Set detailed data from the new API call
      })
      .catch((err) => {
        console.error('Error al obtener los detalles del convenio:', err);
      });
  };

  useEffect(() => {
    if (selectedConvenio) {
      cargarConvenioDetalles(selectedConvenio.id); // Fetch more details when a convenio is selected
    }
  }, [selectedConvenio]);

  const handleCancelarConvenio = async (convenioId: number) => {
    try {
      const response = await axiosClient.put("/Convenio/CancelarConvenio", {
        id_convenio: convenioId,
        motivo_cancelacion: comentario,
      });

      if (response.status === 200) {
        cargarConvenios();
        setSelectedConvenio(null);
        setComentario("");
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
        {loading ? (
        <Loader />
      ) : (

        <div className="mt-4 overflow-x-auto">
          {convenios.length > 0 ? (
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left px-4 py-2">Monto conveniado</th>
                  <th className="text-left py-2">Monto Total</th>
                  <th className="text-left px-4 py-2">Periodicidad</th>
                  <th className="text-left px-4 py-2">Cantidad de letras</th>
                  <th className="text-left px-4 py-2">Estado</th>
                  <th className="text-left px-4 py-2">Comentario</th>
                </tr>
              </thead>
              <tbody>
                {convenios.map((convenio) => (
                  <tr
                    key={convenio.id}
                    className={`hover:bg-gray-100 ${selectedConvenio?.id === convenio.id ? 'bg-green-300' : ''}`} // Agrega la clase si es seleccionado
                    onClick={() => setSelectedConvenio(convenio)}
                  >
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

          {selectedConvenio && (
            <div className="mt-4">
              <label htmlFor="comentario">Comentario</label>
              <textarea
                id="comentario"
                className="w-full mt-2 p-2 border rounded-md"
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                placeholder="Agrega un comentario..."
              />
            </div>
          )}

          {/* Display additional convenio details */}
          {convenioDetails && (
            <div className="mt-4 border p-4 rounded-md">
              <h4 className="text-lg font-semibold">Detalles del Convenio</h4>
              <p>Monto restante: {convenioDetails.monto_restante}</p>
              <p>Pagos realizados: {convenioDetails.pagos_realizados}</p>
              <p>Fecha de finalización: {convenioDetails.fecha_finalizacion}</p>
            </div>
          )}
        </div>
        )}

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
