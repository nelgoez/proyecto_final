import express from "express";
import path from "path";
import handlebars from "express-handlebars";
import Producto from "./Producto.js";
import Productos from "./Productos.js";

const app = express();
const PORT = process.env.PORT || 8080;
const __dirname = path.resolve();

const router = express.Router();

const productos = new Productos();

app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", router);

app.set("view engine", "hbs");

app.engine(
  "hbs",
  handlebars({
    layoutsDir: `${__dirname}/views/layouts`,
    extname: "hbs",
    defaultLayout: "index",
    partialsDir: `${__dirname}/views/partials`,
  })
);

app.get("/", (req, res) => {
  res.render("main", { layout: "index" });
});

app.get("/productos/vista", (req, res) => {
  let result = productos.listar();
  if (result.length !== 0) {
    res.render("main", {
      layout: "productos",
      list: result,
      listExist: true,
    });
  } else {
    res.render("main", {
      layout: "productos",
      error: "No hay productos cargados",
      listExist: false,
    });
  }
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
  res.redirect("/");
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

app.listen(PORT, (error) => {
  if (error) {
    throw new Error(`Server Error: ${error}`);
  }

  console.log(`Server listening on port ${PORT}`);
});
