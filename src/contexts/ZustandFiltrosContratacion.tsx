import { create } from 'zustand';

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

  

}));
