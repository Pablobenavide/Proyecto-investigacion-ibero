import { Router } from "express";
import {
  loginUsuarioDto,
  registroUsuarioDto
} from "./usuario.dto";
import {
  loginUsuario,
  obtenerUsuarioPorId,
  registrarUsuario
} from "./usuario.servicio";
import { requiereAuth } from "./auth.middleware";

const router = Router();

// POST /auth/registrar
router.post("/registrar", async (req, res, next) => {
  try {
    const datos = registroUsuarioDto.parse(req.body);
    const usuario = await registrarUsuario(datos);
    res.status(201).json(usuario);
  } catch (err: any) {
    if (err instanceof Error && err.message.includes("correo ya está registrado")) {
      return res.status(409).json({ mensaje: err.message });
    }
    next(err);
  }
});

// POST /auth/login
router.post("/login", async (req, res, next) => {
  try {
    const datos = loginUsuarioDto.parse(req.body);
    const resultado = await loginUsuario(datos);
    res.json(resultado);
  } catch (err: any) {
    if (err instanceof Error && err.message.includes("Credenciales")) {
      return res.status(401).json({ mensaje: err.message });
    }
    next(err);
  }
});

// GET /auth/usuario  (requiere token Bearer)
router.get("/usuario", requiereAuth, async (req, res, next) => {
  try {
  
    const payload = req.usuario;

    if (!payload?.sub) {
      return res.status(401).json({ mensaje: "No autorizado" });
    }

    const usuario = await obtenerUsuarioPorId(payload.sub);
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    res.json(usuario);
  } catch (err) {
    next(err);
  }
});

export default router;
