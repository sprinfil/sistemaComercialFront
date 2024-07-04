import { z } from "zod";

//VALIDACIONES CREAR USUARIO NUEVO
export const informacionficalSchema = z.object({
    id: z.number(),
    nombre: z.string().min(1, "El Nombre es requerido"),
    apellidopaterno: z.string().min(1,"El apellido paterno es requerido" ),
    apellidomaterno: z.string().min(1,"El apellido materno es requerido" ),
    telefono: z.string().min(1, "telefono del usuario es requerido").max(10, "El telefono no puede tener mas de 10 caracteres"),
    curp: z.string().max(18, "El curp no puede tener mas de 18 caracteres"),
    rfc: z.string().max(13, "El RFC no puede tener mas de 13 caracteres"),
    correo: z.string().min(1, "El correo electronico es requerido"),
  })
