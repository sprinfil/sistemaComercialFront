import { z } from "zod";


//VALIDACIONES OrdenDeTrabajoCrear
export const OrdenDeTrabajoCrearSchema = z.object({
    id: z.number(),
    nombre: z.string().min(1, "El Nombre es requerido"),
    descripcion: z.string(),
    servicio: z.string(),
    vigencias: z.string().min(1, "La vigencia es requerida"),
    momento_cargo:  z.string().min(1, "El momento del cargo es requerido"),
    limite_ordenes: z.string(),
    genera_masiva: z.boolean(),
    asigna_masiva: z.boolean(),
    cancela_masiva: z.boolean(),
    cierra_masiva: z.boolean(),
    publico_general: z.boolean(),


})

