const options = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "productos",
  },
  pool: { min: 2, max: 10 },
};

export { options };
