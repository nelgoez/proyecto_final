import mongoose, { mongo } from "mongoose";
import { usuarios } from "./Usuario";

(async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/ecommerce");
        console.log("Base de datos conectada");
        
        const usuario = {
            nombre: "Juan",
            apellido: "Perez",
            password: 12345,
        };

        const usuarioModel = new usuarios(usuario);

        console.log("CREATE");
        console.log(await usuarioModel.save());

        console.log("READ");
        console.log(await usuarios.find());

        console.log("DELETE");
        console.log(await usuarios.deleteMany());
        
    } catch (error) {
        console.log(error);
    } finally {
        await mongoose.disconnect();
    }
})();