"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Producto = /** @class */ (function () {
    function Producto(title, price, thumbnail) {
        this.id = -1;
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }
    Producto.prototype.getId = function () {
        return this.id;
    };
    Producto.prototype.setId = function (id) {
        this.id = id;
    };
    return Producto;
}());
exports.default = Producto;
