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
    this.lista.push({ ...producto, id: this.id });
  }

  borrar(id) {
    let result;
    this.lista.forEach((value, index) => {
      if (value.id == id) {
        result = value;
        this.lista.splice(index, 1);
        return result;
      }
    });
    return result;
  }

  actualizar(producto, id) {
    let result;
    this.lista.forEach((value, index) => {
      if (value.id == id) {
        result = { ...producto, id: id };
        this.lista[index] = result;
        return result;
      }
    });
    return result;
  }
}
