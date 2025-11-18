import express from "express";
import cors from "cors"; //ruta backend\servicios\catalogo>npm i -D @types/cors
import pino from "pino";
import pinoHttp from "pino-http";
import productoRouter from "./modulos/productos/producto.router.js";

const app = express();
const logger = pino({ transport: { target: "pino-pretty" } });

app.use(pinoHttp({ logger: logger as any })); //cambiar para TS
app.use(cors());
app.use(express.json());

app.get("/salud", (_req, res) => res.json({ ok: true, servicio: "catálogo" }));

app.use("/productos", productoRouter);

export default app;
