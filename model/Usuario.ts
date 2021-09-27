import mongoose from "mongoose";

const usuariosCollection = "usuarios";
const usuarioSchema = new mongoose.Schema({
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

export const usuarios = mongoose.model(usuariosCollection, usuarioSchema);