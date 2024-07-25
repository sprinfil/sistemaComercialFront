import { z } from "zod";

export const nuevaColoniaSchema = z.object({
    id: z.number(),
    nombre: z.string().min(1, "El nombre del rol es requerido"),
  })

export const nuevaCalleSchema = z.object({
  nombre: z.string(),  
  id_colonia: z.number(),
    
  })