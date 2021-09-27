import mongoose from "mongoose";

const mensajesCollection = "mensajes";
const mensajeSchema = new mongoose.Schema({
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

export const mensajes = mongoose.model(mensajesCollection, mensajeSchema);
