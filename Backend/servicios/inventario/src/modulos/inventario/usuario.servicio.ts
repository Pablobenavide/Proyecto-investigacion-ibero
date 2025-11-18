import bcrypt from "bcryptjs";
import jwt, {JwtPayload, SignOptions} from "jsonwebtoken";
import { prisma } from "../../core/prisma";
import {
  LoginUsuarioEntrada,
  RegistroUsuarioEntrada
} from "./usuario.dto.js";

const SALT_ROUNDS = 10;

const obtenerJwtSecreto = () => {
  const secreto = process.env.JWT_SECRETO;
  if (!secreto) {
    throw new Error("Falta JWT_SECRETO en el .env de auth");
  }
  return secreto;
};

//const obtenerJwtExpiracion = () => process.env.JWT_EXPIRACION ?? "1h";

export const registrarUsuario = async (datos: RegistroUsuarioEntrada) => {
  const { nombre, correo, clave } = datos;

  const existente = await prisma.usuario.findUnique({ where: { correo } });
  if (existente) {
    throw new Error("El correo ya está registrado");
  }

  const claveHash = await bcrypt.hash(clave, SALT_ROUNDS);

  const usuario = await prisma.usuario.create({
    data: {
      nombre,
      correo,
      claveHash
    }
  });

  return { id: usuario.id, nombre: usuario.nombre, correo: usuario.correo, rol: usuario.rol };
};

export const loginUsuario = async (datos: LoginUsuarioEntrada) => {
  const { correo, clave } = datos;

  const usuario = await prisma.usuario.findUnique({ where: { correo } });
  if (!usuario) {
    throw new Error("Credenciales inválidas");
  }

  const coincide = await bcrypt.compare(clave, usuario.claveHash);
  if (!coincide) {
    throw new Error("Credenciales inválidas");
  }

  const payload: JwtPayload = { sub: usuario.id, correo: usuario.correo, rol: usuario.rol };
  const opciones: SignOptions = {
    expiresIn: "1h"
  };
  const token = jwt.sign(payload, obtenerJwtSecreto(), opciones);

  return {
    accessToken: token,
    usuario: {
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol
    }
  };
};

export const obtenerUsuarioPorId = async (id: string) => {
  const usuario = await prisma.usuario.findUnique({ where: { id } });
  if (!usuario) return null;
  return {
    id: usuario.id,
    nombre: usuario.nombre,
    correo: usuario.correo,
    rol: usuario.rol
  };
};
