import { z } from "zod";

export const nuevaTarifaSchema = z.object({
    id: z.number(),
    nombre: z.string().min(1, "El nombre del rol es requerido"),
    descripcion: z.string(),
  })

export const nuevoServicioSchema = z.object({
    id: z.number(),
    rango: z.string().min(1, "El numero del rango es requerido"),
    agua: z.number().min(1, "El precio del agua es requerido"),
    alcantarillado: z.number().min(1, "El precio del alcantarillado es requerido"),
    sanamiento: z.number().min(1, "El precio del sanamiento es requerido"),

  })