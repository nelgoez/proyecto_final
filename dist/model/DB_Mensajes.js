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
exports.msg_insert = exports.msg_select = exports.msg_create = void 0;
var knex_1 = __importDefault(require("knex"));
var SQLite3_1 = require("../SQLite3");
var DB = (0, knex_1.default)(SQLite3_1.options);
var tableName = "mensajes";
var msg_create = function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, 6, 7]);
                return [4 /*yield*/, DB.schema.hasTable(tableName)];
            case 1:
                if (!_a.sent()) return [3 /*break*/, 3];
                return [4 /*yield*/, DB.schema.dropTable(tableName)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [4 /*yield*/, DB.schema.createTable(tableName, function (table) {
                    table.string("author").notNullable();
                    table.string("text").notNullable();
                    table.string("fecha").notNullable();
                    table.increments("id");
                })];
            case 4:
                _a.sent();
                return [3 /*break*/, 7];
            case 5:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 7];
            case 6: return [7 /*endfinally*/];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.msg_create = msg_create;
var msg_select = function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, 3, 4]);
                return [4 /*yield*/, DB.from(tableName).select("*")];
            case 1: return [2 /*return*/, _a.sent()];
            case 2:
                error_2 = _a.sent();
                console.log(error_2);
                return [3 /*break*/, 4];
            case 3: return [7 /*endfinally*/];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.msg_select = msg_select;
var msg_select_id = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, 3, 4]);
                return [4 /*yield*/, DB.from(tableName).select("*").where(params)];
            case 1: return [2 /*return*/, _a.sent()];
            case 2:
                error_3 = _a.sent();
                console.log(error_3);
                return [3 /*break*/, 4];
            case 3: return [7 /*endfinally*/];
            case 4: return [2 /*return*/];
        }
    });
}); };
var msg_insert = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, 3, 4]);
                return [4 /*yield*/, DB.from(tableName).insert(data)];
            case 1:
                _a.sent();
                return [3 /*break*/, 4];
            case 2:
                error_4 = _a.sent();
                console.log(error_4);
                return [3 /*break*/, 4];
            case 3: return [7 /*endfinally*/];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.msg_insert = msg_insert;
var msg_update = function (data, params) { return __awaiter(void 0, void 0, void 0, function () {
    var error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, 3, 4]);
                return [4 /*yield*/, DB.from(tableName).where(params).update(data)];
            case 1:
                _a.sent();
                return [3 /*break*/, 4];
            case 2:
                error_5 = _a.sent();
                console.log(error_5);
                return [3 /*break*/, 4];
            case 3: return [7 /*endfinally*/];
            case 4: return [2 /*return*/];
        }
    });
}); };
var msg_delete_id = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, 3, 4]);
                return [4 /*yield*/, DB.from(tableName).where(params).del()];
            case 1:
                _a.sent();
                return [3 /*break*/, 4];
            case 2:
                error_6 = _a.sent();
                console.log(error_6);
                return [3 /*break*/, 4];
            case 3: return [7 /*endfinally*/];
            case 4: return [2 /*return*/];
        }
    });
}); };
var msg_delete = function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, 3, 4]);
                return [4 /*yield*/, DB.from(tableName).del()];
            case 1:
                _a.sent();
                return [3 /*break*/, 4];
            case 2:
                error_7 = _a.sent();
                console.log(error_7);
                return [3 /*break*/, 4];
            case 3: return [7 /*endfinally*/];
            case 4: return [2 /*return*/];
        }
    });
}); };
var test = [
    {
        author: "Juan",
        text: "¡Hola mundo!",
        fecha: "12/9/2021 19:52:35",
    },
    {
        author: "Pedro",
        text: "Hola gente!",
        fecha: "12/9/2021 19:52:43",
    },
    {
        author: "Ana",
        text: "Todo bien?",
        fecha: "19/9/2021 14:49:19",
    },
];
var test2 = {
    author: "Juan",
    text: "¡Hola mundo!",
    fecha: "12/9/2021 19:52:35",
};
