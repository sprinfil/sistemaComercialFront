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

interface ModalAjusteProps {
  trigger: React.ReactNode;
  title: string;
  onConfirm: (selectedAjuste: any) => void;
}

const ModalAjuste: React.FC<ModalAjusteProps> = ({ trigger, title, onConfirm }) => {
  const [ajustes, setAjustes] = useState<any[]>([]);
  const [additionalData, setAdditionalData] = useState<any[]>([]); // For second table
  const [moreData, setMoreData] = useState<any[]>([]); // For third table
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAjuste, setSelectedAjuste] = useState<any | null>(null);
  const [selectedAdditionalData, setSelectedAdditionalData] = useState<any | null>(null);
  const [isTable1Collapsed, setIsTable1Collapsed] = useState(true); // Initially collapsed
  const [isTable2Collapsed, setIsTable2Collapsed] = useState(true); // Initially collapsed
  const [isTable3Collapsed, setIsTable3Collapsed] = useState(true); // Initially collapsed

  useEffect(() => {
    setLoading(true);
    axiosClient.get('/AjustesCatalogo')
      .then(({ data }) => {
        setAjustes(data.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error al obtener los ajustes.');
        console.error('API Error:', err);
        setLoading(false);
      });
  }, [selectedAjuste]);

  useEffect(() => {
    if (selectedAjuste) {
      axiosClient.get('/AdditionalAjustesData')
        .then(({ data }) => {
          setAdditionalData(data.data);
        })
        .catch(err => {
          console.error('Error al obtener los datos adicionales de ajustes:', err);
        });
    }
  }, [selectedAjuste]);

  useEffect(() => {
    if (selectedAdditionalData) {
      axiosClient.get('/MoreAjustesData')
        .then(({ data }) => {
          setMoreData(data.data);
        })
        .catch(err => {
          console.error('Error al obtener más datos de ajustes:', err);
        });
    }
  }, [selectedAdditionalData]);

  const handleRowClick = (ajuste: any) => {
    setSelectedAjuste(ajuste);
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
      <AlertDialogContent className="w-[90vw] max-w-none">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold">{title}</AlertDialogTitle>
        </AlertDialogHeader>
        {loading ? (
          <Loader />
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div>
            {selectedAjuste && (
              <div className="mt-4">
                <p className="font-semibold">Ajuste Seleccionado:</p>
                <p><strong>{selectedAjuste.nombre}</strong></p>
              </div>
            )}
            <div className="overflow-hidden mb-4">
              <div className={`transition-all duration-300 ease-in-out ${isTable1Collapsed ? 'max-h-40' : 'max-h-screen'}`}>
                <table className="w-full table-fixed border border-muted">
                  <thead
                    className="bg-muted cursor-pointer"
                    onClick={() => handleHeaderClick(1)}
                  >
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Ajustes Disponibles</th>
                    </tr>
                  </thead>
                  <tbody className={`bg-background ${isTable1Collapsed ? 'hidden' : ''}`}>
                    {ajustes.length > 0 ? (
                      ajustes.map((ajuste: any) => (
                        <tr
                          key={ajuste.id}
                          className={`cursor-pointer hover:bg-muted ${selectedAjuste?.id === ajuste.id ? 'bg-muted' : ''}`}
                          onClick={() => handleRowClick(ajuste)}
                        >
                          <td className="px-4 py-2">{ajuste.nombre}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="1" className="px-4 py-2 text-center">No hay ajustes disponibles.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table 2 */}
            <div className="overflow-hidden mb-4">
              <div className={`transition-all duration-300 ease-in-out ${isTable2Collapsed ? 'max-h-40' : 'max-h-screen'}`}>
                <table className="w-full table-fixed border border-muted">
                  <thead
                    className="bg-muted cursor-pointer"
                    onClick={() => handleHeaderClick(2)}
                  >
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Cargos Ajustables</th>
                    </tr>
                  </thead>
                  <tbody className={`bg-background ${isTable2Collapsed ? 'hidden' : ''}`}>
                    {additionalData.length > 0 ? (
                      additionalData.map((data: any) => (
                        <tr
                          key={data.id}
                          className="cursor-pointer hover:bg-muted"
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
                <table className="w-full table-fixed border border-muted">
                  <thead
                    className="bg-muted cursor-pointer"
                    onClick={() => handleHeaderClick(3)}
                  >
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Configurar Ajuste</th>
                    </tr>
                  </thead>
                  <tbody className={`bg-background ${isTable3Collapsed ? 'hidden' : ''}`}>
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
            onClick={() => selectedAjuste && onConfirm(selectedAjuste)}
            disabled={!selectedAjuste}
          >
            Aceptar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalAjuste;
