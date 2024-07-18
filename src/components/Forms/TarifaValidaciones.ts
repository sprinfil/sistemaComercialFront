import { z } from "zod";

export const nuevaTarifaSchema = z.object({
    id: z.number(),
    nombre: z.string().min(1, "El nombre del rol es requerido"),
    descripcion: z.string(),
  })

export const nuevoServicioSchema = z.object({
    id: z.number(),
    id_tarifa: z.number().min(1, "El precio del agua es requerido"),
    id_tipo_toma: z.number().min(1, "El precio del agua es requerido"),
    rango: z.number().min(1, "El numero del rango es requerido"),
    agua: z.number().min(1, "El precio del agua es requerido"),
    alcantarillado: z.number().min(1, "El precio del alcantarillado es requerido"),
    saneamiento: z.number().min(1, "El precio del sanamiento es requerido"),

  })