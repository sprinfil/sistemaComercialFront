import { z } from "zod";

//VALIDACIONES CREAR USUARIO NUEVO
export const crearusuarionuevoSchema = z.object({
    id: z.number(),
    nombre: z.string().min(1, "El nombre es requerido"),
    apellidopaterno: z.string().min(1,"El apellido paterno es requerido" ),
    apellidomaterno: z.string().min(1,"El apellido materno es requerido" ),
    telefono: z.string().min(1, " El teléfono del usuario es requerido").max(10, "El teléfono no puede tener más de 10 caracteres"),
    curp: z.string().max(18, "El CURP no puede tener más de 18 caracteres"),
    rfc: z.string().max(13, "El RFC no puede tener más de 13 caracteres"),
    correo: z.string().min(1, "El correo electrónico es requerido"),
  })
