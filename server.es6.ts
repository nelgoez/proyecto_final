import express from "express";
import path from "path";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import Producto from "./Producto.js";
import Productos from "./Productos.js";
import Archivo from "./Archivo.js";

const productos = new Productos();

const app = express();
const PORT = process.env.PORT || 8080;
const __dirname = path.resolve();

const router = express.Router();
app.use("/api", router);

// Metodo incorporado en express para reconocer el objeto de solicitud entrante como cadenas o matrices.
app.use(express.urlencoded({ extended: true }));
// Metodo incorporado en express para reconocer el objeto de solicitud entrante como un objeto JSON.
app.use(express.json());
// Configuracion de Handlebars.
app.engine(
  "hbs",
  handlebars({
    layoutsDir: `${__dirname}/views/layouts`,
    extname: "hbs",
    defaultLayout: "index",
    partialsDir: `${__dirname}/views/partials`,
  })
);
// Set del motor de plantillas a utilizar.
app.set("view engine", "hbs");
// Set espacio público del servidor.
app.use(express.static(`${__dirname}/public`));

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

server.on("error", (error) => {
  console.log(`Server Error: ${error}`);
});

// SOCKET IO
const io = new Server(server);

const file = new Archivo(`${__dirname}/mensajes.txt`);

io.on("connection", async (socket) => {
  console.log("Conexion al Back");

  socket.emit("productos", productos.listar());

  socket.emit("messages", await file.leer());

  socket.on("new_message", async (data) => {
    await file.guardar(data);
    io.sockets.emit("messages", await file.leer());
  });
});
// SOCKET IO

app.get("/", (req: any, res: any) => {
  res.sendFile("index.html", { root: __dirname });
});

app.get("/productos/vista", (req: any, res: any) => {
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

router.get("/productos/listar", (req: any, res: any) => {
  let result = productos.listar();
  res.json(
    result.length !== 0 ? result : { error: "No hay productos cargados" }
  );
});

router.get("/productos/listar/:id", (req: any, res: any) => {
  let result = productos.listarById(req.params.id);
  res.json(
    typeof result !== "undefined" ? result : { error: "Producto no encontrado" }
  );
});

router.post("/productos/guardar", (req: any, res: any) => {
  let producto = new Producto(
    req.body.title,
    req.body.price,
    req.body.thumbnail
  );
  productos.guardar(producto);
  io.sockets.emit("productos", productos.listar()); // Informo al resto de usuarios de los cambios
  res.redirect("/");
});

router.put("/productos/actualizar/:id", (req: any, res: any) => {
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

router.delete("/productos/borrar/:id", (req: any, res: any) => {
  let result = productos.borrar(req.params.id);
  res.json(
    typeof result !== "undefined" ? result : { error: "Producto no encontrado" }
  );
});
