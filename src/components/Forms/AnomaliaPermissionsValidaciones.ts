import { z } from "zod";

//VALIDACIONES CREAR USUARIO NUEVO
export const AnomaliaPermissionsSchema = z.object({
    VerAnomalias: z.boolean(),
    CrearAnomalias: z.boolean(),
    EditarAnomalias: z.boolean(),
    EliminarAnomalias: z.boolean(),
  })