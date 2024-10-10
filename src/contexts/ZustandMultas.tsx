import {create} from 'zustand';
import { Multas } from '../components/ui/DataTableMultas';
interface ZustandMultas {
  abrirModalCancelacion: boolean;
  setAbrirModalCancelacion: (abrirModalCancelacion:boolean) => void;


  //CATALOGO
  multas: Multas | null;
  setMultas:(multas: Multas  | null) => void;

  multasTabla: Multas[] | null;
  setMultasTabla:(multasTabla: Multas[] | null) => void;


  accionMulta: string;
  setAccionMulta:  (accion:string) => void;


  
}

export const ZustandMultas= create<ZustandMultas>((set) => ({
  abrirModalCancelacion: false,
  setAbrirModalCancelacion: (abrirModalCancelacion) => set({abrirModalCancelacion}),

  
  //CATALOGO
  multas: null,
  setMultas: (multas) => set({multas}),


  accionMulta: "",
  setAccionMulta: (accionMulta) => set({accionMulta}),

  
  multasTabla: [],
  setMultasTabla: (multasTabla) => set({multasTabla}),

}));

