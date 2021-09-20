import express from "express";
import path from "path";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import Producto from "./src/Producto";
import Productos from "./src/Productos";
import Archivo from "./src/Archivo";

import {
  sql_select,
  sql_select_id,
  sql_insert,
  sql_update,
  sql_delete_id,
  sql_create,
} from "./model/DB_Productos";

import { msg_create, msg_select, msg_insert } from "./model/DB_Mensajes";

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 8080;

// const file = new Archivo(`${__dirname}/mensajes.txt`);

const router = express.Router();

app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View Engine Setup
app.set("views", path.join(__dirname, "views"));
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

// Routes Setup
app.use("/productos", router);

const server = app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);

  await DB_INIT();
});

server.on("error", (error) => {
  console.log(`Server Error: ${error}`);
});

// SOCKET IO
const io = new Server(server);

io.on("connection", async (socket) => {
  try {
    console.log("Conexion al Back");

    socket.emit("productos", await sql_select()); // productos.listar());

    socket.emit("messages", await msg_select()); //file.leer());

    socket.on("new_message", async (data) => {
      // await file.guardar(data);
      await msg_insert(data);
      io.sockets.emit("messages", await msg_select()); //file.leer());
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
});
// SOCKET IO

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.get("/productos/vista", async (req, res) => {
  let result = await sql_select(); // productos.listar();
  if (result && result.length !== 0) {
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

router.get("/listar/:id?", async (req, res) => {
  let result = undefined;
  let id = isValid(req.params.id);
  if (id) {
    result = await sql_select_id({ id: id }); //productos.listarById(id);
    return res
      .status(200)
      .json(
        typeof result !== "undefined"
          ? result
          : { error: "Producto no encontrado" }
      );
  } else {
    result = await sql_select(); //productos.listar();
    return res
      .status(200)
      .json(
        typeof result !== "undefined"
          ? result
          : { error: "Productos no encontrados" }
      );
  }
});

router.post("/agregar", async (req, res) => {
  let producto = new Producto(
    req.body.title,
    req.body.price,
    req.body.thumbnail
  );
  await sql_insert([producto]);
  // productos.guardar(producto);
  io.sockets.emit("productos", await sql_select()); // productos.listar()); // Informo al resto de usuarios de los cambios
  res.redirect("/");
  // return res.status(201).json({
  //   codigo: 1,
  //   descripcion: `Producto creado`,
  // });
});

router.put("/actualizar/:id", async (req, res) => {
  let producto = new Producto(
    req.body.title,
    req.body.price,
    req.body.thumbnail
  );
  let id = isValid(req.params.id);
  if (id) {
    let result = await sql_update(producto, { id: id }); //productos.actualizar(producto, id);
    io.sockets.emit("productos", await sql_select()); //productos.listar()); // Informo al resto de usuarios de los cambios
    res
      .status(200)
      .json(
        typeof result !== "undefined"
          ? result
          : { error: "Producto no encontrado" }
      );
  }
});

router.delete("/borrar/:id", async (req, res) => {
  let id = isValid(req.params.id);
  if (id) {
    let result = await sql_delete_id({ id: id }); //productos.borrar(id);
    io.sockets.emit("productos", await sql_select()); // productos.listar()); // Informo al resto de usuarios de los cambios
    res
      .status(200)
      .json(
        typeof result !== "undefined"
          ? result
          : { error: "Producto no encontrado" }
      );
  }
});

const isValid = (input: string | undefined) => {
  if (input) {
    let n = parseInt(input);
    if (!isNaN(n)) {
      return n;
    }
  }
  return;
};

const DB_INIT = async () => {
  // Creación de las Bases de Datos
  await sql_create();
  await msg_create();

  // Carga inicial datos dummy
  const msg_test = [
    {
      author: "Juan@hotmail.com",
      text: "¡Hola mundo!",
      fecha: "12/9/2021 19:52:35",
    },
    {
      author: "Pedro@gmail.com",
      text: "Hola gente!",
      fecha: "12/9/2021 19:52:43",
    },
    {
      author: "Ana@yahoo.com",
      text: "Todo bien?",
      fecha: "19/9/2021 14:49:19",
    },
  ];

  await msg_insert(msg_test);

  const productos_test = [
    {
      title: "Globo Terráqueo",
      price: "345.67",
      thumbnail:
        "https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Item_Bag-256.png",
    },
    {
      title: "Teclado",
      price: "12000",
      thumbnail:
        "https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Item_Bag-256.png",
    },
    {
      title: "Mouse",
      price: "9000.99",
      thumbnail:
        "https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Item_Bag-256.png",
    },
  ];

  await sql_insert(productos_test);
};
