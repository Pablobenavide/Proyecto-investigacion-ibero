import { Router } from "express";
import { crearProductoDto } from "./producto.dto.js";
import { crearProducto, listarProductos } from "./producto.servicio.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const buscar = typeof req.query.buscar === "string" ? req.query.buscar : undefined;
    const productos = await listarProductos(buscar);
    res.json(productos);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const datos = crearProductoDto.parse(req.body);
    const nuevo = await crearProducto(datos);
    res.status(201).json(nuevo);
  } catch (err) {
    next(err);
  }
});

export default router;
