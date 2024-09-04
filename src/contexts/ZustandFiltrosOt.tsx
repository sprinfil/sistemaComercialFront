import {create} from 'zustand';
import { AsignarOrdenDeTrabajo } from '../components/Tables/Columns/AsignarOrdenDeTrabajoColumns';
import { OrdenDeTrabajoCrearTomas } from '../components/Tables/Columns/OrdenDeTrabajoCrearTomas';
import { OrdenDeTrabajo } from '../components/Tables/Columns/AsignarOrdenDeTrabajoColumnsIndividual';
import { MonitorOrden2 } from '../components/Tables/Columns/MonitorOrdenDeTrabajoColumns2';
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
  arregloAsignarIndividualTomaAOperador:OrdenDeTrabajo[]
  setArregloAsignarIndividualTomaAOperador: (arregloAsignarIndividualTomaAOperador:OrdenDeTrabajo[]) => void;
  dataOrdenesDeTrabajoHistorialToma:[]
  setDataOrdenesDeTrabajoHistorialToma:(dataOrdenesDeTrabajoHistorialToma:[]) => void;
  asignadasEnToma: boolean;
  setAsignadasEnToma: (asignadasEnToma:boolean) => void;
  dataOrdenDeTrabajoMonitor:[]
  setDataOrdenDeTrabajoMonitor:(dataOrdenDeTrabajoMonitor:[]) => void;
  loadingTable: boolean;
  setLoadingTable: (loadingTable:boolean) => void;
  boolUsoFiltros: boolean;
  setBoolUsoFiltros:(boolUsoFiltros:boolean) => void;
  valorParaSaberSiUsaLaTablaDeFiltros: boolean;
  setvalorParaSaberSiUsaLaTablaDeFiltros:(valorParaSaberSiUsaLaTablaDeFiltros:boolean) => void;
  detalleOrdenDeTrabajoTomaMonitor2:MonitorOrden2[]
  setDetalleOrdenDeTrabajoTomaMonitor2:(detalleOrdenDeTrabajoTomaMonitor2:MonitorOrden2[]) => void;
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
  arregloAsignarIndividualTomaAOperador: [],
  setArregloAsignarIndividualTomaAOperador: (arregloAsignarIndividualTomaAOperador) => set({arregloAsignarIndividualTomaAOperador}),
  dataOrdenesDeTrabajoHistorialToma: [],
  setDataOrdenesDeTrabajoHistorialToma: (dataOrdenesDeTrabajoHistorialToma) => set({dataOrdenesDeTrabajoHistorialToma}),
  asignadasEnToma: false,
  setAsignadasEnToma: (asignadasEnToma) => set({asignadasEnToma}),
  dataOrdenDeTrabajoMonitor: [],
  setDataOrdenDeTrabajoMonitor: (dataOrdenDeTrabajoMonitor) => set({dataOrdenDeTrabajoMonitor}),
  loadingTable: false,
  setLoadingTable: (loadingTable) => set({loadingTable}),
  boolUsoFiltros: false,
  setBoolUsoFiltros: (boolUsoFiltros) => set({boolUsoFiltros}),
  valorParaSaberSiUsaLaTablaDeFiltros: false,
  setvalorParaSaberSiUsaLaTablaDeFiltros: (valorParaSaberSiUsaLaTablaDeFiltros) => set({valorParaSaberSiUsaLaTablaDeFiltros}),
  detalleOrdenDeTrabajoTomaMonitor2: [],
  setDetalleOrdenDeTrabajoTomaMonitor2: (detalleOrdenDeTrabajoTomaMonitor2) => set({detalleOrdenDeTrabajoTomaMonitor2}),
}));
