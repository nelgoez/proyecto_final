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
exports.sql_delete_id = exports.sql_delete = exports.sql_update = exports.sql_insert = exports.sql_select_id = exports.sql_select = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Productos_1 = require("./Productos");
var sql_select = function () { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, 4, 6]);
                return [4 /*yield*/, mongoose_1.default.connect("mongodb://localhost:27017/ecommerce")];
            case 1:
                _a.sent();
                console.log("Base de datos conectada");
                console.log("READ");
                return [4 /*yield*/, Productos_1.productos.find()];
            case 2:
                result = _a.sent();
                console.log(result);
                return [2 /*return*/, result];
            case 3:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, mongoose_1.default.disconnect()];
            case 5:
                _a.sent();
                console.log("Base de datos desconectada");
                return [7 /*endfinally*/];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.sql_select = sql_select;
var sql_select_id = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, 4, 6]);
                return [4 /*yield*/, mongoose_1.default.connect("mongodb://localhost:27017/ecommerce")];
            case 1:
                _a.sent();
                console.log("Base de datos conectada");
                console.log("READ");
                return [4 /*yield*/, Productos_1.productos.find({ _id: id })];
            case 2:
                result = _a.sent();
                console.log(result);
                return [2 /*return*/, result];
            case 3:
                error_2 = _a.sent();
                console.log(error_2);
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, mongoose_1.default.disconnect()];
            case 5:
                _a.sent();
                console.log("Base de datos desconectada");
                return [7 /*endfinally*/];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.sql_select_id = sql_select_id;
var sql_insert = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var productoModel, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, 4, 6]);
                return [4 /*yield*/, mongoose_1.default.connect("mongodb://localhost:27017/ecommerce")];
            case 1:
                _a.sent();
                console.log("Base de datos conectada");
                productoModel = new Productos_1.productos(data);
                console.log("CREATE");
                return [4 /*yield*/, productoModel.save()];
            case 2:
                _a.sent();
                return [3 /*break*/, 6];
            case 3:
                error_3 = _a.sent();
                console.log(error_3);
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, mongoose_1.default.disconnect()];
            case 5:
                _a.sent();
                console.log("Base de datos desconectada");
                return [7 /*endfinally*/];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.sql_insert = sql_insert;
var sql_update = function (data, id) { return __awaiter(void 0, void 0, void 0, function () {
    var error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, 4, 6]);
                return [4 /*yield*/, mongoose_1.default.connect("mongodb://localhost:27017/ecommerce")];
            case 1:
                _a.sent();
                console.log("Base de datos conectada");
                console.log("UPDATE");
                return [4 /*yield*/, Productos_1.productos.findOneAndUpdate({ _id: id }, data)];
            case 2: return [2 /*return*/, _a.sent()];
            case 3:
                error_4 = _a.sent();
                console.log(error_4);
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, mongoose_1.default.disconnect()];
            case 5:
                _a.sent();
                console.log("Base de datos desconectada");
                return [7 /*endfinally*/];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.sql_update = sql_update;
var sql_delete_id = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, 4, 6]);
                return [4 /*yield*/, mongoose_1.default.connect("mongodb://localhost:27017/ecommerce")];
            case 1:
                _a.sent();
                console.log("Base de datos conectada");
                console.log("DELETE");
                return [4 /*yield*/, Productos_1.productos.deleteOne({ _id: id })];
            case 2: return [2 /*return*/, _a.sent()];
            case 3:
                error_5 = _a.sent();
                console.log(error_5);
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, mongoose_1.default.disconnect()];
            case 5:
                _a.sent();
                console.log("Base de datos desconectada");
                return [7 /*endfinally*/];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.sql_delete_id = sql_delete_id;
var sql_delete = function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, 4, 6]);
                return [4 /*yield*/, mongoose_1.default.connect("mongodb://localhost:27017/ecommerce")];
            case 1:
                _a.sent();
                console.log("Base de datos conectada");
                console.log("DELETE");
                return [4 /*yield*/, Productos_1.productos.deleteMany()];
            case 2: return [2 /*return*/, _a.sent()];
            case 3:
                error_6 = _a.sent();
                console.log(error_6);
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, mongoose_1.default.disconnect()];
            case 5:
                _a.sent();
                console.log("Base de datos desconectada");
                return [7 /*endfinally*/];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.sql_delete = sql_delete;
