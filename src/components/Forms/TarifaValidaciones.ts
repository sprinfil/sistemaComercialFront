import { z } from "zod";

export const nuevaTarifaSchema = z.object({
    id: z.number(),
    nombre: z.string().min(1, "El nombre del rol es requerido"),
    descripcion: z.string(),
  })

export const nuevoServicioSchema = z.object({
    id_tarifa: z.string(),
    id_tipo_toma: z.string(),
    rango: z.string(),
    agua: z.string(),
    alcantarillado: z.string(),
    saneamiento: z.string(),
  })


