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
import axiosClient from "../../axios-client";
import { useToast } from "./use-toast";


interface ModalVerAjusteMonitorProps {
  selected_ajuste: any; // Cambia según el modelo de Ajuste
  open: boolean;
  set_open: (open: boolean) => void;
  onCancelSuccess: () => void; // Nueva prop para actualizar la tabla
}

const ModalVerAjusteMonitor: React.FC<ModalVerAjusteMonitorProps> = ({
  selected_ajuste,
  open,
  set_open,
  onCancelSuccess, // Añadimos esta prop
}) => {
  const [comentario, set_comentario] = useState<string>("");
  const { toast } = useToast();

  const successToastEliminado = () => {
    toast({
      title: "¡Éxito!",
      description: "El ajuste se ha eliminado correctamente",
      variant: "success",
    });
  };

  const handleCancelAjuste = async () => {
    if (!comentario) {
      alert("Por favor, agrega un motivo de cancelación.");
      return;
    }

    try {
      const response = await axiosClient.put("/Ajuste/cancelar", {
        id: selected_ajuste?.id,
        motivo_cancelacion: comentario,
      });

      if (response.status === 200) {
        successToastEliminado();
        set_open(false); // Cerrar el modal

        // Llamar a la función que actualiza la tabla
        onCancelSuccess();
      } else {
        console.error("Error al cancelar el ajuste");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const mt= selected_ajuste?.monto_total;
  const mb= selected_ajuste?.monto_ajustado;
  const mta=mt-mb;
  
  

  return (
    <AlertDialog open={open} onOpenChange={set_open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Ver Ajuste</AlertDialogTitle>
          <AlertDialogDescription>
            Revisa los detalles del ajuste y agrega un comentario si es necesario.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div>
          <p><strong>Folio:</strong> {selected_ajuste?.id}</p>
          <p><strong>Estado:</strong> {selected_ajuste?.estado}</p>
          <p><strong>Monto total:</strong> {selected_ajuste?.monto_total}</p>
          <p><strong>Monto bonificado:</strong> {selected_ajuste?.monto_ajustado}</p>
          <p><strong>Monto total ajustado:</strong> {mta.toFixed(2)}</p>
        </div>

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
          <AlertDialogCancel onClick={() => set_open(false)}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleCancelAjuste} disabled={!comentario}>
            Cancelar Ajuste
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalVerAjusteMonitor;
