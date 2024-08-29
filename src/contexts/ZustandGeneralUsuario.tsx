import {create} from 'zustand';
import { TomaPorUsuario } from '../components/Tables/Columns/TomaPorUsuarioColumns';
import { BuscarUsuario } from "../components/Tables/Columns/ContratoConsultaUsuarioColumns";
import { BuscarTomaUsuario } from '../components/Tables/Columns/ContratoConsultaTomaColumns';
export interface DatosUsuario
{
  id: number;
  name: string;
  apellido_paterno: string;
  apellido_materno: string;
  telefono: string;
  curp: string;
  rfc: string;
  correo: string;
}

interface BreadcrumbState {
  mostrarSiguiente: boolean;
  setMostrarSiguiente: (value: boolean) => void;
}

export const useBreadcrumbStore = create<BreadcrumbState>((set) => ({
  mostrarSiguiente: false,
  setMostrarSiguiente: (value: boolean) => set({ mostrarSiguiente: value }),
}));

interface GeneralUsuario {
  toma: BuscarTomaUsuario | null;
  setToma: (toma: BuscarTomaUsuario) => void;
  obtenerIdUsuarioInDetalle: TomaPorUsuario | null;
  setObtenerIdUsuarioInDetalle: (obtenerIdUsuarioInDetalle: TomaPorUsuario) => void;
  usuario: BuscarUsuario | null;
  setUsuario: (usuario: BuscarUsuario) => void;
  usuariosEncontrados: BuscarUsuario[];
  setUsuariosEncontrados: (usuarios: BuscarUsuario[]) => void;
  dataCajaUser: BuscarUsuario[];
  setDataCajaUser: (dataCajaUser: BuscarUsuario[]) => void;
  clearUsuariosEncontrados: () => void;
  usuariosRecuperado: BuscarUsuario[];
  setUsuariosRecuperado: (usuarios: BuscarUsuario[]) => void; 
  tomaUsuariosEncontrados: BuscarTomaUsuario[],
  setTomaUsuariosEncontrados: (usuarios: BuscarTomaUsuario[]) => void; 
  nombreBuscado: string,
  setNombreBuscado: (nombreBuscado: string) => void;
  nombreSeleccionado: string | null;
  setNombreSeleccionado: (nombreSeleccionado: string) => void;
  accion: string;
  setAccion: (accion: string) => void;
  tomas: TomaPorUsuario[];
  setTomas: (tomas: TomaPorUsuario[]) => void;
  loadingTable: boolean;
  setLoadingTable: (loading: boolean) => void;
  tomasRuta: boolean;
  setTomasRuta: (tomasRuta: boolean) => void;
  usuarioObtenido: DatosUsuario | null;
  setUsuarioObtenido: (usuario: DatosUsuario | null) => void;
  findUserOrToma: boolean;
  setFindUserOrToma:(findUserOrToma: boolean) => void;
  findUserMapaGeo: boolean;
  setFindUserMapaGeo: (findUserMapaGeo: boolean) => void;
  controlDetalleCaja: string;
  setControlDetalleCaja: (controlDetalleCaja: string) => void;
  booleanCodigoDeToma: boolean;
  setBooleanCodigoDeToma: (booleanCodigoDeToma: boolean) => void;
 booleanCerrarModalFiltros: boolean;
 setBooleanCerrarModalFiltros:(booleanCerrarModalFiltros: boolean) => void;
 idSeleccionadoConfiguracionOrdenDeTrabajo: number | null;
 setIdSeleccionadoConfiguracionOrdenDeTrabajo: (idSeleccionadoConfiguracionOrdenDeTrabajo: number) => void;
 accionGeneradaEntreTabs: string,
  setAccionGeneradaEntreTabs: (accionGeneradaEntreTabs: string) => void;
  idSeleccionadoGenerarOrdenDETrabajoToma: number | null;
  setIdSeleccionadoGenerarOrdenDETrabajoToma: (idSeleccionadoGenerarOrdenDETrabajoToma: number) => void;
  idSeleccionadoTomaAsignacionOT: number | null;
  setIdSeleccionadoTomaAsignacionOT: (idSeleccionadoTomaAsignacionOT: number) => void;
  controlTablaOperadorOTIndividual: boolean;
  setControlTablaOperadorOTIndividual:(controlTablaOperadorOTIndividual: boolean) => void;
  
}

export const ZustandGeneralUsuario = create<GeneralUsuario>((set) => ({
  toma: null,
  setToma: (toma) => set({ toma }),
  obtenerIdUsuarioInDetalle: null,
  setObtenerIdUsuarioInDetalle: (obtenerIdUsuarioInDetalle) => set({ obtenerIdUsuarioInDetalle }),
  usuario: null,
  setUsuario: (usuario) => set({usuario}),
  accion: '',
  setAccion: (accion) => set({ accion }),
  tomas: [],
  setTomas: (tomas) => set({ tomas }),
  usuariosEncontrados: [],
  setUsuariosEncontrados: (usuarios) => set({ usuariosEncontrados: usuarios }),
  tomaUsuariosEncontrados: [],
  setTomaUsuariosEncontrados: (usuarios) => set({ tomaUsuariosEncontrados: usuarios }),
  usuariosRecuperado: [],
  setUsuariosRecuperado: (usuarios) => set({ usuariosRecuperado: usuarios }), // Debe recibir un arreglo
  clearUsuariosEncontrados: () => set({ usuariosEncontrados: [] }),
  loadingTable: false,
  setLoadingTable: (loading) => set({ loadingTable: loading }),
  tomasRuta: false,
  setTomasRuta: (value) => set({ tomasRuta: value }),
  nombreBuscado: '',
  setNombreBuscado: (nombreBuscado) => set({nombreBuscado}),
  nombreSeleccionado: '',
  setNombreSeleccionado: (nombreSeleccionado) => set ({nombreSeleccionado}),
  usuarioObtenido: null,
  setUsuarioObtenido: (usuario) => set({ usuarioObtenido: usuario }),
  findUserOrToma: false,
  setFindUserOrToma:(findUserOrToma) => set({findUserOrToma}),
  findUserMapaGeo: false,
  setFindUserMapaGeo:(findUserOrToma) => set({findUserOrToma}),
  controlDetalleCaja: '',
  setControlDetalleCaja: (controlDetalleCaja) => set ({controlDetalleCaja}),
  dataCajaUser: [],
  setDataCajaUser:(dataCajaUser) => set ({dataCajaUser}),
  booleanCodigoDeToma: false,
  setBooleanCodigoDeToma:(booleanCodigoDeToma) => set({booleanCodigoDeToma}),
  booleanCerrarModalFiltros: false,
  setBooleanCerrarModalFiltros:(booleanCerrarModalFiltros) => set({booleanCerrarModalFiltros}),
  idSeleccionadoConfiguracionOrdenDeTrabajo: null,
 setIdSeleccionadoConfiguracionOrdenDeTrabajo: (idSeleccionadoConfiguracionOrdenDeTrabajo) => set({idSeleccionadoConfiguracionOrdenDeTrabajo}),
 accionGeneradaEntreTabs: '',
 setAccionGeneradaEntreTabs: (accionGeneradaEntreTabs) => set({accionGeneradaEntreTabs}),
 idSeleccionadoGenerarOrdenDETrabajoToma: null,
 setIdSeleccionadoGenerarOrdenDETrabajoToma: (idSeleccionadoGenerarOrdenDETrabajoToma: number) => set({idSeleccionadoGenerarOrdenDETrabajoToma}),
 idSeleccionadoTomaAsignacionOT: null,
 setIdSeleccionadoTomaAsignacionOT: (idSeleccionadoTomaAsignacionOT: number) => set({idSeleccionadoTomaAsignacionOT}),
 controlTablaOperadorOTIndividual: false,
 setControlTablaOperadorOTIndividual:(controlTablaOperadorOTIndividual) => set({controlTablaOperadorOTIndividual}),
}));

