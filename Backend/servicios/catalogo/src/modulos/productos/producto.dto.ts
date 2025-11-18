import { z } from "zod";

export const crearProductoDto = z.object({
  nombre: z.string().min(2),
  sku: z.string().min(2),
  precio: z.number().nonnegative(),
  atributos: z.record(z.string(),z.any()).optional()
});

export type CrearProductoEntrada = z.infer<typeof crearProductoDto>;
