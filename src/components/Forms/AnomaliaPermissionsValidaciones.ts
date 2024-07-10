import { z } from "zod";

//VALIDACIONES CREAR USUARIO NUEVO
export const AnomaliaPermissionsSchema = z.object({
  //CATALOGO ANOMALIAS
  VerAnomalias: z.boolean(),
  CrearAnomalia: z.boolean(),
  EditarAnomalia: z.boolean(),
  EliminarAnomalia: z.boolean(),

  //GIROS COMERCIALES
  VerGirosComerciales: z.boolean(),
  CrearGiroComercial: z.boolean(),
  EditarGiroComercial: z.boolean(),
  EliminarGircoComercial: z.boolean(),

  //CONCEPTOS
  VerConceptos: z.boolean(),
  CrearConcepto: z.boolean(),
  EditarConcepto: z.boolean(),
  EliminarConcepto: z.boolean(),
})
