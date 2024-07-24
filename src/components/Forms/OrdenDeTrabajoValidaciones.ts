import { z } from "zod";


//VALIDACIONES OrdenDeTrabajoCrear
export const OrdenDeTrabajoCrearSchema = z.object({
    id: z.number(),
    nombre: z.string().min(1, "El Nombre es requerido"),
    estado: z.boolean(),
    cargos: z.number(),
    aplicacion: z.string(),
})

