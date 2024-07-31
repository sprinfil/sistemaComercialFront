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


interface GeneralUsuario {
  toma: TomaPorUsuario | null;
  setToma: (toma: TomaPorUsuario) => void;
  usuario: BuscarUsuario | null;
  setUsuario: (usuario: BuscarUsuario) => void;
  usuariosEncontrados: BuscarUsuario[];
  setUsuariosEncontrados : (usuariosEncontrados: []) => void;
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
  setUsuariosEncontrados: (usuariosEncontrados) => set ({usuariosEncontrados}),
  loadingTable: false,
  setLoadingTable: (loading) => set({ loadingTable: loading }),
  tomasRuta: false,
  setTomasRuta: (tomasRuta) => set({tomasRuta}),
  nombreBuscado: '',
  setNombreBuscado: (nombreBuscado) => set({nombreBuscado}),
  nombreSeleccionado: '',
  setNombreSeleccionado: (nombreSeleccionado) => set ({nombreSeleccionado}),
  usuarioObtenido: null,
  setUsuarioObtenido: (usuario) => set({ usuarioObtenido: usuario }),
}));

