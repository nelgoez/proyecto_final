"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mensajes = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var mensajesCollection = "mensajes";
var mensajeSchema = new mongoose_1.default.Schema({
    author: {
        type: String,
        require: true,
        max: 100,
    },
    text: {
        type: String,
        require: true,
        max: 100,
    },
    fecha: {
        type: String,
        require: true,
        max: 100,
    },
});
exports.mensajes = mongoose_1.default.model(mensajesCollection, mensajeSchema);
