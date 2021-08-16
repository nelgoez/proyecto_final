import fs from "fs";

class Archivo {
  constructor(path) {
    this.path = path;
  }

  async leer() {
    try {
      const contenido = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(contenido);
    } catch (error) {
      console.error("Error al leer", error);
      return [];
    }
  }

  async guardar(title, price, thumbnail) {
    try {
      const temp = await this.leer();
      temp.push({
        id: temp.length + 1,
        title: title,
        price: price,
        thumbnail: thumbnail,
      });
      await fs.promises.writeFile(this.path, JSON.stringify(temp));
      console.log("Documento Guardado!");
    } catch (error) {
      console.error("Error al guardar", error);
    }
  }

  async borrar() {
    try {
      await fs.promises.unlink(this.path);
      console.log("Documento Eliminado!");
    } catch (error) {
      console.error("Error al borrar", error);
    }
  }

  async reset() {
    try {
      const temp = [
        {
          id: 1,
          title: "Escuadra",
          price: 123.45,
          thumbnail: "https://www.google.com.ar/",
        },
        {
          id: 2,
          title: "Calculadora",
          price: 234.56,
          thumbnail: "https://www.google.com.ar/",
        },
        {
          id: 3,
          title: "Globo Terráqueo",
          price: 345.67,
          thumbnail: "https://www.google.com.ar/",
        },
      ];
      await fs.promises.writeFile(this.path, JSON.stringify(temp));
      console.log("Documento Restaurado!");
    } catch (error) {
      console.error("Error al restaurar", error);
    }
  }
}

export default Archivo;