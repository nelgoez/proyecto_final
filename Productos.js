"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Productos = /** @class */ (function () {
    function Productos() {
        this.id = 0;
        this.lista = [];
    }
    Productos.prototype.listar = function () {
        return this.lista;
    };
    Productos.prototype.listarById = function (id) {
        var result = undefined;
        for (var _i = 0, _a = this.lista; _i < _a.length; _i++) {
            var element = _a[_i];
            if (element.getId() == id) {
                result = element;
                break;
            }
        }
        return result;
    };
    Productos.prototype.guardar = function (producto) {
        this.id++;
        producto.setId(this.id);
        this.lista.push(producto);
    };
    Productos.prototype.borrar = function (id) {
        var _this = this;
        var result = undefined;
        this.lista.forEach(function (value, index) {
            if (value.getId() == id) {
                result = value;
                _this.lista.splice(index, 1);
                return result;
            }
        });
        return result;
    };
    Productos.prototype.actualizar = function (producto, id) {
        var _this = this;
        var result = undefined;
        producto.setId(id);
        this.lista.forEach(function (value, index) {
            if (value.getId() == id) {
                result = producto;
                _this.lista[index] = result;
                return result;
            }
        });
        return result;
    };
    return Productos;
}());
exports.default = Productos;
