import {create} from 'zustand';

interface FiltrosContratacion {
  isAsignadaChecked: boolean;
  setIsAsignadaChecked: (isAsignadaChecked:boolean) => void;

}

export const ZustandFiltrosContratacion = create<FiltrosContratacion>((set) => ({
  isAsignadaChecked: false,
  setIsAsignadaChecked: (isAsignadaChecked) => set({isAsignadaChecked}),

}));

