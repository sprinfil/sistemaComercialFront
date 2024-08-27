import React, { useState, useEffect } from "react";
import axiosClient from "../../axios-client";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import Loader from "../../components/ui/Loader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UpdateIcon, MagnifyingGlassIcon, PlusIcon, HamburgerMenuIcon, CrossCircledIcon, ExternalLinkIcon, GearIcon, EraserIcon } from '@radix-ui/react-icons';
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
import { useToast } from "@/components/ui/use-toast"; //IMPORTACIONES TOAST
import { ToastAction } from "@/components/ui/toast"; //IMPORTACIONES TOAST
import { ModalMetodoPago } from "../ui/ModalMetodoPago.tsx";
const PuntoVentaForm = () => {

  const { toast } = useToast()
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
  const [open_metodo_pago_modal, set_open_metodo_pago_modal] = useState(false);

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

  const fetchdataUser = async (codigo_toma = null) => {
    setSelectedCargos([]);
    handleClear();
    setLoading(true);
    setError(null);
    try {
      const userResponse = await axiosClient.get(`/Toma/codigo/${codigo_toma || userInput}`);
      const cargosResponse = await axiosClient.get(`/Toma/cargos/${codigo_toma ||userInput}`);
      const pagosResponse = await axiosClient.get(`/Toma/pagos/${codigo_toma ||userInput}`);

      if (userResponse.data) {
        setDataToma(userResponse.data);

      } else {
        setError("No se encontraron datos para el usuario.");
      }

      if (cargosResponse.data.data) {
        setCargosData(cargosResponse.data.data);
        // Filtrar cargos pendientes

        let filteredCargos = cargosResponse.data.data.filter(cargo => cargo.estado === 'pendiente');
        filteredCargos = filteredCargos.sort((a, b) => a.concepto.prioridad_abono - b.concepto.prioridad_abono)

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
      let entidad_temp;
      const isAlreadySelected = prevSelectedCargos.some(c => c.id === cargo.id);
      if (isAlreadySelected) {

        let prioridades = selectedCargos.map(cargo_temp => cargo_temp.concepto.prioridad_abono);

        //prioridades = [...new Set(prioridades)];

        //const minimo = Math.min(...prioridades);

        const maximo = Math.max(...prioridades);
        console.log(maximo)

        if (!busqueda) {
          if (cargo.concepto.prioridad_abono > maximo || cargo.concepto.prioridad_abono == maximo) {

            //ESTE CONCEPTO SI SE PUEDE QUITAR
            return prevSelectedCargos.filter(c => c.id !== cargo.id);

          } else {
            //ESTE CONCEPTO NO SE PUEDE QUITAR
            toast({
              variant: "destructive",
              title: "Concepto Obligatorio",
              description: "Este concepto no se puede quitar",
              action: <ToastAction altText="Try again">Aceptar</ToastAction>,
            })
            return [...prevSelectedCargos];
          }
        } else {
          return [...prevSelectedCargos];
        }
      } else {

        if (entidad.id_codigo_toma != null) {

          entidad_temp = entidad?.id_codigo_toma;
          newCargo = { ...cargo, entidad: entidad_temp };
          let minimo;
          // Obtener todas las prioridades y las seleccionadas
          let todas_prioridades = pendingCargos?.map(cargo_temp => cargo_temp.concepto.prioridad_abono) || [];
          let prioridades_seleccionadas = selectedCargos?.map(cargo_temp => cargo_temp.concepto.prioridad_abono) || [];

          if (selectedCargos?.length == 0) {
            minimo = Math.min(...todas_prioridades);
          } else {
            let nuevas_prioridades = quitarElementos(todas_prioridades, prioridades_seleccionadas);
            minimo = Math.min(...nuevas_prioridades);
          }

          if (cargo.concepto.prioridad_abono == minimo || cargo.concepto.prioridad_abono < minimo) {
            return [...prevSelectedCargos, newCargo];
          } else {
            //ESTE CONCEPTO NO SE PUEDE AGREGAR
            //ESTE CONCEPTO NO SE PUEDE QUITAR
            toast({
              title: "Hay Conceptos de mayor prioridad",
              description: "Selecciona todos los conceptos con mayor prioridad",
              action: <ToastAction altText="Try again">Aceptar</ToastAction>,
            })
            return [...prevSelectedCargos];
          }
        } else {

          entidad_temp = entidad?.nombre;
          newCargo = { ...cargo, entidad: entidad_temp };
          return [...prevSelectedCargos, newCargo];

        }

      }
    });

  };

  function quitarElementos(arreglo, elementosAQuitar) {
    // Creamos una copia del arreglo para no modificar el original
    let resultado = [...arreglo];

    // Iteramos sobre cada elemento en el arreglo de elementos a quitar
    elementosAQuitar.forEach(elemento => {
      // Encontramos el índice del primer elemento coincidente
      const index = resultado.indexOf(elemento);
      // Si existe, lo eliminamos
      if (index !== -1) {
        resultado.splice(index, 1);
      }
    });

    return resultado;
  }

  const handleF5Press = (event: KeyboardEvent) => {
    if (event.key === 'F5') {
      event.preventDefault(); // Prevenir recarga de página
      iniciar_proceso_pago();
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

  const calculateTotalIva = () => {
    return selectedCargos.reduce((acc, cargo) => acc + parseFloat(cargo.iva || 0), 0);
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

  const limpiar_cargos_seleccionados = (cargos) => {
    cargos.map((cargo, index) => {
      handleCargoSelect(cargo);
    })
  }

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

  const iniciar_proceso_pago = () => {
    set_open_metodo_pago_modal(true);
  }

  const totalAcumulado = calculateTotal();
  const totalAbonado = calculateTotalAbonado();
  const totalRestante = totalAcumulado - totalAbonado;
  const total_iva = calculateTotalIva();

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
        type="number"
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
              <Skeleton className="h-[68vh] w-[50%]" />
              <Skeleton className="h-[68vh] w-[50%]" />
            </div>
          </div>
        </div>}
        {!loading && !error && (dataCajaUser?.length > 0 || dataToma?.id) && (
          <div className=" rounded-sm w-[60%] ml-1 mr-1 mt-2 overflow-auto">
            <ModalMetodoPago
              open_modal={open_metodo_pago_modal}
              set_open_modal={set_open_metodo_pago_modal}
              total={totalRestante}
              total_iva={total_iva}
              cargos={selectedCargos}
              dueno={dataToma}
              update_data={fetchdataUser}
            />
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
                      <div className="flex gap-5 mt-5">
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
                <div className="">
                  {cargosData && (
                    <div className="relative mt-2">
                      <div className="flex justify-between items-center h-[40px]">
                        <div className=" bg-background text-sm font-semibold">
                          Información de Cargos
                        </div>
                        <div>
                          <ModalCargarConcepto
                            trigger={
                              <IconButton title="open">
                                <PlusIcon className="w-[20px] h-[20px]" />
                              </IconButton>}
                            dueño={dataToma}
                            setCargos={setPendingCargos}
                            handleCargoSelect={handleCargoSelect}
                          />
                        </div>
                      </div>

                      <div className="mt-6 select-none border rounded-sm h-[60vh] overflow-y-auto bg-background">
                        <table className="w-full table-fixed">
                          <thead className="bg-muted sticky top-0">
                            <tr>
                              <th className="px-2 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                Seleccionar
                              </th>
                              <th className="px-2 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                Concepto
                              </th>
                              <th className="px-2 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                Monto + IVA
                              </th>
                              <th className="px-2 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                Estado
                              </th>
                              <th className="px-2 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                Fecha de Cargo
                              </th>
                              <th className="px-2 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                Prioridad
                              </th>
                            </tr>
                          </thead>
                          <tbody className=" divide-y divide-border">
                            {pendingCargos.map((cargo, index) => (
                              <tr key={index} onClick={() => handleCargoSelect(cargo, dataToma)} className="cursor-pointer transition-all duration-200 hover:bg-muted">
                                <td className="px-2 py-4 whitespace-nowrap text-sm ">
                                  <input type="checkbox" checked={selectedCargos.some(c => c.id === cargo.id)} className="w-[30px] h-[30px]" />
                                </td>
                                <td className="px-2 py-4 whitespace-normal text-sm  break-words">
                                  {cargo.nombre}
                                </td>
                                <td className="px-2 py-4 whitespace-nowrap text-sm ">
                                  ${(parseFloat(cargo.monto) + parseFloat(cargo.iva)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </td>
                                <td className="px-2 py-4 whitespace-nowrap text-sm ">
                                  {cargo.estado}
                                </td>
                                <td className="px-2 py-4 whitespace-nowrap text-sm ">
                                  {cargo.fecha_cargo}
                                </td>
                                <td className="px-2 py-4 whitespace-nowrap text-sm ">
                                  {cargo.concepto.prioridad_abono}
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
                  <div className="relative mt-2">
                    <div className="flex justify-between items-center  h-[40px]">
                      <div className=" bg-background text-sm font-semibold">
                        Información de Pagos
                      </div>

                    </div>

                    <div className="mt-6 select-none border rounded-sm h-[60vh] overflow-y-auto bg-background">
                      <table className="w-full table-fixed">
                        <thead className="bg-muted sticky top-0">
                          <tr>
                            <th className="px-2 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                              Fecha
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                              Método de pago
                            </th>
                            <th className="px-2 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                              Total
                            </th>
                          </tr>
                        </thead>
                        <tbody className=" divide-y divide-border">
                          {pagosData.map((pago, index) => (
                            <tr key={index} className="cursor-pointer transition-all duration-200 hover:bg-muted">
                              <td className="px-2 py-4 whitespace-normal text-sm  break-words">
                                {pago.fecha_pago}
                              </td>
                              <td className="px-2 py-4 whitespace-nowrap text-sm ">
                                {pago.forma_pago}
                              </td>
                              <td className="px-2 py-4 whitespace-nowrap text-sm ">
                                ${pago.total_pagado.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
            </Tabs>
          </div>
        )}
      </div>
      <div className=" rounded-sm w-[38%] ml-1 mr-1 mt-2 flex flex-col absolute right-2 min-h-[75vh] top-[44px]">

        <div className="flex-grow mt-1 relative -top-4">
          {selectedCargos.length > 0 ? (
            <div className="mt-2 rounded-sm max-h-[55vh] h-[55vh]  overflow-y-auto border no-scrollbar">
              <table className="w-full table-fixed">
                <thead className="bg-muted  sticky top-0">
                  <tr>
                    <th className="px-2 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                      Concepto
                    </th>

                    <th className="px-2 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                      Usuario / Toma
                    </th>
                    <th className="px-2 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                      Monto + IVA
                    </th>

                    <th className="px-2 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                      Prioridad
                    </th>
                    <th>
                      <Button onClick={() => { limpiar_cargos_seleccionados(selectedCargos) }}><EraserIcon className="text-white" /></Button>
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
                        ${(parseFloat(cargo.monto) + parseFloat(cargo.iva)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-sm ">
                        {cargo.concepto.prioridad_abono}
                      </td>
                      <td className="">
                        <div className="max-w-[50px]" onClick={() => handleCargoSelect(cargo)}>
                          <IconButton>
                            <CrossCircledIcon className="text-red-500 w-[25px] h-[25px]" />
                          </IconButton>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <>
              <div className="text-sm absolute top-[50%] flex justify-center items-center w-full">
                <p>Seleccione uno o más cargos para mostrar la información aquí.</p>
              </div>
            </>
          )}
        </div>
        <div className="w-full h-[14vh] text-[2vw] px-5 flex flex-col items-end justify-center bg-muted">

          <div className=" flex gap-3">
            <div className="">TOTAL</div>
            ${(totalRestante + total_iva).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>

        </div>
        <Button onClick={() => { (iniciar_proceso_pago()) }}>
          PAGAR(F5)
        </Button>

      </div>
    </div>
  );
};

export default PuntoVentaForm;