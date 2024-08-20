import React, { useState, useEffect } from "react";
import axiosClient from "../../axios-client";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import Loader from "../../components/ui/Loader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UpdateIcon, MagnifyingGlassIcon, PlusIcon, HamburgerMenuIcon, CrossCircledIcon, ExternalLinkIcon, GearIcon } from '@radix-ui/react-icons';
import IconButton from "../ui/IconButton.tsx"; // Asegúrate de que esta ruta sea correcta
import Modal from "../ui/Modal.tsx";
import { useStateContext } from "../../contexts/ContextConcepto.tsx";
import { ModalMasFiltros } from "../ui/ModalMasFiltros.tsx";
import { ZustandGeneralUsuario } from "../../contexts/ZustandGeneralUsuario.tsx";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import search_image from "../../img/search.svg"

import { BuscarUsuario } from "../Tables/Columns/ContratoConsultaUsuarioColumns.tsx";
import { Skeleton } from "../ui/skeleton.tsx";
import { ConfigurarCajaModal } from "../ui/ConfigurarCajaModal.tsx";
import ModalCargarConcepto from "../ui/ModalCargarConcepto.tsx";
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
  const [mostrarCodigoUsuario, setMostrarCodigoUsuario] = useState(false);
  const [cargos_usuario, set_cargos_usuario] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const { usuariosEncontrados, dataCajaUser, setDataCajaUser, booleanCerrarModalFiltros } = ZustandGeneralUsuario(); //SI JALA LOS USUARIOS ENCONTRADOS
  // Estado para almacenar las cantidades a abonar
  const [amountsToPay, setAmountsToPay] = useState<{ [id: string]: number }>({});
  console.log("ESTO LLEGO XDDD", dataCajaUser);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };
  console.log('AVER QUE LE MANDA EN TOMA:', dataCajaUser[0]?.usuario?.nombre || "NO");
  console.log("a ver si se deberia abrir el codgio", mostrarCodigoUsuario);

  useEffect(() => {
    setDataToma({});

    //setSelectedCargos([]);
    console.log(dataCajaUser);
    setCargosData(null);
    setPagosData(null);
    //const usuario_tomas = await axiosClient.get(`/o`)
    get_usuario_cargos();

    console.log(cargos_usuario);
  }, [dataCajaUser])

  /*
    const get_usuario_cargos = async () => {
    const cargos_usuario_fetch = await axiosClient.get("/cargos/porModelo/pendientes", {
      params: {
        id_dueno: dataCajaUser[0].id,
        modelo_dueno: "usuario"
      }
    });
    set_cargos_usuario(cargos_usuario_fetch.data);
  }
  */

  const get_usuario_cargos = async () => {
    const cargos_usuario_fetch = await axiosClient.get(`/usuarios/consultar/cargos/${dataCajaUser[0].id}`);
    set_cargos_usuario(cargos_usuario_fetch.data);

    if (cargos_usuario_fetch?.data?.tomas?.length == 1) {
      cargos_usuario_fetch.data.tomas.map((toma, index) => {
        toma.cargos_vigentes.map((cargo, index) => {
          handleCargoSelect(cargo, toma, true);
        })
      })
    }

  }

  const fetchdataUser = async () => {
    handleClear();
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
        console.log(cargosResponse)
        // Filtrar cargos pendientes

        const filteredCargos = cargosResponse.data.filter(cargo => cargo.estado === 'pendiente');
        setPendingCargos(filteredCargos);

        filteredCargos.map((cargo, index) => {
          handleCargoSelect(cargo, userResponse.data, true);
        })
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
    set_cargos_usuario(null);
    setUserInput("");
    setDataToma(null);
    setCargosData(null);
    setPagosData(null);
    setPendingCargos([]);
    //setSelectedCargos([]);
    setAmountsToPay({});
    setDataCajaUser({});
  };

  const handleCargoSelect = (cargo, entidad = null, busqueda = false) => {
    setSelectedCargos(prevSelectedCargos => {
      let newCargo = {};
      const isAlreadySelected = prevSelectedCargos.some(c => c.id === cargo.id);
      if (isAlreadySelected) {
        if (!busqueda) {
          return prevSelectedCargos.filter(c => c.id !== cargo.id);
        } else {
          return [...prevSelectedCargos];
        }
      } else {
        let entidad_temp;
        if (entidad.id_codigo_toma != null) {
          entidad_temp = entidad?.id_codigo_toma;
        } else {
          entidad_temp = entidad?.nombre;
        }
        newCargo = { ...cargo, entidad: entidad_temp };
        return [...prevSelectedCargos, newCargo];
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
    console.log(dataToma);

  }, [dataToma, dataCajaUser]);

  return (
    <div className="flex flex-col relative">
      <div className="h-10 justify-center flex items-center rounded-sm">
        <div className="left-4  h-[30px] bg-muted absolute p-3 rounded-md flex items-center">
          <IconButton>
            <ExternalLinkIcon />
          </IconButton>
          <ConfigurarCajaModal
            trigger={<IconButton>
              <GearIcon />
            </IconButton>}
          >
          </ConfigurarCajaModal>

        </div>
        <p className="whitespace-nowrap">Número de toma</p>
        <Input
          className="h-8 ml-1 mr-1 w-96"
          value={userInput}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <IconButton onClick={handleSearch} title="Buscar">
          <MagnifyingGlassIcon className="w-[20px] h-[20px]" />
        </IconButton>
        <IconButton onClick={() => { handleClear(); setSelectedCargos([]); }} title="Limpiar">
          <UpdateIcon className="w-[20px] h-[20px]" />
        </IconButton>

        <ModalMasFiltros
          trigger={
            <IconButton title="Más Filtros">
              <HamburgerMenuIcon className="w-[20px] h-[20px]" />
            </IconButton>
          }
          setdataUser={setDataToma}
          cerrarForm={booleanCerrarModalFiltros}
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex min-h-[78vh] max-h-[78vh] px-2">
        {!loading && !error && !dataCajaUser?.length && !dataToma?.id && (
          <>
            <div className="w-full h-[full]">
              <div className=" w-[60%] h-full flex flex-col gap-4 items-center justify-center">
                <img src={search_image} alt="" className="h-[50vh]" />
                <p>Busca alguna toma o usuaio.</p>
              </div>
            </div>
          </>
        )}
        {loading && <div className="w-full h-full mt-2">
          <div className="w-[60%]">
            <div>
              <Skeleton className="w-full h-[5vh]" />
            </div>
            <div className="w-full flex gap-2 mt-4">
              <Skeleton className="h-[60vh] w-[50%]" />
              <Skeleton className="h-[60vh] w-[50%]" />
            </div>
          </div>
        </div>}
        {!loading && !error && (dataCajaUser?.length > 0 || dataToma?.id) && (

          <div className="border rounded-sm w-[60%] ml-1 mr-1 mt-2 overflow-auto">
            <Tabs defaultValue="general">
              <TabsList>
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="cargos">Cargos</TabsTrigger>
                <TabsTrigger value="pagos">Pagos</TabsTrigger>
              </TabsList>

              <TabsContent value="general">

                {dataToma && !dataCajaUser[0] ?
                  (
                    <>
                      <div className="flex gap-5 mt-5 px-5">
                        <div className="relative w-[50%]">
                          <div className="absolute -top-3 left-3 bg-background px-2 text-sm font-semibold">
                            Usuario
                          </div>
                          <div className="border rounded-sm p-4">
                            <div className="grid grid-cols-2 text-sm leading-tight overflow-auto max-h-[60vh] min-h-[60vh]">
                              <div>
                                <div className="font-semibold mb-2">Nombre:</div>
                                <div className="font-semibold mb-2">Telefono:</div>
                                <div className="font-semibold mb-2">RFC:</div>
                                <div className="font-semibold mb-2">CURP:</div>
                                <div className="font-semibold mb-2">Correo:</div>
                              </div>
                              <div className="px-4">
                                <div className="mb-2">{(dataToma?.usuario?.nombre || "") + " " + (dataToma.usuario?.apellido_paterno || "") + " " + (dataToma.usuario?.apellido_materno || "")}</div>
                                <div className="mb-2">{dataToma?.usuario?.telefono}</div>
                                <div className="mb-2">{dataToma?.usuario?.rfc}</div>
                                <div className="mb-2">{dataToma?.usuario?.curp}</div>
                                <div className="mb-2">{dataToma?.usuario?.correo}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="relative  w-[50%]">
                          <div className="absolute -top-3 left-3 bg-background px-2 text-sm font-semibold">
                            Toma
                          </div>
                          <div className="border rounded-sm p-4">
                            <div className="grid grid-cols-2 text-sm leading-tight overflow-auto max-h-[60vh] min-h-[60vh]">
                              <div>
                                <div className="font-semibold mb-2">Toma:</div>
                                <div className="font-semibold mb-2">Clave Catastral:</div>
                                <div className="font-semibold mb-2">Estatus:</div>
                                <div className="font-semibold mb-2">Calle:</div>
                                <div className="font-semibold mb-2">Entre Calle 1:</div>
                                <div className="font-semibold mb-2">Entre Calle 2:</div>
                                <div className="font-semibold mb-2">Colonia:</div>
                                <div className="font-semibold mb-2">Código Postal:</div>
                                <div className="font-semibold mb-2">Localidad:</div>
                                <div className="font-semibold mb-2">Tipo Servicio:</div>
                                <div className="font-semibold mb-2">Tipo Toma:</div>
                                <div className="font-semibold mb-2">Tipo Contratación:</div>
                                <div className="font-semibold mb-2">Servicio de agua:</div>
                                <div className="font-semibold mb-2">Servicio de agua y alcantarillado:</div>
                              </div>
                              <div className="px-4">
                                <div className="mb-2">{dataToma?.id_codigo_toma}</div>
                                <div className="mb-2">{dataToma?.clave_catastral}</div>
                                <div className="mb-2">{dataToma?.estatus}</div>
                                <div className="mb-2">{dataToma?.calle}</div>
                                <div className="mb-2">{dataToma?.entre_calle_1}</div>
                                <div className="mb-2">{dataToma?.entre_calle_2}</div>
                                <div className="mb-2">{dataToma?.colonia}</div>
                                <div className="mb-2">{dataToma?.codigo_postal}</div>
                                <div className="mb-2">{dataToma?.localidad}</div>
                                <div className="mb-2">{dataToma?.tipo_servicio}</div>
                                <div className="mb-2">{dataToma?.tipo_toma}</div>
                                <div className="mb-2">{dataToma?.tipo_contratacion}</div>
                                <div className="mb-2">{formatYesNo(dataToma?.c_agua)}</div>
                                <div className="mb-2">{formatYesNo(dataToma?.c_alc_san)}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                  :
                  dataCajaUser[0] && dataToma?.id_codigo_toma != "" && !dataCajaUser[0]?.usuario?.nombre &&
                  <div className="justify-center ml-5 mr-5 mt-5">
                    <div className="relative">
                      {
                      }
                      <div className="absolute -top-3 left-3 bg-background px-2 text-sm font-semibold">
                        Información de Usuario
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
                          <div className="font-semibold">CURP:</div>
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

                {dataCajaUser[0]?.usuario?.nombre &&
                  (
                    <>
                      <div className="flex gap-5 mt-5 px-5">
                        <div className="relative w-[50%]">
                          <div className="absolute -top-3 left-3 bg-background px-2 text-sm font-semibold">
                            Usuario
                          </div>
                          <div className="border rounded-sm p-4">
                            <div className="grid grid-cols-2 text-sm leading-tight overflow-auto max-h-[60vh] min-h-[60vh]">
                              <div>
                                <div className="font-semibold mb-2">Nombre:</div>
                                <div className="font-semibold mb-2">Telefono:</div>
                                <div className="font-semibold mb-2">RFC:</div>
                                <div className="font-semibold mb-2">CURP:</div>
                                <div className="font-semibold mb-2">Correo:</div>
                              </div>
                              <div className="px-4">
                                <div className="mb-2">{(dataCajaUser[0]?.usuario?.nombre || "") + " " + (dataCajaUser[0]?.usuario?.apellido_paterno || "") + " " + (dataCajaUser[0]?.usuario?.apellido_materno || "")}</div>
                                <div className="mb-2">{dataCajaUser[0]?.usuario?.telefono}</div>
                                <div className="mb-2">{dataCajaUser[0]?.usuario?.rfc}</div>
                                <div className="mb-2">{dataCajaUser[0]?.usuario?.curp}</div>
                                <div className="mb-2">{dataCajaUser[0]?.usuario?.correo}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="relative  w-[50%]">
                          <div className="absolute -top-3 left-3 bg-background px-2 text-sm font-semibold">
                            Toma
                          </div>
                          <div className="border rounded-sm p-4">
                            <div className="grid grid-cols-2 text-sm leading-tight overflow-auto max-h-[60vh] min-h-[60vh]">
                              <div>
                                <div className="font-semibold mb-2">Toma:</div>
                                <div className="font-semibold mb-2">Clave Catastral:</div>
                                <div className="font-semibold mb-2">Estatus:</div>
                                <div className="font-semibold mb-2">Calle:</div>
                                <div className="font-semibold mb-2">Entre Calle 1:</div>
                                <div className="font-semibold mb-2">Entre Calle 2:</div>
                                <div className="font-semibold mb-2">Colonia:</div>
                                <div className="font-semibold mb-2">Código Postal:</div>
                                <div className="font-semibold mb-2">Localidad:</div>
                                <div className="font-semibold mb-2">Tipo Servicio:</div>
                                <div className="font-semibold mb-2">Tipo Toma:</div>
                                <div className="font-semibold mb-2">Tipo Contratación:</div>
                                <div className="font-semibold mb-2">Servicio de agua:</div>
                                <div className="font-semibold mb-2">Servicio de agua y alcantarillado:</div>
                              </div>
                              <div className="px-4">
                                <div className="mb-2">{dataCajaUser[0]?.id_codigo_toma}</div>
                                <div className="mb-2">{dataCajaUser[0]?.clave_catastral}</div>
                                <div className="mb-2">{dataCajaUser[0]?.estatus}</div>
                                <div className="mb-2">{dataCajaUser[0]?.calle}</div>
                                <div className="mb-2">{dataCajaUser[0]?.entre_calle_1}</div>
                                <div className="mb-2">{dataCajaUser[0]?.entre_calle_2}</div>
                                <div className="mb-2">{dataCajaUser[0]?.colonia}</div>
                                <div className="mb-2">{dataCajaUser[0]?.codigo_postal}</div>
                                <div className="mb-2">{dataCajaUser[0]?.localidad}</div>
                                <div className="mb-2">{dataCajaUser[0]?.tipo_servicio}</div>
                                <div className="mb-2">{dataCajaUser[0]?.tipo_toma}</div>
                                <div className="mb-2">{dataCajaUser[0]?.tipo_contratacion}</div>
                                <div className="mb-2">{formatYesNo(dataCajaUser[0]?.c_agua)}</div>
                                <div className="mb-2">{formatYesNo(dataCajaUser[0]?.c_alc_san)}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                }




              </TabsContent>



              <TabsContent value="cargos">
                <div className="px-5">
                  {cargosData && (
                    <div className="relative">
                      <div className="absolute top-4 left-4 bg-background text-sm font-semibold">
                        Información de Cargos
                      </div>

                      <div className="mt-6 border rounded-sm p-4 max-h-96 overflow-y-auto bg-background">
                        <div className="w-full flex items-center justify-end">
                          <div className="w-[60px] mb-[10px]">
                            <ModalCargarConcepto
                              trigger={
                                <IconButton title="open">
                                  <PlusIcon className="w-[20px] h-[20px]" />
                                </IconButton>}
                              dueño={dataToma}
                            />
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
                                Fecha de Cargo
                              </th>
                            </tr>
                          </thead>
                          <tbody className=" divide-y divide-gray-200">
                            {pendingCargos.map((cargo, index) => (
                              <tr key={index} onClick={() => handleCargoSelect(cargo, dataToma)} className="cursor-pointer ">
                                <td className="px-2 py-4 whitespace-nowrap text-sm ">
                                  <input type="checkbox" checked={selectedCargos.some(c => c.id === cargo.id)} />
                                </td>
                                <td className="px-2 py-4 whitespace-normal text-sm  break-words">
                                  {cargo.nombre}
                                </td>
                                <td className="px-2 py-4 whitespace-nowrap text-sm ">
                                  ${parseFloat(cargo.monto)}
                                </td>
                                <td className="px-2 py-4 whitespace-nowrap text-sm ">
                                  {cargo.estado}
                                </td>
                                <td className="px-2 py-4 whitespace-nowrap text-sm ">
                                  {cargo.fecha_cargo}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                          <div>

                          </div>
                        </table>
                      </div>
                    </div>
                  )}


                  {cargos_usuario && <>
                    <Accordion type="single" collapsible className="w-full" defaultValue="">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>Cargos {dataCajaUser[0].nombre}</AccordionTrigger>
                        <AccordionContent>
                          <>
                            <div className="relative">
                              <div className="shadow-md border rounded-sm p-4 max-h-96 overflow-y-auto bg-background">
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
                                        Fecha de Cargo
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className=" divide-y divide-gray-200">
                                    {cargos_usuario.cargos_vigentes.map((cargo, index) => (
                                      <tr key={index} onClick={() => handleCargoSelect(cargo, cargos_usuario)} className="cursor-pointer ">
                                        <td className="px-2 py-4 whitespace-nowrap text-sm ">
                                          <input type="checkbox" checked={selectedCargos.some(c => c.id === cargo.id)} />
                                        </td>
                                        <td className="px-2 py-4 whitespace-normal text-sm  break-words">
                                          {cargo.nombre}
                                        </td>
                                        <td className="px-2 py-4 whitespace-nowrap text-sm ">
                                          ${parseFloat(cargo.monto)}
                                        </td>
                                        <td className="px-2 py-4 whitespace-nowrap text-sm ">
                                          {cargo.estado}
                                        </td>
                                        <td className="px-2 py-4 whitespace-nowrap text-sm ">
                                          {cargo.fecha_cargo}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                  <div>

                                  </div>
                                </table>
                              </div>
                            </div>
                          </>
                        </AccordionContent>
                      </AccordionItem>
                      {
                        cargos_usuario.tomas.map((toma, index) => (
                          <>
                            <AccordionItem value={`toma-${toma.id_codigo_toma}`}>
                              <AccordionTrigger>Cargos Toma {toma.id_codigo_toma} {toma.colonia} {toma.calle}</AccordionTrigger>
                              <AccordionContent>
                                <>
                                  <div className="relative">
                                    <div className="shadow-md border rounded-sm p-4 max-h-96 overflow-y-auto bg-background">
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
                                              Fecha de Cargo
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody className=" divide-y divide-gray-200">
                                          {toma.cargos_vigentes.map((cargo, index) => (
                                            <tr key={index} onClick={() => handleCargoSelect(cargo, toma)} className="cursor-pointer ">
                                              <td className="px-2 py-4 whitespace-nowrap text-sm ">
                                                <input type="checkbox" checked={selectedCargos.some(c => c.id === cargo.id)} />
                                              </td>
                                              <td className="px-2 py-4 whitespace-normal text-sm  break-words">
                                                {cargo.nombre}
                                              </td>
                                              <td className="px-2 py-4 whitespace-nowrap text-sm ">
                                                ${parseFloat(cargo.monto)}
                                              </td>
                                              <td className="px-2 py-4 whitespace-nowrap text-sm ">
                                                {cargo.estado}
                                              </td>
                                              <td className="px-2 py-4 whitespace-nowrap text-sm ">
                                                {cargo.fecha_cargo}
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                        <div>

                                        </div>
                                      </table>
                                    </div>
                                  </div>
                                </>
                              </AccordionContent>
                            </AccordionItem>
                          </>
                        ))
                      }


                    </Accordion>

                  </>
                  }
                </div>

              </TabsContent>


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

        )}
      </div>
      <div className="border rounded-sm w-[38%] ml-1 mr-1 mt-2 flex flex-col absolute right-2 min-h-[75vh] top-[48px]">
        <div className="absolute left-2 bg-background px-2 text-sm font-semibold -top-3">
          Cargos Seleccionados
        </div>
        <div className="flex-grow mt-1 ">
          {selectedCargos.length > 0 ? (
            <div className="mt-2 rounded-sm p-1 max-h-96 overflow-y-auto">
              <table className="w-full table-fixed">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-2 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                      Concepto
                    </th>

                    <th className="px-2 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                      Usuario / Toma
                    </th>
                    <th className="px-2 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                      Monto
                    </th>
                    <th>

                    </th>
                  </tr>
                </thead>
                <tbody className="bg-background divide-y ">
                  {selectedCargos.map((cargo, index) => (
                    <tr key={index}>
                      <td className="px-2 py-4 whitespace-normal text-sm  break-words">
                        {cargo.nombre}
                      </td>
                      <td>
                        {cargo?.entidad}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-sm ">
                        ${parseFloat(cargo.monto)}
                      </td>
                      <td className="">
                        <div className="max-w-[50px]" onClick={() => handleCargoSelect(cargo)}>
                          <IconButton>
                            <CrossCircledIcon className="text-red-500" />
                          </IconButton>
                        </div>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td className="px-2 py-4 text-xl font-semibold ">Total a pagar</td>
                    <td className="px-2 py-4 text-xl font-semibold ">
                      ${totalRestante}
                    </td>

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
  );
};

export default PuntoVentaForm;