import React, { useState } from "react";
import axiosClient from "../../axios-client";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import Loader from "../../components/ui/Loader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UpdateIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import IconButton from "../ui/IconButton.tsx"; // Asegúrate de que esta ruta sea correcta

const PuntoVentaForm = () => {
  const [userInput, setUserInput] = useState("");
  const [userData, setUserData] = useState(null);
  const [cargosData, setCargosData] = useState(null);
  const [pagosData, setPagosData] = useState(null);
  const [pendingCargos, setPendingCargos] = useState([]);
  const [selectedCargos, setSelectedCargos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Estado para almacenar las cantidades a abonar
  const [amountsToPay, setAmountsToPay] = useState<{ [id: string]: number }>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const fetchUserData = async () => {
    setLoading(true);
    setError(null);
    try {
      const userResponse = await axiosClient.get(`/Toma/codigo/${userInput}`);
      const cargosResponse = await axiosClient.get(`/Toma/cargos/${userInput}`);
      const pagosResponse = await axiosClient.get(`/Toma/pagos/${userInput}`);

      console.log(
        "Datos recibidos:",
        userResponse.data,
        cargosResponse.data,
        pagosResponse.data
      );

      if (userResponse.data) {
        setUserData(userResponse.data);
      } else {
        setError("No se encontraron datos para el usuario.");
      }

      if (cargosResponse.data) {
        setCargosData(cargosResponse.data);
        // Filtrar cargos pendientes
        const filteredCargos = cargosResponse.data.filter(cargo => cargo.estado === 'pendiente');
        setPendingCargos(filteredCargos);
      }

      if (pagosResponse.data) {
        setPagosData(pagosResponse.data);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setError("Error al buscar usuario.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (userInput.trim() !== "") {
      fetchUserData();
    }
  };

  const handleClear = () => {
    setUserInput("");
    setUserData(null);
    setCargosData(null);
    setPagosData(null);
    setPendingCargos([]);
    setSelectedCargos([]);
    setAmountsToPay({});
    setError(null);
  };

  const handleCargoSelect = (cargo) => {
    setSelectedCargos(prevSelectedCargos => {
      const isAlreadySelected = prevSelectedCargos.some(c => c.id === cargo.id);
      if (isAlreadySelected) {
        // Eliminar del array si ya está seleccionado
        return prevSelectedCargos.filter(c => c.id !== cargo.id);
      } else {
        // Agregar al array si no está seleccionado
        return [...prevSelectedCargos, cargo];
      }
    });
  };

  const handleAmountChange = (id, value) => {
    setAmountsToPay(prevAmounts => ({
      ...prevAmounts,
      [id]: value
    }));
  };

  const formatYesNo = (value) => {
    return value === 1 ? 'Sí' : 'No';
  };

  return (
    <div className="flex flex-col">
      <div className="h-10 justify-center flex items-center rounded-sm">
        <p className="whitespace-nowrap">Número de toma o clave de usuario</p>
        <Input
          className="h-8 ml-1 mr-1 w-96"
          value={userInput}
          onChange={handleInputChange}
        />
        <IconButton onClick={handleSearch} title="Buscar">
          <MagnifyingGlassIcon className="w-[20px] h-[20px]" />
        </IconButton>
        <IconButton onClick={handleClear} title="Limpiar">
          <UpdateIcon className="w-[20px] h-[20px]" />
        </IconButton>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {loading && <Loader />}
      {!loading && userData && (
        <div className="flex">
          <div className="border rounded-sm w-2/3 ml-1 mr-1 mt-2">
            <Tabs defaultValue="general">
              <TabsList>
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="cargos">Cargos</TabsTrigger>
                <TabsTrigger value="pagos">Pagos</TabsTrigger>
              </TabsList>

              <TabsContent value="general">
                <div className="justify-center ml-5 mr-5 me-5 mt-5">
                  <div className="relative">
                    <div className="absolute -top-3 left-3 bg-white px-2 text-sm font-semibold">
                      Información de Usuario/Toma
                    </div>
                    <div className="border rounded-sm p-4">
                      <div className="grid grid-cols-2 gap-2 text-sm leading-tight">
                        <div className="font-semibold">Toma:</div>
                        <div>{userData.id_codigo_toma}</div>
                        <div className="font-semibold">Clave Catastral:</div>
                        <div>{userData.clave_catastral}</div>
                        <div className="font-semibold">Estatus:</div>
                        <div>{userData.estatus}</div>
                        <div className="font-semibold">Calle:</div>
                        <div>{userData.calle}</div>
                        <div className="font-semibold">Entre Calle 1:</div>
                        <div>{userData.entre_calle_1}</div>
                        <div className="font-semibold">Entre Calle 2:</div>
                        <div>{userData.entre_calle_2}</div>
                        <div className="font-semibold">Colonia:</div>
                        <div>{userData.colonia}</div>
                        <div className="font-semibold">Código Postal:</div>
                        <div>{userData.codigo_postal}</div>
                        <div className="font-semibold">Localidad:</div>
                        <div>{userData.localidad}</div>
                        <div className="font-semibold">Calle Notificaciones:</div>
                        <div>{userData.calle_notificaciones}</div>
                        <div className="font-semibold">Entre Calle Notificaciones 1:</div>
                        <div>{userData.entre_calle_notificaciones_1}</div>
                        <div className="font-semibold">Entre Calle Notificaciones 2:</div>
                        <div>{userData.entre_calle_notificaciones_2}</div>
                        <div className="font-semibold">Tipo Servicio:</div>
                        <div>{userData.tipo_servicio}</div>
                        <div className="font-semibold">Tipo Toma:</div>
                        <div>{userData.tipo_toma}</div>
                        <div className="font-semibold">Tipo Contratación:</div>
                        <div>{userData.tipo_contratacion}</div>
                        <div className="font-semibold">Servicio de agua:</div>
                        <div>{formatYesNo(userData.c_agua)}</div>
                        <div className="font-semibold">Servicio de agua y alcantarillado:</div>
                        <div>{formatYesNo(userData.c_alc_san)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {cargosData && (
                <TabsContent value="cargos">
                  <div className="relative">
                    <div className="absolute -top-4 left-4 bg-white px-2 text-sm font-semibold">
                      Información de Cargos
                    </div>
                    <div className="mt-6 border rounded-sm p-4 max-h-96 overflow-y-auto">
                      <table className="w-full table-fixed">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Seleccionar
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Concepto
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Monto
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Estado
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              ID Convenio
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Fecha de Cargo
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Fecha de Liquidación
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {pendingCargos.map((cargo, index) => (
                            <tr key={index} onClick={() => handleCargoSelect(cargo)} className="cursor-pointer hover:bg-gray-100">
                              <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                                <input type="checkbox" checked={selectedCargos.some(c => c.id === cargo.id)} />
                              </td>
                              <td className="px-2 py-4 whitespace-normal text-sm text-gray-500 break-words">
                                {cargo.concepto}
                              </td>
                              <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                                ${cargo.monto.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </td>
                              <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                                {cargo.estado}
                              </td>
                              <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                                {cargo.id_convenio}
                              </td>
                              <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                                {cargo.fecha_cargo}
                              </td>
                              <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                                {cargo.fecha_liquidacion}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>
              )}

              {pagosData && (
                <TabsContent value="pagos">
                  <div className="relative">
                    <div className="absolute -top-4 left-4 bg-white px-2 text-sm font-semibold">
                      Información de Pagos
                    </div>
                    <div className="mt-6 border rounded-sm p-4 max-h-96 overflow-y-auto">
                      <table className="w-full table-fixed">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Total Pagado
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Forma de Pago
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Fecha de Pago
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Estado
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {pagosData.map((pago, index) => (
                            <tr key={index}>
                              <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                ${pago.total_pagado.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </td>
                              <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                                {pago.forma_pago}
                              </td>
                              <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                                {pago.fecha_pago}
                              </td>
                              <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                                {pago.estado}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </div>

          <div className="border rounded-sm w-1/3 ml-1 mr-1 mt-2 flex flex-col relative">
            <div className="absolute left-4 bg-white px-2 text-sm font-semibold mt-2">
              Cargos Seleccionados
            </div>
            <div className="flex-grow mt-4">
              {selectedCargos.length > 0 ? (
                <div className="border rounded-sm p-4 max-h-96 overflow-y-auto">
                  <table className="w-full table-fixed">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Concepto
                        </th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Monto
                        </th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Cantidad a Abonar
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedCargos.map((cargo, index) => (
                        <tr key={index}>
                          <td className="px-2 py-4 whitespace-normal text-sm text-gray-500 break-words">
                            {cargo.concepto}
                          </td>
                          <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                            ${cargo.monto.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </td>
                          <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                            <input
                              type="number"
                              value={amountsToPay[cargo.id] || ""}
                              onChange={(e) => handleAmountChange(cargo.id, parseFloat(e.target.value))}
                              className="w-full border rounded-sm p-1"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-sm mt-5">Seleccione uno o más cargos para mostrar la información aquí.</p>
              )}
            </div>
            <Button className="h-10 w-full mt-4" onClick={handleSearch}>
              PAGAR (F5)
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PuntoVentaForm;