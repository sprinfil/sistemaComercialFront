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
  const [selectedConvenio, setSelectedConvenio] = useState<any>(null);
  const { toast } = useToast()

  function successToastEliminado() {
    toast({
        title: "¡Éxito!",
        description: "Convenio elimindo exitosamente",
        variant: "success",

    })
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
          console.log('Respuesta de la API:', data);

          if (data && data.convenio_catalogo) {
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
              motivo_cancelacion: data.motivo_cancelacion,
              letra: data.letra[0].monto
            }];
            setConvenios(conveniosData);
            console.log(data.letra[0].monto)
          } else {
            console.error('La respuesta de la API no contiene los datos esperados');
            setConvenios([]); // Opcional: establece convenios como una lista vacía si no hay datos
          }
        })
        .catch((err) => {
          console.error('Error al obtener los convenios:', err);
          setConvenios([]); // Opcional: establece convenios como una lista vacía en caso de error
        });
    }
  };

  useEffect(() => {
    cargarConvenios();
  }, [usuariosEncontrados]);

  const handleCancelarConvenio = async (convenioId: number) => {
    try {
      // Llamada a la API para cancelar el convenio
      const response = await axiosClient.put("/Convenio/CancelarConvenio", {
        id_convenio: convenioId,
      });

      if (response.status === 200) {
        console.log("Convenio cancelado:", response.data);
        // Actualiza la lista de convenios para reflejar la cancelación
        cargarConvenios();
        setSelectedConvenio(null); // Limpia la selección
        successToastEliminado()
      } else {
        console.error("Error al cancelar el convenio");
      }
    } catch (error) {
      console.error("Error en la solicitud de cancelación:", error);
    }
  };

  const handleConfirm = () => {
    onConfirm();  // Llama a la función pasada por props para recargar los datos
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

        {/* Mostrar los detalles del convenio */}
        <div className="mt-4">
          {convenios.length > 0 ? (
            <div>
              {convenios.map((convenio) => (
                <div key={convenio.id} className="mb-4 p-4 border rounded shadow">
                  <p><strong>Monto Conveniado:</strong> {convenio.monto_conveniado}</p>
                  <p><strong>Monto Total:</strong> {convenio.monto_total}</p>
                  <p><strong>Periodicidad:</strong> {convenio.periodicidad}</p>
                  <p><strong>Cantidad en Letras:</strong> {convenio.cantidad_letras}</p>
                  <p><strong>Estado:</strong> {convenio.estado}</p>
                  <p><strong>Comentario:</strong> {convenio.comentario}</p>
                  <p><strong>Letra:</strong> {convenio.letra}</p>

                  {convenio.motivo_cancelacion ? (
                    <p><strong>Motivo de Cancelación:</strong> {convenio.motivo_cancelacion}</p>
                  ) : (
                    <p><strong>Motivo de Cancelación:</strong> No aplicable</p>
                  )}

                  <div className="mt-4">
                    <button
                      onClick={() => handleCancelarConvenio(convenio.id)}
                      className="bg-red-500 text-white p-2 rounded"
                    >
                      Cancelar Convenio
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No hay convenios disponibles.</p>
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
