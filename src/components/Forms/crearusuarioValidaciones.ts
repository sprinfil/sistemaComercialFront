import { z } from "zod";

//VALIDACIONES CREAR USUARIO NUEVO
export const crearusuarionuevoSchema = z.object({
    id: z.number(),
    nombre: z.string().min(1, "El nombre es requerido."),
    apellido_paterno: z.string().min(1,"El apellido paterno es requerido." ),
    apellido_materno: z.string(),
    telefono: z.string().min(1, "El teléfono  del usuario es requerido.").max(10, "El teléfono no puede tener mas de 10 caracteres."),
    curp: z.string().min(1,"La CURP es requerida.").max(18, "La CURP no puede tener mas de 18 caracteres."),
    rfc: z.string().min(1,"El RFC es requerido.").max(13, "El RFC no puede tener mas de 13 caracteres."),
    correo: z.string().min(1, "El correo electrónico es requerido."),
  })
