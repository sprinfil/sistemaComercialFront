import { z } from "zod";

export const BuscarContratacionSchema = z.object({
    nombre: z.string().min(1,"Ingrese información para buscar al usuario"),
    filtro: z.string(),

})


export const crearContratoSchema = z.object({
    id_giro_comercial: z.number(),
    nombre_contrato:z.string().min(1,"Ingresa el nombre del contrato"),
    clave_catastral: z.string().min(10,"Ingresa la clave catastral o ingresa minimo 10 caracteres").max(14, "Deben ser maximo 12 caracteres"),
    tipo_toma: z.number().min(1,"Ingresa tipo de toma"),
    num_casa: z.string().min(1,"Ingresa el numero de casa"),
    colonia: z.number(),
    calle: z.number().min(1,"Ingresa la calle "),
    codigo_postal: z.string().min(1,"Ingresa el código postal"),
    entre_calle_1: z.number(),
    entre_calle_2: z.number(),
    localidad: z.string().min(1,"Ingresa la localidad"),
    municipio: z.string(),
    c_agua: z.boolean(),
    c_alc: z.boolean(),
    c_san: z.boolean(),
    tipo_contratacion: z.string().min(1,"Ingresa el tipo de contratacion"),


})


export const crearTomaSchema = z.object({
    direccion:z.string(),
})