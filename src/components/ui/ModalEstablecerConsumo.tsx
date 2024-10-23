import React, { useEffect, useRef, useState } from 'react';
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
import { Input } from './input';
import { establecerConsumo } from '../../lib/Services/MonitorAnomaliaService';
import { useToast } from './use-toast';

interface ModalProps {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
  onConfirm: () => void;
}

const ModalEstablecerConsumo: React.FC<ModalProps> = ({ trigger, selectedToma, detalle, setData }) => {
  const [consumo, setConsumo] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    if (error != "") {
      toast({
        title: "Error",
        description: error,
        variant: "destructive"
      })
    }
    setError("");
  }, [error])

  useEffect(() => {
    setConsumo(0);
  }, [selectedToma])

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Establecer Consumo</AlertDialogTitle>
            <div className='flex flex-col'>
              <Input placeholder='Ingresa el nuevo consumo' type='number'
                onChange={(e) => {
                  setConsumo(e.currentTarget.value);
                }}
              ></Input>
              <div className='mt-10 flex gap-2 ml-auto'>
                <AlertDialogCancel 
                ref={cancelButtonRef}
                onClick={()=>{setConsumo(0);}}
                >Cancelar</AlertDialogCancel>
                {
                  consumo > 0 ?
                    <>
                      <Button
                        className='select-none'
                        onClick={async () => {
                            await establecerConsumo(consumo ?? 0, selectedToma?.toma?.id ?? 0, detalle?.id ?? 0, setError, setLoading, setConsumo, setData, cancelButtonRef);

                        }}
                        disabled={loading}
                      >
                        {
                          loading ?
                            <>
                              <div className='h-6 w-6 flex mr-4'>
                                <div class="loaderWhite"></div>
                              </div>
                            </>
                            :
                            <></>
                        }
                        <p>Aceptar</p>
                      </Button>
                    </>
                    :
                    <>
                    </>
                }

              </div>
            </div>
          </AlertDialogHeader>

          <AlertDialogFooter>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ModalEstablecerConsumo;

