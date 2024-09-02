import {create} from 'zustand';
import { OrdenDeTrabajo } from '../components/Tables/Columns/OrdenDeTrabajoCargosColumns';
import { AsignarOrdenDeTrabajo } from '../components/Tables/Columns/AsignarOrdenDeTrabajoColumns';
import { OrdenDeTrabajoCrearTomas } from '../components/Tables/Columns/OrdenDeTrabajoCrearTomas';


interface FiltrosOrdenTrabajo {
  isAsignadaChecked: boolean;
  setIsAsignadaChecked: (isAsignadaChecked:boolean) => void;
  isNoAsignadaChecked: boolean;
  setIsNoAsignadaChecked: (isNoAsignadaChecked:boolean) => void;
  informacionRecibidaPorFiltros: []
  setInformacionRecibidaPorFiltros:(informacionRecibidaPorFiltros:[]) => void;
  idRutaSeleccionada: string;
  setidRutaSeleccionada:(idRutaSeleccionada:string) => void;
  rutaBooleanForLibro: boolean;
  setRutaBooleanForLibro: (rutaBooleanForLibro:boolean) => void;
  arregloOrdenesDeTrabajoParaAsignarAOperador: AsignarOrdenDeTrabajo[]
  setArregloOrdenesDeTrabajoParaAsignarAOperador: (arregloOrdenesDeTrabajoParaAsignarAOperador:AsignarOrdenDeTrabajo[]) => void;
  arregloCrearOrdenesDeTrabajo:OrdenDeTrabajoCrearTomas[]
  setArregloCrearOrdenesDeTrabajo: (arregloCrearOrdenesDeTrabajo:OrdenDeTrabajoCrearTomas[]) => void;

}

export const ZustandFiltrosOrdenTrabajo = create<FiltrosOrdenTrabajo>((set) => ({
  isAsignadaChecked: false,
  setIsAsignadaChecked: (isAsignadaChecked) => set({isAsignadaChecked}),
  isNoAsignadaChecked: false,
  setIsNoAsignadaChecked: (isNoAsignadaChecked) => set({isNoAsignadaChecked}),
  informacionRecibidaPorFiltros:[],
  setInformacionRecibidaPorFiltros: (informacionRecibidaPorFiltros) => set({informacionRecibidaPorFiltros}),
  idRutaSeleccionada: '',
  setidRutaSeleccionada: (idRutaSeleccionada) => set({idRutaSeleccionada}),
  rutaBooleanForLibro: true,
  setRutaBooleanForLibro: (rutaBooleanForLibro) => set({rutaBooleanForLibro}),
  arregloOrdenesDeTrabajoParaAsignarAOperador: [],
  setArregloOrdenesDeTrabajoParaAsignarAOperador: (arregloOrdenesDeTrabajoParaAsignarAOperador) => set({arregloOrdenesDeTrabajoParaAsignarAOperador}),
  arregloCrearOrdenesDeTrabajo: [],
  setArregloCrearOrdenesDeTrabajo: (arregloCrearOrdenesDeTrabajo) => set({arregloCrearOrdenesDeTrabajo}),
}));

