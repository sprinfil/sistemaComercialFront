import { create } from 'zustand';



type contrato = {
  id_usuario: number;
  id_giro_comercial: number;
  nombre_contrato: string;
  clave_catastral: string;
  tipo_toma: string;
  servicio_contratados: string[];
  //diametro_toma: string;
  num_casa: string;
  colonia: number;
  calle: number;
  codigo_postal: string;
  entre_calle1: number;
  entre_calle2: number;
  localidad: number;
  municipio: number;
  tipo_contratacion: string;
  coordenada:string;
}


interface Location {
  lat: string | null;
  lng: string | null;
}


interface FiltrosContratacion {
  isAsignadaChecked: boolean;
  setIsAsignadaChecked: (isAsignadaChecked: boolean) => void;
  //VARIABLES PARA CONTRATACIÓN
  latitudMapa: number;
  setLatitudMapa: (latitudMapa: number) => void;
  longitudMapa: number;
  setLongitudMapa: (longitudMapa: number) => void;

  libroToma: number;
  setLibroToma: (libroToma: number) => void;
  
  //VARIABLES CREACIÓN DE CONTRATO
  nombre_contrato: string;
  setNombre_contrato: (nombre_contrato: string) => void;

  clave_catastral: string;
  setClave_catastral: (clave_catastral: string) => void;

  tipo_toma: string;
  setTipo_toma: (tipo_toma: string) => void;

  servicio_contratados: string[];
  setServicio_contratados: (servicio_contratados: string[]) => void;

  colonia: string;
  setColonia: (colonia: string) => void;

  calle: string;
  setCalle: (calle: string) => void;

  municipio: string;
  setMunicipio: (municipio: string) => void;


  localidad: string;
  setLocalidad: (localidad: string) => void;

  entre_calle1: string;
  setEntre_calle1: (entre_calle1: string) => void;

  entre_calle2: string;
  setEntre_calle2: (entre_calle2: string) => void;

  num_casa: string;
  setNum_casa: (num_casa: string) => void;

  diametro_de_la_toma: string;
  setDiametro_de_la_toma: (diametro_de_la_toma: string) => void;


  codigo_postal: string;
  setCodigo_postal: (codigo_postal: string) => void;


  //PARA LA CREACION DE NUEVA TOMA CON CONTRATO
  calle_toma: string;
  setCalle_toma: (calle_toma: string) => void;

  colonia_toma: string;
  setColonia_toma: (colonia_toma: string) => void;

  calle_notificaciones_toma: string;
  setCalle_notificaciones_toma: (calle_notificaciones_toma: string) => void;

  contrato: contrato;
  setContrato: (contrato: Partial<contrato>) => void;

  direccion_notificaciones: string;
  setDireccion_Notificaciones: (direccion_notificaciones:  string) => void;



  dataMonitorContratos: [];
  setDataMonitorContratos: (dataMonitorContratos:  []) => void;

  loadingTableMonitorContrato: boolean;
  setLoadingTableMonitorContrato: (loadingTableMonitorContrato: boolean) => void;

  boolModalContratacionMonitor: boolean;
  setBoolModalContratacionMonitor: (boolModalContratacionMonitor: boolean) => void;

  
  boolModalContratacionCambioDeNombre: boolean;
  setBoolModalContratacionCambioDeNombre: (boolModalContratacionCambioDeNombre: boolean) => void;
  controlModalMonitorContratacionClick: boolean
  setControlModalMonitorContratacionClick: (controlModalMonitorContratacionClick: boolean) => void;

  idGiroComercial: number;
  setIdGiroComercial: (idGiroComercial: number) => void;


  marcadorSeleccionado: [];
  setMarcadorSeleccionado: (marcadorSeleccionado:  []) => void;

  boolModalCotizacionMonitor: boolean;
  setBoolModalCotizacionMonitor: (boolModalCotizacionMonitor: boolean) => void;

  isCheckedPreContratadas: boolean;
  setIsCheckedPreContratadas: (isCheckedPreContratadas: boolean) => void;

  //VARIABLES PARA OBTENER EL VALUE DE LOS COMBOBOX 

  calleSeleccionada:string;
  setCalleSeleccionada:(calleSeleccionada: string) => void;
  
  coloniaSeleccionada:string;
  setColoniaSeleccionada:(coloniaSeleccionada: string) => void;

  entreCalle1Seleccionada:string;
  setEntreCalle1Seleccionada:(entreCalle1Seleccionada: string) => void;


  entreCalle2Seleccionada:string;
  setEntreCalle2Seleccionada:(entreCalle2Seleccionada: string) => void;

  servicioContratado:string;
  setServicioContratado:(servicioContratado: string) => void;

  servicioContratado2:string;
  setServicioContratado2:(servicioContratado2: string) => void;

  
  giroComercial:string;
  setGiroComercial:(giroComercial: string) => void;

  tipoDeToma:string;
  setTipoDeToma:(tipoDeToma: string) => void;


  puntosFiltradosParaElMapa:[];
  setPuntosFiltradosParaElMapa:(puntosFiltradosParaElMapa: []) => void;

  
  tomaPreContratada:[];
  setTomaPreContratada:(tomaPreContratada: []) => void;

  isCheckInspeccion: boolean;
  setIsCheckInspeccion:(isCheckInspeccion: boolean) => void;

  boolPeticionContratacion: boolean;
  setBoolPeticionContratacion: (boolPeticionContratacion: boolean) => void;

  booleanModalSubirArchivosContratacion: boolean;
  setBooleanModalSubirArchivosContratacion: (booleanModalSubirArchivosContratacion: boolean) => void;
  
  idContrato: number;
  setIdContrato: (idContrato: number) => void;

  accion: string;
  setAccion: (accion: string) => void;

  seleccionoPuntoEnMapa: boolean;
  setSeleccionoPuntoEnMapa: (seleccionoPuntoEnMapa: boolean) => void;

  selectedLocation: Location  | null;
  setSelectedLocation:(selectedLocation: Location  | null) => void;
  getCoordenadaString: () => string | null;

  codigoToma: string;
  setCodigoToma: (codigoToma: string) => void;

  nombreGiroComercial: string;
  setNombreGiroComercial: (nombreGiroComercial: string) => void;

  esPreContratado: boolean;
  setEsPreContratado:(esPreContratado: boolean) => void;

  puntoTomaLatitudLongitudAPI: [string, string];
  setPuntoTomaLatitudLongitudAPI: (puntoTomaLatitudLongitudAPI: [string, string]) => void;

  getCoordenadaString2: () => string | null;

  tarifaDeContratoActual:[];
  setTarifaDeContratoActual:(tarifaDeContratoActual: []) => void;

  contratoLocalStorage: boolean;
  setContratoLocalStorage:(contratoLocalStorage: boolean) => void;

  nombreCalle: string;
  setNombreCalle:(nombreCalle: string) => void;

  nombreEntreCalle1: string;
  setNombreEntreCalle1:(nombreEntreCalle1: string) => void;

  nombreEntreCalle2: string;
  setNombreEntreCalle2:(nombreEntreCalle2: string) => void;


  nombreColonia: string;
  setNombreColonia:(nombreColonia: string) => void;

  
  nombreGiroComercial2: string;
  setNombreGiroComercial2:(nombreGiroComercial2: string) => void;

  tipoTomaNombre: string;
  seTipoTomaNombre:(tipoTomaNombre: string) => void;

  servicioAguaNombre: string;
  setServicioAguaNombre:(servicioAguaNombre: string) => void;

  servicioAlcSan: string;
  setServicioAlcSan:(servicioAlcSan: string) => void;

  
  tomasFiltradas:[];
  setTomasFiltradas:(tomasFiltradas: []) => void

  
  boolCrearUsuarioProcesoContratacion: boolean;
  setBoolCrearUsuarioProcesoContratacion: (boolCrearUsuarioProcesoContratacion: boolean) => void;

  obtenerIdUsuarioRecienCreado: string;
  setObtenerIdUsuarioRecienCreado:(obtenerIdUsuarioRecienCreado: string) => void;

  obtenerNombreUsuario: string;
  setObtenerNombreUsuario:(obtenerNombreUsuario: string) => void;

  tomaPreContratadaLatLon: []
  setTomaPreContratadaLatLog:(tomaPreContratadaLatLon:[]) => void;
}

export const ZustandFiltrosContratacion = create<FiltrosContratacion>((set) => ({
  isAsignadaChecked: false,
  setIsAsignadaChecked: (isAsignadaChecked) => set({ isAsignadaChecked }),
  //VARIABLES PARA CONTRATACIÓN
  latitudMapa: 0,
  setLatitudMapa: (latitudMapa) => set({ latitudMapa }),
  
  longitudMapa: 0,
  setLongitudMapa: (longitudMapa) => set({ longitudMapa }),

  libroToma: 0,
  setLibroToma: (libroToma) => set({ libroToma }),


  //VARIABLES CREACIÓN DE CONTRATO


  nombre_contrato: "",
  setNombre_contrato: (nombre_contrato) => set({ nombre_contrato }),

  clave_catastral: "",
  setClave_catastral: (clave_catastral) => set({ clave_catastral }),

  tipo_toma: "",
  setTipo_toma: (tipo_toma) => set({ tipo_toma }),

  servicio_contratados: [],
  setServicio_contratados: (servicio_contratados) => set({ servicio_contratados}),


  colonia: "",
  setColonia: (colonia) => set({ colonia }),

  calle: "",
  setCalle: (calle) => set({ calle }),

  municipio: "",
  setMunicipio: (municipio) => set({ municipio }),

  localidad: "",
  setLocalidad: (localidad) => set({ localidad }),

  entre_calle1: "",
  setEntre_calle1: (entre_calle1) => set({ entre_calle1 }),

  entre_calle2: "",
  setEntre_calle2: (entre_calle2) => set({ entre_calle2 }),

  num_casa: "",
  setNum_casa: (num_casa) => set({ num_casa }),

  diametro_de_la_toma: "",
  setDiametro_de_la_toma: (diametro_de_la_toma) => set({ diametro_de_la_toma }),

  codigo_postal: "",
  setCodigo_postal: (codigo_postal) => set({ codigo_postal }),


  //PARA LA CREACION DE NUEVA TOMA CON CONTRATO
  calle_toma: "",
  setCalle_toma: (calle_toma) => set({ calle_toma }),

  calle_notificaciones_toma: "",
  setCalle_notificaciones_toma: (calle_notificaciones_toma) => set({ calle_notificaciones_toma }),

  colonia_toma: "",
  setColonia_toma: (colonia_toma) => set({ colonia_toma }),

  contrato: {
    id_usuario: 0,
    id_giro_comercial: "",
    nombre_contrato: "",
    clave_catastral: "",
    tipo_toma: "",
    servicio_contratados: [],
    diametro_toma: "",
    num_casa: "",
    colonia: "",
    calle: "",
    codigo_postal: "",
    entre_calle_1: "",
    entre_calle_2: "",
    localidad: "",
    municipio:"La Paz",
    tipo_contratacion: "",
    coordenada: "",
  },
  setContrato: (contrato: Partial<contrato>) => set((state) => ({
    contrato: {
      ...state.contrato,
      ...contrato,
    },
  })),

  direccion_notificaciones: " ",
  setDireccion_Notificaciones: (direccion_notificaciones) => set({ direccion_notificaciones }),

  dataMonitorContratos: [],
  setDataMonitorContratos: (dataMonitorContratos) => set({ dataMonitorContratos }),

  loadingTableMonitorContrato: false,
  setLoadingTableMonitorContrato: (loadingTableMonitorContrato) => set({ loadingTableMonitorContrato }),

  boolModalContratacionMonitor: false,
  setBoolModalContratacionMonitor: (boolModalContratacionMonitor) => set({ boolModalContratacionMonitor }),

  boolModalContratacionCambioDeNombre: false,
  setBoolModalContratacionCambioDeNombre: (boolModalContratacionCambioDeNombre) => set({ boolModalContratacionCambioDeNombre }),
  controlModalMonitorContratacionClick: false,
  setControlModalMonitorContratacionClick:(controlModalMonitorContratacionClick) => set({controlModalMonitorContratacionClick}),

  idGiroComercial: 0,
  setIdGiroComercial:(idGiroComercial) => set({idGiroComercial}),

  marcadorSeleccionado: [],
  setMarcadorSeleccionado:(marcadorSeleccionado) => set({marcadorSeleccionado}),


  boolModalCotizacionMonitor: false,
  setBoolModalCotizacionMonitor: (boolModalCotizacionMonitor) => set({ boolModalCotizacionMonitor }),

  
  isCheckedPreContratadas: false,
  setIsCheckedPreContratadas: (isCheckedPreContratadas) => set({ isCheckedPreContratadas }),


  calleSeleccionada: "",
  setCalleSeleccionada: (calleSeleccionada) => set({ calleSeleccionada }),

  
  coloniaSeleccionada: "",
  setColoniaSeleccionada: (coloniaSeleccionada) => set({ coloniaSeleccionada }),

  entreCalle1Seleccionada: "",
  setEntreCalle1Seleccionada: (entreCalle1Seleccionada) => set({ entreCalle1Seleccionada }),


  
  entreCalle2Seleccionada: "",
  setEntreCalle2Seleccionada: (entreCalle2Seleccionada) => set({ entreCalle2Seleccionada }),

  servicioContratado: "",
  setServicioContratado: (servicioContratado) => set({ servicioContratado }),
  servicioContratado2: "",
  setServicioContratado2: (servicioContratado2) => set({ servicioContratado2 }),

  giroComercial: "",
  setGiroComercial: (giroComercial) => set({ giroComercial }),

  
  tipoDeToma: "",
  setTipoDeToma: (tipoDeToma) => set({ tipoDeToma }),

  puntosFiltradosParaElMapa:[],
  setPuntosFiltradosParaElMapa: (puntosFiltradosParaElMapa) => set({ puntosFiltradosParaElMapa }),

  tomaPreContratada:[],
  setTomaPreContratada: (tomaPreContratada) => set({ tomaPreContratada }),

    
  isCheckInspeccion: false,
  setIsCheckInspeccion: (isCheckInspeccion) => set({ isCheckInspeccion }),

  boolPeticionContratacion: false,
  setBoolPeticionContratacion: (boolPeticionContratacion) => set({ boolPeticionContratacion }),

  booleanModalSubirArchivosContratacion: false,
  setBooleanModalSubirArchivosContratacion: (booleanModalSubirArchivosContratacion) => set({ booleanModalSubirArchivosContratacion }),
  idContrato: 0,
  setIdContrato: (idContrato) => set({ idContrato }),

  accion: "",
  setAccion: (accion) => set({ accion }),

  seleccionoPuntoEnMapa: false,
  setSeleccionoPuntoEnMapa: (seleccionoPuntoEnMapa) => set({ seleccionoPuntoEnMapa }),

  
  selectedLocation: null,
  setSelectedLocation: (selectedLocation) => set({ selectedLocation }),

  getCoordenadaString: (): string | null => {
    const { selectedLocation } = ZustandFiltrosContratacion.getState();
    return selectedLocation
      ? `${selectedLocation.lat.toFixed(12)}, ${selectedLocation.lng.toFixed(12)}`
      : null;
  },


  codigoToma: "",
  setCodigoToma: (codigoToma) => set({ codigoToma }),



  esPreContratado: false,
  setEsPreContratado: (esPreContratado) => set({ esPreContratado }),


  puntoTomaLatitudLongitudAPI: ["0", "0"], // Valor inicial por defecto
  setPuntoTomaLatitudLongitudAPI: (puntoTomaLatitudLongitudAPI: [string, string]) =>
    set({ puntoTomaLatitudLongitudAPI }),
  getCoordenadaString2: (): string | null => {
    const { puntoTomaLatitudLongitudAPI } = ZustandFiltrosContratacion.getState();
    return JSON.stringify(puntoTomaLatitudLongitudAPI);
  },


  tarifaDeContratoActual:[],
  setTarifaDeContratoActual: (tarifaDeContratoActual) => set({ tarifaDeContratoActual }),

  contratoLocalStorage:false,
  setContratoLocalStorage: (contratoLocalStorage) => set({ contratoLocalStorage }),


  

  
  nombreCalle: "",
  setNombreCalle:(nombreCalle) => set({ nombreCalle }),
  
  nombreEntreCalle1: "",
  setNombreEntreCalle1:(nombreEntreCalle1) => set({ nombreEntreCalle1 }),
  nombreEntreCalle2: "",
  setNombreEntreCalle2:(nombreEntreCalle2) => set({ nombreEntreCalle2 }),

  nombreColonia: "",
  setNombreColonia:(nombreColonia) => set({ nombreColonia }),

  nombreGiroComercial: "",
  setNombreGiroComercial:(nombreGiroComercial) => set({ nombreGiroComercial }),

  nombreGiroComercial2: "",
  setNombreGiroComercial2:(nombreGiroComercial2) => set({ nombreGiroComercial2 }),

  tipoTomaNombre: "",
  seTipoTomaNombre:(tipoTomaNombre) => set({ tipoTomaNombre }),

  servicioAguaNombre: "",
  setServicioAguaNombre:(servicioAguaNombre) => set({ servicioAguaNombre }),

  servicioAlcSan: "",
  setServicioAlcSan:(servicioAlcSan) => set({ servicioAlcSan }),

  tomasFiltradas:[],
  setTomasFiltradas: (tomasFiltradas) => set({ tomasFiltradas }),

  boolCrearUsuarioProcesoContratacion: false,
  setBoolCrearUsuarioProcesoContratacion: (boolCrearUsuarioProcesoContratacion) => set({ boolCrearUsuarioProcesoContratacion }),

  
  obtenerIdUsuarioRecienCreado: "",
  setObtenerIdUsuarioRecienCreado:(obtenerIdUsuarioRecienCreado) => set({ obtenerIdUsuarioRecienCreado }),


  obtenerNombreUsuario: "",
  setObtenerNombreUsuario:(obtenerNombreUsuario) => set({ obtenerNombreUsuario }),

  tomaPreContratadaLatLon:[],
  setTomaPreContratadaLatLog:(tomaPreContratadaLatLon) => set({ tomaPreContratadaLatLon }),
 
}));

