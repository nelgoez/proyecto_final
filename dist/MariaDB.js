"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
var options = {
    client: "mysql",
    connection: {
        host: "127.0.0.1",
        user: "root",
        password: "",
        database: "productos",
    },
    pool: { min: 2, max: 10 },
};
exports.options = options;
