import express from "express";
import Producto from "./Producto.js";
import Productos from "./Productos.js";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productos = new Productos();

app.get("/api/productos/listar", (req, res) => {
  let result = productos.listar();
  res.json(
    result.length !== 0 ? result : { error: "No hay productos cargados" }
  );
});

app.get("/api/productos/listar/:id", (req, res) => {
  let result = productos.listarById(req.params.id);
  res.json(
    typeof result !== "undefined" ? result : { error: "Producto no encontrado" }
  );
});

app.post("/api/productos/guardar", (req, res) => {
  let producto = new Producto(
    req.body.title,
    req.body.price,
    req.body.thumbnail
  );
  productos.guardar(producto);
  res.json(producto);
});

const server = app.listen(port, () => {
  console.log(`Server listening on port ${server.address().port}`);
});

server.on("error", (error) => {
  console.error(`Server Error: ${error}`);
});
