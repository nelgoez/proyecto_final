import express from "express";
import archivo from "./Archivo.js";

const app = express();
const port = process.env.PORT || 8080;

const file = new archivo("./productos.txt");
let contadorVisitasItems = 0;
let contadorVisitasItem = 0;

app.get("/items", async (req, res) => {
    contadorVisitasItems++;
    let info = await file.leer();
    res.json({
        items : info,
        cantidad : info.length
    });
});

app.get("/item-random", async (req, res) => {
    contadorVisitasItem++;
    let info = await file.leer(); 
    res.json({
        item : info[Math.floor(Math.random() * info.length)]
    });
});

app.get("/visitas", (req, res) => {
    res.json({
        visitas : {
            items : contadorVisitasItems,
            item : contadorVisitasItem
        }
    });
});

const server = app.listen(port, () => {
    console.log(`Server listening on port ${server.address().port}`);
});

server.on("error", (error) => {
    console.error(`Server Error: ${error}`);
});

// Agregar un nuevo producto al archivo txt
// await file.guardar("Calculadora Pro Max Plus", 800, "https://www.google.com.ar/");

// Eliminar archivo txt
// await file.borrar();

// Leer info del archivo txt
// console.log(await file.leer());

// Restaura el archivo eliminado
// await file.reset();