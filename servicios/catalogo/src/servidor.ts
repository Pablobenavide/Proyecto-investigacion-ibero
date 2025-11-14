import "dotenv/config";
import app from "./app.js";

const puerto = Number(process.env.PUERTO ?? 3001);
app.listen(puerto, () => {
  console.log(`✅ Servicio catálogo activo en http://localhost:${puerto}`);
});
