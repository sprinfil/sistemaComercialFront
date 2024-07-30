import { z } from "zod";

export const BuscarContratacionSchema = z.object({
    nombre: z.string().min(1,"Ingrese información para buscar al usuario"),
    filtro: z.string(),

})


export const crearContratoSchema = z.object({
    id_usuario: z.number().min(1,"Ingresa algo para buscar al usuario"),
    id_giro_comercial: z.number().min(1,"Ingresa algo para buscar al usuario"),
    id_libro: z.number().min(1,"Ingresa algo para buscar al usuario"),
    id_codigo_toma: z.number().min(1,"Ingresa algo para buscar al usuario"),
    clave_catastral: z.string().min(1,"Ingresa algo para buscar al usuario"),
    calle: z.string().min(1,"Ingresa algo para buscar al usuario"),
    entre_calle_1: z.string().min(1,"Ingresa algo para buscar al usuario"),
    entre_calle_2: z.string().min(1,"Ingresa algo para buscar al usuario"),
    colonia: z.string().min(1,"Ingresa algo para buscar al usuario"),
    codigo_postal: z.string().min(1,"Ingresa algo para buscar al usuario"),
    localidad: z.string().min(1,"Ingresa algo para buscar al usuario"),
    diametro_toma: z.string().min(1,"Ingresa algo para buscar al usuario"),
    calle_notificaciones: z.string().min(1,"Ingresa algo para buscar al usuario"),
    entre_calle_notificaciones_2: z.string().min(1,"Ingresa algo para buscar al usuario"),
    tipo_servicio: z.string().min(1,"Ingresa algo para buscar al usuario"),
    tipo_toma: z.string().min(1,"Ingresa algo para buscar al usuario"),
    tipo_contratacion: z.string().min(1,"Ingresa algo para buscar al usuario"),
})