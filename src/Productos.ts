import Producto from "./Producto";

export default class Productos {
  private id: number;
  private lista: Array<Producto>;

  constructor() {
    this.id = 0;
    this.lista = [];
  }

  public listar() {
    return this.lista;
  }

  public listarById(id: number) {
    let result = undefined;
    for (let element of this.lista) {
      if (element.getId() == id) {
        result = element;
        break;
      }
    }
    return result;
  }

  public guardar(producto: Producto) {
    this.id++;
    producto.setId(this.id);
    this.lista.push(producto);
  }

  public borrar(id: number) {
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

  public actualizar(producto: Producto, id: number) {
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