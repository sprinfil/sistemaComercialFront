import React, { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../../components/ui/button";
import { ComboBoxConceptos } from '../ui/ComboBoxConceptos';
import ZustandConvenios from '../../contexts/ZustandConvenios';
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
import { CrossCircledIcon } from '@radix-ui/react-icons';
import IconButton from '../ui/IconButton';
import { useStateContext } from "../../contexts/ContextConvenio.tsx";
import { ComboBoxTipoTomas } from './ComboBoxTipoTomas.tsx';

interface ModalProps {
  trigger: React.ReactNode;
}

const ModalTipoTomasConvenios: React.FC<ModalProps> = ({ trigger }) => {
  const [selected_conceptos, set_selected_conceptos] = React.useState([]);
  const { convenio, setConvenio, loadingTable, setLoadingTable, setConvenios, setAccion, accion } = useStateContext();

  const quitar_concepto = (concepto) => {
    let conceptos_temp = selected_conceptos.filter((concepto_temp) => concepto_temp?.id !== concepto?.id);
    set_selected_conceptos(conceptos_temp);
  };

  useEffect(()=>{
    console.log(selected_conceptos)
  },[selected_conceptos])

  //TODO: AGREGAR API PARA GUARDAR Tipo de tomas A CONVENIOS
  const guardar_conceptos = () => {

    setConvenios((prev) => {
      return prev.map((convenio_temp) => {
        if (convenio_temp?.id == convenio.id) {
          let new_convenio = {
            ...convenio,
            tipoTomas: selected_conceptos
          }
          setConvenio(new_convenio);
          return new_convenio;
        } else {
          return convenio_temp;
        }
      })
    })

  }

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild onClick={() => {
          set_selected_conceptos(convenio?.tipoTomas || []);
        }}>{trigger}</AlertDialogTrigger>
        <AlertDialogContent className="max-w-[80vw] h-[90vh] max-h-[90vh] overflow-auto">
          <div className='w-full h-full relative'>
            <p className='font-medium text-[20px] mb-5'>Editar Tipo de Tomas</p>
            <ComboBoxTipoTomas selected_conceptos={selected_conceptos} set={set_selected_conceptos} />
            <div className='mt-5 h-[60vh] overflow-auto'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selected_conceptos?.map((concepto) => (
                    <TableRow>
                      <TableCell>
                        {concepto?.nombre}
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => { quitar_concepto(concepto) }}>
                          <CrossCircledIcon className='w-[20px] h-[20px] text-red-500' />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className='absolute bottom-2 right-3 flex gap-2'>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={() => { guardar_conceptos(); }}>Guardar</AlertDialogAction>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ModalTipoTomasConvenios;

