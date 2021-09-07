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

  async guardar(data) {
    try {
      const temp = await this.leer();
      temp.push({
        id: temp.length + 1,
        author: data.author,
        text: data.text,
        fecha: new Date().toLocaleString("es-AR"),
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
          author: "Juan",
          text: "¡Hola mundo!",
          fecha: "7/9/2021 13:19:53",
        },
        {
          id: 2,
          author: "Pedro",
          text: "Hola gente!",
          fecha: "7/9/2021 13:20:30",
        },
        {
          id: 3,
          author: "Ana",
          text: "Todo bien?",
          fecha: "7/9/2021 13:25:55",
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
