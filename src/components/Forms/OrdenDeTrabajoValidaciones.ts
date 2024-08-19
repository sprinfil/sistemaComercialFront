import { z } from "zod";


//VALIDACIONES OrdenDeTrabajoCrear
export const OrdenDeTrabajoCrearSchema = z.object({
    id: z.number(),
    nombre: z.string().min(1, "El Nombre es requerido"),
    descripcion: z.string(),
    vigencias: z.string(),
    momento_cargo:  z.string(),
    genera_masiva: z.boolean(),
})

