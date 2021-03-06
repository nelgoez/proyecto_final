"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var express_handlebars_1 = __importDefault(require("express-handlebars"));
var socket_io_1 = require("socket.io");
var DB_Productos_1 = require("./models/DB_Productos");
var DB_Mensajes_1 = require("./models/DB_Mensajes");
var Main_1 = __importDefault(require("./routes/Main"));
var app = (0, express_1.default)();
var __dirname = path_1.default.resolve();
var PORT = process.env.PORT || 8080;
app.use(express_1.default.static(__dirname + "/public"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
// View Engine Setup
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "hbs");
app.engine("hbs", (0, express_handlebars_1.default)({
    layoutsDir: __dirname + "/views/layouts",
    extname: "hbs",
    defaultLayout: "index",
    partialsDir: __dirname + "/views/partials",
}));
// Routes Setup
app.use("/productos", Main_1.default);
var server = app.listen(PORT, function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Server listening on port " + PORT);
                return [4 /*yield*/, DB_INIT()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
server.on("error", function (error) {
    console.log("Server Error: " + error);
});
// SOCKET IO
var io = new socket_io_1.Server(server);
io.on("connection", function (socket) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c, _d, _e, _f, error_1;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                _g.trys.push([0, 3, , 4]);
                _b = (_a = socket).emit;
                _c = ["productos"];
                return [4 /*yield*/, (0, DB_Productos_1.sql_select)()];
            case 1:
                _b.apply(_a, _c.concat([_g.sent()]));
                _e = (_d = socket).emit;
                _f = ["messages"];
                return [4 /*yield*/, (0, DB_Mensajes_1.msg_select)()];
            case 2:
                _e.apply(_d, _f.concat([_g.sent()]));
                socket.on("new_message", function (data) { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, _b, _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0: return [4 /*yield*/, (0, DB_Mensajes_1.msg_insert)(data)];
                            case 1:
                                _d.sent();
                                _b = (_a = io.sockets).emit;
                                _c = ["messages"];
                                return [4 /*yield*/, (0, DB_Mensajes_1.msg_select)()];
                            case 2:
                                _b.apply(_a, _c.concat([_d.sent()]));
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _g.sent();
                console.log(error_1);
                throw error_1;
            case 4: return [2 /*return*/];
        }
    });
}); });
// SOCKET IO
app.get("/", function (req, res) {
    res.sendFile("index.html", { root: __dirname });
});
app.get("/productos/vista", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, DB_Productos_1.sql_select)()];
            case 1:
                result = _a.sent();
                if (result && result.length !== 0) {
                    res.render("main", {
                        layout: "productos",
                        list: result,
                        listExist: true,
                    });
                }
                else {
                    res.render("main", {
                        layout: "productos",
                        error: "No hay productos cargados",
                        listExist: false,
                    });
                }
                return [2 /*return*/];
        }
    });
}); });
Main_1.default.get("/listar/:id?", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                result = undefined;
                id = req.params.id;
                if (!id) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, DB_Productos_1.sql_select_id)(id)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res
                        .status(200)
                        .json(typeof result !== "undefined"
                        ? result
                        : { error: "Producto no encontrado" })];
            case 2: return [4 /*yield*/, (0, DB_Productos_1.sql_select)()];
            case 3:
                result = _a.sent();
                return [2 /*return*/, res
                        .status(200)
                        .json(typeof result !== "undefined"
                        ? result
                        : { error: "Productos no encontrados" })];
        }
    });
}); });
Main_1.default.post("/agregar", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var producto, _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                producto = {
                    title: req.body.title,
                    price: parseInt(req.body.price),
                    thumbnail: req.body.thumbnail,
                };
                return [4 /*yield*/, (0, DB_Productos_1.sql_insert)(producto)];
            case 1:
                _d.sent();
                _b = (_a = io.sockets).emit;
                _c = ["productos"];
                return [4 /*yield*/, (0, DB_Productos_1.sql_select)()];
            case 2:
                _b.apply(_a, _c.concat([_d.sent()]));
                res.redirect("/");
                return [2 /*return*/];
        }
    });
}); });
Main_1.default.put("/actualizar/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var producto, result, _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                producto = {
                    title: req.body.title,
                    price: parseInt(req.body.price),
                    thumbnail: req.body.thumbnail,
                };
                return [4 /*yield*/, (0, DB_Productos_1.sql_update)(producto, req.params.id)];
            case 1:
                result = _d.sent();
                _b = (_a = io.sockets).emit;
                _c = ["productos"];
                return [4 /*yield*/, (0, DB_Productos_1.sql_select)()];
            case 2:
                _b.apply(_a, _c.concat([_d.sent()]));
                res
                    .status(200)
                    .json(typeof result !== "undefined"
                    ? result
                    : { error: "Producto no encontrado" });
                return [2 /*return*/];
        }
    });
}); });
Main_1.default.delete("/borrar/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, (0, DB_Productos_1.sql_delete_id)(req.params.id)];
            case 1:
                result = _d.sent();
                _b = (_a = io.sockets).emit;
                _c = ["productos"];
                return [4 /*yield*/, (0, DB_Productos_1.sql_select)()];
            case 2:
                _b.apply(_a, _c.concat([_d.sent()]));
                res
                    .status(200)
                    .json(typeof result !== "undefined"
                    ? result
                    : { error: "Producto no encontrado" });
                return [2 /*return*/];
        }
    });
}); });
var DB_INIT = function () { return __awaiter(void 0, void 0, void 0, function () {
    var msg_test, _i, msg_test_1, msg, productos_test, _a, productos_test_1, producto;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: 
            // Carga inicial de datos dummy
            return [4 /*yield*/, (0, DB_Mensajes_1.msg_delete)()];
            case 1:
                // Carga inicial de datos dummy
                _b.sent();
                msg_test = [
                    {
                        author: "Juan@hotmail.com",
                        text: "??Hola mundo!",
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
                _i = 0, msg_test_1 = msg_test;
                _b.label = 2;
            case 2:
                if (!(_i < msg_test_1.length)) return [3 /*break*/, 5];
                msg = msg_test_1[_i];
                return [4 /*yield*/, (0, DB_Mensajes_1.msg_insert)(msg)];
            case 3:
                _b.sent();
                _b.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5: return [4 /*yield*/, (0, DB_Productos_1.sql_delete)()];
            case 6:
                _b.sent();
                productos_test = [
                    {
                        title: "Globo Terr??queo",
                        price: 345.67,
                        thumbnail: "https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Item_Bag-256.png",
                    },
                    {
                        title: "Teclado",
                        price: 12000,
                        thumbnail: "https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Item_Bag-256.png",
                    },
                    {
                        title: "Mouse",
                        price: 9000.99,
                        thumbnail: "https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Item_Bag-256.png",
                    },
                ];
                _a = 0, productos_test_1 = productos_test;
                _b.label = 7;
            case 7:
                if (!(_a < productos_test_1.length)) return [3 /*break*/, 10];
                producto = productos_test_1[_a];
                return [4 /*yield*/, (0, DB_Productos_1.sql_insert)(producto)];
            case 8:
                _b.sent();
                _b.label = 9;
            case 9:
                _a++;
                return [3 /*break*/, 7];
            case 10: return [2 /*return*/];
        }
    });
}); };
