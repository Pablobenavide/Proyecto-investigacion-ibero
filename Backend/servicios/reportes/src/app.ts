import express from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import usuarioRouter from "./modulos/usuarios/usuario.router";

const app = express();

app.use(
  pinoHttp({
    
    autoLogging: false
  })
);

app.use(cors());
app.use(express.json());

app.get("/salud", (_req, res) =>
  res.json({ ok: true, servicio: "auth" })
);

// todas las rutas de este servicio cuelgan de /auth
app.use("/auth", usuarioRouter);

export default app;
