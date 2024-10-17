import {create} from 'zustand';

interface ZustandMultas {
  abrirModalCancelacion: boolean;
  setAbrirModalCancelacion: (abrirModalCancelacion:boolean) => void;
  
}

export const ZustandMultas= create<ZustandMultas>((set) => ({
  abrirModalCancelacion: false,
  setAbrirModalCancelacion: (abrirModalCancelacion) => set({abrirModalCancelacion}),
 
}));

