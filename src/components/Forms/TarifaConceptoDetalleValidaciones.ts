import { z } from "zod";

//VALIDACIONES CREAR USUARIO NUEVO
export const TarifaConceptoDetalleSchema = z.object({
    id_tipo_toma: z.number(),
    id_concepto: z.number(),
    monto: z.string(),
  })
