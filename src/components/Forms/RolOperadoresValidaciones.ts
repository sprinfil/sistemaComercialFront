import { z } from "zod";

//VALIDACIONES CREAR USUARIO NUEVO
export const RolOperadoresValidacionesSchema = z.object({
  //CATALOGO ANOMALIAS
  Admin: z.boolean(),
  Developer: z.boolean(),
});