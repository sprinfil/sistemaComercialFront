import React, { useEffect, useRef, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Cherrypick default plugins
import Sortable, { AutoScroll } from 'sortablejs/modular/sortable.core.esm.js';
import { useSortable, click } from '../../lib/Services/ModalGestionarLibroService';

interface ModalProps {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
  onConfirm: () => void;
}


const ModalGestionarLibro: React.FC<ModalProps> = ({ trigger, title, description, children, onConfirm, libro }) => {
  const itemsRef = useRef<HTMLUListElement>(null);
  const [changeTab, setChangeTab] = useState(false);

  //CUSTOM HOOK PARA INICIALIZAR LA LIBRERIA DE SORATBLEJS
  useSortable(itemsRef, (evt) => {
    console.log('Orden actualizado:', evt.oldIndex, evt.newIndex);
  });

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
        <AlertDialogContent className="min-w-[98vw] min-h-[98vh] max-h-[98vh] flex">
          <div className='flex-grow relative'>
            <p className='font-medium text-[25px]'>{title}</p>
            <Tabs defaultValue="general" className="w-full" onClick={() => { setChangeTab(!changeTab) }}>
              <TabsList>
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="secuencia">Secuencia</TabsTrigger>
              </TabsList>
              <TabsContent value="general">
                General
                <div className='absolute right-2 bottom-2 flex gap-2'>
                  <AlertDialogCancel >Cancelar</AlertDialogCancel>
                  <AlertDialogAction>Aceptar</AlertDialogAction>
                </div>
              </TabsContent>
              <TabsContent value="secuencia">
                <div className='max-h-[70vh] overflow-auto'>
                  <ul ref={itemsRef}>
                    {
                      <>
                        {libro?.tomas?.map(toma => (
                          <li className='select-none my-3 border py-4 rounded-md flex items-center px-3 cursor-pointer'>
                            {toma?.codigo_toma}
                          </li>
                        ))}
                      </>
                    }
                  </ul>

                </div>

                <div className='absolute right-2 bottom-2 flex gap-2'>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction>Aceptar</AlertDialogAction>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <AlertDialogFooter>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ModalGestionarLibro;
