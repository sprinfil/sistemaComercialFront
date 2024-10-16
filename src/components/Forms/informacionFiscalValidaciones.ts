import { z } from "zod";

//VALIDACIONES CREAR USUARIO NUEVO
export const informacionficalSchema = z.object({
    id: z.number(),
    id_modelo: z.string(),
    modelo: z.string(),
    regimen_fiscal: z.string().min(1, "El regimen fiscal es requerida"),
    razon_social: z.string().min(1, "El razon social es requerida"),
    pais: z.string().min(1, "El pais es requerida"),
    estado: z.string().min(1, "El estado es requerida"),
    municipio: z.string().min(1, "El municipio es requerido"),
    localidad: z.string().min(1, "La localidad es requerida"),
    colonia: z.string().min(1, "La colonia es requerida"),
    calle: z.string().min(1, "La calle es requerida"),
    referencia: z.string().min(1, "La referencia es requerida"),
    numero_exterior:  z.string().min(1, "El numero exterior es requerido"),
    codigo_postal: z.string().min(1, "El codigo_postal es requerida"),
    nombre: z.string().min(1, "El nombre es requerido"),
    telefono: z.string().min(1, "El telefono es requerido"),
    correo: z.string().min(1, "El correo es requerido"),

  })
