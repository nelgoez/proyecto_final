import path from "path";

console.log(path.resolve());

const options = {
  client: "sqlite3",
  connection: {
    filename: `${path.resolve()}/db/mydb.sqlite`,
  },
  useNullAsDefault: true,
};

export { options }; 
