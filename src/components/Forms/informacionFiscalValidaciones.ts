import { z } from "zod";

//VALIDACIONES CREAR USUARIO NUEVO
export const informacionficalSchema = z.object({
    id: z.number(),
    regimenfiscal: z.string().min(1, "El régimen fiscal es requerido"),
    razonsocial: z.string().min(1,"La razón social es requerido" ),
    pais: z.string().min(1,"El país es requerido" ),
    estado:z.string().min(1, "El estado es requerido"),
    municipio: z.string().min(1, "El municipio es requerido"),
    colonia: z.string().max(1, "La colonia es requerida"),
    referencia: z.string().max(1, "La referencia es requerida"),
    codigopostal: z.string().min(1, "El código postal es requerido"),
    localidad: z.string().min(1, "La localidad es requerida"),
    calle: z.string().min(1, "La calle es requerida"),
    numeroexterior: z.string().min(1, "El número exterior es requerido"),
    nombre: z.string().min(1, "El nombre es requerido"),
    telefono: z.string().min(1, "El teléfono"),
    correoelectronico: z.string().min(1, "El correo electrónico es requerido"),
  })
