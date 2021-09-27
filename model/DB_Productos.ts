import mongoose from "mongoose";
import Producto from "../src/Interface_Producto";
import { productos } from "./Productos";

const sql_select = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/ecommerce");
    console.log("Base de datos conectada");
    console.log("READ");
    const result = await productos.find();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.disconnect();
    console.log("Base de datos desconectada");
  }
};

const sql_select_id = async (id: string) => {
  try {
    await mongoose.connect("mongodb://localhost:27017/ecommerce");
    console.log("Base de datos conectada");
    console.log("READ");
    const result = await productos.find({ _id: id });
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.disconnect();
    console.log("Base de datos desconectada");
  }
};

const sql_insert = async (data: Producto) => {
  try {
    await mongoose.connect("mongodb://localhost:27017/ecommerce");
    console.log("Base de datos conectada");
    const productoModel = new productos(data);
    console.log("CREATE");
    await productoModel.save();
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.disconnect();
    console.log("Base de datos desconectada");
  }
};

const sql_update = async (data: Producto, id: string) => {
  try {
    await mongoose.connect("mongodb://localhost:27017/ecommerce");
    console.log("Base de datos conectada");
    console.log("UPDATE");
    return await productos.findOneAndUpdate({ _id: id }, data);
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.disconnect();
    console.log("Base de datos desconectada");
  }
};

const sql_delete_id = async (id: string) => {
  try {
    await mongoose.connect("mongodb://localhost:27017/ecommerce");
    console.log("Base de datos conectada");
    console.log("DELETE");
    return await productos.deleteOne({ _id: id });
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.disconnect();
    console.log("Base de datos desconectada");
  }
};

const sql_delete = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/ecommerce");
    console.log("Base de datos conectada");
    console.log("DELETE");
    return await productos.deleteMany();
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.disconnect();
    console.log("Base de datos desconectada");
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
