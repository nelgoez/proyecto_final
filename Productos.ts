import Producto from "./Producto";

export default class Productos {
  private id: number;
  private lista: Array<Producto>;

  constructor() {
    this.id = 0;
    this.lista = [];
  }

  listar() {
    return this.lista;
  }

  listarById(id: number) {
    let result = undefined;
    for (let element of this.lista) {
      if (element.getId() == id) {
        result = element;
        break;
      }
    }
    return result;
  }

  guardar(producto: Producto) {
    this.id++;
    producto.setId(this.id);
    this.lista.push(producto);
  }

  borrar(id: number) {
    let result = undefined;
    this.lista.forEach((value, index) => {
      if (value.getId() == id) {
        result = value;
        this.lista.splice(index, 1);
        return result;
      }
    });
    return result;
  }

  actualizar(producto: Producto, id: number) {
    let result = undefined;
    producto.setId(id);
    this.lista.forEach((value, index) => {
      if (value.getId() == id) {
        result = producto;
        this.lista[index] = result;
        return result;
      }
    });
    return result;
  }
}
