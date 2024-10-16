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

const ModalSeguroCancelarMulta = ({selected_multa}) => {

  const { toast } = useToast();
  const {abrirModalCancelacion, setAbrirModalCancelacion} = ZustandMultas();


  console.log(selected_multa);


console.log(abrirModalCancelacion);

  return (
    <AlertDialog open={abrirModalCancelacion} onOpenChange={setAbrirModalCancelacion}>
    <AlertDialogContent className="max-w-[65vh]">
      <AlertDialogHeader>
        <AlertDialogTitle>
         Asignar multa
        </AlertDialogTitle>

        <AlertDialogDescription>
              asddsasd
              <div className="flex justify-end">
                  <div className="flex space-x-2">
                <Button onClick={() => setAbrirModalCancelacion(false)}>Cancelar </Button>
                <Button type="submit">Multar</Button>
                </div>
       
              </div>


        </AlertDialogDescription>
      </AlertDialogHeader>
    </AlertDialogContent>
  </AlertDialog>
  );
}

export default ModalSeguroCancelarMulta;
