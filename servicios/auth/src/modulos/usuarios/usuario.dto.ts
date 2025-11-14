import { z } from "zod";

export const registroUsuarioDto = z.object({
  nombre: z.string().min(2),
  correo: z.string().email(),
  clave: z.string().min(6)
});

export type RegistroUsuarioEntrada = z.infer<typeof registroUsuarioDto>;

export const loginUsuarioDto = z.object({
  correo: z.string().email(),
  clave: z.string().min(6)
});

export type LoginUsuarioEntrada = z.infer<typeof loginUsuarioDto>;
