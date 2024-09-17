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
import Loader from '../ui/Loader.tsx';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'; // Importación del Accordion de Shadcn

interface ModalConvenioProps {
  trigger: React.ReactNode;
  title: string;
  onConfirm: (selectedConvenio: any) => void;
}

const ModalConvenio: React.FC<ModalConvenioProps> = ({ trigger, title, onConfirm }) => {
  const [convenios, setConvenios] = useState<any[]>([]);
  const [additionalData, setAdditionalData] = useState<any[]>([]); // For second table
  const [moreData, setMoreData] = useState<any[]>([]); // For third table
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedConvenio, setSelectedConvenio] = useState<any | null>(null);
  const [selectedAdditionalData, setSelectedAdditionalData] = useState<any | null>(null);

  useEffect(() => {
    setLoading(true);
    axiosClient.get('/Convenio')
      .then(({ data }) => {
        setConvenios(data.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error al obtener los datos.');
        console.error('API Error:', err);
        setLoading(false);
      });
  }, [selectedConvenio]);

  useEffect(() => {
    if (selectedConvenio) {
      axiosClient.get('/AdditionalData')
        .then(({ data }) => {
          setAdditionalData(data.data);
        })
        .catch(err => {
          console.error('Error al obtener los datos adicionales:', err);
        });
    }
  }, [selectedConvenio]);

  useEffect(() => {
    if (selectedAdditionalData) {
      axiosClient.get('/MoreData')
        .then(({ data }) => {
          setMoreData(data.data);
        })
        .catch(err => {
          console.error('Error al obtener más datos:', err);
        });
    }
  }, [selectedAdditionalData]);

  const handleRowClick = (convenio: any) => {
    setSelectedConvenio(convenio);
  };

  const handleAdditionalDataClick = (data: any) => {
    setSelectedAdditionalData(data);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      {/* Adjust the width using w-[80vw] */}
      <AlertDialogContent className="w-[90vw] max-w-none ">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold">{title}</AlertDialogTitle>
        </AlertDialogHeader>
        {loading ? (
          <Loader />
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <Accordion type="single" collapsible>
            {/* Accordion 1 - Convenios */}
            <AccordionItem value="convenios">
              <AccordionTrigger className="font-medium">Convenios Disponibles</AccordionTrigger>
              <AccordionContent>
                {convenios.length > 0 ? (
                  convenios.map((convenio: any) => (
                    <div
                      key={convenio.id}
                      className={`cursor-pointer p-2 hover:bg-gray-100 ${selectedConvenio?.id === convenio.id ? 'bg-gray-200' : ''}`}
                      onClick={() => handleRowClick(convenio)}
                    >
                      {convenio.nombre}
                    </div>
                  ))
                ) : (
                  <p className="text-center">No hay convenios disponibles.</p>
                )}
              </AccordionContent>
            </AccordionItem>

            {/* Accordion 2 - Cargos conveniables */}
            {selectedConvenio && (
              <AccordionItem value="additionalData">
                <AccordionTrigger className="font-medium">Cargos conveniables</AccordionTrigger>
                <AccordionContent>
                  {additionalData.length > 0 ? (
                    additionalData.map((data: any) => (
                      <div
                        key={data.id}
                        className="cursor-pointer p-2 hover:bg-gray-100"
                        onClick={() => handleAdditionalDataClick(data)}
                      >
                        {data.name}
                      </div>
                    ))
                  ) : (
                    <p className="text-center">No hay datos adicionales disponibles.</p>
                  )}
                </AccordionContent>
              </AccordionItem>
            )}

            {/* Accordion 3 - Configurar convenio */}
            {selectedAdditionalData && (
              <AccordionItem value="moreData">
                <AccordionTrigger className="font-medium">Configurar convenio</AccordionTrigger>
                <AccordionContent>
                  {moreData.length > 0 ? (
                    moreData.map((data: any) => (
                      <div key={data.id} className="p-2">
                        {data.name}
                      </div>
                    ))
                  ) : (
                    <p className="text-center">No hay más datos disponibles.</p>
                  )}
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        )}
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => selectedConvenio && onConfirm(selectedConvenio)}
            disabled={!selectedConvenio}
          >
            Aceptar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalConvenio;
