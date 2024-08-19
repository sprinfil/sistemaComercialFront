import { z } from "zod";
//validaciones para todos los formularios

//LOGIN
//VALIDACIONES PARA INICIAR SESION
export const loginSchema = z.object({
  name: z.string().min(1, "El usuario es requerido"),
  password: z.string().min(1, "La contraseña es requerida"),
})

//CATALOGOS

//VALIDACIONES ANOMALIAS
export const anomaliaSchema = z.object({
  id: z.number(),
  nombre: z.string().min(1, "El Nombre es requerido"),
  descripcion: z.string(),
  facturable: z.string(),
  estado: z.boolean()
})

//VALIDACIONES AJUSTE
export const ajusteSchema = z.object({
  id: z.number(),
  nombre: z.string().min(1, "El Nombre es requerido"),
  descripcion: z.string()
})


//VALIDACIONES AJUSTE
export const conceptoSchema = z.object({
    id: z.number(),
    nombre: z.string().min(1, "El Nombre es requerido"),
    descripcion: z.string(),
    prioridad_abono: z.string()
    .transform((val) => parseFloat(val)) // Transforma el string en número
    .refine((val) => !isNaN(val), "Debe ser un numero valido") // Verifica que sea un número válido
    .pipe(
      z.number()
        .min(1, "El numero debe ser mayor o igual a 1")
        .max(10, "El numero debe ser menor o igual a 10")
    ), 
    abonable: z.number(),
    tarifa_fija:z.number(),
    cargo_directo: z.number(),
    genera_orden: z.number(),
    genera_recargo: z.number(),
    concepto_rezago: z.number(),
    pide_monto: z.number(),
    bonificable: z.number(),
    genera_iva: z.string(),
    recargo: z.string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), "Debe ser un porcentaje válido")
    .pipe(
        z.number().min(1, "El porcentaje debe ser mayor o igual a 1")
                .max(100, "El porcentaje debe ser menor o igual a 100")
    ),
    estado: z.boolean(),
})
//VALIDACIONES DESCUENTOS
export const descuentoSchema = z.object({
    id: z.number(),
    nombre: z.string().min(1, "El Nombre es requerido"),
    descripcion: z.string(),
  })

 //VALIDACIONES CONVENIO
export const conveniosSchema = z.object({
    id: z.number(),
    nombre: z.string().min(1, "El Nombre es requerido"),
    descripcion: z.string(),
})
//VALIDACIONES CONTANCIAS
export const constanciaSchema = z.object({
    id: z.number(),
    nombre: z.string().min(1, "El Nombre es requerido"),
    descripcion: z.string(),
  })
//VALIDACIONES GIROCOMERCIAL
export const girocomercialSchema = z.object({
    id: z.number(),
    nombre: z.string().min(1, "El Nombre es requerido"),
    descripcion: z.string(),
  })


  //VALIDACIONES BONIFICACIONES
  export const bonificacionesSchema = z.object({
    id: z.number(),
    nombre: z.string().min(1, "El Nombre es requerido"),
    descripcion: z.string(),
  })




//VALIDACIONES TipoDeToma
export const TipoDeTomaSchema = z.object({
  id: z.number(),
  nombre: z.string().min(1, "El Nombre es requerido"),
  descripcion: z.string(),
})




//VALIDACIONES Tarifa
export const tarifaSchema = z.object({
  id: z.number(),
  nombre: z.string().min(1, "El Nombre es requerido"),
  descripcion: z.string(),
  fecha: z.string(), // Campo fecha opcional
  estado: z.boolean()

})

export const coloniaSchema = z.object({ 
  nombre: z.string().min(1, "El Nombre es requerido"),

})