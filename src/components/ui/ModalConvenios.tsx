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
  const [isTable1Collapsed, setIsTable1Collapsed] = useState(true); // Initially collapsed
  const [isTable2Collapsed, setIsTable2Collapsed] = useState(true); // Initially collapsed
  const [isTable3Collapsed, setIsTable3Collapsed] = useState(true); // Initially collapsed

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
    setIsTable1Collapsed(true);  // Collapse Table 1
    setIsTable2Collapsed(false); // Expand Table 2
  };

  const handleAdditionalDataClick = (data: any) => {
    setSelectedAdditionalData(data);
    setIsTable2Collapsed(true);  // Collapse Table 2
    setIsTable3Collapsed(false); // Expand Table 3
  };

  const handleHeaderClick = (table: number) => {
    if (table === 1) {
      setIsTable1Collapsed(!isTable1Collapsed); 
    } else if (table === 2) {
      setIsTable2Collapsed(!isTable2Collapsed); 
    } else {
      setIsTable3Collapsed(!isTable3Collapsed); 
    }
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
          <div>
            {selectedConvenio && (
              <div className="mt-4">
                <p className="font-semibold">Convenio Seleccionado:</p>
                <p><strong>{selectedConvenio.nombre}</strong></p>
              </div>
            )}
            <div className="overflow-hidden mb-4">
              <div className={`transition-all duration-300 ease-in-out ${isTable1Collapsed ? 'max-h-40' : 'max-h-screen'}`}>
                <table className="w-full table-fixed border border-gray-200">
                  <thead
                    className="bg-gray-200 cursor-pointer"
                    onClick={() => handleHeaderClick(1)}
                  >
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Convenios Disponibles</th>
                    </tr>
                  </thead>
                  <tbody className={`bg-white ${isTable1Collapsed ? 'hidden' : ''}`}>
                    {convenios.length > 0 ? (
                      convenios.map((convenio: any) => (
                        <tr
                          key={convenio.id}
                          className={`cursor-pointer hover:bg-gray-100 ${selectedConvenio?.id === convenio.id ? 'bg-gray-200' : ''}`}
                          onClick={() => handleRowClick(convenio)}
                        >
                          <td className="px-4 py-2">{convenio.nombre}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="1" className="px-4 py-2 text-center">No hay convenios disponibles.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table 2 */}
            <div className="overflow-hidden mb-4">
              <div className={`transition-all duration-300 ease-in-out ${isTable2Collapsed ? 'max-h-40' : 'max-h-screen'}`}>
                <table className="w-full table-fixed border border-gray-200">
                  <thead
                    className="bg-gray-200 cursor-pointer"
                    onClick={() => handleHeaderClick(2)}
                  >
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Cargos conveniables</th>
                    </tr>
                  </thead>
                  <tbody className={`bg-white ${isTable2Collapsed ? 'hidden' : ''}`}>
                    {additionalData.length > 0 ? (
                      additionalData.map((data: any) => (
                        <tr
                          key={data.id}
                          className="cursor-pointer hover:bg-gray-100"
                          onClick={() => handleAdditionalDataClick(data)}
                        >
                          <td className="px-4 py-2">{data.name}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="1" className="px-4 py-2 text-center">No hay datos adicionales disponibles.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table 3 */}
            <div className="overflow-hidden mb-4">
              <div className={`transition-all duration-300 ease-in-out ${isTable3Collapsed ? 'max-h-40' : 'max-h-screen'}`}>
                <table className="w-full table-fixed border border-gray-200">
                  <thead
                    className="bg-gray-200 cursor-pointer"
                    onClick={() => handleHeaderClick(3)}
                  >
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Configurar convenio</th>
                    </tr>
                  </thead>
                  <tbody className={`bg-white ${isTable3Collapsed ? 'hidden' : ''}`}>
                    {moreData.length > 0 ? (
                      moreData.map((data: any) => (
                        <tr key={data.id}>
                          <td className="px-4 py-2">{data.name}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="1" className="px-4 py-2 text-center">No hay más datos disponibles.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
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
