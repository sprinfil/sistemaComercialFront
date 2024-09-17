import {create} from 'zustand';
import { TomaPorUsuario } from '../components/Tables/Columns/TomaPorUsuarioColumns';

interface TomasPorUsuario {
  toma: TomaPorUsuario | null;
  accion: string;
  tomas: TomaPorUsuario[];
  setToma: (toma: TomaPorUsuario) => void;
  loadingTable: boolean;
  tomasRuta: boolean;
  setTomasRuta: (tomasRuta: boolean) => void;
  setTomas: (tomas: TomaPorUsuario[]) => void;
  setAccion: (accion: string) => void;
  setLoadingTable: (loading: boolean) => void;
}

export const ZustandTarifas = create<TomasPorUsuario>((set) => ({
  toma: null,
  accion: '',
  tomas: [],
  loadingTable: false,
  tomasRuta: false,
  setTomasRuta: (tomasRuta) => set({tomasRuta}),
  setToma: (toma) => set({ toma }),
  setTomas: (tomas) => set({ tomas }),
  setAccion: (accion) => set({ accion }),
  setLoadingTable: (loading) => set({ loadingTable: loading }),
}));

