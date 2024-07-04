import { z } from "zod";

export const rolSchema = z.object({
    name: z.string().min(1, "El nombre del rol es requerido"),
  })