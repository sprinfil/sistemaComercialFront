import { z } from "zod";

export const nuevaTarifaSchema = z.object({
    id: z.number(),
    nombre: z.string().min(1, "El nombre del rol es requerido"),
    descripcion: z.string(),
  })

export const nuevoServicioSchema = z.object({
    id: z.number(),
    id_tarifa: z.number(),
    id_tipo_toma: z.number(),
    rango: z.number(),
    agua: z.number(),
    alcantarillado: z.number(),
    saneamiento: z.number(),
  })