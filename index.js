import express, { response } from "express";
import path from "path";
import Producto from "./Producto.js";
import Productos from "./Productos.js";

const app = express();
const port = process.env.PORT || 8080;
const __dirname = path.resolve();

const router = express.Router();

const productos = new Productos();

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", router);
// Error Middleware
// app.use((error, req, res, next) => {
//   console.error(error.stack);
//   response.status(500).send("ERROR!");
// });
// Router Middleware
// router.use((req, res, next) => {
//   console.log("Time:", Date.now());
//   next();
// });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

router.get("/productos/listar", (req, res) => {
  let result = productos.listar();
  res.json(
    result.length !== 0 ? result : { error: "No hay productos cargados" }
  );
});

router.get("/productos/listar/:id", (req, res) => {
  let result = productos.listarById(req.params.id);
  res.json(
    typeof result !== "undefined" ? result : { error: "Producto no encontrado" }
  );
});

router.post("/productos/guardar", (req, res) => {
  let producto = new Producto(
    req.body.title,
    req.body.price,
    req.body.thumbnail
  );
  productos.guardar(producto);
  res.json(producto);
});

router.put("/productos/actualizar/:id", (req, res) => {
  let producto = new Producto(
    req.body.title,
    req.body.price,
    req.body.thumbnail
  );
  let result = productos.actualizar(producto, req.params.id);
  res.json(
    typeof result !== "undefined" ? result : { error: "Producto no encontrado" }
  );
});

router.delete("/productos/borrar/:id", (req, res) => {
  let result = productos.borrar(req.params.id);
  res.json(
    typeof result !== "undefined" ? result : { error: "Producto no encontrado" }
  );
});

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

server.on("error", (error) => {
  console.error(`Server Error: ${error}`);
});
