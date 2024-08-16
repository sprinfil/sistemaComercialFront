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
    clave_catastral: z.string().min(1,"Ingresa la clave catastral"),
    calle: z.string().min(1,"Ingresa la calle"),
    numero_casa: z.string().min(1,"Ingresa el numero de casa"),
    entre_calle_1: z.string(),
    entre_calle_2: z.string(),
    colonia: z.string().min(1,"Ingresa la colonia"),
    codigo_postal: z.string().min(1,"Ingresa el código postal"),
    localidad: z.string().min(1,"Ingresa la localidad"),
    diametro_toma: z.string().min(1,"Ingresa el diametro de la toma"),
    calle_notificaciones: z.string().min(1,"Ingresa la calle para las notificaciones"),
    entre_calle_notificaciones_1: z.string().min(1,"Ingresa entre calle 1"),
    entre_calle_notificaciones_2: z.string().min(1,"Ingresa entre calles 2"),
    tipo_toma: z.string().min(1,"Ingresa tipo de toma"),
    tipo_contratacion: z.string().min(1,"Ingresa el tipo de contratacion"),
    c_agua: z.boolean(),
    c_alc: z.boolean(),
    c_san: z.boolean(),

})