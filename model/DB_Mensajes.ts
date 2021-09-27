import mongoose from "mongoose";
import Mensaje from "../src/Interface_Mensaje";
import { mensajes } from "./Mensajes";

const msg_select = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/ecommerce");
    return await mensajes.find();
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.disconnect();
  }
};

const msg_insert = async (data: Mensaje) => {
  try {
    await mongoose.connect("mongodb://localhost:27017/ecommerce");
    const mensajeModel = new mensajes(data);
    await mensajeModel.save();
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.disconnect();
  }
};

const msg_delete = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/ecommerce");
    await mensajes.deleteMany();
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.disconnect();
  }
};

export { msg_select, msg_insert, msg_delete };
