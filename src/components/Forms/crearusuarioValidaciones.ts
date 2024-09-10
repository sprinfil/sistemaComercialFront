import { z } from "zod";

//VALIDACIONES CREAR USUARIO NUEVO
export const crearusuarionuevoSchema = z.object({
    id: z.number(),
    nombre: z.string().min(1, "El Nombre es requerido"),
    apellido_paterno: z.string().min(1,"El apellido paterno es requerido" ),
    apellido_materno: z.string().min(1,"El apellido materno es requerido" ),
    telefono: z.string().min(10, "El telefono del usuario debe tener minimo 10 digitos").max(10, "El telefono no puede tener mas de 10 caracteres"),
    curp: z.string().min(18, "El CURP debe tener minimo 18 caracteres")
                    .max(18, "El CURP debe tener 18 caracteres"),
    rfc: z.string().min(13, "El RFC tiene que tener 13 caracteres")
                    .max(13, "El RFC no puede tener mas de 13 caracteres"),
    correo: z.string().min(1, "El correo electronico es requerido"),
    nombre_contacto:  z.string().min(1, "El nombre de contacto es requerido"),
  })


//VALIDACIONES CREAR USUARIO MORAL
export const crearUsuarioMoralSchema = z.object({
  id: z.number(),
  nombre: z.string().min(1, "El Nombre es requerido"),
  telefono: z.string().min(10, "El telefono del usuario debe tener minimo 10 digitos").max(10, "El telefono no puede tener mas de 10 caracteres"),
  rfc: z.string().min(13, "El RFC tiene que tener 13 caracteres")
                  .max(13, "El RFC no puede tener mas de 13 caracteres"),
  correo: z.string().min(1, "El correo electronico es requerido"),
  nombre_contacto:  z.string().min(1, "El nombre de contacto es requerido"),
})

