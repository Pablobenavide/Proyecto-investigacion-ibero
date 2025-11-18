import "dotenv/config";
import app from "./app";

const puerto = Number(process.env.PUERTO ?? 3000);

app.listen(puerto, () => {
  console.log(`🔐 Servicio auth escuchando en http://localhost:${puerto}`);
});
