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

  cargasDeTrabajoAEnviarAPI: FilaCargaTrabajo[];
  setCargasDeTrabajoAEnviarFrontAPI:(cargasDeTrabajoAEnviarAPI: FilaCargaTrabajo[]) => void;

  dataArrayColumns: FilaCargaTrabajo[];
  setDataArrayColumns:(dataArrayColumns: FilaCargaTrabajo[]) => void;

  dataInfoCargaTrabajo: [];
  setDataInfoCargaTrabajo: (dataInfoCargaTrabajo:[]) => void;
  
}

export const ZustandCargaDeTrabajo= create<ZustandCargaDeTrabajo>((set) => ({
  filasSeleccionadaCargaTrabajo: [],
  setFilasSeleccionadasCargaTrabajo: (filasSeleccionadaCargaTrabajo) => set({filasSeleccionadaCargaTrabajo}),

  cargasDeTrabajoAEnviar: [],
  setCargasDeTrabajoAEnviar: (cargasDeTrabajoAEnviar) => set({cargasDeTrabajoAEnviar}),

  cargasDeTrabajoAEnviarAPI: [],
  setCargasDeTrabajoAEnviarFrontAPI: (cargasDeTrabajoAEnviarAPI) => set({cargasDeTrabajoAEnviarAPI}),


  dataArrayColumns: [],
  setDataArrayColumns: (dataArrayColumns) => set({dataArrayColumns}),
  dataInfoCargaTrabajo: [],
  setDataInfoCargaTrabajo: (dataInfoCargaTrabajo) => set({dataInfoCargaTrabajo}),
 
}));

