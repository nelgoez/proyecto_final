import mongoose from "mongoose";

const productosCollection = "productos";
const productoSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    max: 100,
  },
  price: {
    type: Number,
    require: true,
  },
  thumbnail: {
    type: String,
    require: true,
    max: 100,
  },
});

export const productos = mongoose.model(productosCollection, productoSchema);
