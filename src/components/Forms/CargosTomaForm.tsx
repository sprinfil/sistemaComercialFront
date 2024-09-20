import React, { useState, useEffect } from "react";
import axiosClient from "../../axios-client.ts";
import { ZustandGeneralUsuario } from "../../contexts/ZustandGeneralUsuario.tsx";
import ModalConvenio from "../ui/ModalConvenios.tsx";
import ModalAjuste from "../ui/ModalAjuste.tsx";
import Loader from "../ui/Loader.tsx";
import IconButton from "../ui/IconButton.tsx";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import ModalConvenioDetalle from "../ui/ModalDetalleConvenio.tsx";

const CargosTomaForm = () => {
  const { usuariosEncontrados } = ZustandGeneralUsuario();
  const [cargos, setCargos] = useState<any[]>([]);
  const [convenios, setConvenios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedConvenio, setSelectedConvenio] = useState<any>(null); // Estado para el convenio seleccionado

  const cargarCargos = () => {
    if (usuariosEncontrados) {
      setLoading(true);
      axiosClient
        .get(`/Toma/cargos/${usuariosEncontrados[0].tomas[0].codigo_toma}`)
        .then(({ data }) => {
          const filteredCargos = data.data.map((cargo: any) => ({
            id: cargo.id,
            concepto: cargo.nombre,
            monto: cargo.monto,
            estado: cargo.estado,
            fechaCargo: cargo.fecha_cargo,
            prioridad: cargo.concepto.prioridad_abono,
          }));
          setCargos(filteredCargos);
        })
        .catch((err) => {
          console.error("Error al obtener los cargos:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const cargarConvenios = () => {
    if (usuariosEncontrados && usuariosEncontrados.length > 0) {
      const id_modelo = usuariosEncontrados[0].tomas[0];
      axiosClient
        .get(`/Convenio/ConsultarConvenio`, {
          params: {
            modelo_origen: 'toma',
            id_modelo: id_modelo,
          },
        })
        .then(({ data }) => {
          if (data.convenio_catalogo) {
            const convenioCatalogo = data.convenio_catalogo;
            const conveniosData = [convenioCatalogo];
            setConvenios(conveniosData);
          } else {
            // Si no hay convenio, asegurarse de que convenios esté vacío
            setConvenios([]);
          }
        })
        .catch((err) => {
          // Verificar si el error es el mensaje específico de la API
          if (err.response && err.response.data && err.response.data.error === 'No se encontro convenio asociado a la toma o el usuario seleccionado.') {
            // No mostrar nada si no se encuentra el convenio
            setConvenios([]);
          } else {
            console.error('Error al obtener los convenios:', err);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  

  useEffect(() => {
    cargarCargos();
    cargarConvenios();
  }, [usuariosEncontrados]);

  const handleConvenioConfirm = () => {
    cargarCargos();
    cargarConvenios();
     // Vuelve a cargar los cargos después de confirmar un convenio
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div>Cargos
            <table className="w-full table-fixed">
              <thead className="bg-muted">
                <tr>
                  <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Concepto
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="bg-background">
                {cargos.length > 0 ? (
                  cargos.map((cargo, index) => (
                    <tr key={index}>
                      <td className="px-2 py-3">{cargo.concepto}</td>
                      <td className="px-2 py-3">{cargo.estado}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-2 py-3 text-center">
                      No hay cargos disponibles.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4"> Convenios
            <table className="w-full table-fixed">
              <thead className="bg-muted">
                <tr>
                  <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-2 py-3 text-center text-xs font-medium uppercase tracking-wider">
                    Ver
                  </th>
                </tr>
              </thead>
              <tbody className="bg-background">
                {convenios.length > 0 ? (
                  convenios.map((convenio, index) => (
                    <tr key={index}>
                      <td className="px-2 py-3">{convenio.nombre}</td>
                      <td className="px-2 py-3">{convenio.estado}</td>
                      <td>
                        <ModalConvenioDetalle
                          trigger={
                            <IconButton onClick={() => setSelectedConvenio(convenio)}>
                              <EyeOpenIcon className="w-[20px] h-[20px]"/>
                            </IconButton>
                          }
                          title="Detalles del Convenio"
                          convenioData={selectedConvenio}
                          onClose={() => setSelectedConvenio(null)}
                          onConfirm={handleConvenioConfirm} // Recargar cuando se confirma/cierra
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-2 py-3 text-center">
                      No hay convenios disponibles.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
      <div className="mb-4 flex justify-end gap-2">
        <ModalConvenio
          trigger={
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Convenios
            </button>
          }
          title="Convenios"
          onConfirm={handleConvenioConfirm}
        />
        <ModalAjuste
          trigger={
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Ajustes
            </button>
          }
          title="Ajustes"
        />
      </div>
    </div>
  );
};

export default CargosTomaForm;
