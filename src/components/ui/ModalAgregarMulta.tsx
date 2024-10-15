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
import { MultasComboBox } from "./MultasComboBox.tsx";
import { OperadorParaHacerLaMulta } from "./OperadorParaHacerLaMulta.tsx";
const ModalAgregarMulta = ({open, setIsOpen}) => {

  const { toast } = useToast();
  const [seleccionado, setSeleccionado] = useState("");
  const [operadorSeleccionado, setOperadorSeleccionado] = useState("");

  const [comentarioMulta, setComentarioMulta] = useState("");

  console.log(operadorSeleccionado.id);
const {usuariosEncontrados} = ZustandGeneralUsuario();

  const crearMulta =  async () => 
  {

    if(!operadorSeleccionado) 
    {
      toast({
        variant: "destructive",
        title: "Oh, no. Error",
        description: "Debes seleccionar un operador",
        action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
    })
    return;
    }

    if(!seleccionado) 
      {
        toast({
          variant: "destructive",
          title: "Oh, no. Error",
          description: "Debes seleccionar una multa",
          action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
      })
      return;
      }
      if(!comentarioMulta) 
        {
          toast({
            variant: "destructive",
            title: "Oh, no. Error",
            description: "Debes ingresar un comentario",
            action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
        })
        return;
        }
  


    const values = {
      codigo_toma: usuariosEncontrados[0]?.tomas[0]?.codigo_toma,
      id_catalogo_multa: seleccionado?.id,
      modelo_multado:"toma",
      motivo:comentarioMulta,
      id_revisor:operadorSeleccionado?.id
    }
    console.log(values);
    try
    {
      const response = await axiosClient.post("multa/store", values);
      console.log(response);
      toast({
        title: "¡Éxito!",
        description: "La multa se ha creado correctamente",
        variant: "success",

    })
    setIsOpen(false);
    setOperadorSeleccionado("");
    setSeleccionado("");
    setComentarioMulta("");
    }
    catch(response)
    {
      console.log(response);
      const mesaage = response.response.data.message
      toast({
        variant: "destructive",
        title: "Oh, no. Error",
        description: mesaage,
        action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
    })
    }
  }

  const handleValorMotivoMulta = (event) =>
  {
    setComentarioMulta(event.target.value);
  }

  const handleCerrarModal = (event) =>
    {
      setIsOpen(false);
      setOperadorSeleccionado("");
      setSeleccionado("");
      setComentarioMulta("");
    }
  

  console.log(comentarioMulta);

  return (
    <AlertDialog open={open} onOpenChange={setIsOpen}>
    <AlertDialogContent className="max-w-[95vh] max-h-[95vh]">
      <AlertDialogHeader>
        <AlertDialogTitle>
         Asignar multa
        </AlertDialogTitle>

        <AlertDialogDescription>
              <div className="text-xl mt-5">
                Selecciona una multa
              </div>
              <div className="mt-5 mb-10">
              <MultasComboBox onSelect={setSeleccionado}/>
              </div>
              <div className="text-xl mt-5">
                Selecciona un operador
              </div>
              <div className="mt-5 mb-10">
              <OperadorParaHacerLaMulta onSelect={setOperadorSeleccionado}/>
              </div>
              <div className="text-xl mt-5 mb-5">
                Motivo de la multa
              </div>
              <Input
              value={comentarioMulta}
              onChange={handleValorMotivoMulta}/>
              <div className="flex justify-end mt-10">
                  <div className="flex space-x-2">
                <AlertDialogCancel onClick={handleCerrarModal}>Cancelar </AlertDialogCancel>
                <Button onClick={crearMulta}>Aceptar</Button>
                </div>
       
              </div>


        </AlertDialogDescription>
      </AlertDialogHeader>
    </AlertDialogContent>
  </AlertDialog>
  );
}

export default ModalAgregarMulta;
