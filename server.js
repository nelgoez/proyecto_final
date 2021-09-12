"use strict";

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var express_1 = __importDefault(require("express"));

var path_1 = __importDefault(require("path"));

var express_handlebars_1 = __importDefault(require("express-handlebars"));

var socket_io_1 = require("socket.io");

var Producto_js_1 = __importDefault(require("./Producto.js"));

var Productos_js_1 = __importDefault(require("./Productos.js"));

var Archivo_js_1 = __importDefault(require("./Archivo.js"));

var productos = new Productos_js_1["default"]();
var app = express_1["default"]();
var PORT = process.env.PORT || 8080;

var _dirname = path_1["default"].resolve();

var router = express_1["default"].Router();
app.use("/api", router); // Metodo incorporado en express para reconocer el objeto de solicitud entrante como cadenas o matrices.

app.use(express_1["default"].urlencoded({
  extended: true
})); // Metodo incorporado en express para reconocer el objeto de solicitud entrante como un objeto JSON.

app.use(express_1["default"].json()); // Configuracion de Handlebars.

app.engine("hbs", express_handlebars_1["default"]({
  layoutsDir: _dirname + "/views/layouts",
  extname: "hbs",
  defaultLayout: "index",
  partialsDir: _dirname + "/views/partials"
})); // Set del motor de plantillas a utilizar.

app.set("view engine", "hbs"); // Set espacio público del servidor.

app.use(express_1["default"]["static"](_dirname + "/public"));
var server = app.listen(PORT, function () {
  console.log("Server listening on port " + PORT);
});
server.on("error", function (error) {
  console.log("Server Error: " + error);
}); // SOCKET IO

var io = new socket_io_1.Server(server);
var file = new Archivo_js_1["default"](_dirname + "/mensajes.txt");
io.on("connection", function (socket) {
  return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c;

    return __generator(this, function (_d) {
      switch (_d.label) {
        case 0:
          console.log("Conexion al Back");
          socket.emit("productos", productos.listar());
          _b = (_a = socket).emit;
          _c = ["messages"];
          return [4
          /*yield*/
          , file.leer()];

        case 1:
          _b.apply(_a, _c.concat([_d.sent()]));

          socket.on("new_message", function (data) {
            return __awaiter(void 0, void 0, void 0, function () {
              var _a, _b, _c;

              return __generator(this, function (_d) {
                switch (_d.label) {
                  case 0:
                    return [4
                    /*yield*/
                    , file.guardar(data)];

                  case 1:
                    _d.sent();

                    _b = (_a = io.sockets).emit;
                    _c = ["messages"];
                    return [4
                    /*yield*/
                    , file.leer()];

                  case 2:
                    _b.apply(_a, _c.concat([_d.sent()]));

                    return [2
                    /*return*/
                    ];
                }
              });
            });
          });
          return [2
          /*return*/
          ];
      }
    });
  });
}); // SOCKET IO

app.get("/", function (req, res) {
  res.sendFile("index.html", {
    root: _dirname
  });
});
app.get("/productos/vista", function (req, res) {
  var result = productos.listar();

  if (result.length !== 0) {
    res.render("main", {
      layout: "productos",
      list: result,
      listExist: true
    });
  } else {
    res.render("main", {
      layout: "productos",
      error: "No hay productos cargados",
      listExist: false
    });
  }
});
router.get("/productos/listar", function (req, res) {
  var result = productos.listar();
  res.json(result.length !== 0 ? result : {
    error: "No hay productos cargados"
  });
});
router.get("/productos/listar/:id", function (req, res) {
  var result = productos.listarById(req.params.id);
  res.json(typeof result !== "undefined" ? result : {
    error: "Producto no encontrado"
  });
});
router.post("/productos/guardar", function (req, res) {
  var producto = new Producto_js_1["default"](req.body.title, req.body.price, req.body.thumbnail);
  productos.guardar(producto);
  io.sockets.emit("productos", productos.listar()); // Informo al resto de usuarios de los cambios

  res.redirect("/");
});
router.put("/productos/actualizar/:id", function (req, res) {
  var producto = new Producto_js_1["default"](req.body.title, req.body.price, req.body.thumbnail);
  var result = productos.actualizar(producto, req.params.id);
  res.json(typeof result !== "undefined" ? result : {
    error: "Producto no encontrado"
  });
});
router["delete"]("/productos/borrar/:id", function (req, res) {
  var result = productos.borrar(req.params.id);
  res.json(typeof result !== "undefined" ? result : {
    error: "Producto no encontrado"
  });
});
