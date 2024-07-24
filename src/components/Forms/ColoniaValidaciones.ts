import { z } from "zod";

export const nuevaColoniaSchema = z.object({
    id: z.number(),
    nombre: z.string().min(1, "El nombre del rol es requerido"),
  })

export const nuevaCalleSchema = z.object({
    id_colonia: z.number(),
    nombre: z.string(),
  })