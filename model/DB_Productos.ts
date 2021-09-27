import mongoose from "mongoose";
import Producto from "../src/Interface_Producto";
import { productos } from "./Productos";

const sql_select = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/ecommerce");
    return await productos.find();
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.disconnect();
  }
};

const sql_select_id = async (id: string) => {
  try {
    await mongoose.connect("mongodb://localhost:27017/ecommerce");
    return await productos.find({ _id: id });
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.disconnect();
  }
};

const sql_insert = async (data: Producto) => {
  try {
    await mongoose.connect("mongodb://localhost:27017/ecommerce");
    const productoModel = new productos(data);
    await productoModel.save();
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.disconnect();
  }
};

const sql_update = async (data: Producto, id: string) => {
  try {
    await mongoose.connect("mongodb://localhost:27017/ecommerce");
    return await productos.findOneAndUpdate({ _id: id }, data);
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.disconnect();
  }
};

const sql_delete_id = async (id: string) => {
  try {
    await mongoose.connect("mongodb://localhost:27017/ecommerce");
    return await productos.deleteOne({ _id: id });
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.disconnect();
  }
};

const sql_delete = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/ecommerce");
    return await productos.deleteMany();
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.disconnect();
  }
};

export {
  sql_select,
  sql_select_id,
  sql_insert,
  sql_update,
  sql_delete,
  sql_delete_id,
};
