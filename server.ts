import express from "express";
import path from "path";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import {
  sql_select,
  sql_select_id,
  sql_insert,
  sql_update,
  sql_delete_id,
  sql_delete,
} from "./model/DB_Productos";
import { msg_select, msg_insert, msg_delete } from "./model/DB_Mensajes";
import Producto from "./src/Interface_Producto";
import Mensaje from "./src/Interface_Mensaje";

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 8080;

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

    socket.emit("productos", await sql_select());

    socket.emit("messages", await msg_select());

    socket.on("new_message", async (data: Mensaje) => {
      await msg_insert(data);
      io.sockets.emit("messages", await msg_select());
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
  let result = await sql_select(); 
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
  let id = req.params.id;
  if (id) {
    result = await sql_select_id(id);
    return res
      .status(200)
      .json(
        typeof result !== "undefined"
          ? result
          : { error: "Producto no encontrado" }
      );
  } else {
    result = await sql_select();
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
  let producto: Producto = {
    title: req.body.title,
    price: parseInt(req.body.price),
    thumbnail: req.body.thumbnail,
  };
  await sql_insert(producto);
  io.sockets.emit("productos", await sql_select());
  res.redirect("/");
});

router.put("/actualizar/:id", async (req, res) => {
  let producto: Producto = {
    title: req.body.title,
    price: parseInt(req.body.price),
    thumbnail: req.body.thumbnail,
  };
  let result = await sql_update(producto, req.params.id);
  io.sockets.emit("productos", await sql_select());
  res
    .status(200)
    .json(
      typeof result !== "undefined"
        ? result
        : { error: "Producto no encontrado" }
    );
});

router.delete("/borrar/:id", async (req, res) => {
  let result = await sql_delete_id(req.params.id);
  io.sockets.emit("productos", await sql_select());
  res
    .status(200)
    .json(
      typeof result !== "undefined"
        ? result
        : { error: "Producto no encontrado" }
    );
});

const DB_INIT = async () => {
  // Carga inicial de datos dummy
  await msg_delete();

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

  for (const msg of msg_test) {
    await msg_insert(msg);
  }

  await sql_delete();

  const productos_test = [
    {
      title: "Globo Terráqueo",
      price: 345.67,
      thumbnail:
        "https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Item_Bag-256.png",
    },
    {
      title: "Teclado",
      price: 12000,
      thumbnail:
        "https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Item_Bag-256.png",
    },
    {
      title: "Mouse",
      price: 9000.99,
      thumbnail:
        "https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Item_Bag-256.png",
    },
  ];

  for (const producto of productos_test) {
    await sql_insert(producto);
  }
};
