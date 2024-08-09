import React, { useState, useEffect } from "react";
import axiosClient from "../../axios-client";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import Loader from "../../components/ui/Loader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UpdateIcon, MagnifyingGlassIcon, PlusIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import IconButton from "../ui/IconButton.tsx"; // Asegúrate de que esta ruta sea correcta
import Modal from "../ui/Modal.tsx";
import { useStateContext } from "../../contexts/ContextConcepto.tsx";
import { ModalMasFiltros } from "../ui/ModalMasFiltros.tsx";
import { ZustandGeneralUsuario } from "../../contexts/ZustandGeneralUsuario.tsx";

import { BuscarUsuario } from "../Tables/Columns/ContratoConsultaUsuarioColumns.tsx"; 
const PuntoVentaForm = () => {
  const [userInput, setUserInput] = useState("");
  const [cargosData, setCargosData] = useState(null);
  const [dataToma, setDataToma] = useState(null);
  const [pagosData, setPagosData] = useState(null);
  const [pendingCargos, setPendingCargos] = useState([]);
  const [selectedCargos, setSelectedCargos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [conceptos, setConceptos] = useState<Concepto[]>([]); // Define el tipo de estado
  const [loadingTable, setLoadingTable] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cerrarForm, setCerrarForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {usuariosEncontrados, dataCajaUser, setDataCajaUser} = ZustandGeneralUsuario(); //SI JALA LOS USUARIOS ENCONTRADOS
  // Estado para almacenar las cantidades a abonar
  const [amountsToPay, setAmountsToPay] = useState<{ [id: string]: number }>({});
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };
  console.log("estoy fueron los usuarios encontrados", dataCajaUser);
 
  

  const fetchdataUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const userResponse = await axiosClient.get(`/Toma/codigo/${userInput}`);
      const cargosResponse = await axiosClient.get(`/Toma/cargos/${userInput}`);
      const pagosResponse = await axiosClient.get(`/Toma/pagos/${userInput}`);
      console.log(userResponse);
      console.log(
        "Datos recibidos:",
        userResponse.data,
        cargosResponse.data,
        pagosResponse.data
      );

      


      if (userResponse.data) {
        setDataToma(userResponse.data);
        
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
      fetchdataUser();
    }
  };

  const handleClear = () => {
    setUserInput("");
    setDataToma(null);
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

  const handleF5Press = (event: KeyboardEvent) => {
    if (event.key === 'F5') {
      event.preventDefault(); // Prevenir recarga de página
      handleSearch(); // Llamar a la función de pago
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleF5Press);

    return () => {
      window.removeEventListener('keydown', handleF5Press);
    };
  }, []);

  const handleAmountChange = (id, value) => {
    setAmountsToPay(prevAmounts => ({
      ...prevAmounts,
      [id]: value
    }));
  };

  const formatYesNo = (value) => {
    return value === 1 ? 'Sí' : 'No';
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const calculateTotal = () => {
    return selectedCargos.reduce((acc, cargo) => acc + parseFloat(cargo.monto || 0), 0);
  };

  const calculateTotalAbonado = () => {
    return selectedCargos.reduce((acc, cargo) => acc + (parseFloat(amountsToPay[cargo.id] || 0)), 0);
  };

  interface Concepto {
    nombre: string;
  }
  const getConceptos = async (): Promise<Concepto[]> => {
    try {
      console.log('Fetching conceptos...');
      const response = await axiosClient.get<{ data: Concepto[] }>('/Concepto'); // Ajusta la URL según tu API
      console.log('Response received:', response);

      const data = response.data.data; // Accede al array dentro de la propiedad 'data'
      console.log('Data extracted:', data);

      if (Array.isArray(data)) {
        const conceptos = data.map(item => ({ nombre: item.nombre }));
        console.log('Conceptos processed:', conceptos);
        return conceptos; // Devuelve solo el campo 'nombre'
      } else {
        console.error('La respuesta no es un array:', data);
        return [];
      }
    } catch (error) {
      console.error('Error obteniendo conceptos:', error);
      return [];
    }
  };

  const openModal = async () => {
    console.log('Opening modal...');
    const conceptosList = await getConceptos(); // Llama a getConceptos cuando se abre el modal
    console.log('Conceptos list obtained:', conceptosList);

    setConceptos(conceptosList); // Establece los conceptos obtenidos
    setIsModalOpen(true); // Abre el modal
    console.log('Modal state set to open.');
  };

  const closeModal = () => {
    setIsModalOpen(false); // Cierra el modal
    console.log('Modal state set to closed.');
  };

  const totalAcumulado = calculateTotal();
  const totalAbonado = calculateTotalAbonado();
  const totalRestante = totalAcumulado - totalAbonado;

  

useEffect(() => {
  setLoading(true);

  if (dataCajaUser) {
    setLoading(false);
  } else if (dataToma) {
    setLoading(false);
  } else {
    
  }

}, [dataToma, dataCajaUser]);
  
  return (
    <div className="flex flex-col">
      <div className="h-10 justify-center flex items-center rounded-sm">
        <p className="whitespace-nowrap">Número de toma o clave de usuario</p>
        <Input
          className="h-8 ml-1 mr-1 w-96"
          value={userInput}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <IconButton onClick={handleSearch} title="Buscar">
          <MagnifyingGlassIcon className="w-[20px] h-[20px]" />
        </IconButton>
        <IconButton onClick={handleClear} title="Limpiar">
          <UpdateIcon className="w-[20px] h-[20px]" />
        </IconButton>

        <ModalMasFiltros 
        trigger = {
              <IconButton title="Más Filtros">
              <HamburgerMenuIcon className="w-[20px] h-[20px]" />
            </IconButton>
        }
        setdataUser = {setDataToma}
        cerrarForm={cerrarForm}
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {loading && <Loader />}
      {!loading && !error && (
        <div className="flex min-h-[70vh] ">
          <div className="border rounded-sm w-2/3 ml-1 mr-1 mt-2">
            <Tabs defaultValue="general">
              <TabsList>
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="cargos">Cargos</TabsTrigger>
                <TabsTrigger value="pagos">Pagos</TabsTrigger>
              </TabsList>

              <TabsContent value="general">
              {dataToma ?
              <div className="justify-center ml-5 mr-5 mt-5">
              <div className="relative">
                {
                }
                <div className="absolute -top-3 left-3 bg-background px-2 text-sm font-semibold">
                  Información de Usuario/Toma
                </div>
                <div className="border rounded-sm p-4">
                  <div className="grid grid-cols-2 gap-2 text-sm leading-tight">
                  <div className="font-semibold">Usuario:</div>
                  <div>{dataToma.nombre}</div>
                    <div className="font-semibold">Toma:</div>
                    <div>{dataToma.id_codigo_toma}</div>
                    <div className="font-semibold">Clave Catastral:</div>
                    <div>{dataToma.clave_catastral}</div>
                    <div className="font-semibold">Estatus:</div>
                    <div>{dataToma.estatus}</div>
                    <div className="font-semibold">Calle:</div>
                    <div>{dataToma.calle}</div>
                    <div className="font-semibold">Entre Calle 1:</div>
                    <div>{dataToma.entre_calle_1}</div>
                    <div className="font-semibold">Entre Calle 2:</div>
                    <div>{dataToma.entre_calle_2}</div>
                    <div className="font-semibold">Colonia:</div>
                    <div>{dataToma.colonia}</div>
                    <div className="font-semibold">Código Postal:</div>
                    <div>{dataToma.codigo_postal}</div>
                    <div className="font-semibold">Localidad:</div>
                    <div>{dataToma.localidad}</div>
                    <div className="font-semibold">Tipo Servicio:</div>
                    <div>{dataToma.tipo_servicio}</div>
                    <div className="font-semibold">Tipo Toma:</div>
                    <div>{dataToma.tipo_toma}</div>
                    <div className="font-semibold">Tipo Contratación:</div>
                    <div>{dataToma.tipo_contratacion}</div>
                    <div className="font-semibold">Servicio de agua:</div>
                    <div>{formatYesNo(dataToma.c_agua)}</div>
                    <div className="font-semibold">Servicio de agua y alcantarillado:</div>
                    <div>{formatYesNo(dataToma.c_alc_san)}</div>
                  </div>
                </div>
              </div>
            </div> 
            : 
            dataCajaUser &&
              <div className="justify-center ml-5 mr-5 mt-5">
              <div className="relative">
                {
                }
                <div className="absolute -top-3 left-3 bg-background px-2 text-sm font-semibold">
                  Información de Usuario/Toma
                </div>
                <div className="border rounded-sm p-4">
                  <div className="grid grid-cols-2 gap-2 text-sm leading-tight">
                  <div className="font-semibold">Usuario:</div>
                  <div> {dataCajaUser && dataCajaUser.length > 0 ? (
                        <div>{dataCajaUser[0].nombre}</div>
                      ) : (
                        <div></div>
                      )}
                      </div>
                    <div className="font-semibold">Apellido paterno:</div>
                    <div> {dataCajaUser && dataCajaUser.length > 0 ? (
                        <div>{dataCajaUser[0].apellido_paterno}</div>
                      ) : (
                        <div></div>
                      )}
                      </div>
                    <div className="font-semibold">Apellido materno:</div>
                    <div> {dataCajaUser && dataCajaUser.length > 0 ? (
                        <div>{dataCajaUser[0].apellido_materno}</div>
                      ) : (
                        <div></div>
                      )}
                      </div>
                    <div className="font-semibold">CURP::</div>
                    <div> {dataCajaUser && dataCajaUser.length > 0 ? (
                        <div>{dataCajaUser[0].curp}</div>
                      ) : (
                        <div></div>
                      )}
                      </div>
                    <div className="font-semibold">RFC:</div>
                    <div> {dataCajaUser && dataCajaUser.length > 0 ? (
                        <div>{dataCajaUser[0].rfc}</div>
                      ) : (
                        <div></div>
                      )}
                      </div>
                    <div className="font-semibold">Nombre de contacto:</div>
                    <div> {dataCajaUser && dataCajaUser.length > 0 ? (
                        <div>{dataCajaUser[0].nombre_contacto}</div>
                      ) : (
                        <div></div>
                      )}
                      </div>
                    <div className="font-semibold">Correo:</div>
                    <div> {dataCajaUser && dataCajaUser.length > 0 ? (
                        <div>{dataCajaUser[0].correo}</div>
                      ) : (
                        <div></div>
                      )}
                      </div>
                    <div className="font-semibold">Telefono:</div>
                    <div> {dataCajaUser && dataCajaUser.length > 0 ? (
                        <div>{dataCajaUser[0].telefono}</div>
                      ) : (
                        <div></div>
                      )}
                      </div>
          
                  </div>
                </div>
              </div>
            </div>
              }

              </TabsContent>
            


              {cargosData && (
                <TabsContent value="cargos">
                  <div className="relative ml-5 mr-5">
                    <div className="absolute -top-4 left-4 bg-background px-2 text-sm font-semibold">
                      Información de Cargos
                    </div>

                    <div className="mt-6 border rounded-sm p-4 max-h-96 overflow-y-auto bg-background">
                      <div className="w-full flex items-center justify-end">
                        <div className="w-[60px] mb-[10px]">
                          <IconButton onClick={openModal} title="open">
                            <PlusIcon className="w-[20px] h-[20px]" />
                          </IconButton>
                        </div>
                      </div>

                      <table className="w-full table-fixed">
                        <thead className="bg-muted">
                          <tr>
                            <th className="px-2 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                              Seleccionar
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                              Concepto
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                              Monto
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                              Estado
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                              ID Convenio
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                              Fecha de Cargo
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                              Fecha de Liquidación
                            </th>
                          </tr>
                        </thead>
                        <tbody className=" divide-y divide-gray-200">
                          {pendingCargos.map((cargo, index) => (
                            <tr key={index} onClick={() => handleCargoSelect(cargo)} className="cursor-pointer ">
                              <td className="px-2 py-4 whitespace-nowrap text-sm ">
                                <input type="checkbox" checked={selectedCargos.some(c => c.id === cargo.id)} />
                              </td>
                              <td className="px-2 py-4 whitespace-normal text-sm  break-words">
                                {cargo.concepto}
                              </td>
                              <td className="px-2 py-4 whitespace-nowrap text-sm ">
                                ${parseFloat(cargo.monto)}
                              </td>
                              <td className="px-2 py-4 whitespace-nowrap text-sm ">
                                {cargo.estado}
                              </td>
                              <td className="px-2 py-4 whitespace-nowrap text-sm ">
                                {cargo.id_convenio}
                              </td>
                              <td className="px-2 py-4 whitespace-nowrap text-sm ">
                                {cargo.fecha_cargo}
                              </td>
                              <td className="px-2 py-4 whitespace-nowrap text-sm ">
                                {cargo.fecha_liquidacion}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <div>

                        </div>
                      </table>
                    </div>
                  </div>
                </TabsContent>
              )}

              {pagosData && (
                <TabsContent value="pagos">
                  <div className="relative ml-5 mr-5">
                    <div className="absolute -top-4 left-4 bg-background px-2 text-sm font-semibold">
                      Información de Pagos
                    </div>
                    <div className="mt-6 border rounded-sm p-4 max-h-96 overflow-y-auto">
                      <table className="w-full table-fixed">
                        <thead className="bg-muted">
                          <tr>
                            <th className="px-2 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                              Total Pagado
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                              Forma de Pago
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                              Fecha de Pago
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                              Estado
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-background">
                          {pagosData.map((pago, index) => (
                            <tr key={index}>
                              <td className="px-2 py-4 whitespace-nowrap text-sm font-medium ">
                                ${parseFloat(pago.total_pagado)}
                              </td>
                              <td className="px-2 py-4 whitespace-nowrap text-sm ">
                                {pago.forma_pago}
                              </td>
                              <td className="px-2 py-4 whitespace-nowrap text-sm ">
                                {pago.fecha_pago}
                              </td>
                              <td className="px-2 py-4 whitespace-nowrap text-sm ">
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
            <div className="absolute left-4 bg-background px-2 text-sm font-semibold mt-2">
              Cargos Seleccionados
            </div>
            <div className="flex-grow mt-4 ml-3 m-4">
              {selectedCargos.length > 0 ? (
                <div className="border rounded-sm p-4 max-h-96 overflow-y-auto">
                  <table className="w-full table-fixed">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-2 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                          Concepto
                        </th>
                        <th className="px-2 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                          Monto
                        </th>
                        <th className="px-2 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                          Cantidad a Abonar
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-background divide-y ">
                      {selectedCargos.map((cargo, index) => (
                        <tr key={index}>
                          <td className="px-2 py-4 whitespace-normal text-sm  break-words">
                            {cargo.concepto}
                          </td>
                          <td className="px-2 py-4 whitespace-nowrap text-sm ">
                            ${parseFloat(cargo.monto)}
                          </td>
                          <td className="px-2 py-4 whitespace-nowrap text-sm ">
                            <input
                              type="number"
                              value={amountsToPay[cargo.id] || ""}
                              onChange={(e) => handleAmountChange(cargo.id, parseFloat(e.target.value) || 0)}
                              className="w-full border rounded-sm p-1 bg-background"
                            />
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td className="px-2 py-4 text-xl font-semibold ">Total a pagar</td>
                        <td className="px-2 py-4 text-xl font-semibold ">
                          ${totalRestante}
                        </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-sm mt-5 ml-3">Seleccione uno o más cargos para mostrar la información aquí.</p>
              )}
            </div>
            <Button onClick={() => alert('PAGAR(F5)')}>
              PAGAR(F5)
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PuntoVentaForm;