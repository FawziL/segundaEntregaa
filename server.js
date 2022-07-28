import express from "express";
import rutas from "./src/rutas/index.js";
const app = express();

app.use("/", rutas);

app.listen(8080, () => {
  console.log("Servidor escuchando puerto 8080");
});