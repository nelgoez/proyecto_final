"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
var path_1 = __importDefault(require("path"));
console.log(path_1.default.resolve());
var options = {
    client: "sqlite3",
    connection: {
        filename: path_1.default.resolve() + "/db/mydb.sqlite",
    },
    useNullAsDefault: true,
};
exports.options = options;
