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
  descripcion: z.string()
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
    prioridad_abono: z.number().min(1, "La prioridad debe ser minimo a 1").max(10, "La prioridad no puede ser mayor a 10"),
    genera_iva: z.string(),
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



export const cajaCatalogoSchema = z.object({
  id: z.number(),
  id_cuenta_contable: z.number(),
  nombre_caja: z.string().min(1, "El Nombre es requerido"),
  hora_apertura: z.string().min(1, "La hora de apertura es requerida"),
  hora_cierre: z.string().min(1, "La hora de cierre es requerida"),
})


export const cajaOperadorCatalogoSchema = z.object({
  operadorSeleccionado: z.array(
       z.object({
      id: z.number(),
      id_operador: z.number(),
    })
  ),
});



//VALIDACIONES PARA CERRAR LAS OT
export const cerrarOtSchema = z.object({
  id: z.number(),
  obervaciones: z.string().min(1, "Las obervaciones son requeridas."),
  material_utilizado: z.string(),
})

export const registroMedidotOtSchema = z.object({
  id: z.number(),
  numero_serie: z.string().min(1, "El numero de serie es requerido."),
  marca: z.string(),
  diametro: z.string(),
  tipo: z.string(),
  estatus: z.boolean(),
  fecha_instalacion: z.string(),
  lectura_inicial: z.string(),


})