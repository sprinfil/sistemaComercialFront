import {create} from 'zustand';
import { OrdenDeTrabajo } from '../components/Tables/Columns/OrdenDeTrabajoCargosColumns';

interface OrdenTrabajoUsuarios {
  ordenDeTrabajo: OrdenDeTrabajo | null;
  accion: string;
  ordenDeTrabajos: OrdenDeTrabajo[];
  setOrdenDeTrabajo: (ordenDeTrabajo: OrdenDeTrabajo) => void;
  loadingTable: boolean;
  setOrdenDeTrabajos: (ordenDeTrabajos: OrdenDeTrabajo[]) => void;
  setAccion: (accion: string) => void;
  setLoadingTable: (loading: boolean) => void;
}

export const zustandOrdenTrabajoStore = create<OrdenTrabajoUsuarios>((set) => ({
  ordenDeTrabajo: null,
  accion: '',
  ordenDeTrabajos: [],
  loadingTable: false,
  setOrdenDeTrabajo: (ordenDeTrabajo) => set({ ordenDeTrabajo }),
  setOrdenDeTrabajos: (ordenDeTrabajos) => set({ ordenDeTrabajos }),
  setAccion: (accion) => set({ accion }),
  setLoadingTable: (loading) => set({ loadingTable: loading }),
}));

