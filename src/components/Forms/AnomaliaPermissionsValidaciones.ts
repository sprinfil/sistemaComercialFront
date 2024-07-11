import { z } from "zod";

//VALIDACIONES CREAR USUARIO NUEVO
export const AnomaliaPermissionsSchema = z.object({
  //CATALOGO ANOMALIAS
  VerAnomalias: z.boolean(),
  CrearAnomalia: z.boolean(),
  EditarAnomalia: z.boolean(),
  EliminarAnomalia: z.boolean(),

  //CONCEPTOS
  VerConceptos: z.boolean(),
  CrearConcepto: z.boolean(),
  EditarConcepto: z.boolean(),
  EliminarConcepto: z.boolean(),

  //DESCUENTOS
  VerDescuentos: z.boolean(),
  CrearDescuento: z.boolean(),
  EditarDescuento: z.boolean(),
  EliminarDescuento: z.boolean(),

  //CONVENIO
  VerConvenios: z.boolean(),
  CrearConvenio: z.boolean(),
  EditarConvenio: z.boolean(),
  EliminarConvenio: z.boolean(),

  //AJUSTE
  VerAjustes: z.boolean(),
  CrearAjuste: z.boolean(),
  EditarAjuste: z.boolean(),
  EliminarAjuste: z.boolean(),

  //CONSTANCIA
  VerConstancias: z.boolean(),
  CrearConstancia: z.boolean(),
  EditarConstancia: z.boolean(),
  EliminarConstancia: z.boolean(),

  //CONSTANCIA
  VerBonificaciones: z.boolean(),
  CrearBonificacion: z.boolean(),
  EditarBonificacion: z.boolean(),
  EliminarBonificacion: z.boolean(),

  //GIROS COMERCIALES
  VerGirosComerciales: z.boolean(),
  CrearGiroComercial: z.boolean(),
  EditarGiroComercial: z.boolean(),
  EliminarGircoComercial: z.boolean(),

  //GIROS COMERCIALES
  VerTiposDeToma: z.boolean(),
  CrearTipoDeToma: z.boolean(),
  EditarTipoDeToma: z.boolean(),
  EliminarTipoDeTomas: z.boolean(),
})
