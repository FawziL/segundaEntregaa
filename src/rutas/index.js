import { Router } from "express";
const router = Router();
import daos from "../daos/index.js";


///////////////////Productos
router.get("/productos", async (req, res) => {
  const response = await daos.ProductoDao.getAll();

  res.json(response);
});
router.get("/productos/:id", async (req, res) => {
  const response = await daos.ProductoDao.getById(req.params.id);

  res.json(response);
});




///////////////////Carrito
router.get("/carritos", async (req, res) => {
  const response = await daos.CarritoDao.getAll();

  res.json(response);
});

router.get("/carritos/:id", async (req, res) => {
  const response = await daos.CarritoDao.getById(req.params.id);

  res.json(response);
});

export default router;

