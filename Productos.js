export default class Productos {
  constructor() {
    this.id = 0;
    this.lista = [];
  }

  listar() {
    return this.lista;
  }

  listarById(id) {
    let result;
    for (let element of this.lista) {
      if (element.id == id) {
        result = element;
        break;
      }
    }
    return result;
  }

  guardar(producto) {
    this.id++;
    producto["id"] = this.id;
    this.lista.push(producto);
  }
}
