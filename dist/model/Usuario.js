"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarios = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var usuariosCollection = "usuarios";
var usuarioSchema = new mongoose_1.default.Schema({
    nombre: {
        type: String,
        require: true,
        max: 100,
    },
    apellido: {
        type: String,
        require: true,
        max: 100,
    },
    password: {
        type: Number,
        required: true,
    }
});
exports.usuarios = mongoose_1.default.model(usuariosCollection, usuarioSchema);
