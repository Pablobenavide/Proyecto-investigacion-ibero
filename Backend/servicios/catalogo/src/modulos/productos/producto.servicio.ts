import { prisma } from "../../core/prisma.js";
import { CrearProductoEntrada } from "./producto.dto.js";

export const listarProductos = async (buscar?: string) => {
  const where = buscar ? { nombre: { contains: buscar, mode: "insensitive" } } : {};
  return prisma.producto.findMany({
    where,
    orderBy: { creadoEn: "desc" }
  });
};

export const crearProducto = (data: CrearProductoEntrada) =>
  prisma.producto.create({ data });
