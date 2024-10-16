import React, { useEffect, useState } from "react";
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
import { useToast } from "@/components/ui/use-toast"; //IMPORTACIONES TOAST
import { ToastAction } from "@/components/ui/toast"; //IMPORTACIONES TOAST
import EscogerOrdenDeTrabajoTable from "../Tables/Components/EscogerOrdenDeTrabajoTable";
import axiosClient from "../../axios-client";
import { ZustandGeneralUsuario } from "../../contexts/ZustandGeneralUsuario";
import { ZustandFiltrosOrdenTrabajo } from "../../contexts/ZustandFiltrosOt";
import { zustandOrdenTrabajoStore } from "../../contexts/ZustandOrdenesDeTrabajoUsuario";
import IconButton from "./IconButton";
import { TrashIcon } from "lucide-react";
import { MdOutlineCancel } from "react-icons/md";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form.tsx";
import { Input } from '../../components/ui/input.tsx';
import { Button } from "./button.tsx";
import Loader from "./Loader.tsx";
import { Textarea } from "./textarea.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cerrarOtSchema } from "../Forms/validaciones.ts";
import ModalRegistroOT from "./ModalRegistroOT.tsx";
import { ZustandMultas } from "../../contexts/ZustandMultas.tsx";
const ModalEstasSeguroMulta2 = ({open, setIsOpen, selected_multa}) => {

  const { toast } = useToast();
 console.log(selected_multa);
  const [multasTablaTomaFront, setMultasTablaTomaFront] = useState([]);
 const {setMultasTablaToma, multasTablaToma} = ZustandMultas();
 const [mostrarFront, setMostrarFront] = useState(false);

 useEffect(() => {
  setMultasTablaTomaFront(multasTablaToma);
},[multasTablaToma])


 useEffect(() => {
    if(mostrarFront)
    {
      //console.log(multasTablaTomaFront);
      setMultasTablaToma(multasTablaTomaFront);
    }
 }, [multasTablaTomaFront])


 const handleCancelarMulta =  async () =>
  {
    setMostrarFront(false);
      try
      {
          const response = await axiosClient.put(`/multas/monitor/cancelarmulta/${selected_multa?.id}`)
          console.log(response.data.multa);
          const nuevaMulta = response.data.multa;
          setMostrarFront(true);
          console.log(nuevaMulta);
          setMultasTablaTomaFront((prevMultas) => {
            //console.log("Estado anterior de multas:", prevMultas); // Verifica el estado anterior aquí
            //console.log(selected_multa?.id); // Verifica el estado anterior aquí

            return prevMultas.map((multa) =>
                multa.id === selected_multa?.id
                    ? nuevaMulta // Reemplaza todo el objeto de la multa con el nuevo
                    : multa
            );

        });
        setMultasTablaToma(multasTablaTomaFront);

          toast({
              title: "¡Éxito!",
              description: "La multa se ha cancelado correctamente",
              variant: "success",
  
          })
          setIsOpen(false);
      } 
      catch(response)
      {
          //console.log(response.response.data.message);
          const mensaje = response.response.data.message;
          
      toast({
          variant: "destructive",
          title: "Oh, no. Error",
          description: mensaje,
          action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
      })

      }
  }


  return (
    <AlertDialog open={open} onOpenChange={setIsOpen}>
    <AlertDialogContent className="max-w-[90vh] max-h-[100vh]">
      <AlertDialogHeader>
        <AlertDialogTitle>
         ¿Estas seguro que deseas cancelar esta multa?
        </AlertDialogTitle>

        <AlertDialogDescription>
              
              <div className="flex justify-end">
                  <div className="flex space-x-2">
                <AlertDialogCancel onClick={() => setIsOpen(false)}>Cancelar </AlertDialogCancel>
                <Button type="button" onClick={handleCancelarMulta}>Aceptar</Button>
                </div>
       
              </div>


        </AlertDialogDescription>
      </AlertDialogHeader>
    </AlertDialogContent>
  </AlertDialog>
  );
}

export default ModalEstasSeguroMulta2;
