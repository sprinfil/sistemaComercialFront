import { z } from "zod";

export const operadorSchema = z.object({
    name: z.string().min(1, "El nombre de usuario es requerido"), 
    email: z.string(),
    password: z.string().min(1,"La Contraseña es requerida"),
    password_confirmation:z.string().min(1,"Confirmación de Contraseña requerido"),
    
    codigo_empleado: z.string().min(1, "El numero de empleado es requerido").max(5, "Maximo 5 caracteres"),
    nombre: z.string().min(1, "El nombre del operador es requerido"),
    apellido_paterno: z.string().min(1, "El apellido paterno del operador es requerido"),
    apellido_materno: z.string().min(1, "El apellido materno del operador es requerido"),
    CURP: z.string().min(1, "El CURP del operador es requerida").max(18, "Maximo 18 caracteres"),
    fecha_nacimiento: z.union([z.string().regex(/^\d{4}-\d{2}-\d{2}$/), z.date()]),
  })