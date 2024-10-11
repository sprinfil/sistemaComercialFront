import {create} from 'zustand';


export interface FilaCargaTrabajo 
{
  tipo_carga: string;
  operadores:string;
}

interface ZustandCargaDeTrabajo {
  filasSeleccionadaCargaTrabajo: [];
  setFilasSeleccionadasCargaTrabajo: (filasSeleccionadaCargaTrabajo:[]) => void;

  cargasDeTrabajoAEnviar: FilaCargaTrabajo[];
  setCargasDeTrabajoAEnviar:(filasSeleccionadaCargaTrabajo: FilaCargaTrabajo[]) => void;
  
}

export const ZustandCargaDeTrabajo= create<ZustandCargaDeTrabajo>((set) => ({
  filasSeleccionadaCargaTrabajo: [],
  setFilasSeleccionadasCargaTrabajo: (filasSeleccionadaCargaTrabajo) => set({filasSeleccionadaCargaTrabajo}),

  cargasDeTrabajoAEnviar: [],
  setCargasDeTrabajoAEnviar: (cargasDeTrabajoAEnviar) => set({cargasDeTrabajoAEnviar}),
 
}));

