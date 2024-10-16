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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
const ModalDetalleMulta = ({open, setIsOpen, selected_multa}) => {

  const { toast } = useToast();
 console.log(selected_multa);

  return (
    <AlertDialog open={open} onOpenChange={setIsOpen}>
    <AlertDialogContent className="max-w-[190vh] h-[40vh]">
      <AlertDialogHeader>
        <AlertDialogTitle>
         Detalle de la multa
        </AlertDialogTitle>

        <AlertDialogDescription>
        <Table className="mt-10">
      <TableCaption></TableCaption>
      <TableHeader className="text-xl ">
        <TableRow>
          <TableHead className="w-[100px]">Multa</TableHead>
          <TableHead>Motivo</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead >Monto</TableHead>
          <TableHead >Levantó la multa</TableHead>
          <TableHead >Revisó la multa</TableHead>
          <TableHead >Fecha de solicitud</TableHead>
          <TableHead >Fecha de revisión</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
    
          <TableRow className="text-xl">
            <TableCell >{selected_multa?.nombre_multa}</TableCell>
            <TableCell>{selected_multa?.motivo}</TableCell>
            <TableCell>{selected_multa?.estado}</TableCell>
            <TableCell>{selected_multa?.monto}</TableCell>
            <TableCell>{selected_multa?.operador_levanto_multa}</TableCell>
            <TableCell>{selected_multa?.nombre_operador_revisor}</TableCell>
            <TableCell>{selected_multa?.fecha_solicitud}</TableCell>
            <TableCell>{selected_multa?.fecha_revision}</TableCell>

          </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
        
        </TableRow>
      </TableFooter>
    </Table>

        </AlertDialogDescription>
      </AlertDialogHeader>
      <div className="flex justify-end">
      <AlertDialogCancel className="w-[12vh]">Cerrar</AlertDialogCancel>

      </div>

    </AlertDialogContent>
  </AlertDialog>
  );
}

export default ModalDetalleMulta;
