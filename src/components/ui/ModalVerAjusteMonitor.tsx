import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "../../components/ui/button";
import axiosClient from "../../axios-client";

interface ModalVerAjusteMonitorProps {
  selected_ajuste: any; // Puedes cambiar el tipo según el modelo de Ajuste
  open: boolean;
  set_open: (open: boolean) => void;
}

const ModalVerAjusteMonitor: React.FC<ModalVerAjusteMonitorProps> = ({
  selected_ajuste,
  open,
  set_open,
}) => {
  const [comentario, set_comentario] = useState<string>("");

  const handleCancelAjuste = async () => {
    if (!comentario) {
      alert("Por favor, agrega un motivo de cancelación.");
      return;
    }

    try {
      // Llamada a la API para cancelar el ajuste
      const response = await axiosClient.put("/Ajuste/cancelar", {
        id: selected_ajuste?.id,
        motivo_cancelacion: comentario,
      });

      if (response.status === 200) {
        console.log("Ajuste cancelado:", response.data);
        // Cierra el modal al completar la cancelación
        set_open(false);
      } else {
        console.error("Error al cancelar el ajuste");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={set_open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Ver Ajuste</AlertDialogTitle>
          <AlertDialogDescription>
            Revisa los detalles del ajuste y agrega un comentario si es necesario.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Detalles del ajuste */}
        <div>
          <p>
            <strong>ID Ajuste:</strong> {selected_ajuste?.id}
          </p>
          <p>
            <strong>Estado:</strong> {selected_ajuste?.estado}
          </p>
          <p>
            <strong>Monto Total:</strong> {selected_ajuste?.monto_total}
          </p>
        </div>

        {/* Campo para ingresar el comentario */}
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

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => set_open(false)}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleCancelAjuste}>
            Cancelar Ajuste
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalVerAjusteMonitor;
