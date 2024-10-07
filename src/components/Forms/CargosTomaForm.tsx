import React, { useState, useEffect } from "react";
import axiosClient from "../../axios-client.ts";
import { ZustandGeneralUsuario } from "../../contexts/ZustandGeneralUsuario.tsx";
import ModalConvenio from "../ui/ModalConvenios.tsx";
import ModalAjuste from "../ui/ModalAjuste.tsx";
import Loader from "../ui/Loader.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConvenioTipoTomaForm } from "./ConvenioTipoTomaForm.tsx";
import IconButton from "../ui/IconButton.tsx";
import ModalConvenioDetalle from "../ui/ModalDetalleConvenio.tsx";
import { EyeOpenIcon } from "@radix-ui/react-icons";

const CargosTomaForm = () => {
  const { usuariosEncontrados } = ZustandGeneralUsuario();
  const [cargos, setCargos] = useState<any[]>([]);
  const [convenios, setConvenios] = useState<any>(null); // Cambiado a null
  const [loading, setLoading] = useState(true);
  const [selectedConvenio, setSelectedConvenio] = useState<any>(null); // Estado para el convenio seleccionado

  // Cargar los cargos del usuario
  const cargarCargos = () => {
    if (usuariosEncontrados) {
      setLoading(true);
      axiosClient
        .get(`/Toma/cargos/${usuariosEncontrados[0].tomas[0].codigo_toma}`)
        .then(({ data }) => {
          const filteredCargos = data.data
            .filter((cargo: any) => cargo.estado === 'pendiente')
            .map((cargo: any) => ({
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
      const id_modelo = usuariosEncontrados[0].tomas[0].id;
      setLoading(true);
      axiosClient
        .get(`/Convenio/ConsultarConvenio`, {
          params: {
            modelo_origen: 'toma',
            id_modelo: id_modelo,
          },
        })
        .then(({ data }) => {
          if (data.convenio_catalogo) {
            const { nombre, estado } = data.convenio_catalogo;
            setConvenios({ nombre, estado });
          } else {
            setConvenios(null);
          }
        })
        .catch((err) => {
          console.error('Error al obtener los convenios:', err);
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
    cargarConvenios(); // Recargar convenios si es necesario
    setSelectedConvenio(null); // Limpiar el convenio seleccionado
  };

  const TabsCargos = () => (
    <Tabs defaultValue="Cargos" className="">
      <TabsList>
        <TabsTrigger value="Cargos">Cargos</TabsTrigger>
        <TabsTrigger value="Convenios">Convenios</TabsTrigger>
        <TabsTrigger value="Ajustes">Ajustes</TabsTrigger>
      </TabsList>

      <TabsContent value="Cargos">
        <div className="p-4">
          <h3>Cargos</h3>
          {cargos.length > 0 ? (
            cargos.map((cargo) => (
              <div key={cargo.id} className="border p-2 my-2">
                <p>Concepto: {cargo.concepto}</p>
                <p>Monto: {cargo.monto}</p>
                <p>Estado: {cargo.estado}</p>
              </div>
            ))
          ) : (
            <p>No hay cargos disponibles.</p>
          )}
        </div>
      </TabsContent>

      <TabsContent value="Convenios">
  <div className="p-4">
    <h3>Convenio</h3>
    {convenios ? (
      <div className="border p-2 my-2 flex justify-between items-center">
        <div>
          <p>Nombre del convenio: {convenios.nombre}</p>
          <p>Estado: {convenios.estado}</p>
        </div>
        <ModalConvenioDetalle
          trigger={
            <IconButton onClick={() => setSelectedConvenio(convenios)}>
              <EyeOpenIcon className="w-[20px] h-[20px]" />
            </IconButton>
          }
          title="Detalles del Convenio"
          convenioData={selectedConvenio}
          onClose={() => setSelectedConvenio(null)}
          onConfirm={handleConvenioConfirm}
        />
      </div>
    ) : (
      <p>No hay convenio disponible.</p>
    )}
  </div>
</TabsContent>


      <TabsContent value="Ajustes">
        <ConvenioTipoTomaForm />
      </TabsContent>
    </Tabs>
  );

  return (
    <div className="flex flex-col min-h-screen">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex-grow w-full rounded-md h-[77vh] p-4">
            <TabsCargos />
            <div className="mt-4 flex justify-end gap-2 p-4" style={{ marginTop: "auto" }}>
              <ModalConvenio
                trigger={
                  <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Convenios
                  </button>
                }
                title="Convenios"
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
        </>
      )}
    </div>
  );
};

export default CargosTomaForm;
