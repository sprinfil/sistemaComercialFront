import {create} from 'zustand';
import { TomaPorUsuario } from '../components/Tables/Columns/TomaPorUsuarioColumns';
import { BuscarUsuario } from "../components/Tables/Columns/ContratoConsultaUsuarioColumns";

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
  toma: TomaPorUsuario | null;
  setToma: (toma: TomaPorUsuario) => void;
  usuario: BuscarUsuario | null;
  setUsuario: (usuario: BuscarUsuario) => void;
  usuariosEncontrados: BuscarUsuario[];
  setUsuariosEncontrados: (usuarios: BuscarUsuario[]) => void;
  usuariosRecuperado: BuscarUsuario[];
  setUsuariosRecuperado: (usuarios: BuscarUsuario[]) => void; // Recibe un arreglo
  clearUsuariosEncontrados: () => void;
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

}

export const ZustandGeneralUsuario = create<GeneralUsuario>((set) => ({
  toma: null,
  setToma: (toma) => set({ toma }),
  usuario: null,
  setUsuario: (usuario) => set({usuario}),
  accion: '',
  setAccion: (accion) => set({ accion }),
  tomas: [],
  setTomas: (tomas) => set({ tomas }),
  usuariosEncontrados: [],
  setUsuariosEncontrados: (usuarios) => set({ usuariosEncontrados: usuarios }),
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
}));

