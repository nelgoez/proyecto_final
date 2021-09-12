export default class Producto {
  private id: number;
  private title: string;
  private price: string;
  private thumbnail: string;

  constructor(title: string, price: string, thumbnail: string) {
    this.id = -1;
    this.title = title;
    this.price = price;
    this.thumbnail = thumbnail;
  }

  getId(): number {
    return this.id;
  }
  
  setId(id: number) {
    this.id = id;
  }
}
