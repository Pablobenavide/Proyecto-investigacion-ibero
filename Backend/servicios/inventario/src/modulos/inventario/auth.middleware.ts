import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface UsuarioJwtPayload {
  sub: string;    
   correo: string;
  rol: string;
  iat?: number;
  exp?: number;
}

const obtenerJwtSecreto = () => {
  const secreto = process.env.JWT_SECRETO;
  if (!secreto) {
    throw new Error("Falta JWT_SECRETO en el .env de auth");
  }
  return secreto;
};

export const requiereAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ mensaje: "No autorizado" });
  }

  const token = header.split(" ")[1];

  try {
    const payload = jwt.verify(token, obtenerJwtSecreto()) as UsuarioJwtPayload;
       req.usuario = payload;

    next();
  } catch (err) {
    return res.status(401).json({ mensaje: "Token inválido o expirado" });
  }
};