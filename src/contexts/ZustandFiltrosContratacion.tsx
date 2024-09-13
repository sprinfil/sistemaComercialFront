import { create } from 'zustand';



type contrato = {
  id_usuario: number;
  id_giro_comercial: string;
  nombre_contrato: string;
  clave_catastral: string;
  tipo_toma: string;
  servicio_contratados: string[];
  diametro_toma: string;
  num_casa: string;
  colonia: number;
  calle: number;
  codigo_postal: string;
  entre_calle_1: number;
  entre_calle_2: number;
  localidad: number;
  municipio: number;
  tipo_contratacion: string;
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

  direccion_notificaciones: string[];
  setDireccion_Notificaciones: (direccion_notificaciones:  string[]) => void;



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
    colonia: 0,
    calle: 0,
    codigo_postal: "",
    entre_calle_1: 0,
    entre_calle_2: 0,
    localidad: 0,
    municipio: 0,
    tipo_contratacion: "",
  },
  setContrato: (contrato: Partial<contrato>) => set((state) => ({
    contrato: {
      ...state.contrato,
      ...contrato,
    },
  })),

  direccion_notificaciones: [],
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

}));

